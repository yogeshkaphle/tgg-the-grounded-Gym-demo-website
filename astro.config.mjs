// @ts-check
import { defineConfig } from 'astro/config';

// Change this to the live subdomain before launch (see README, "Before launch").
const SITE_URL = 'https://groundedgym.yogeshkaphle.com';

export default defineConfig({
  site: SITE_URL,
  // Brief: lowercase URLs, hyphens, no trailing slash.
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  // Every photo gets the same light grade before Astro encodes it (src/lib/graded-image-service.ts).
  image: {
    service: { entrypoint: './src/lib/graded-image-service.ts' },
  },
  // Keep HTML-aware whitespace so inline links inside copy keep their spaces.
  compressHTML: true,
  devToolbar: { enabled: false },
});
