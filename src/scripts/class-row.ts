// Builds one class row in the browser, matching the server-rendered rows on /timetable.
import { classById, levelLabel } from '../data/classes.ts';
import { coachById } from '../data/coaches.ts';
import { endTime } from '../lib/schedule.ts';
import type { Session } from '../data/timetable.ts';

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text) node.textContent = text;
  return node;
};

export const classRow = (session: Session, when: string, opts: { summary?: boolean } = {}): HTMLLIElement => {
  const type = classById(session.classId);
  const coach = coachById(session.coachId);

  const li = el('li', 'class-row');
  const time = el('div');
  time.append(el('span', 'class-row__time', session.start), el('span', 'class-row__when', when));

  const body = el('div', 'class-row__body');
  const name = el('p', 'class-row__name');
  const link = el('a', undefined, type.name);
  link.href = type.href;
  name.append(link);

  const meta = el('p', 'class-row__meta');
  const withCoach = el('span', undefined, 'with ');
  const coachLink = el('a', undefined, coach.name);
  coachLink.href = `/coaches#${coach.id}`;
  withCoach.append(coachLink);
  meta.append(
    withCoach,
    el('span', undefined, `${session.start} to ${endTime(session.start, type.minutes)}`),
    el('span', `chip${type.level === 'beginner' ? ' chip--beginner' : ''}`, levelLabel[type.level]),
  );

  body.append(name, meta);
  if (opts.summary) body.append(el('p', 'class-row__summary', type.summary));
  li.append(time, body);
  return li;
};
