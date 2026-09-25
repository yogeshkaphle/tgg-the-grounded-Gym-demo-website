import type { ClassId } from './classes.ts';

// The one timetable. /timetable, "Classes today" on the home page, coach cards,
// and the thank-you recommendations are all built from this array.
//
// Days: 0 = Sunday ... 6 = Saturday. Sunday to Friday is the working week in Nepal;
// Saturday is the weekly holiday, so it runs short (7:00 to 11:00).

export interface Session {
  day: number;
  start: string; // 24h "H:MM" in Kathmandu time
  classId: ClassId;
  coachId: string;
}

const A = 'anish-shrestha';
const P = 'pema-tamang';
const R = 'rohan-maharjan';

export const sessions: Session[] = [
  // Sunday
  { day: 0, start: '5:30', classId: 'strength', coachId: A },
  { day: 0, start: '6:30', classId: 'kettlebell', coachId: P },
  { day: 0, start: '7:30', classId: 'foundations', coachId: R },
  { day: 0, start: '12:15', classId: 'anywhere', coachId: R },
  { day: 0, start: '17:30', classId: 'engine', coachId: P },
  { day: 0, start: '18:30', classId: 'strength', coachId: A },
  { day: 0, start: '19:30', classId: 'mobility', coachId: R },

  // Monday
  { day: 1, start: '5:30', classId: 'engine', coachId: P },
  { day: 1, start: '6:30', classId: 'calisthenics', coachId: R },
  { day: 1, start: '7:30', classId: 'strength', coachId: A },
  { day: 1, start: '12:15', classId: 'kettlebell', coachId: P },
  { day: 1, start: '17:30', classId: 'foundations', coachId: A },
  { day: 1, start: '18:30', classId: 'kettlebell', coachId: P },
  { day: 1, start: '19:30', classId: 'calisthenics', coachId: R },

  // Tuesday
  { day: 2, start: '5:30', classId: 'strength', coachId: A },
  { day: 2, start: '6:30', classId: 'anywhere', coachId: R },
  { day: 2, start: '7:30', classId: 'kettlebell', coachId: P },
  { day: 2, start: '12:15', classId: 'mobility', coachId: R },
  { day: 2, start: '17:30', classId: 'engine', coachId: P },
  { day: 2, start: '18:30', classId: 'strength', coachId: A },
  { day: 2, start: '19:30', classId: 'foundations', coachId: R },

  // Wednesday
  { day: 3, start: '5:30', classId: 'kettlebell', coachId: P },
  { day: 3, start: '6:30', classId: 'strength', coachId: A },
  { day: 3, start: '7:30', classId: 'mobility', coachId: R },
  { day: 3, start: '12:15', classId: 'engine', coachId: P },
  { day: 3, start: '17:30', classId: 'calisthenics', coachId: R },
  { day: 3, start: '18:30', classId: 'foundations', coachId: A },
  { day: 3, start: '19:30', classId: 'kettlebell', coachId: P },

  // Thursday
  { day: 4, start: '5:30', classId: 'strength', coachId: A },
  { day: 4, start: '6:30', classId: 'engine', coachId: P },
  { day: 4, start: '7:30', classId: 'foundations', coachId: R },
  { day: 4, start: '12:15', classId: 'anywhere', coachId: R },
  { day: 4, start: '17:30', classId: 'kettlebell', coachId: P },
  { day: 4, start: '18:30', classId: 'strength', coachId: A },
  { day: 4, start: '19:30', classId: 'mobility', coachId: R },

  // Friday
  { day: 5, start: '5:30', classId: 'engine', coachId: P },
  { day: 5, start: '6:30', classId: 'calisthenics', coachId: R },
  { day: 5, start: '7:30', classId: 'strength', coachId: A },
  { day: 5, start: '12:15', classId: 'kettlebell', coachId: P },
  { day: 5, start: '17:30', classId: 'anywhere', coachId: R },
  { day: 5, start: '18:30', classId: 'foundations', coachId: A },

  // Saturday (short day)
  { day: 6, start: '7:00', classId: 'foundations', coachId: A },
  { day: 6, start: '8:00', classId: 'kettlebell', coachId: P },
  { day: 6, start: '9:30', classId: 'mobility', coachId: R },
];

export const days = [
  { index: 0, short: 'Sun', long: 'Sunday' },
  { index: 1, short: 'Mon', long: 'Monday' },
  { index: 2, short: 'Tue', long: 'Tuesday' },
  { index: 3, short: 'Wed', long: 'Wednesday' },
  { index: 4, short: 'Thu', long: 'Thursday' },
  { index: 5, short: 'Fri', long: 'Friday' },
  { index: 6, short: 'Sat', long: 'Saturday' },
];
