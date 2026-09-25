import { site } from './site.ts';
import { plans } from './plans.ts';

// Objection handling. Answers that depend on prices, plans or hours are built
// from the data files so they can't drift out of date.

export type FaqId = 'never-been' | 'long-signup' | 'parking' | 'bring' | 'pause' | 'really-free';

const pauseLine = plans
  .filter((p) => p.pauseWeeks > 0)
  .map((p) => `${p.name} plans can pause for up to ${p.pauseWeeks} ${p.pauseWeeks === 1 ? 'week' : 'weeks'}`)
  .join(', and ');

export const faq: Record<FaqId, { q: string; a: string }> = {
  'never-been': {
    q: "I've never been to a gym. Is that a problem?",
    a: 'No. Plenty of people who start with us have never trained, or stopped years ago. Your first session is one-to-one with a coach, and Foundations classes teach every movement from zero, six days a week.',
  },
  'long-signup': {
    q: 'Do I have to sign up for a long time?',
    a: 'No. After your Free Trial Week you can pay month to month with the Starter Month. Longer plans cost less per month, and you can move to one whenever you are ready.',
  },
  parking: {
    q: 'Is there parking?',
    a: site.parking,
  },
  bring: {
    q: 'What do I bring on the first day?',
    a: 'Clean indoor shoes (not the ones you walked here in, the dust is real), a towel and a water bottle. There is drinking water to refill and free lockers.',
  },
  pause: {
    q: 'Can I pause my membership?',
    a: `Yes. ${pauseLine}. Use it for travel, exams, illness or festival season. Just tell the front desk before you go.`,
  },
  'really-free': {
    q: 'Is the Free Trial Week really free?',
    a: 'Yes. No fee, no deposit, nothing to sign. At the end of the week your coach asks how it went and shows you the plans. If it is not for you, that is the end of it.',
  },
};

export const homeFaq: FaqId[] = ['never-been', 'long-signup', 'parking', 'bring', 'pause'];
export const trialFaq: FaqId[] = ['really-free', 'never-been', 'bring'];
