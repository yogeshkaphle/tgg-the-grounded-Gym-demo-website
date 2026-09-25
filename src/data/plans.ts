// Membership prices. [DEMO PRICE] until real Kathmandu numbers are set.
// Only prices and lengths are typed here. Every per-month figure and every
// saving on /membership is calculated from these numbers in src/lib/pricing.ts.

export type PlanId = 'trial' | 'starter' | 'three-months' | 'twelve-months';

export interface Plan {
  id: PlanId;
  name: string;
  role: string;
  price: number; // NPR, total for the plan
  months: number; // 0 for the trial week
  pauseWeeks: number;
  guestPasses: number;
  badge?: string;
  includes: string[];
  demoPrice: boolean;
}

export const plans: Plan[] = [
  {
    id: 'trial',
    name: 'Free Trial Week',
    role: 'The door. Everyone starts here.',
    price: 0,
    months: 0,
    pauseWeeks: 0,
    guestPasses: 0,
    includes: ['Any class for 7 days', 'A 20-minute first session with a coach', 'Your Train Anywhere starter plan'],
    demoPrice: false,
  },
  {
    id: 'starter',
    name: 'Starter Month',
    role: 'One month, no long commitment.',
    price: 4500,
    months: 1,
    pauseWeeks: 0,
    guestPasses: 0,
    includes: ['All classes and open gym', 'A coach check-in at the end of the month'],
    demoPrice: true,
  },
  {
    id: 'three-months',
    name: '3 Months',
    role: 'Long enough to see real change.',
    price: 12000,
    months: 3,
    pauseWeeks: 1,
    guestPasses: 1,
    badge: "Most people's pick",
    includes: ['All classes and open gym', 'A coach check-in every month', 'A progress retest at week 12'],
    demoPrice: true,
  },
  {
    id: 'twelve-months',
    name: '12 Months',
    role: 'For people who are staying.',
    price: 42000,
    months: 12,
    pauseWeeks: 4,
    guestPasses: 4,
    badge: 'Best value',
    includes: ['All classes and open gym', 'A coach check-in every month', 'A progress retest every quarter'],
    demoPrice: true,
  },
];

export const BASE_PLAN: PlanId = 'starter';

export const planById = (id: string): Plan | undefined => plans.find((p) => p.id === id);
