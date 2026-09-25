// Train Anywhere sessions. They live on this domain (not Drive, not YouTube)
// so the pixel can see who reads them and the trial ads can find those people again.

export interface Exercise {
  name: string;
  dose: string;
  how?: string;
  easier?: string;
  harder?: string;
}

export interface Block {
  title: string;
  format: string;
  items: Exercise[];
}

import type { PhotoSlotName } from './photos.ts';

export interface Workout {
  slug: 'park' | 'hotel-room' | 'home' | 'gym';
  place: string;
  title: string;
  minutes: number;
  when: string;
  kit: string[];
  kitShort: string;
  summary: string;
  blocks: Block[];
  photo?: PhotoSlotName;
}

export const PROGRESSION_RULE =
  'Finish every set with about two good reps still in the tank. When every round feels like that, add two reps or one more round next time. Small steps, every week.';

export const SAFETY_NOTE =
  'Effort is fine; sharp pain is not. If something hurts, skip that exercise. New to training, pregnant, or managing a health condition? Check with your doctor first, and tell your coach.';

const warmCool = {
  cool: {
    title: 'Cool down',
    format: '3 minutes',
    items: [
      { name: 'Calf stretch against a wall or bench', dose: '30 seconds each side' },
      { name: 'Kneeling hip flexor stretch', dose: '30 seconds each side' },
      { name: 'Slow breathing: in for 4, out for 6', dose: '1 minute' },
    ],
  } satisfies Block,
};

