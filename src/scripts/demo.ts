// The demo layer: the notes toggle, on-screen event log, and honest
// placeholders for contact buttons that have no real number behind them.

const root = document.documentElement;
const toggles = document.querySelectorAll<HTMLButtonElement>('[data-notes-toggle]');

const notesOn = () => root.dataset.notes === 'on';

const syncToggles = () => {
  toggles.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(notesOn()));
    const label = btn.querySelector('[data-notes-label]');
    if (label) label.textContent = (notesOn() ? btn.dataset.labelOn : btn.dataset.labelOff) ?? '';
  });
};

toggles.forEach((btn) =>
  btn.addEventListener('click', () => {
    const next = notesOn() ? 'off' : 'on';
    if (next === 'on') root.dataset.notes = 'on';
    else delete root.dataset.notes;
    try {
      localStorage.setItem('gg_notes', next);
    } catch {
      /* ignore */
    }
    syncToggles();
    if (next === 'on') {
      const first = document.querySelector('.demo-note');
      first?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }),
);
syncToggles();

// On-screen event log, only while notes are on.
const log = document.getElementById('event-log');
document.addEventListener('gg:track', (e) => {
  if (!log || !notesOn()) return;
  const { name, meta } = (e as CustomEvent).detail as { name: string; meta?: string };
  const item = document.createElement('li');
  item.innerHTML = `<strong>Tracked</strong> <code></code>`;
  item.querySelector('code')!.textContent = meta ? `${name} · Meta: ${meta}` : name;
  log.append(item);
  setTimeout(() => item.classList.add('is-out'), 3200);
  setTimeout(() => item.remove(), 3800);
});

// Contact buttons without a real number open this note instead of dialling a stranger.
const dialog = document.getElementById('demo-contact') as HTMLDialogElement | null;
const channelText: Record<string, string> = {
  call: 'this button rings the front desk.',
  whatsapp: 'this opens WhatsApp with a message to the gym, ready to send.',
  viber: 'this opens a Viber chat with the gym.',
  instagram: "this goes to the gym's Instagram.",
  facebook: "this goes to the gym's Facebook page.",
};
document.addEventListener('click', (e) => {
  const trigger = (e.target as HTMLElement).closest<HTMLElement>('[data-demo-contact]');
  if (!trigger || !dialog) return;
  e.preventDefault();
  const channel = trigger.dataset.demoContact ?? 'call';
  const slot = dialog.querySelector('[data-demo-channel]');
  if (slot) slot.textContent = channelText[channel] ?? channelText.call;
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else dialog.setAttribute('open', '');
});
dialog?.addEventListener('click', (e) => {
  if (e.target === dialog || (e.target as HTMLElement).closest('[data-dialog-close]')) dialog.close();
});
