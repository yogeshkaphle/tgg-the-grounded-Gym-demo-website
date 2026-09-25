# Grounded Gym: demo site

A concept gym website for Baneshwor, Kathmandu, built to turn nearby visitors into **Free Trial Week** bookings.
Demo site by Yogesh Kaphle. Grounded Gym is not a real gym.

**Category statement:** Strength and conditioning for real life.
**Brand line:** Get strong for real life.
**Pillars:** Move, Perform, Adapt.

Add `?notes=on` to any URL to open the annotated version: dashed "Why this is here" notes explain each
conversion decision, and tracked events appear on screen as they fire. That is the link to put in the portfolio.

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Install (Node 22 or newer) |
| `npm run dev` | Local site at http://localhost:4321 |
| `npm run build` | Static site in `dist/`. Fails if the data disagrees with itself (see below) |
| `npm run preview` | Serve the built site |
| `npm run check` | Type and template checks |
| `npm run qa` | With `preview` running: crawl every link, then walk the booking flow in Chrome |
| `npm run og` | Regenerate the share images in `public/og/` after copy changes |

## Where everything lives

Every fact is typed once, in `src/data/`. Pages read from these files.

| File | Holds |
| --- | --- |
| `site.ts` | Name, address, landmark directions, hours, contact numbers, callback promise, tracking IDs, form settings, demo settings, photo credit |
| `photos.ts` | Every photo slot: shape, alt text, placeholder text |
| `timetable.ts` | The week of classes. Feeds `/timetable`, "Classes today", coach cards and the thank-you recommendations |
| `classes.ts` | Class types and the three pillars |
| `plans.ts` | Prices only. Per-month figures and savings are calculated in `src/lib/pricing.ts` |
| `goals.ts` | Form choices, and which classes each goal recommends |
| `coaches.ts`, `workouts.ts`, `methods.ts`, `faq.ts`, `results.ts`, `offer.ts` | What the names say |
| `src/content/journal/` | Journal posts in Markdown |

The build fails if a class runs outside opening hours, two classes overlap, a coach runs no classes, a goal
has fewer than three classes to recommend, or a longer plan costs more per month than a shorter one.

## Before launch

- [x] **Domain.** `groundedgym.yogeshkaphle.com` (set in `astro.config.mjs`, `SITE_URL`).
- [ ] **Form key.** Create a free Web3Forms key with the email that should receive bookings and add it in Vercel as the environment variable `PUBLIC_WEB3FORMS_KEY`, then redeploy (the key is read at build time). Until then the form runs in test mode and says so on the thank-you page. For local testing, put it in a `.env` file (git-ignored).
- [x] **Your WhatsApp.** Owner-facing buttons (demo strip, thank-you owner panel, conversion notes, demo dialog) open `site.demo.authorWhatsApp` with a prefilled message. The gym's own Call/WhatsApp buttons still explain the demo.
- [x] **Photo credit.** Footer reads "Photos: Unsplash, Pexels. Gym interior images are AI-generated for this demo." (`site.photoCredit`). Update it if the sources change.
- [ ] **Tracking.** Add `site.tracking.metaPixelId` and `ga4Id` if you want live events. Nothing loads while they are empty.
- [ ] **Photos.** See `src/assets/photos/README.md`.
- [ ] **Deploy.** Vercel, from `main`. `vercel.json` sets clean URLs (no `.html`, no trailing slash) and cache headers. Node 22.12 or newer.

### The brief's "done when" list

| Item | Status |
| --- | --- |
| Live on the subdomain | Not yet: needs the domain decision and a deploy |
| Mobile Lighthouse performance 90+ | 100 on home, trial, timetable, membership, how we train, a workout, a journal post and thank-you (local build, no tracking IDs set) |
| Form from 2 phones, emails within a minute | Not yet: needs the Web3Forms key, then test on real phones |
| Each goal shows different classes on `/thank-you` | Passes (`npm run qa`) |
| "Outside the valley" path | Passes (`npm run qa`) |
| Every link and button clicked | Links crawled automatically, no broken links or anchors. Buttons that need real numbers show a demo notice until set |
| Savings maths checked by hand | 3 Months: 12,000 / 3 = 4,000 a month, saves 500 (11%). 12 Months: 42,000 / 12 = 3,500, saves 1,000 (22%) |
| Timetable and "Classes today" match | Same data file, same code |
| Map pin and landmark text agree | Both point at New Baneshwor Chowk. For a real client, pin the building |
| Demo line in footer, samples labelled | Yes, plus a notice strip on every page and a demo note next to the form |

## Where this build differs from the brief, and why

- **No email field.** No free form service sends an auto-reply from a same-page (AJAX) submission, so "For your confirmation" would have been a promise nobody keeps. It comes back when `site.form.collectEmail` is true and an auto-reply really goes out (Web3Forms Pro or GHL).
- **One trial button on phones, not two.** The sticky bottom bar (Call, WhatsApp, Free Trial Week) sits in thumb reach, so the phone header shows only the logo and menu.
- **"Open from 5:30 every morning" became "Open from 5:30, Sunday to Friday".** Saturday opens at 7:00.
- **Start Here and Methods are one page: How we train.** Outcome first (being ready), then pillars, then the four methods as tools.
- **Journal is in the footer, not the header.** The header stays about choosing a gym.
- **Map loads on tap.** A landmark sketch shows first; the Google map loads only when asked, which keeps pages light on mobile data.
