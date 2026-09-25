// Build-time checks. If the data disagrees with itself, the build fails
// instead of a visitor finding the mistake.

import { site } from '../data/site.ts';
import { classes, classById } from '../data/classes.ts';
import { coaches, coachById } from '../data/coaches.ts';
import { sessions } from '../data/timetable.ts';
import { goals } from '../data/goals.ts';
import { validatePlans } from './pricing.ts';
import { toMinutes, endTime, sortSessions } from './schedule.ts';

let done = false;

export const validateData = (): void => {
  if (done) return;

  const openFor = (day: number) => {
    const row = site.hours.find((h) => h.dayIndexes.includes(day));
    if (!row) throw new Error(`No opening hours for day ${day}`);
    return [toMinutes(row.open), toMinutes(row.close)] as const;
  };

  for (const s of sessions) {
    const type = classById(s.classId);
    coachById(s.coachId);
    const [open, close] = openFor(s.day);
    const start = toMinutes(s.start);
    const end = toMinutes(endTime(s.start, type.minutes));
    if (start < open || end > close) {
      throw new Error(`${type.name} on day ${s.day} at ${s.start} is outside opening hours`);
    }
  }

  // One studio: classes on the same day must not overlap.
  const sorted = sortSessions(sessions);
  for (let i = 1; i < sorted.length; i++) {
    const a = sorted[i - 1];
    const b = sorted[i];
    if (a.day !== b.day) continue;
    if (toMinutes(endTime(a.start, classById(a.classId).minutes)) > toMinutes(b.start)) {
      throw new Error(`Overlap on day ${a.day}: ${a.start} ${a.classId} runs into ${b.start} ${b.classId}`);
    }
  }

  for (const c of classes) {
    if (!sessions.some((s) => s.classId === c.id)) throw new Error(`${c.name} is never on the timetable`);
  }
  for (const c of coaches) {
    if (!sessions.some((s) => s.coachId === c.id)) throw new Error(`${c.name} runs no classes`);
  }
  for (const g of goals) {
    if (g.classes.length < 3) throw new Error(`Goal ${g.id} needs at least 3 class types to recommend`);
    g.classes.forEach(classById);
  }

  validatePlans();
  done = true;
};
