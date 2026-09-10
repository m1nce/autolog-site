# Logo integration verification

Approved Figma sources: light symbol `1129:2377`; favicon `1135:2372`; application proof board `1135:2359`.

The website uses the approved light symbol at 44 × 44 CSS pixels with a 10px wordmark gap in the shared header and footer. The favicon uses the approved tight monochrome export. Both public SVGs were copied byte-for-byte from the approved asset pack.

Verification:

```sh
npm run build
node scripts/check-shell.mjs
node scripts/check-home.mjs
node scripts/check-information.mjs
node scripts/check-logo.mjs
cmp ../logo-studies/docs/brand/light.svg public/images/brand/autolog-symbol.svg
cmp ../logo-studies/docs/brand/favicon.svg public/favicon.svg
```

Headless Chrome checked `/`, `/support`, and `/privacy` at 390px and 1440px, plus `/` at 320px, for overflow, decoded logo images, `AutoLog` link names, and successful requests under `/autolog-site/`. Captures are in `site-evidence/` beside the SDD task reports.