export const workouts: Workout[] = [
  {
    slug: 'park',
    place: 'Park',
    title: 'The Park Session',
    minutes: 35,
    when: 'For Saturday mornings, sunny evenings, and any park with a bench and a bar.',
    kit: ['A bench', 'A bar you can hang from', 'Water'],
    kitShort: 'A bench and a bar',
    photo: 'anywhere-park',
    summary: 'Push, step, hang and lunge, then a few short sprints up a slope or a flight of steps.',
    blocks: [
      {
        title: 'Warm up',
        format: '6 minutes',
        items: [
          { name: 'Brisk walk or easy jog', dose: '2 minutes' },
          { name: 'Arm circles', dose: '10 each way' },
          { name: 'Leg swings, holding the bench', dose: '10 each leg' },
          { name: 'Bodyweight squats', dose: '10' },
        ],
      },
      {
        title: 'Main circuit',
        format: '4 rounds, 90 seconds rest between rounds',
        items: [
          {
            name: 'Incline push-ups, hands on the bench',
            dose: '8 to 12',
            how: 'Body in one straight line, chest to the edge of the bench.',
            easier: 'Hands higher, on a railing or wall',
            harder: 'Feet on the bench, hands on the ground',
          },
          {
            name: 'Step-ups onto the bench',
            dose: '10 each leg',
            how: 'Drive through the whole foot on the bench. Step down slowly.',
            easier: 'Use a lower step',
            harder: 'Take three seconds to lower yourself',
          },
          {
            name: 'Bar hang',
            dose: '20 to 30 seconds',
            how: 'Shoulders pulled down away from your ears. Breathe.',
            easier: 'Keep your toes on the ground and take some weight',
            harder: '3 to 5 pull-ups instead',
          },
          {
            name: 'Walking lunges',
            dose: '10 each leg',
            how: 'Back knee close to the ground, front knee over the middle of the foot.',
            easier: 'Stationary lunges holding the bench',
            harder: 'Pause for one second at the bottom',
          },
        ],
      },
      {
        title: 'Finisher',
        format: '4 minutes',
        items: [
          {
            name: 'Slope or stair sprints',
            dose: '6 x 15 seconds',
            how: 'Hard but controlled going up. Walk back down slowly to recover.',
            easier: 'Fast walk instead of a sprint',
          },
        ],
      },
      warmCool.cool,
    ],
  },
  {
    slug: 'hotel-room',
    place: 'Hotel room',
    title: 'The Hotel Room Session',
    minutes: 25,
    when: 'For work trips to Pokhara, Biratnagar or Delhi. Quiet enough for the room below.',
    kit: ['Floor space the size of a yoga mat', 'The bed or a sturdy chair', 'Your backpack'],
    kitShort: 'No equipment',
    summary: 'No jumping, no equipment, no excuses. Legs, push, pull and core in 25 minutes.',
    blocks: [
      {
        title: 'Warm up',
        format: '4 minutes',
        items: [
          { name: 'March on the spot', dose: '1 minute' },
          { name: 'Cat and cow on hands and knees', dose: '8 slow reps' },
          { name: 'Bodyweight squats', dose: '10' },
          { name: 'Glute bridges', dose: '10' },
        ],
      },
      {
        title: 'Main circuit',
        format: '4 rounds, 60 seconds rest between rounds',
        items: [
          {
            name: 'Split squats, back foot on the bed',
            dose: '8 each leg',
            how: 'Most of your weight on the front leg. Lower straight down.',
            easier: 'Both feet on the floor (a static lunge)',
            harder: 'Hold your backpack',
          },
          {
            name: 'Push-ups',
            dose: '6 to 15',
            how: 'Hands just wider than shoulders, elbows at about 45 degrees.',
            easier: 'Hands on the edge of the bed',
            harder: 'Feet on the bed',
          },
          {
            name: 'Backpack rows',
            dose: '12',
            how: 'Fill the bag with water bottles or clothes. Hinge forward, pull it to your ribs.',
            harder: 'One arm at a time, 10 each side',
          },
          {
            name: 'Side plank',
            dose: '20 seconds each side',
            easier: 'Bottom knee on the floor',
            harder: 'Lift the top leg',
          },
        ],
      },
      {
        title: 'Finisher',
        format: '3 minutes',
        items: [
          {
            name: 'Quiet burpees: step back, step in, stand up, no jump',
            dose: '20 seconds on, 10 seconds off, 6 times',
            easier: 'Hands on the bed instead of the floor',
          },
        ],
      },
      {
        title: 'Cool down',
        format: '3 minutes',
        items: [
          { name: "Child's pose", dose: '1 minute' },
          { name: 'Figure-four stretch, lying on your back', dose: '30 seconds each side' },
          { name: 'Slow breathing: in for 4, out for 6', dose: '1 minute' },
        ],
      },
    ],
  },
  {
    slug: 'home',
    place: 'Home',
    title: 'The Monsoon Evening Session',
    minutes: 30,
    when: "For monsoon evenings when you won't ride through the rain, and every other night you can't get here.",
    kit: ['A backpack with a 5 kg bag of rice (or books) inside', 'A staircase or a sturdy step'],
    kitShort: 'A backpack and stairs',
    photo: 'anywhere-home',
    summary: 'A loaded backpack becomes your kettlebell. Ends with our version of the gas cylinder test.',
    blocks: [
      {
        title: 'Warm up',
        format: '5 minutes',
        items: [
          { name: 'Easy walk up and down the stairs', dose: '2 minutes' },
          { name: 'Lunge and rotate: step forward, reach one arm to the ceiling', dose: '3 each side' },
          { name: 'Inchworms: walk your hands out to a plank and back', dose: '5' },
        ],
      },
      {
        title: 'Main circuit',
        format: '5 rounds, 60 seconds rest between rounds',
        items: [
          {
            name: 'Backpack squats, bag hugged to your chest',
            dose: '10',
            how: 'Sit between your heels, chest tall.',
            harder: 'Pause for two seconds at the bottom',
          },
          {
            name: 'Backpack bent-over rows',
            dose: '10',
            how: 'Flat back, pull the bag towards your belly button.',
          },
          {
            name: 'Push-ups',
            dose: '8',
            easier: 'Hands on a table edge or a step',
            harder: 'Three seconds down, then push up',
          },
          {
            name: 'Backpack Romanian deadlift',
            dose: '10',
            how: 'Soft knees, push your hips back, bag slides down your thighs.',
          },
        ],
      },
      {
        title: 'Finisher: the stair carry',
        format: 'About 4 minutes',
        items: [
          {
            name: 'Carry the backpack in one hand up one flight and back down. Switch hands.',
            dose: '4 flights in total',
            how: 'Stand tall, do not lean away from the bag. This is the gas cylinder test, in training form.',
            easier: 'Hold the bag at your chest with both hands',
            harder: 'Add a second bag of rice',
          },
        ],
      },
      {
        title: 'Cool down',
        format: '3 minutes',
        items: [
          { name: 'Hamstring stretch, heel on a step', dose: '30 seconds each side' },
          { name: 'Chest stretch in a doorway', dose: '30 seconds each side' },
          { name: 'Slow breathing: in for 4, out for 6', dose: '1 minute' },
        ],
      },
    ],
  },
  {
    slug: 'gym',
    place: 'Any gym',
    title: 'The Any-Gym Session',
    minutes: 45,
    when: "For when you're visiting another gym, or ours is busy and all you've got is a corner and a pair of dumbbells.",
    kit: ['A pair of dumbbells or kettlebells', 'A bench'],
    kitShort: 'Dumbbells and a bench',
    summary: 'Squat, hinge, push, pull and carry. The whole body in five movements.',
    blocks: [
      {
        title: 'Warm up',
        format: '7 minutes',
        items: [
          { name: 'Easy bike, rower or brisk walk', dose: '3 minutes' },
          { name: 'Light goblet squats', dose: '10' },
          { name: 'Push-ups', dose: '10' },
          { name: 'Light reverse flys', dose: '10' },
        ],
      },
      {
        title: 'Strength',
        format: 'Rest 90 seconds between sets',
        items: [
          {
            name: 'A. Goblet squat',
            dose: '4 sets of 6 to 8',
            how: 'Heaviest dumbbell you can hold at your chest with good form.',
          },
          {
            name: 'B. Dumbbell Romanian deadlift',
            dose: '3 sets of 8 to 10',
            how: 'Hips back, weights close to your legs, flat back.',
          },
        ],
      },
      {
        title: 'Push and pull',
        format: 'Alternate the pair, 60 seconds rest after each round',
        items: [
          {
            name: 'C1. Dumbbell bench press',
            dose: '3 sets of 8 to 10',
            easier: 'Push-ups',
          },
          {
            name: 'C2. One-arm dumbbell row',
            dose: '3 sets of 10 each side',
            how: 'One hand and knee on the bench, pull the elbow to your hip.',
          },
        ],
      },
      {
        title: 'Carry',
        format: '4 rounds, 60 seconds rest',
        items: [
          {
            name: "D. Farmer's carry",
            dose: '30 metres',
            how: 'Heavy weights at your sides, tall posture, short quick steps.',
          },
        ],
      },
      {
        title: 'Optional finisher',
        format: '5 minutes',
        items: [{ name: 'Bike or rower', dose: '30 seconds hard, 30 seconds easy, 5 times' }],
      },
      warmCool.cool,
    ],
  },
];

export const workoutBySlug = (slug: string): Workout | undefined => workouts.find((w) => w.slug === slug);
