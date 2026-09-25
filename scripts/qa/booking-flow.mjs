// Walks the Free Trial Week booking like a visitor: errors, both steps, all four
// goals, the outside-the-valley path, the Lead event (once, not on refresh) and the
// ad source in the payload. Run against `npm run preview` with no form key set (test mode).
import { chromium } from 'playwright-core';
const BASE = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
// Uses your installed Chrome, or CHROME_PATH if set.
const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: 'chrome' });
const results = [];
const ok = (cond, msg) => results.push(`${cond ? 'PASS' : 'FAIL'}  ${msg}`);

const newPage = async () => {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__events = JSON.parse(sessionStorage.getItem('__events') || '[]');
    document.addEventListener('gg:track', (e) => {
      window.__events.push(e.detail.name + (e.detail.meta ? ':' + e.detail.meta : ''));
      sessionStorage.setItem('__events', JSON.stringify(window.__events));
    });
  });
  return { ctx, page };
};

// 1. Direct visit to /thank-you without booking -> /trial
{
  const { ctx, page } = await newPage();
  await page.goto(BASE + '/thank-you');
  await page.waitForURL(/\/trial$/, { timeout: 5000 }).catch(() => {});
  ok(page.url().endsWith('/trial'), 'thank-you without a booking redirects to /trial');
  await ctx.close();
}

const book = async ({ goal, time, name, phone, area }) => {
  const { ctx, page } = await newPage();
  await page.goto(BASE + '/trial?utm_source=facebook&utm_medium=paid&utm_campaign=ftw-sept');
  const log = [];
  page.on('console', async (m) => {
    if (m.text().includes('booking not sent')) log.push('booking not sent ' + JSON.stringify(await m.args()[1].jsonValue()));
  });
  // empty step 1
  await page.click('[data-next]');
  const e1 = await page.isVisible('#err-goal') && await page.isVisible('#err-time');
  await page.click(`input[name="goal"][value="${goal}"]`, { force: true });
  await page.click(`input[name="time"][value="${time}"]`, { force: true });
  await page.click('[data-next]');
  const step2 = await page.isVisible('[data-step="2"]');
  const label = await page.textContent('[data-step-label]');
  // empty step 2
  await page.click('[data-submit]');
  const e2 = await page.isVisible('#err-name') && await page.isVisible('#err-phone') && await page.isVisible('#err-area');
  const focused = await page.evaluate(() => document.activeElement?.id);
  await page.fill('#f-name', name);
  await page.fill('#f-phone', '12345');
  await page.locator('#f-phone').blur();
  const phoneErr = await page.textContent('#err-phone');
  await page.fill('#f-phone', phone);
  await page.selectOption('#f-area', area);
  const outsideNote = await page.isVisible('#note-area');
  await page.click('[data-submit]');
  await page.waitForURL(/thank-you/, { timeout: 8000 });
  await page.waitForTimeout(400);
  const title = await page.textContent('[data-ty-title]');
  const recs = await page.$$eval('[data-ty-recs] .class-row__name', (els) => els.map((e) => e.textContent.trim()));
  const events = await page.evaluate(() => window.__events);
  const flags = {
    test: await page.isVisible('[data-ty-test]'),
    outside: await page.isVisible('[data-ty-outside]'),
  };
  const payload = log.find((l) => l.includes('booking not sent'));
  await page.reload();
  await page.waitForTimeout(400);
  const eventsAfterReload = await page.evaluate(() => window.__events);
  await ctx.close();
  return { e1, step2, label, e2, focused, phoneErr, outsideNote, title, recs, events, eventsAfterReload, flags, payload };
};

const goals = ['lose-weight', 'build-muscle', 'get-fitter', 'not-sure'];
const recsByGoal = {};
for (const goal of goals) {
  const r = await book({ goal, time: 'evening', name: 'Sabina Shrestha', phone: '+977 981-234-5678', area: 'Baneshwor' });
  recsByGoal[goal] = r.recs.join(' | ');
  if (goal === 'lose-weight') {
    ok(r.e1, 'step 1: errors show when nothing is picked');
    ok(r.step2 && r.label === 'Step 2 of 2', 'step 2 opens after both taps, progress says Step 2 of 2');
    ok(r.e2, 'step 2: name, phone and area errors show on empty submit');
    ok(r.focused === 'f-name', 'focus moves to the first invalid field');
    ok(/10-digit mobile number, like 98XXXXXXXX/.test(r.phoneErr), 'phone error uses the brief wording');
    ok(!r.outsideNote, 'outside-the-valley note hidden for Baneshwor');
    ok(r.title.includes('Sabina.'), `thank-you greets by first name: "${r.title.trim()}"`);
    ok(r.flags.test, 'test-mode notice visible (no form key set)');
    const leads = r.events.filter((e) => e.startsWith('generate_lead'));
    ok(r.events.includes('trial_form_start:TrialFormStart'), 'form start event fired');
    ok(r.events.includes('trial_form_step2:TrialFormStep2'), 'step 2 event fired');
    ok(leads.length === 1 && leads[0] === 'generate_lead:Lead', 'Lead fired once on thank-you');
    ok(r.eventsAfterReload.filter((e) => e.startsWith('generate_lead')).length === 1, 'Lead NOT fired again on refresh');
    console.log('events:', r.events.join(', '));
  }
  ok(r.recs.length === 3, `${goal}: 3 recommendations -> ${r.recs.join(', ')}`);
}
ok(new Set(Object.values(recsByGoal)).size === 4, 'each goal gives a different set of classes');

const out = await book({ goal: 'not-sure', time: 'day', name: 'Bikash', phone: '9841234567', area: 'Outside the valley' });
ok(out.outsideNote, 'outside-the-valley note appears in the form');
ok(out.flags.outside, 'thank-you shows the outside-the-valley message');
ok(/OUT OF AREA/.test(out.payload || ''), 'payload subject tagged OUT OF AREA');
ok(/facebook \/ paid \/ ftw-sept/.test(out.payload || ''), 'payload carries the ad source');

console.log(results.join('\n'));
await browser.close();
if (results.some((r) => r.startsWith('FAIL'))) process.exitCode = 1;
