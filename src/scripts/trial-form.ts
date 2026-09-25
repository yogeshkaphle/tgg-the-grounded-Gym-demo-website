// The Free Trial Week form: two steps, inline errors, draft saved per tab,
// ad source attached, and the booking handed to /thank-you on success.
import { track, readJSON, writeJSON } from './track.ts';
import { goals, timeSlots } from '../data/goals.ts';
import { planById } from '../data/plans.ts';
import { classes } from '../data/classes.ts';
import { site } from '../data/site.ts';
import { TIMEZONE } from '../lib/schedule.ts';

const form = document.querySelector<HTMLFormElement>('[data-trial-form]');

export interface Booking {
  id: string;
  name: string;
  goal: string;
  time: string;
  area: string;
  outside: boolean;
  simulated: boolean;
}

const DRAFT_KEY = 'gg_trial_draft';
const BOOKING_KEY = 'gg_booking';
const ENDPOINT = 'https://api.web3forms.com/submit';

// Nepal mobile numbers: 10 digits starting 96, 97 or 98. Accepts +977, spaces and dashes.
export const normalisePhone = (raw: string): string | null => {
  let digits = raw.replace(/\D/g, '');
  if (digits.length === 13 && digits.startsWith('977')) digits = digits.slice(3);
  if (digits.length === 11 && digits.startsWith('0')) digits = digits.slice(1);
  return /^9[678]\d{8}$/.test(digits) ? digits : null;
};

