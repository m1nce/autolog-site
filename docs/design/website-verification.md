# Living Cartography website verification

2026-09-10. Implementation branch `codex/site-living-cartography`; original website main is unchanged. This document describes local verification, not deployment.

## Evidence

- Astro static build produces all three existing routes. `check-shell.mjs`, `check-home.mjs`, and `check-information.mjs` passed against generated output.
- Headless installed Chrome checked homepage, Support, and Privacy at 1440, 390, 320, 768, 861, and 1024 CSS-pixel widths: 18 route/width combinations. No horizontal document overflow, broken images, HTTP error responses, JavaScript page errors, or cross-origin resource requests were observed. Each page has one h1. Images were scrolled into view and decoded before screenshots, exercising native lazy loading.
- Native homepage discovery anchor, setup-to-Support navigation, and Back to app passed with JavaScript disabled.
- Keyboard Tab reaches the wordmark and then the appropriate mobile navigation link with visible focus. At an effective 200% zoom layout (720×450 CSS pixels on a simulated 1440×900 display), all three pages remained within the viewport. This is viewport/scale emulation, not a real-device or assistive-technology audit.
- All three self-hosted font families loaded. A separate focused check measured header/footer wordmark hit areas at 44 px across all three routes at both desktop and mobile widths.
- Visually inspected all six desktop/mobile final page screenshots against the approved Figma designs. Additional homepage screenshots around the layout breakpoint (1101, 1280, 1351 px) were checked after correcting intermediate-width copy/art collisions and clipping.

## Review decisions and remaining release concerns

- All three task reviews passed after scoped fixes. Whole-branch review found no blocking issues; its minor header-link/CSS-font test coverage finding was fixed in `68429c4` and passed scoped re-review. A fresh build, all three generated-output checks, and branch whitespace checks passed afterward. This final change touched tests only; the visually verified application source is unchanged.
- The Task 1 shell assertion was scoped to header/footer for obsolete contact text. The old information-page body belonged to Task 3; its full-page checker now verifies placeholder contact is absent. Had that task not run, the shell check alone would not have proved complete removal.
- The existing policy's “Your VIN is sent once” wording was preserved as requested. `App/VINDecoderClient.swift` describes one request per user-initiated decode, not a once-per-install guarantee. Review that wording separately before publication if it could mislead readers.
- The approved Miata artwork retains its previously deferred windshield/glazing limitation. No new image or transparency cleanup was substituted.
- Asset provenance and font licenses are recorded in `website-assets.md`. Figma artwork is treated as project-supplied design material, not assigned an invented third-party license.
- No app source, TestFlight version/build, dependencies, analytics, backend, deployment configuration, remote branch, or live website was changed.

## Reproduce

```sh
npm ci
npm run build
node scripts/check-shell.mjs
node scripts/check-home.mjs
node scripts/check-information.mjs
npm run preview -- --host 127.0.0.1
```

Open the printed preview origin at `/autolog-site/`, `/autolog-site/support`, and `/autolog-site/privacy`. Browser screenshots and automation output are retained in the controller's scoped review evidence while the branch awaits integration.
