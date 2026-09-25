// Behaviour shared by every page: mobile menu, click tracking, reveal on scroll.
import { track } from './track.ts';

// Mobile menu
const menuButton = document.querySelector<HTMLButtonElement>('[data-menu-button]');
const menu = document.getElementById('mobile-menu');
if (menuButton && menu) {
  const setOpen = (open: boolean) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menu.hidden = !open;
    document.documentElement.classList.toggle('menu-open', open);
  };
  menuButton.addEventListener('click', () => setOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      menuButton.focus();
    }
  });
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
}

// Every [data-track] click becomes an event, e.g. which button sends people to /trial.
document.addEventListener('click', (e) => {
  const el = (e.target as HTMLElement).closest<HTMLElement>('[data-track]');
  if (!el) return;
  const name = el.dataset.track!;
  const params = { location: el.dataset.trackLocation, channel: el.dataset.trackChannel, page: location.pathname };
  if (name === 'contact_click') track(name, params, { name: 'Contact', standard: true });
  else track(name, params);
});

// Fade in on scroll. Content is visible without JS; this only adds motion.
const reveals = document.querySelectorAll<HTMLElement>('.reveal');
if (reveals.length && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}
