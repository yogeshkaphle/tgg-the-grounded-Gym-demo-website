// Crawls every page from the home page: status codes, console errors, broken
// links and anchors, trailing slashes, orphan pages. Run against `npm run preview`.
import { chromium } from 'playwright-core';
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
// Uses your installed Chrome, or CHROME_PATH if set.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
const page = await browser.newPage();
const seen = new Set(['/']);
const queue = ['/'];
const links = new Map(); // href -> [from pages]
const problems = [];
const idsByPage = new Map();
while (queue.length) {
  const path = queue.shift();
  const errors = [];
  page.removeAllListeners('console'); page.removeAllListeners('pageerror');
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  const res = await page.goto(BASE + path, { waitUntil: 'networkidle' });
  if (!res || res.status() !== 200) problems.push(`${path} -> ${res?.status()}`);
  await page.waitForTimeout(150);
  if (errors.length) problems.push(`${path} console: ${errors.join(' | ')}`);
  const { hrefs, ids } = await page.evaluate(() => ({
    hrefs: [...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')),
    ids: [...document.querySelectorAll('[id]')].map((e) => e.id),
  }));
  idsByPage.set(path, new Set(ids));
  for (const h of hrefs) {
    if (!h || /^(https?:|mailto:|tel:|viber:)/.test(h)) continue;
    const url = new URL(h, BASE + path);
    const key = url.pathname + url.hash;
    if (!links.has(key)) links.set(key, []);
    links.get(key).push(path);
    if (url.pathname.endsWith('/') && url.pathname !== '/') problems.push(`trailing slash link ${h} on ${path}`);
    if (!seen.has(url.pathname) && !url.pathname.endsWith('.svg')) { seen.add(url.pathname); queue.push(url.pathname); }
  }
}
// anchor checks
for (const [key, from] of links) {
  const [p, hash] = key.split('#');
  if (hash && idsByPage.has(p) && !idsByPage.get(p).has(hash)) problems.push(`missing anchor #${hash} on ${p} (linked from ${[...new Set(from)].join(', ')})`);
}
// orphan check: every built page linked from somewhere else
const pages = [...seen];
const inbound = (p) => [...links.entries()].filter(([k, f]) => k.split('#')[0] === p && f.some((x) => x !== p)).length;
for (const p of pages) if (p !== '/' && p !== '/thank-you' && inbound(p) === 0) problems.push(`orphan: ${p}`);
console.log('pages crawled:', pages.length);
console.log(pages.sort().join('\n'));
console.log('\nPROBLEMS:', problems.length ? '\n' + problems.join('\n') : 'none');
await browser.close();
if (problems.length) process.exitCode = 1;
