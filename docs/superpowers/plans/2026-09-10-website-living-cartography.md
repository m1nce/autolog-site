# AutoLog Website Living Cartography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the approved homepage, Support, and Privacy designs in the existing AutoLog website.

**Architecture:** Keep Astro pages and their shared Base layout. Use static semantic markup, scoped CSS, native links, and local assets. Replace the old pinned-screen narrative rather than retaining two rendering paths or adding a framework.

**Tech Stack:** Existing Astro ^7.2.4, Node >=22.12.0, CSS, Node built-in assertions.

**Spec:** `docs/superpowers/specs/2026-09-10-website-living-cartography.md` (currently in the `living-cartography` app design worktree; copy both documents into the website execution worktree).

## Global Constraints

- Retain Astro static output and Node >=22.12.0; add no runtime dependencies.
- Retain `site: 'https://m1nce.github.io'` and `base: '/autolog-site'`; use the existing `withBase(path: string): string` for public asset and internal route URLs.
- Self-host fonts and images; no analytics, accounts, remote font requests, or backend.
- Match the approved 1440 px desktop and 390 px mobile Figma frames; keep intermediate widths and 320 px usable without horizontal page scrolling.
- Use semantic HTML, visible keyboard focus, readable text, and at least 44 px interactive hit areas; no content depends on JavaScript.
- Keep preview labeling and multi-car language. Do not invent download links, contact addresses, prices, compatibility guarantees, or community features.
- Preserve the five existing Privacy policy paragraphs and effective date, 22 August 2026. Any proposed factual/policy change requires separate review.
- Do not push main, deploy, merge, change app source, or promote Figma concepts as part of implementation.

---

## Preflight and ownership

- [ ] Read the spec, applicable website instructions, and required execution/worktree skills. Recheck `/Users/minchan/github/autolog-site` status and current main SHA; the planning inspection found it clean on main.
- [ ] Create branch `codex/site-living-cartography` in an isolated website worktree via the worktree skill; obtain tool approval if required for the sibling repository. Do not change the original main checkout. Check the shared claim registry before source edits and claim scoped website paths if required by the session instructions; escalate collisions, never self-arbitrate.
- [ ] Copy this plan and its spec into the website worktree. Keep app design work and existing untracked app planning documents untouched.
- [ ] Run `node --version`, `npm ci`, and `npm run build`; record baseline results. Network permission may be needed for package installation. Do not upgrade dependencies as part of setup.
- [ ] Read the Figma design-to-code skill before retrieving design context for the six frame IDs in the spec. Export screenshots and exact copy for comparison. No Figma mutations are required for this implementation.

All source paths below are relative to the website execution worktree. Task 1 owns shared files and assets. Task 2 owns only the homepage. Task 3 owns only Support and Privacy. Workers are not alone in the codebase: preserve others' changes and do not edit another task's files. Tasks 2 and 3 may run concurrently only after Task 1's shared interface is approved. The controller owns the ledger and integration checks.

## File map

| Path | Responsibility |
| --- | --- |
| `src/layouts/Base.astro` | Document metadata, self-hosted fonts, responsive navigation, footer |
| `src/styles/global.css` | Approved palette/type, reset, focus, shared reading layout |
| `src/lib/base.ts` | Existing unchanged base-prefix helper |
| `src/pages/index.astro` | Four-section homepage and native anchors |
| `src/pages/support.astro` | Six visible questions/answers |
| `src/pages/privacy.astro` | Reading layout and preserved policy |
| `public/fonts/` | Newsreader, DM Sans, Bricolage Grotesque and licenses |
| `public/images/living-cartography/` | Hero art, comparison, recording exports |
| `scripts/check-shell.mjs` | Built shared-shell assertions |
| `scripts/check-home.mjs` | Built homepage assertions |
| `scripts/check-information.mjs` | Built Support/Privacy assertions |
| `docs/design/website-assets.md` | Export node IDs, dimensions, filenames, licensing, limitations |

Do not create a component library, content API, general theme system, or animation controller. Asset filenames are `countryside.webp`, `miata.png`, `comparison.webp`, and `recording.webp`. Use PNG for car alpha; never flatten it onto white. The comparison and recording exports exclude surrounding website captions; render those captions as HTML.

## Task 1: Shared shell, fonts, and approved assets

**Files:** Modify `src/layouts/Base.astro`, `src/styles/global.css`. Create the local assets/fonts and asset manifest above, and `scripts/check-shell.mjs`. Keep package/config/base helper unchanged.

