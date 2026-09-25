import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const journal = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.enum(['anish-shrestha', 'pema-tamang', 'rohan-maharjan']),
    // Every post ends somewhere useful: a workout and a class.
    workout: z.enum(['park', 'hotel-room', 'home', 'gym']),
    theme: z.enum(['readiness', 'training', 'anywhere', 'mindset']),
  }),
});

export const collections = { journal };
