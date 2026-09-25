# Photos

Drop a photo here named after its slot (jpg, png or webp) and it replaces the placeholder
automatically. At build time every photo gets the same light grade (slightly muted, cool lifted
shadows; see `src/lib/graded-image-service.ts`) so stock and generated images match, then it is
resized and served as AVIF/WebP. Below-the-fold photos lazy-load; the hero is preloaded.

| File name | Where it shows | Shape |
| --- | --- | --- |
| `hero` | Home hero: a group class | Portrait 4:5 (5:4 crop on phones) |
| `hall` | Home, Free Trial Week section | 4:3 |
| `rig`, `floor`, `rowers` | How we train, above the four methods | 4:3 |
| `find-us` | "Find us" block (home, /trial, thank-you): a Kathmandu street | 3:2 |
| `anywhere-park` | /train-anywhere/park | 4:3 |
| `anywhere-home` | /train-anywhere/home | 4:3 |
| `coach-1`, `coach-2`, `coach-3` | Coach cards and journal bylines (Anish, Pema, Rohan) | Portrait 4:5 |

Rules:
- Coaches are fictional ("Sample coach"): coach photos must be **cropped or from behind. No faces.**
- No kettlebells in any photo (they belong to a different demo).
- Stock from Unsplash or Pexels, or AI-generated gym interiors, as the footer credit says. Never a
  generated face presented as a member or coach.
- At least 1200 px on the long side for `hero`, 900 px for the rest.
