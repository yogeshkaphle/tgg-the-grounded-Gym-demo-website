// All membership maths lives here. Nothing on /membership is typed by hand.

import { plans, BASE_PLAN, type Plan } from '../data/plans.ts';

const nf = new Intl.NumberFormat('en-IN'); // lakh grouping, as used in Nepal

export const npr = (amount: number): string => `NPR ${nf.format(Math.round(amount))}`;

const base = (): Plan => {
  const found = plans.find((p) => p.id === BASE_PLAN);
  if (!found || found.months !== 1) throw new Error('BASE_PLAN must be a one-month plan');
  return found;
};

export interface PlanMaths {
  perMonth: number | null;
  savingPerMonth: number; // vs paying the base monthly price
  savingTotal: number;
  savingPercent: number;
}

export const maths = (plan: Plan): PlanMaths => {
  if (plan.months === 0) return { perMonth: null, savingPerMonth: 0, savingTotal: 0, savingPercent: 0 };
  const monthly = base().price;
  const perMonth = plan.price / plan.months;
  const savingPerMonth = monthly - perMonth;
  const savingTotal = monthly * plan.months - plan.price;
  return {
    perMonth,
    savingPerMonth,
    savingTotal,
    savingPercent: Math.round((savingPerMonth / monthly) * 100),
  };
};

// Throws at build time if a longer plan would cost more per month than the
// base plan, or if a price doesn't divide into whole rupees per month.
export const validatePlans = (): void => {
  const monthly = base().price;
  let previous = monthly;
  for (const plan of plans.filter((p) => p.months > 1).sort((a, b) => a.months - b.months)) {
    const m = maths(plan);
    if (m.perMonth === null || m.perMonth >= previous) {
      throw new Error(`${plan.name} must cost less per month than shorter plans (${m.perMonth} vs ${previous})`);
    }
    if (!Number.isInteger(m.perMonth)) {
      throw new Error(`${plan.name}: ${plan.price} does not divide evenly into ${plan.months} months`);
    }
    previous = m.perMonth;
  }
  if (monthly <= 0) throw new Error('Base plan price must be above zero');
};
