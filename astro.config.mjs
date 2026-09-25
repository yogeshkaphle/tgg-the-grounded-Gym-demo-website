// @ts-check
import { defineConfig } from 'astro/config';

// Change this to the live subdomain before launch (see README, "Before launch").
const SITE_URL = 'https://groundedgym.yogeshkaphle.com.np';

export default defineConfig({
  site: SITE_URL,
  // Brief: lowercase URLs, hyphens, no trailing slash.
  trailingSlash: 'never',
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  // Keep HTML-aware whitespace so inline links inside copy keep their spaces.
  compressHTML: true,
  devToolbar: { enabled: false },
});
