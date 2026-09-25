// Generates the topographic contour lines used as the brand texture.
// Runs at build time only; the browser receives a static SVG file.

import { contours } from 'd3-contour';

type Point = [number, number];

const mulberry32 = (seed: number) => () => {
  let t = (seed += 0x6d2b79f5);
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Ramer-Douglas-Peucker simplification.
const simplify = (pts: Point[], eps: number): Point[] => {
  if (pts.length < 3) return pts;
  const [ax, ay] = pts[0];
  const [bx, by] = pts[pts.length - 1];
  const dx = bx - ax;
  const dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  let max = 0;
  let index = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.abs(dy * pts[i][0] - dx * pts[i][1] + bx * ay - by * ax) / len;
    if (d > max) {
      max = d;
      index = i;
    }
  }
  if (max <= eps) return [pts[0], pts[pts.length - 1]];
  return [...simplify(pts.slice(0, index + 1), eps).slice(0, -1), ...simplify(pts.slice(index), eps)];
};

// RDP on a closed ring: split at the point farthest from the start so neither
// half begins and ends on the same point.
const simplifyRing = (ring: Point[], eps: number): Point[] => {
  const pts = ring.slice(0, -1); // drop duplicated closing point
  if (pts.length < 4) return pts;
  let far = 0;
  let best = -1;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[0][0], pts[i][1] - pts[0][1]);
    if (d > best) {
      best = d;
      far = i;
    }
  }
  const a = simplify(pts.slice(0, far + 1), eps);
  const b = simplify([...pts.slice(far), pts[0]], eps);
  return [...a.slice(0, -1), ...b.slice(0, -1)];
};

const r = (n: number) => Math.round(n * 10) / 10;

// Closed Catmull-Rom spline through the points, written as cubic Beziers.
const smoothClosed = (pts: Point[]): string => {
  const n = pts.length;
  if (n < 3) return '';
  let d = `M${r(pts[0][0])} ${r(pts[0][1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r(c1[0])} ${r(c1[1])} ${r(c2[0])} ${r(c2[1])} ${r(p2[0])} ${r(p2[1])}`;
  }
  return `${d}Z`;
};

export interface ContourOptions {
  width: number;
  height: number;
  seed: number;
  levels?: number;
  hills?: number;
}

export const contourSvg = ({ width, height, seed, levels = 18, hills = 6 }: ContourOptions): string => {
  const rand = mulberry32(seed);
  const cell = 10; // px per grid cell
  const margin = 12; // cells outside the visible area, so edge-hugging lines get clipped
  const nx = Math.ceil(width / cell) + margin * 2;
  const ny = Math.ceil(height / cell) + margin * 2;

  const peaks = Array.from({ length: hills }, () => ({
    x: rand() * nx,
    y: rand() * ny,
    s: (0.12 + rand() * 0.22) * Math.max(nx, ny),
    h: 0.6 + rand() * 0.9,
  }));

  const values = new Float64Array(nx * ny);
  let min = Infinity;
  let max = -Infinity;
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      let v = 0;
      for (const p of peaks) {
        const dx = i - p.x;
        const dy = j - p.y;
        v += p.h * Math.exp(-(dx * dx + dy * dy) / (2 * p.s * p.s));
      }
      v += 0.07 * Math.sin((i / nx) * Math.PI * 3.1 + (j / ny) * 1.7) + 0.05 * Math.cos((j / ny) * Math.PI * 2.3);
      values[j * nx + i] = v;
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }

  const step = (max - min) / (levels + 1);
  const thresholds = Array.from({ length: levels }, (_, k) => min + step * (k + 1));
  const layers = contours().size([nx, ny]).smooth(true).thresholds(thresholds)(Array.from(values));

  const paths: string[] = [];
  for (const layer of layers) {
    let d = '';
    for (const polygon of layer.coordinates) {
      for (const ring of polygon) {
        const pts = ring.map(([x, y]) => [(x - margin) * cell, (y - margin) * cell] as Point);
        const simple = simplifyRing(pts, 2.2);
        // drop points bunched closer than 8px; they cause kinks once smoothed
        const spaced = simple.filter((p, i) => i === 0 || Math.hypot(p[0] - simple[i - 1][0], p[1] - simple[i - 1][1]) >= 8);
        if (spaced.length < 4) continue;
        d += smoothClosed(spaced);
      }
    }
    if (d) paths.push(`<path d="${d}"/>`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#000" stroke-width="1.4" stroke-linejoin="round">${paths.join('')}</svg>`;
};
