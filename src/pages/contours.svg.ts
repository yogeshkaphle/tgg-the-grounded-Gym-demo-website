import type { APIRoute } from 'astro';
import { contourSvg } from '../lib/contours.ts';

// Built once into /contours.svg and used as a CSS mask, so any colour can draw it.
export const GET: APIRoute = () =>
  new Response(contourSvg({ width: 1600, height: 1000, seed: 20261008 }), {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
