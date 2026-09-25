// Class types. The timetable, "Classes today", coach cards and the thank-you
// recommendations all read from this list.

export type ClassId =
  | 'foundations'
  | 'strength'
  | 'kettlebell'
  | 'calisthenics'
  | 'mobility'
  | 'engine'
  | 'anywhere';

export type Pillar = 'move' | 'perform' | 'adapt';
export type Level = 'beginner' | 'all';

export interface ClassType {
  id: ClassId;
  name: string;
  minutes: number;
  level: Level;
  pillar: Pillar;
  summary: string;
  // Where "what is this class?" is answered in more depth.
  href: string;
}

export const classes: ClassType[] = [
  {
    id: 'foundations',
    name: 'Foundations',
    minutes: 50,
    level: 'beginner',
    pillar: 'move',
    summary: 'Every basic movement, taught from zero. Start here if you are new or coming back after a long break.',
    href: '/how-we-train#first-month',
  },
  {
    id: 'strength',
    name: 'Strength',
    minutes: 60,
    level: 'all',
    pillar: 'perform',
    summary: 'Squat, press and deadlift in small coached groups. Powerlifting fundamentals, without the ego.',
    href: '/how-we-train#barbell',
  },
  {
    id: 'kettlebell',
    name: 'Kettlebell Conditioning',
    minutes: 45,
    level: 'all',
    pillar: 'perform',
    summary: 'Swings, carries and simple combinations. Strength and fitness in the same 45 minutes.',
    href: '/how-we-train#kettlebells',
  },
  {
    id: 'calisthenics',
    name: 'Calisthenics Skills',
    minutes: 50,
    level: 'all',
    pillar: 'move',
    summary: 'Pull-ups, push-ups, dips and the steps that get you to them. Your body is the weight.',
    href: '/how-we-train#calisthenics',
  },
  {
    id: 'mobility',
    name: 'Mobility and Recovery',
    minutes: 40,
    level: 'beginner',
    pillar: 'move',
    summary: 'Joint control, balance and breathing. The session that keeps the other ones working.',
    href: '/how-we-train#mobility',
  },
  {
    id: 'engine',
    name: 'Engine',
    minutes: 45,
    level: 'all',
    pillar: 'perform',
    summary: 'Intervals on the bike, the rower and your own feet. Stamina for treks, futsal and stairs.',
    href: '/how-we-train#pillars',
  },
  {
    id: 'anywhere',
    name: 'Anywhere Circuit',
    minutes: 45,
    level: 'beginner',
    pillar: 'adapt',
    summary: 'Bodyweight and backpack training you can repeat at home, in a park or in a hotel room.',
    href: '/train-anywhere',
  },
];

export const classById = (id: ClassId): ClassType => {
  const found = classes.find((c) => c.id === id);
  if (!found) throw new Error(`Unknown class: ${id}`);
  return found;
};

export const levelLabel: Record<Level, string> = {
  beginner: 'Beginner friendly',
  all: 'All levels',
};

export const pillars: Record<Pillar, { name: string; line: string; detail: string; life: string }> = {
  move: {
    name: 'Move',
    line: 'Mobility, coordination, balance, joint control and bodyweight skill.',
    detail: 'The base everything else stands on. You learn to control your own body before you load it.',
    life: 'Getting up off the floor without a hand. Not rolling an ankle on a broken footpath.',
  },
  perform: {
    name: 'Perform',
    line: 'Strength, power, endurance and sports-focused conditioning.',
    detail: 'The capacity to do hard things: lift, carry, climb, sprint, and still have something left.',
    life: 'Carrying the gas cylinder up four floors. The Saturday futsal match. The climb to Poon Hill.',
  },
  adapt: {
    name: 'Adapt',
    line: 'Simple training options for the gym, home, park and travel.',
    detail: 'A plan that survives real life. When you cannot get here, you still know exactly what to do.',
    life: 'The work trip to Biratnagar. The monsoon week. The Dashain visit home.',
  },
};
