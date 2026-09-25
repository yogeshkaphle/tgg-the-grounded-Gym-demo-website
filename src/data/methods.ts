import type { ClassId, Pillar } from './classes.ts';

// The four special trainings, explained as tools rather than tribes.
// Outcome first (readiness), then the method as one route towards it.

export interface Method {
  id: 'calisthenics' | 'kettlebells' | 'barbell' | 'mobility';
  name: string;
  tagline: string;
  builds: string;
  why: string;
  classes: ClassId[];
  firstStep: string;
  pillar: Pillar;
}

export const methods: Method[] = [
  {
    id: 'calisthenics',
    name: 'Calisthenics',
    tagline: 'Your body is the weight.',
    builds: 'Strength for your size, body control, healthy shoulders, and skills like the pull-up.',
    why: 'The most portable training there is. A bar and a floor go almost anywhere, which is why it sits at the heart of Train Anywhere.',
    classes: ['calisthenics', 'anywhere'],
    firstStep: 'A 20-second hang and five good push-ups, on a bench if you need to.',
    pillar: 'move',
  },
  {
    id: 'kettlebells',
    name: 'Kettlebells',
    tagline: 'Strength that moves.',
    builds: 'Hip power, grip, stamina, and the knack of carrying awkward things.',
    why: 'Real life rarely hands you a load that sits still. Swings and carries build strength and fitness in the same session.',
    classes: ['kettlebell'],
    firstStep: 'The deadlift and the swing, both taught in your first week.',
    pillar: 'perform',
  },
  {
    id: 'barbell',
    name: 'Barbell strength',
    tagline: 'Powerlifting fundamentals, without the ego.',
    builds: 'Whole-body strength you can measure: the squat, the bench press and the deadlift.',
    why: 'The clearest lesson in progression there is. Add a little, recover, repeat, and watch the numbers climb honestly.',
    classes: ['strength'],
    firstStep: 'Learning the lifts with an empty bar or a light kettlebell.',
    pillar: 'perform',
  },
  {
    id: 'mobility',
    name: 'Mobility',
    tagline: 'The range to use your strength.',
    builds: 'Joint control, balance, breathing, and positions you can load safely.',
    why: 'The reason your squat gets deeper and your back stops complaining. Every class starts with it, and one class is all about it.',
    classes: ['mobility', 'foundations'],
    firstStep: 'The floor test: sit down and stand back up with as little help as you can.',
    pillar: 'move',
  },
];
