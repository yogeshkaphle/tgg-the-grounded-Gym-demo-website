# Photos

Drop a photo here named after its slot and it replaces the placeholder automatically, resized and
converted to AVIF/WebP at build time. Slots are defined in `src/data/photos.ts`.

| File name (jpg, png or webp) | Where it shows | Shape |
| --- | --- | --- |
| `hero` | Home page hero, bleeding off the right edge | Portrait 4:5 (desktop), cropped to 5:4 on phones |
| `class-from-behind` | Home, Free Trial Week section | Landscape 4:3 |
| `space-kettlebells` | How we train: Kettlebells | 4:3 |
| `space-barbell` | How we train: Barbell strength | 4:3 |
| `space-bars` | How we train: Calisthenics | 4:3 |
| `space-mobility` | How we train: Mobility | 4:3 |
| `anish-shrestha`, `pema-tamang`, `rohan-maharjan` | Coach cards, journal bylines | Portrait 4:5 |

Rules:
- Coaches are fictional ("Sample coach"), so coach photos must be **cropped or from behind. No faces.**
- The client's own photos, or free-licence photos. Never a generated face, never a stranger's face
  presented as a member or coach.
- At least 1200 px on the long side for `hero`, 900 px for the rest. The build keeps the hero under 200 KB.
- Put the source in `site.photoCredit` (`src/data/site.ts`); the footer shows "Photos: <source>".
