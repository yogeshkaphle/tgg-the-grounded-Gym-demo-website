# Case study draft: Grounded Gym

For the portfolio at yogeshkaphle.com.np. A first draft to edit, not final copy.

## Headline

"How I designed Grounded Gym" sells design, which is the opposite of the positioning. Lead with the diagnosis:

1. **I walked six fitness websites as a customer and found 15 leaks. Then I built a gym site with every one closed.**
2. **A gym website built backwards from the leaks: 15 problems from real fitness websites, fixed before launch.**
3. **Grounded Gym: a concept site that turns people near Baneshwor into Free Trial Week bookings.** (safe option)

Sub-line: *Concept build for a fictional Kathmandu gym. No invented results: this shows the mechanism, not the numbers.*

## The booking path

```
Ad or Instagram post (Train Anywhere content, trial offer)
  -> /trial: headline matches the ad, no menu, two-step form
  -> /thank-you: goal-based classes, what to bring, landmark directions, Lead event fires once
  -> WhatsApp or call within 2 hours
  -> reminder the evening before          <- cuts no-shows
  -> day 1: 20 minutes with a coach, three simple tests
  -> day 6: "how did it go?" and the plans  <- the membership conversation
```

The last three steps are where gym trials usually leak (people who book but don't show, and people who show
but never get asked). Name them in the case study; most competitors stop at the form.

## Leaks found, and the fix on this site

Keep the businesses anonymous in public. Naming them reads as a takedown, and gym owners will wonder what you'd say about them.

| Leak (anonymised) | Fix |
| --- | --- |
| A studio's form had no location field, so people who couldn't reach it booked | Area question, honest reply for "Outside the valley", booking tagged out-of-area |
| Confirmation only repeated the details back | Thank-you page says what happens next, when, and what to bring |
| Promised emails never arrived (two coaches) | No email promised unless an auto-reply really sends |
| Dead link in a bio; a bio keyword that fired nothing | No link-in-bio tools; every link crawled before launch |
| Free content sent to Drive or YouTube (three websites) | Train Anywhere sessions live on the domain, inside the pixel's reach |
| Pixel on a page no ad reached | `/trial` is the ad landing page and carries the pixel; Lead fires on `/thank-you` |
| One call with four names | One name everywhere: Free Trial Week |
| Price hidden behind a keyword | Prices on `/membership` |
| Savings maths wrong on two sales pages | Savings calculated in code from the price list |
| Nothing between free and high-ticket | Starter Month |
| A diagnosis question, then one generic answer | The goal picked changes the recommended classes |
| The audience changed partway along the booking path | Same audience words on every page |
| "Guaranteed results" with nothing behind it | No guarantees; sample results labelled |
| Form and DM leads in different places | Real build: form and WhatsApp land in one GHL inbox |
| A "personal" touch that was automated | Only promise a call the gym really makes |

## Screens to show

1. `/trial` on a phone, step 1 then step 2
2. The "Outside the valley" message
3. `/thank-you` for two different goals, side by side
4. Any page with `?notes=on`, showing the annotations and the on-screen event log
5. The booking email: the ad source and the one-tap WhatsApp link for the front desk

## WhatsApp follow-up scripts (for the real GHL build)

**Within 2 hours of booking**
> Namaste {first name}, this is {coach} from Grounded Gym. Thanks for booking your Free Trial Week. Which suits you better for your first session: {option 1} or {option 2}? It's 20 minutes with me: your goals, a quick movement check, and a plan for the week.

**Evening before**
> Hi {first name}, see you tomorrow at {time}. We're above the sports shop, second floor, 5 minutes from New Baneshwor Chowk towards Tinkune. Bring clean indoor shoes, a towel and a water bottle.

**No-show, same day**
> Missed you today, {first name}. No problem at all. Want to pick another time this week? Your free week starts when you do.

**Day 6**
> {first name}, how has the week felt? Happy to show you the plans tomorrow after class, or if it's not for you, that's completely fine. Either way, keep the Train Anywhere sessions.
