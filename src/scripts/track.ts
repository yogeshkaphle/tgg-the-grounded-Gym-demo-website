// One function for every tracked event. GA4 and the Meta Pixel receive it
// when their IDs are set; the demo layer shows it on screen when notes are on.
// Never pass names, phone numbers or emails in params: ad platforms don't allow PII.

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export interface MetaEvent {
  name: string;
  standard?: boolean; // Lead, Contact ... vs custom events
  eventId?: string; // for deduplication with the Conversions API later
}

export const track = (name: string, params: Params = {}, meta?: MetaEvent): void => {
  try {
    window.gtag?.('event', name, params);
    if (meta && window.fbq) {
      window.fbq(meta.standard ? 'track' : 'trackCustom', meta.name, params, meta.eventId ? { eventID: meta.eventId } : undefined);
    }
  } catch {
    /* tracking must never break the page */
  }
  document.dispatchEvent(new CustomEvent('gg:track', { detail: { name, params, meta: meta?.name } }));
};

export const readJSON = <T>(storage: 'session' | 'local', key: string): T | null => {
  try {
    const raw = (storage === 'session' ? sessionStorage : localStorage).getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
};

export const writeJSON = (storage: 'session' | 'local', key: string, value: unknown): void => {
  try {
    (storage === 'session' ? sessionStorage : localStorage).setItem(key, JSON.stringify(value));
  } catch {
    /* private mode or storage full: the form still works, it just forgets drafts */
  }
};
