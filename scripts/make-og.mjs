// Renders the share images (WhatsApp, Facebook, Instagram link previews) into
// public/og/, plus public/apple-touch-icon.png. Run after changing copy:
//   npm run og        (uses your installed Chrome, or CHROME_PATH)
// The PNGs are committed, so a normal build never needs a browser.
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { contourSvg } from '../src/lib/contours.ts';
import { workouts } from '../src/data/workouts.ts';
import { site } from '../src/data/site.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const font = readFileSync(`${root}src/assets/fonts/archivo-subset.woff2`).toString('base64');
const contours = contourSvg({ width: 1600, height: 1000, seed: 20261008 }).replace('stroke="#000"', 'stroke="#ec8a73"');
const mark = (fill, ground) =>
  `<svg viewBox="0 0 40 40" width="64" height="64"><path d="M11.4 22C9.4 15 11.8 8.6 20 8.6S30.6 15 28.6 22" fill="none" stroke="${fill}" stroke-width="3.6" stroke-linecap="round"/><path d="M14.4 33.6A10 10 0 1 1 25.6 33.6Z" fill="${fill}"/><rect x="2" y="35.4" width="36" height="2.6" rx="1.3" fill="${ground}"/></svg>`;

const page = (inner) => `<!doctype html><html><head><style>
@font-face{font-family:A;src:url(data:font/woff2;base64,${font}) format('woff2');font-weight:100 900;font-stretch:62% 125%}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#1d1b18;color:#f4efe6;font-family:A,sans-serif;position:relative;overflow:hidden}
.c{position:absolute;inset:0;opacity:.22}.c svg{width:100%;height:100%}
.in{position:absolute;inset:64px 72px;display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:16px;font-weight:850;font-stretch:122%;font-size:34px;letter-spacing:-.02em}
.logo b{color:#ec8a73;font-weight:850}
.k{margin-top:auto;font-size:22px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#ec8a73}
h1{margin-top:14px;font-size:96px;line-height:.95;font-weight:850;font-stretch:120%;letter-spacing:-.035em;max-width:1000px;text-wrap:balance}
.row{margin-top:28px;display:flex;gap:14px;align-items:center;font-size:26px;font-weight:650;color:#c9c0b1}
.pill{background:#b3412c;color:#fff;padding:10px 20px;border-radius:999px;font-weight:800}
</style></head><body><div class="c">${contours}</div><div class="in">
<div class="logo">${mark('#f4efe6', '#ec8a73')}<span>Grounded <b>Gym</b></span></div>${inner}</div></body></html>`;

const cards = [
  {
    file: 'public/og/default.png',
    html: page(`<p class="k">${site.area}, ${site.city}</p><h1>${site.tagline}</h1>
      <div class="row"><span class="pill">${site.offer}</span><span>${site.category}</span></div>`),
  },
  ...workouts.map((w) => ({
    file: `public/og/${w.slug}.png`,
    html: page(`<p class="k">Train Anywhere · ${w.place}</p><h1>${w.title}</h1>
      <div class="row"><span class="pill">${w.minutes} min</span><span>${w.kitShort} · a free session from our coaches</span></div>`),
  })),
];

mkdirSync(`${root}public/og`, { recursive: true });
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
const tab = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const card of cards) {
  await tab.setContent(card.html, { waitUntil: 'load' });
  await tab.evaluate(() => document.fonts.ready);
  await tab.screenshot({ path: `${root}${card.file}` });
  console.log('wrote', card.file);
}

// 180x180 home-screen icon
const icon = await browser.newPage({ viewport: { width: 180, height: 180 } });
await icon.setContent(
  `<body style="margin:0;background:#1d1b18;display:grid;place-items:center;height:180px">${mark('#f4efe6', '#ec8a73').replace('width="64" height="64"', 'width="128" height="128"')}</body>`,
);
await icon.screenshot({ path: `${root}public/apple-touch-icon.png` });
console.log('wrote public/apple-touch-icon.png');
await browser.close();
