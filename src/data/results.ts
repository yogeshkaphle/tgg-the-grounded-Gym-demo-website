// Sample results for the demo. Every card is labelled "Sample result, demo site"
// wherever it appears. No photos: never present a generated or borrowed face as a member.

export interface Result {
  id: string;
  stat: string;
  statLabel: string;
  quote: string;
  who: string;
  weeks: number;
}

export const results: Result[] = [
  {
    id: 'push-ups',
    stat: '0 to 12',
    statLabel: 'push-ups in a row',
    quote: 'In March I could not do one push-up. By June I did twelve, and I carry my daughter up to the roof without stopping.',
    who: 'Sabina, 34, accountant',
    weeks: 14,
  },
  {
    id: 'poon-hill',
    stat: '10 weeks',
    statLabel: 'from desk to Poon Hill',
    quote: 'Three mornings a week before work. I walked up to Poon Hill with my son and, for once, I kept up with him.',
    who: 'Bikash, 41, bank officer',
    weeks: 10,
  },
  {
    id: 'shop',
    stat: '7 kg',
    statLabel: 'lighter in five months',
    quote: 'The weight was the goal. The bigger win is lifting boxes of stock all day without my back complaining.',
    who: 'Ramesh, 47, shop owner',
    weeks: 21,
  },
];

export const SAMPLE_LABEL = 'Sample result, demo site';