**Interfaces:** Consumes existing `withBase(path: string): string` and Figma frames. Produces `Base` props `{ title: string; description: string; home?: boolean }` with `home = false`, unchanged default slot, CSS variables `--paper`, `--ink`, `--sage`, `--rule`, `--font-body`, `--font-heading`, `--font-brand`, shared `.reading-page` and `.reading-page--privacy` styles, and the four exact image paths listed above. Desktop support content width 860 px; privacy 760 px; mobile both use 24 px side padding.

- [ ] Add this runnable shell check before changing source:

```js
// scripts/check-shell.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
for (const page of ['index.html', 'support/index.html', 'privacy/index.html']) {
  const html = await readFile(`dist/${page}`, 'utf8');
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /href="\/autolog-site\/support"/);
  assert.match(html, /href="\/autolog-site\/privacy"/);
  assert.doesNotMatch(html, /Get the app|hello@|cockpit-ground/);
  assert.doesNotMatch(html, /(?:href|src)="\/fonts\//);
}
console.log('Shared shell checks passed');
```

- [ ] Run `npm run build && node scripts/check-shell.mjs`; confirm the baseline fails on old shell content, not a missing build directory.
- [ ] Export approved assets, inspect their actual pixels, preserve alpha and aspect ratios, and record node IDs and licenses. Use the installed Figma tools' supported export/download mechanism, not guessed image URLs. Retrieve licensed font files from existing local assets where available, otherwise official font distribution sources. If the exact export or license cannot be obtained, report that specific blocker; do not substitute generated art.
- [ ] Replace the shared shell with the approved navigation/footer. Retain metadata/favicon behavior and `withBase`. Use this interface and base-safe font pattern:

```astro
---
import '../styles/global.css';
import { withBase } from '../lib/base';
interface Props { title: string; description: string; home?: boolean }
const { title, description, home = false } = Astro.props;
const newsreader = withBase('/fonts/Newsreader-Regular.woff2');
const dmSans = withBase('/fonts/DMSans-Regular.woff2');
const brand = withBase('/fonts/BricolageGrotesque-Medium.woff2');
---
```

Build the font-face CSS from these trusted, locally defined URLs in frontmatter and render it with `<style is:inline set:html={fontFaces} />`; do not use CSS custom properties inside font-face descriptors:

```js
const fontFaces = [
  ['Newsreader', newsreader, 400],
  ['DM Sans', dmSans, 400],
  ['Bricolage Grotesque', brand, 500],
].map(([family, url, weight]) => `@font-face{font-family:'${family}';src:url('${url}') format('woff2');font-weight:${weight};font-style:normal;font-display:swap}`).join('\n');
```

Only trusted build-time constants enter `set:html`, never user input. Export exact extra weights only if used. Render desktop app/support links and non-clickable coming-soon copy. Mobile uses `home ? 'The app ↓' : 'Back to app'` with its spec-defined destination. The footer uses real links and no placeholder contact.

- [ ] Replace old global visual tokens and vignette/panel rules. Foundational CSS:

```css
:root {
  --paper: #f3f0e8; --ink: #24453b; --sage: #e8ebde; --rule: #c8cdbe;
  --font-body: 'DM Sans', sans-serif;
  --font-heading: 'Newsreader', Georgia, serif;
  --font-brand: 'Bricolage Grotesque', sans-serif;
  color-scheme: light;
}
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--font-body); }
h1, h2, h3, p { margin: 0; }
h1, h2, h3 { font-family: var(--font-heading); font-weight: 400; }
a { color: inherit; }
a:focus-visible { outline: 2px solid var(--ink); outline-offset: 4px; }
img { display: block; max-width: 100%; height: auto; }
```

Implement shell and reading-layout measurements from the approved frames with natural content height, not fixed full-page heights. Use a single 860 px layout breakpoint initially, consistent with the existing site's convention; verify interpolation rather than assuming it fits.
- [ ] Run build and shell check. Inspect all three route shells at 1440 and 390 px; old inner pages are expected until Tasks 2/3. Confirm fonts resolve at `/autolog-site/` with no remote requests.
- [ ] Commit only Task 1 files after verification; adversarial reviewer checks base URLs, font loading/licenses, alpha/crops, responsive nav, and no unrequested dependencies. Record findings and revision in the ledger.