if (form) {
  const $ = <T extends Element>(sel: string) => form.querySelector<T>(sel)!;
  const steps = form.querySelectorAll<HTMLElement>('[data-step]');
  const stepLabel = $<HTMLElement>('[data-step-label]');
  const stepBar = $<HTMLElement>('[data-step-bar]');
  const nameInput = $<HTMLInputElement>('#f-name');
  const phoneInput = $<HTMLInputElement>('#f-phone');
  const areaSelect = $<HTMLSelectElement>('#f-area');
  const emailInput = form.querySelector<HTMLInputElement>('#f-email');
  const areaNote = $<HTMLElement>('#note-area');
  const submitBtn = $<HTMLButtonElement>('[data-submit]');
  const submitLabel = $<HTMLElement>('[data-submit-label]');
  const formError = $<HTMLElement>('[data-form-error]');
  const interestLine = $<HTMLElement>('[data-interest]');
  const outsideValue = form.dataset.outside!;
  const accessKey = form.dataset.key ?? '';

  let step = 1;
  let started = false;

  // ----- Where they came from: plan or class interest in the URL -----
  const params = new URLSearchParams(location.search);
  const plan = planById(params.get('plan') ?? '');
  const interestClass = classes.find((c) => c.id === params.get('interest'));
  if (plan && plan.months > 0) {
    interestLine.textContent = `You picked ${plan.name}. Everyone starts with the ${site.offer}, then chooses a plan.`;
    interestLine.hidden = false;
  } else if (interestClass) {
    interestLine.textContent = `${interestClass.name} is included in your ${site.offer}, along with every other class.`;
    interestLine.hidden = false;
  }

  // ----- Errors -----
  const setError = (id: string, show: boolean) => {
    const error = document.getElementById(`err-${id}`);
    if (error) error.hidden = !show;
    const field =
      id === 'goal' || id === 'time'
        ? form.querySelector<HTMLElement>(`[aria-describedby="err-${id}"]`)
        : form.querySelector<HTMLElement>(`[aria-describedby~="err-${id}"]`);
    if (!field) return;
    if (field.tagName === 'FIELDSET') {
      if (show) field.dataset.invalid = '';
      else delete field.dataset.invalid;
    } else {
      field.setAttribute('aria-invalid', String(show));
    }
  };

  const radioValue = (name: string) => form.querySelector<HTMLInputElement>(`input[name="${name}"]:checked`)?.value ?? '';

  const checks: Record<string, () => boolean> = {
    goal: () => radioValue('goal') !== '',
    time: () => radioValue('time') !== '',
    name: () => nameInput.value.trim().length >= 2,
    phone: () => normalisePhone(phoneInput.value) !== null,
    area: () => areaSelect.value !== '',
    email: () => !emailInput || emailInput.value.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailInput.value.trim()),
  };

  const validate = (ids: string[]): string[] => {
    const failed = ids.filter((id) => !checks[id]());
    ids.forEach((id) => setError(id, failed.includes(id)));
    return failed;
  };

  const focusField = (id: string) => {
    if (id === 'goal' || id === 'time') form.querySelector<HTMLInputElement>(`input[name="${id}"]`)?.focus();
    else document.getElementById(`f-${id}`)?.focus();
  };

  // ----- Draft: survives a refresh, stays in this tab only -----
  const saveDraft = () =>
    writeJSON('session', DRAFT_KEY, {
      goal: radioValue('goal'),
      time: radioValue('time'),
      name: nameInput.value,
      phone: phoneInput.value,
      area: areaSelect.value,
      email: emailInput?.value ?? '',
    });

  const draft = readJSON<Record<string, string>>('session', DRAFT_KEY);
  if (draft) {
    for (const key of ['goal', 'time'] as const) {
      const input = form.querySelector<HTMLInputElement>(`input[name="${key}"][value="${draft[key]}"]`);
      if (input) input.checked = true;
    }
    nameInput.value = draft.name ?? '';
    phoneInput.value = draft.phone ?? '';
    if (draft.area) areaSelect.value = draft.area;
    if (emailInput && draft.email) emailInput.value = draft.email;
  }

  const syncAreaNote = () => {
    areaNote.hidden = areaSelect.value !== outsideValue;
  };
  syncAreaNote();

  // ----- Steps -----
  const showStep = (n: number) => {
    step = n;
    steps.forEach((el) => (el.hidden = el.dataset.step !== String(n)));
    stepLabel.textContent = `Step ${n} of 2`;
    stepBar.style.width = n === 1 ? '50%' : '100%';
    const top = form.getBoundingClientRect().top;
    if (top < 0) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const goToStep2 = () => {
    const failed = validate(['goal', 'time']);
    if (failed.length) {
      focusField(failed[0]);
      return;
    }
    showStep(2);
    nameInput.focus({ preventScroll: true });
    track('trial_form_step2', { goal: radioValue('goal'), time: radioValue('time') }, { name: 'TrialFormStep2' });
  };

  form.addEventListener('change', (e) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    if (target instanceof HTMLInputElement && target.type === 'radio') {
      if (!started) {
        started = true;
        track('trial_form_start', { goal: radioValue('goal') || undefined }, { name: 'TrialFormStart' });
      }
      setError(target.name, false);
    }
    if (target === areaSelect) {
      syncAreaNote();
      setError('area', false);
    }
    saveDraft();
  });

  // Clear an error as soon as the field is fixed; show errors on leaving a field, not while typing.
  for (const [id, input] of [
    ['name', nameInput],
    ['phone', phoneInput],
    ['email', emailInput],
  ] as const) {
    if (!input) continue;
    input.addEventListener('input', () => {
      if (input.getAttribute('aria-invalid') === 'true' && checks[id]()) setError(id, false);
      saveDraft();
    });
    input.addEventListener('blur', () => {
      if (input.value.trim() !== '') setError(id, !checks[id]());
    });
  }

  $<HTMLButtonElement>('[data-next]').addEventListener('click', goToStep2);
  $<HTMLButtonElement>('[data-back]').addEventListener('click', () => {
    showStep(1);
    (form.querySelector<HTMLInputElement>('input[name="goal"]:checked') ?? form.querySelector<HTMLInputElement>('input[name="goal"]'))?.focus();
  });

  // ----- Submit -----
  const labelOf = (list: { id: string; label: string }[], id: string) => list.find((x) => x.id === id)?.label ?? id;

  const kathmanduTime = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone: TIMEZONE, dateStyle: 'medium', timeStyle: 'short' }).format(new Date());

  const setBusy = (busy: boolean) => {
    submitBtn.disabled = busy;
    submitBtn.setAttribute('aria-busy', String(busy));
    submitLabel.textContent = busy ? 'Booking your week...' : `Book my ${site.offer}`;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (step === 1) {
      goToStep2(); // Enter on step 1 means "next", not "send"
      return;
    }
    formError.hidden = true;
    const failed = validate(['name', 'phone', 'area', 'email']);
    if (failed.length) {
      focusField(failed[0]);
      track('trial_form_error', { fields: failed.join(',') });
      return;
    }
    if ((form.elements.namedItem('botcheck') as HTMLInputElement)?.checked) return;

    const phone = normalisePhone(phoneInput.value)!;
    const goal = radioValue('goal');
    const time = radioValue('time');
    const outside = areaSelect.value === outsideValue;
    const id = `GG-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;
    const attr = readJSON<Record<string, string>>('session', 'gg_attr') ?? {};
    const goalLabel = labelOf(goals, goal);
    const timeLabel = labelOf(timeSlots, time);

    const payload: Record<string, string | boolean> = {
      access_key: accessKey,
      subject: `${site.offer} booking: ${nameInput.value.trim()} (${goalLabel}, ${timeLabel})${outside ? ' [OUT OF AREA]' : ''}`,
      from_name: `${site.name} website`,
      Name: nameInput.value.trim(),
      Phone: `+977 ${phone}`,
      'WhatsApp them': `https://wa.me/977${phone}`,
      Goal: goalLabel,
      'Can train': timeLabel,
      Area: areaSelect.value,
      'Area tag': outside ? 'out-of-area' : 'in-area',
      'Plan interest': plan?.name ?? '',
      'Class interest': interestClass?.name ?? '',
      'Booking ID': id,
      'Submitted (Kathmandu)': kathmanduTime(),
      Source: [attr.utm_source, attr.utm_medium, attr.utm_campaign].filter(Boolean).join(' / ') || 'direct',
      'Ad content': attr.utm_content ?? '',
      'Click ID': attr.fbclid ? 'fbclid' : attr.gclid ? 'gclid' : '',
      'Landing page': attr.landing_page ?? '',
      Referrer: attr.referrer ?? '',
      botcheck: false,
    };
    if (emailInput?.value.trim()) payload.email = emailInput.value.trim();

    setBusy(true);
    const simulated = !accessKey;
    try {
      if (simulated) {
        // Test mode: no key set in src/data/site.ts. Nothing leaves the browser.
        console.info('[test mode] booking not sent:', payload);
        await new Promise((r) => setTimeout(r, 700));
      } else {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 15000);
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });
        clearTimeout(timer);
        const json = (await res.json().catch(() => ({}))) as { success?: boolean; message?: string };
        if (!res.ok || !json.success) throw new Error(json.message || `HTTP ${res.status}`);
      }

      const booking: Booking = {
        id,
        name: nameInput.value.trim(),
        goal,
        time,
        area: areaSelect.value,
        outside,
        simulated,
      };
      writeJSON('session', BOOKING_KEY, booking);
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        /* ignore */
      }
      track('trial_form_submit', { goal, time, area_tag: outside ? 'out-of-area' : 'in-area', test_mode: simulated });
      location.assign('/thank-you');
    } catch (err) {
      setBusy(false);
      formError.textContent =
        "That didn't send. Check your connection and tap the button again. Everything you typed is still here.";
      formError.hidden = false;
      track('trial_form_error', { fields: 'network', reason: String((err as Error).message).slice(0, 80) });
    }
  });
}
