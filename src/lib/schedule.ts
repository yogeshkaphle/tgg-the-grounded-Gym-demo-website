// Time helpers shared by the build and the browser. Everything is in
// Kathmandu time (UTC+5:45), whatever timezone the visitor's phone is set to.

import { sessions, days, type Session } from '../data/timetable.ts';
import type { ClassId } from '../data/classes.ts';

export const TIMEZONE = 'Asia/Kathmandu';

export type TimeSlot = 'morning' | 'day' | 'evening';

export const toMinutes = (hm: string): number => {
  const [h, m] = hm.split(':').map(Number);
  return h * 60 + m;
};

export const fromMinutes = (total: number): string => {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${h}:${String(m).padStart(2, '0')}`;
};

export const endTime = (start: string, minutes: number): string => fromMinutes(toMinutes(start) + minutes);

// Form choice "When can you train?": Morning 5:30 to 10, Day 10 to 16, Evening 16 to 21.
export const slotOf = (start: string): TimeSlot => {
  const m = toMinutes(start);
  if (m < 600) return 'morning';
  if (m < 960) return 'day';
  return 'evening';
};

export interface KtmNow {
  day: number;
  minutes: number;
}

const WEEKDAY: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export const ktmNow = (date: Date = new Date()): KtmNow => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIMEZONE,
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0';
  return { day: WEEKDAY[get('weekday')] ?? 0, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
};

export const sortSessions = (list: Session[]): Session[] =>
  [...list].sort((a, b) => a.day - b.day || toMinutes(a.start) - toMinutes(b.start));

export const sessionsOn = (day: number): Session[] => sortSessions(sessions.filter((s) => s.day === day));

export interface Upcoming {
  session: Session;
  offset: number; // 0 = today, 1 = tomorrow ...
}

// Next sessions after "now", looking up to 7 days ahead (the length of a trial week).
export const upcoming = (
  now: KtmNow,
  limit: number,
  match: (s: Session) => boolean = () => true,
): Upcoming[] => {
  const found: Upcoming[] = [];
  for (let offset = 0; offset < 7 && found.length < limit; offset++) {
    const day = (now.day + offset) % 7;
    for (const session of sessionsOn(day)) {
      if (offset === 0 && toMinutes(session.start) <= now.minutes) continue;
      if (!match(session)) continue;
      found.push({ session, offset });
      if (found.length >= limit) break;
    }
  }
  return found;
};

export const dayLabel = (now: KtmNow, offset: number): string => {
  if (offset === 0) return 'Today';
  if (offset === 1) return 'Tomorrow';
  return days[(now.day + offset) % 7].long;
};

// Recommendations for the thank-you page: the goal's class types in order,
// preferring the visitor's time slot, falling back to any time in the week.
export const recommend = (
  classOrder: ClassId[],
  slot: TimeSlot | null,
  now: KtmNow,
  count = 3,
): { picks: Upcoming[]; outsideSlot: boolean } => {
  const picks: Upcoming[] = [];
  const taken = new Set<ClassId>();
  const take = (u: Upcoming | undefined) => {
    if (!u || taken.has(u.session.classId) || picks.length >= count) return;
    picks.push(u);
    taken.add(u.session.classId);
  };

  if (slot) {
    for (const id of classOrder) take(upcoming(now, 1, (s) => s.classId === id && slotOf(s.start) === slot)[0]);
  }
  for (const id of classOrder) take(upcoming(now, 1, (s) => s.classId === id)[0]);

  const order = (u: Upcoming) => u.offset * 1440 + toMinutes(u.session.start);
  picks.sort((a, b) => order(a) - order(b));
  const outsideSlot = slot !== null && picks.some((u) => slotOf(u.session.start) !== slot);
  return { picks, outsideSlot };
};