## Task 2: Illustrated homepage

**Files:** Modify `src/pages/index.astro`. Create `scripts/check-home.mjs`.

**Interfaces:** Consumes Task 1 `Base` with `home={true}`, shared tokens, `withBase`, and four asset paths. Produces `id="the-app"` on the discovery section. No JS exports, API, or cross-task source edits.

- [ ] Create and run the failing built-page check:

```js
// scripts/check-home.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const html = await readFile('dist/index.html', 'utf8');
assert.match(html, /id="the-app"/);
assert.match(html, /href="\/autolog-site\/#the-app"/);
for (const phrase of ['Explore AutoLog', 'For every car in your life.', 'Change the layout while parked.', 'Plug it in.', 'Pair once.', 'Go about your day.']) assert.ok(html.includes(phrase), phrase);
assert.match(html, /Design preview/);
assert.doesNotMatch(html, /APP STORE BADGE|href="#"|scrolly-active|IntersectionObserver|hero-route-path/);
assert.doesNotMatch(html, /<script\b/);
console.log('Homepage checks passed');
```

Run `npm run build && node scripts/check-home.mjs`; record expected failure on old homepage content.
- [ ] Replace the old homepage, all page CSS, and its script with the approved four sections. Import only Base/withBase; use ordinary images for pre-exported assets. Give every image its actual exported width/height to reserve layout space, lazy-load below-fold comparison/recording, and keep hero art eager. Example URL and caption contract:

```astro
<a href={withBase('/#the-app')}>Explore AutoLog ↓</a>
<section id="the-app" aria-labelledby="discovery-title">
  <h2 id="discovery-title">Same roads.<br />Different days.</h2>
</section>
<p class="preview-caption">Illustrative screen · Design preview</p>
<a href={withBase('/support')}>Check setup and compatibility →</a>
```

Build all content from the approved full frames, including both desktop/mobile headline variants, their paragraph differences, the multi-car explanation, setup body/steps, and preview labels. Keep one h1 containing mutually exclusive visible spans rather than two h1 elements. Decorative hero image layers use empty alt; recording alt describes the distance/elapsed/economy example and that it is parked. Provide a concise text equivalent for the comparison if exported as an image.
- [ ] Use two-column desktop sections and the exact mobile order from `1069:3499`. Keep the car independently layered above the countryside, without new animation. Preserve comparison text readability; do not reproduce the entire homepage as a single bitmap. All real text outside illustration/screenshot content remains HTML.
- [ ] Run build, shell check, and homepage check. Compare 1440/390 px screenshots with Figma and inspect 320/768/1024 px, 200% zoom, keyboard anchors, and JS-disabled behavior. Ensure the discovery anchor actually scrolls to visible content and artwork causes no document overflow.
- [ ] Commit only Task 2 files; reviewer checks fidelity, preview honesty, multi-car copy, mobile order, no fake CTA, and removal of the old scroll machinery. Record result in ledger.

## Task 3: Support and Privacy reading pages

**Files:** Modify `src/pages/support.astro`, `src/pages/privacy.astro`. Create `scripts/check-information.mjs`.

**Interfaces:** Consumes Task 1 Base default `home=false` and reading-layout classes. Produces the existing `/support` and `/privacy` routes; no shared source edits.

- [ ] Add a built-page check before implementation:

```js
// scripts/check-information.mjs
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const support = await readFile('dist/support/index.html', 'utf8');
const privacy = await readFile('dist/privacy/index.html', 'utf8');
assert.match(support, /A little help,/);
assert.equal((support.match(/<h2[\s>]/g) ?? []).length, 6);
assert.doesNotMatch(support, /<details|TESTFLIGHT BUILD|hello@|\$15|Weeks of parking are fine/);
assert.match(privacy, /22 August 2026/);
const text = privacy.replace(/<[^>]*>/g, ' ').replace(/&#39;|&#x27;|&apos;/g, "'").replace(/\s+/g, ' ');
for (const paragraph of [
  'Trips, stats, and everything the app knows about your car are stored on your phone. There is no account, no sign-in, no analytics, and no AutoLog server. Delete the app and the data goes with it.',
  'Both are best effort and silent. When they fail, the app skips them and moves on.',
  "Your VIN is sent once to the NHTSA vPIC API, a US government service, to identify the car's make, model, and year. Nothing else is attached to the request.",
  "After a trip, the bounding box of the trip's area is sent to the Overpass API, an OpenStreetMap service, to fetch road shapes and names. The route you drove stays on the phone.",
  'It never uploads a route, never sells or shares driving data, and never scores your driving. There is no third party code in the app at all.'
]) assert.ok(text.includes(paragraph), paragraph);
assert.doesNotMatch(privacy, /hello@|Write to the engineer/);
console.log('Information page checks passed');
```

