// Every photo slot on the site. Drop a file named after the slot into
// src/assets/photos/ (for example hero.jpg) and it replaces the placeholder,
// graded, resized and served as AVIF/WebP. Credit sources in site.photoCredit.

export const photoSlots = {
  hero: {
    ratio: '4 / 5',
    widths: [480, 800, 1200],
    alt: 'A group class training together at Grounded Gym',
    placeholder: 'Hero photo: a group class in session',
  },
  hall: {
    ratio: '4 / 3',
    widths: [480, 900],
    alt: 'The main training hall at Grounded Gym',
    placeholder: 'The training hall',
  },
  rig: {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'The pull-up rig with bars and rings',
    placeholder: 'The rig: pull-up bars and rings',
  },
  floor: {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'The open training floor',
    placeholder: 'The training floor',
  },
  rowers: {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'A row of rowing machines',
    placeholder: 'The rowers',
  },
  'find-us': {
    ratio: '3 / 2',
    widths: [400, 800],
    alt: 'A street in Kathmandu near New Baneshwor',
    placeholder: 'Street view: the walk from the Chowk',
  },
  'anywhere-park': {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'A park bench and bar, ready for the Park Session',
    placeholder: 'A park with a bench and a bar',
  },
  'anywhere-home': {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'A backpack and a staircase at home, ready for the Monsoon Evening Session',
    placeholder: 'Home: a backpack and a staircase',
  },
  // Coaches: cropped or back shots only, never a face presented as a named coach.
  'coach-1': {
    ratio: '4 / 5',
    widths: [360, 720],
    alt: 'Sample coach, photographed from behind',
    placeholder: 'Coach photo: cropped or from behind',
  },
  'coach-2': {
    ratio: '4 / 5',
    widths: [360, 720],
    alt: 'Sample coach, photographed from behind',
    placeholder: 'Coach photo: cropped or from behind',
  },
  'coach-3': {
    ratio: '4 / 5',
    widths: [360, 720],
    alt: 'Sample coach, photographed from behind',
    placeholder: 'Coach photo: cropped or from behind',
  },
} as const;

export type PhotoSlotName = keyof typeof photoSlots;
