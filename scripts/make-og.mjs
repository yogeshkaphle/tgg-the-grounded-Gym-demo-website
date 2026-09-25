// Renders the share images (WhatsApp, Facebook, Instagram link previews) into
// public/og/, plus public/apple-touch-icon.png. Run after changing copy:
//   npm run og        (uses your installed Chrome, or CHROME_PATH)
// The PNGs are committed, so a normal build never needs a browser.
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { workouts } from '../src/data/workouts.ts';
import { site } from '../src/data/site.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const body = readFileSync(`${root}src/assets/fonts/archivo-subset.woff2`).toString('base64');
const display = readFileSync(`${root}src/assets/fonts/big-shoulders-subset.woff2`).toString('base64');
const mark = (fill, ground) =>
  `<svg viewBox="0 0 40 40" width="64" height="64"><path d="M11.4 22C9.4 15 11.8 8.6 20 8.6S30.6 15 28.6 22" fill="none" stroke="${fill}" stroke-width="3.6" stroke-linecap="round"/><path d="M14.4 33.6A10 10 0 1 1 25.6 33.6Z" fill="${fill}"/><rect x="2" y="35.4" width="36" height="2.6" rx="1.3" fill="${ground}"/></svg>`;

const page = (inner) => `<!doctype html><html><head><style>
@font-face{font-family:B;src:url(data:font/woff2;base64,${body}) format('woff2');font-weight:100 900}
@font-face{font-family:D;src:url(data:font/woff2;base64,${display}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#1e3446;color:#f2f4f5;font-family:B,sans-serif;position:relative;overflow:hidden}
body::after{content:'';position:absolute;left:0;right:0;bottom:0;height:14px;background:#e4572e}
.in{position:absolute;inset:60px 72px 74px;display:flex;flex-direction:column}
.logo{display:flex;align-items:center;gap:14px;font-family:D;font-weight:850;font-size:44px}
.logo b{color:#e4572e;font-weight:850}
.k{margin-top:auto;font-size:26px;font-weight:700;color:#f59a7e}
h1{margin-top:10px;font-family:D;font-size:132px;line-height:.86;font-weight:850;max-width:1040px;text-wrap:balance}
.row{margin-top:26px;display:flex;gap:16px;align-items:center;font-size:26px;font-weight:650;color:#b7bcc1}
.pill{background:#e4572e;color:#fff;padding:8px 20px;border-radius:8px;font-family:D;font-weight:800;font-size:32px}
</style></head><body><div class="in">
<div class="logo">${mark('#f2f4f5', '#e4572e')}<span>Grounded <b>Gym</b></span></div>${inner}</div></body></html>`;

const cards = [
  {
    file: 'public/og/default.png',
    html: page(`<p class="k">${site.area}, ${site.city}</p><h1>${site.tagline}</h1>
      <div class="row"><span class="pill">${site.offer}</span><span>${site.category}</span></div>`),
  },
  ...workouts.map((w) => ({
    file: `public/og/${w.slug}.png`,
    html: page(`<p class="k">Train Anywhere: ${w.place.toLowerCase()}</p><h1>${w.title}</h1>
      <div class="row"><span class="pill">${w.minutes} min</span><span>${w.kitShort}. A free session from our coaches.</span></div>`),
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
  `<body style="margin:0;background:#1e3446;display:grid;place-items:center;height:180px">${mark('#f2f4f5', '#e4572e').replace('width="64" height="64"', 'width="128" height="128"')}</body>`,
);
await icon.screenshot({ path: `${root}public/apple-touch-icon.png` });
console.log('wrote public/apple-touch-icon.png');
await browser.close();
