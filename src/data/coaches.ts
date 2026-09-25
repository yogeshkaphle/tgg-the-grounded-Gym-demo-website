import type { ClassId } from './classes.ts';
import type { PhotoSlotName } from './photos.ts';

// Fictional coaches for the demo ("Sample coach" on the page). For a real client,
// swap in the real team. Photos: src/assets/photos/coach-1.jpg and so on,
// cropped or from behind, never a face presented as a named coach.

export interface Coach {
  id: string;
  name: string;
  firstName: string;
  role: string;
  coaches: string;
  bio: string;
  specialities: string[];
  initials: string;
  photo: PhotoSlotName;
}

export const coaches: Coach[] = [
  {
    id: 'anish-shrestha',
    name: 'Anish Shrestha',
    firstName: 'Anish',
    role: 'Strength coach',
    coaches: 'Barbell strength, powerlifting fundamentals, Foundations',
    bio: 'Anish competed in powerlifting for six years before he started coaching. He cares more about how you move than how much you lift, and he will tell you when to stop adding weight.',
    specialities: ['Squat, bench, deadlift', 'First-timers', 'Back-friendly lifting'],
    initials: 'AS',
    photo: 'coach-1',
  },
  {
    id: 'pema-tamang',
    name: 'Pema Tamang',
    firstName: 'Pema',
    role: 'Conditioning coach',
    coaches: 'Kettlebells, conditioning, trek preparation',
    bio: 'Pema grew up walking the trails of Rasuwa and guided treks for three seasons. Now she builds stamina for people with desk jobs. Her classes are hard, and she will make you laugh through them.',
    specialities: ['Kettlebells', 'Trek and hike prep', 'Stamina'],
    initials: 'PT',
    photo: 'coach-2',
  },
  {
    id: 'rohan-maharjan',
    name: 'Rohan Maharjan',
    firstName: 'Rohan',
    role: 'Movement coach',
    coaches: 'Calisthenics, mobility, Anywhere Circuit',
    bio: 'Rohan learned his first muscle-up on a bar in a Patan park. He teaches calisthenics and mobility in small steps, and wrote most of our Train Anywhere sessions.',
    specialities: ['Pull-ups and handstands', 'Mobility', 'Training without equipment'],
    initials: 'RM',
    photo: 'coach-3',
  },
];

export const coachById = (id: string): Coach => {
  const found = coaches.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown coach: ${id}`);
  return found;
};

// Filled in from the timetable so a coach card can never list a class they don't run.
export type CoachClasses = Record<string, ClassId[]>;
