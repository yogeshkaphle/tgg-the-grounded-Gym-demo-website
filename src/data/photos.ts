// Every photo slot on the site. Drop a file named after the slot into
// src/assets/photos/ (for example hero.jpg) and it replaces the placeholder.
// Credit the source in site.photoCredit.

export const photoSlots = {
  hero: {
    ratio: '4 / 5',
    widths: [480, 800, 1200],
    alt: 'Members training at Grounded Gym, seen from behind',
    placeholder: 'Hero photo: members mid-session, shot from behind or cropped, no faces',
  },
  'class-from-behind': {
    ratio: '4 / 3',
    widths: [480, 900],
    alt: 'A class at Grounded Gym, seen from the back of the room',
    placeholder: 'A class in progress, shot from the back of the room',
  },
  'space-kettlebells': {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'A row of kettlebells on the gym floor',
    placeholder: 'Kettlebells lined up on the floor',
  },
  'space-barbell': {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'A loaded barbell on a lifting platform',
    placeholder: 'A barbell on the platform, plates loaded',
  },
  'space-bars': {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'Pull-up bars and rings',
    placeholder: 'Pull-up bars or rings',
  },
  'space-mobility': {
    ratio: '4 / 3',
    widths: [400, 800],
    alt: 'Mats and foam rollers in the mobility corner',
    placeholder: 'The mobility corner: mats, rollers, bands',
  },
  // Coaches: cropped or back shots only, never a face presented as a named coach.
  'anish-shrestha': {
    ratio: '4 / 5',
    widths: [360, 720],
    alt: 'Sample coach Anish, strength coach, photographed from behind',
    placeholder: 'Coach photo to come: cropped or from behind',
  },
  'pema-tamang': {
    ratio: '4 / 5',
    widths: [360, 720],
    alt: 'Sample coach Pema, conditioning coach, photographed from behind',
    placeholder: 'Coach photo to come: cropped or from behind',
  },
  'rohan-maharjan': {
    ratio: '4 / 5',
    widths: [360, 720],
    alt: 'Sample coach Rohan, movement coach, photographed from behind',
    placeholder: 'Coach photo to come: cropped or from behind',
  },
} as const;

export type PhotoSlotName = keyof typeof photoSlots;
