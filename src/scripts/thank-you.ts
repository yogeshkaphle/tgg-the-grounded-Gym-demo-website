// Personalises /thank-you from the booking the form saved, recommends classes
// for the goal they picked, and fires the Lead event exactly once per booking.
import { track, readJSON } from './track.ts';
import { classRow } from './class-row.ts';
import { goals, timeSlots } from '../data/goals.ts';
import { ktmNow, recommend, dayLabel, type TimeSlot } from '../lib/schedule.ts';
import type { Booking } from './trial-form.ts';

const params = new URLSearchParams(location.search);
const previewGoal = params.get('preview');
const saved = readJSON<Booking>('session', 'gg_booking');

// Preview mode (?preview=build-muscle&time=evening) shows any goal's page for
// checking and screenshots. It never fires the Lead event.
const booking: Booking | null =
  saved && !previewGoal
    ? saved
    : previewGoal && goals.some((g) => g.id === previewGoal)
      ? {
          id: 'preview',
          name: params.get('name') ?? 'Sabina',
          goal: previewGoal,
          time: timeSlots.some((t) => t.id === params.get('time')) ? params.get('time')! : 'evening',
          area: params.get('area') ?? 'Baneshwor',
          outside: params.get('area') === 'Outside the valley',
          simulated: true,
        }
      : null;

if (!booking) {
  location.replace('/trial');
} else {
  const isPreview = booking.id === 'preview';
  const firstName = booking.name.split(/\s+/)[0];

  const title = document.querySelector('[data-ty-title]');
  if (title && firstName) title.textContent = `You're booked in for your Free Trial Week, ${firstName}.`;

  const show = (sel: string, on: boolean) => {
    const el = document.querySelector<HTMLElement>(sel);
    if (el) el.hidden = !on;
  };
  show('[data-ty-preview]', isPreview);
  show('[data-ty-test]', booking.simulated && !isPreview);
  show('[data-ty-outside]', booking.outside);

  // Recommendations: the goal decides the classes, the time slot decides when.
  const goal = goals.find((g) => g.id === booking.goal) ?? goals[goals.length - 1];
  const slot = (timeSlots.find((t) => t.id === booking.time)?.id ?? null) as TimeSlot | null;
  const now = ktmNow();
  const { picks, outsideSlot } = recommend(goal.classes, slot, now);

  const planLine = document.querySelector('[data-ty-plan]');
  if (planLine) planLine.textContent = goal.plan;
  const goalChip = document.querySelector('[data-ty-goal]');
  if (goalChip) goalChip.textContent = goal.label;

  const list = document.querySelector('[data-ty-recs]');
  list?.replaceChildren(...picks.map((u) => classRow(u.session, dayLabel(now, u.offset), { summary: true })));

  const slotNote = document.querySelector<HTMLElement>('[data-ty-slot-note]');
  if (slotNote && outsideSlot && slot) {
    const label = timeSlots.find((t) => t.id === slot)!.label.toLowerCase();
    slotNote.textContent = `Not every pick is in the ${label}. There are fewer classes then, so we added the nearest ones. Your coach will help you fit the week around your day.`;
    slotNote.hidden = false;
  }

  // Prefilled WhatsApp message with their name, when the gym's number is set.
  document.querySelectorAll<HTMLAnchorElement>('a[data-ty-whatsapp], [data-ty-whatsapp] a[href^="https://wa.me/"]').forEach((a) => {
    const url = new URL(a.href);
    url.searchParams.set('text', `Hi, I just booked my Free Trial Week. My name is ${booking.name}.`);
    a.href = url.toString();
  });

  // Lead fires here and only here: once per booking, never on refresh or preview.
  if (!isPreview) {
    let fired: string | null = null;
    try {
      fired = sessionStorage.getItem('gg_lead_fired');
    } catch {
      /* ignore */
    }
    if (fired !== booking.id) {
      track(
        'generate_lead',
        { goal: booking.goal, time: booking.time, area_tag: booking.outside ? 'out-of-area' : 'in-area', test_mode: booking.simulated },
        { name: 'Lead', standard: true, eventId: booking.id },
      );
      try {
        sessionStorage.setItem('gg_lead_fired', booking.id);
      } catch {
        /* ignore */
      }
    }
  }
}