Run `npm run build && node scripts/check-information.mjs`; expect failure on the old Support title.
- [ ] Replace Support's details/cards/contact/build marker with the approved heading, introduction, and six h2/paragraph sections. Copy wording exactly from `1069:3566`; wrap the actual Privacy reference with `withBase('/privacy')` if it is rendered as a link. Use top rules, fixed readable content width, and natural height.
- [ ] Restyle Privacy from `1069:3568`/`1069:3569`, keeping all five paragraphs verified by the test. Use one h1, clear section headings, and the approved effective-date label; no fabricated contact. Scope any route-specific CSS to these pages.
- [ ] Run build and all three check scripts. Compare desktop/mobile Support/Privacy screenshots with Figma. Check text at 200% zoom and 320 px; verify footer links and mobile Back to app. Inspect current app behavior for the Support claims and record evidence or any unresolved mismatch as a pre-release concern.
- [ ] Commit only Task 3 files; reviewer checks all six answers, policy text equality, heading hierarchy, mobile reading width, and absence of old unsupported claims. Record result in ledger.

## Whole-branch verification and handoff

- [ ] Run `npm run build && node scripts/check-shell.mjs && node scripts/check-home.mjs && node scripts/check-information.mjs` from the final execution tree. These are narrow generated-output checks; they do not replace browser testing or prove accessibility.
- [ ] Start `npm run preview -- --host 127.0.0.1`. Visit `/autolog-site/`, `/autolog-site/support`, and `/autolog-site/privacy` using the actual printed port. Check all internal links, anchor behavior, image/font requests, and absence of console errors. Capture all six reference-sized screenshots and intermediate-width evidence; inspect reduced-motion and no-JS views.
- [ ] Confirm all local asset requests return successfully under the configured base. Verify computed font families are loaded, not merely declared. No fixed page height clips content; no document-level horizontal scrolling at any checked width.
- [ ] Whole-branch reviewer receives spec, plan/ledger, base/head SHAs, and complete diff. Probe shared shell/page seams, prefix handling for fonts/images/anchors, policy preservation, text hierarchy, and asset provenance/fidelity. Perform one scoped fix wave, rerun affected and full checks, then re-review findings. Unresolved findings remain open, never converted to a pass because the fix wave ended.
- [ ] Hand off preview, screenshots, test results, and any deferred car-glazing limitation. Ask the user for the integration path. Do not push main: its workflow deploys automatically. Figma moves to Canonical only after actual shipping is confirmed.

## SDD ledger

| Task | Owner | Depends on | State | Commit | Adversarial review |
| --- | --- | --- | --- | --- | --- |
| 1 Shared shell/assets | site_shell | Preflight | Complete | 5069152, 4202ac3 | Passed after wordmark hit-area fix |
| 2 Homepage | site_home | 1 approved | Complete | 5a59086, 089b53b | Passed after responsive-layout fix |
| 3 Support/Privacy | site_information | 1 approved | Complete | b5c12bd, ead3480 | Passed after restoring plain-text Privacy reference |
| Whole-branch gate | Controller + fresh reviewer | 1–3 | In review | ead3480 | Pending |

Rulings: full website visual approval received 2026-09-10. Static baseline is the approved website scope; app motion and community hosting are not imported into it. Planning creates no website source changes, deployment, or app release. Task 2/3 parallelism is permitted after Task 1 but not required.

Self-review: all spec routes map to Tasks 1–3; each asset has one owner; Base prop names/tokens/path conventions are consistent; browser checks cover the limits of narrow Node assertions; publication remains separate.

Execution note: Task 1's obsolete-contact assertion is scoped to the header/footer; Task 3 owns and checks obsolete body contact removal. The optional Support inline Privacy link was omitted to preserve approved text flow and44px target sizing via the existing footer link. Task 2 uses natural-flow stacked layouts until the desktop composition fits; the approved1440/390 endpoints remain the design reference. See `docs/design/website-verification.md` for actual verification and pre-release concerns. No push, merge, deployment, app changes, or Figma promotion occurred.
