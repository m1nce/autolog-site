// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Custom domain later: change `site` to the domain root (e.g. 'https://example.com')
  // and set `base` to '/'; also remove/adjust any CNAME step added to the deploy workflow.
  site: 'https://m1nce.github.io',
  base: '/autolog-site',
});
