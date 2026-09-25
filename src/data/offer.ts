import { sessions } from './timetable.ts';

// What the Free Trial Week includes. Shown on the home page and /trial,
// so both pages always describe the same offer.
export const trialIncludes = [
  {
    icon: 'calendar',
    title: 'Any class, for 7 days',
    text: `Strength, kettlebells, calisthenics, mobility and more. ${sessions.length} classes a week to choose from.`,
  },
  {
    icon: 'spark',
    title: 'A 20-minute first session with a coach',
    text: 'Your goals, a quick movement check and a plan for the week. Never trained before? Good, that is what it is for.',
  },
  {
    icon: 'map',
    title: 'Your Train Anywhere starter plan',
    text: "Short sessions for home, the park and travel, so the week keeps going on days you can't get here.",
  },
  {
    icon: 'check',
    title: 'No fee, no deposit, no contract',
    text: 'On day 6 we ask how it went and show you the plans. You decide. Walking away is fine.',
  },
] as const;
