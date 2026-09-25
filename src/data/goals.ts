import type { ClassId } from './classes.ts';
import type { TimeSlot } from '../lib/schedule.ts';

// Step 1 of the trial form. The goal someone picks changes the classes the
// thank-you page recommends, so the question is never asked and then ignored.

export type GoalId = 'lose-weight' | 'build-muscle' | 'get-fitter' | 'not-sure';

export interface Goal {
  id: GoalId;
  label: string;
  classes: ClassId[]; // in order of priority
  plan: string; // one line shown above the recommendations
}

export const goals: Goal[] = [
  {
    id: 'lose-weight',
    label: 'Lose weight',
    classes: ['kettlebell', 'engine', 'foundations', 'anywhere'],
    plan: 'For weight loss we pair conditioning with strength, so you lose fat and keep your muscle. Your coach covers the eating basics in your first session.',
  },
  {
    id: 'build-muscle',
    label: 'Build muscle',
    classes: ['strength', 'kettlebell', 'calisthenics'],
    plan: 'Muscle comes from lifting a little more over time. These three classes load your whole body from different angles.',
  },
  {
    id: 'get-fitter',
    label: 'Get fitter',
    classes: ['engine', 'anywhere', 'calisthenics', 'mobility'],
    plan: 'Fitter means more stamina and a body that moves well. This mix builds both, and one of them you can repeat at home.',
  },
  {
    id: 'not-sure',
    label: 'Not sure yet',
    classes: ['foundations', 'mobility', 'anywhere'],
    plan: 'Good. Start with the basics, try a bit of everything, and decide with your coach at the end of the week.',
  },
];

export const timeSlots: { id: TimeSlot; label: string; hint: string }[] = [
  { id: 'morning', label: 'Morning', hint: '5:30 to 10' },
  { id: 'day', label: 'Day', hint: '10 to 4' },
  { id: 'evening', label: 'Evening', hint: '4 to 9' },
];

export const areas = [
  'Baneshwor',
  'Koteshwor',
  'Tinkune',
  'Shantinagar',
  'Other in Kathmandu',
  'Outside the valley',
] as const;

export const OUTSIDE_AREA = 'Outside the valley';
