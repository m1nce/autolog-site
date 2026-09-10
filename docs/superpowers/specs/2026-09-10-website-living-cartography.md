# AutoLog website — Living Cartography implementation spec

## Authority and scope

The user approved the desktop/mobile sample, then the full homepage, Support, and Privacy designs with “Looks good.” This spec covers only `autolog-site`. App implementation, community hosting, TestFlight, publishing, and Figma promotion are separate work.

Design source: file `Cc8gZIMvqyxI3YHW2Kh5bf`, page `86:130`, section `1059:1612`. Preserve the original samples and app frames. Approved full frames:

| Route | Desktop | Mobile |
| --- | --- | --- |
| `/` | `1069:3427` (1440 × 2930) | `1069:3499` (390 × 3473) |
| `/support` | `1069:3566` (1440 × 1619) | `1069:3567` (390 × 1727) |
| `/privacy` | `1069:3568` (1440 × 1377) | `1069:3569` (390 × 1494) |

These override the earlier Mature Cockpit website appearance, not unrelated app behavior. Inspect exact typography, spacing, copy, and assets from these frames before implementation. Do not use old samples as the complete homepage reference.

## Global constraints

- Retain Astro static output and Node >=22.12.0; add no runtime dependencies.
- Retain `site: 'https://m1nce.github.io'` and `base: '/autolog-site'`; use the existing `withBase(path: string): string` for public asset and internal route URLs.
- Self-host fonts and images; no analytics, accounts, remote font requests, or backend.
- Match the approved 1440 px desktop and 390 px mobile Figma frames; keep intermediate widths and 320 px usable without horizontal page scrolling.
- Use semantic HTML, visible keyboard focus, readable text, and at least 44 px interactive hit areas; no content depends on JavaScript.
- Keep preview labeling and multi-car language. Do not invent download links, contact addresses, prices, compatibility guarantees, or community features.
- Preserve the five existing Privacy policy paragraphs and effective date, 22 August 2026. Any proposed factual/policy change requires separate review.
- Do not push main, deploy, merge, change app source, or promote Figma concepts as part of implementation.

## Visual and content contract

Warm paper `#F3F0E8`, forest ink `#24453B`, sage `#E8EBDE`, border `#C8CDBE`. Newsreader Regular for editorial headings; DM Sans for body and controls; Bricolage Grotesque Medium for the wordmark. Use the actual approved font files/weights with redistribution licenses. Do not substitute fonts silently.

Homepage order: illustrated hero → familiar-drive comparison and multi-car positioning → everyday recording preview with parked-only customization explanation → three setup steps → footer. Use one semantic h1; the desktop and mobile hero wording differs in the approved frames, so only the visible variant should enter the accessibility tree. The comparison and recording examples are explicitly illustrative, not interactive demos or claims that the redesign has shipped.

Keep the red Miata and countryside artwork exactly from the approved design. Source asset nodes: countryside `940:32`, car subtree `940:53`, comparison `1020:1608`, recording `961:507`. The website clones are preferable export targets because they already include the approved crops and labels. Car edge/glazing cleanup is a known deferred limitation: preserve the approved appearance rather than invent a new car. The approved website frames are static; do not import app-prototype actions or add scroll-driven car animation without a separate motion design approval.

Support: the six approved questions and answers remain fully visible, separated by thin rules, not dashboard cards or a custom accordion. Use the text from the approved Support frame. It removes the old universal adapter/price claim, guaranteed parking duration, test-fleet anecdote, placeholder contact, and build number. Verify product statements against app source before release; flag discrepancies, never silently rewrite approved copy.

Privacy: plain reading layout, five policy paragraphs, new editorial heading and introductory sentence. Preserve apostrophes and words; whitespace may normalize. The redesign is not a legal audit or proof that every current product claim is accurate.

## Navigation contract

- Wordmark: `withBase('/')`.
- Desktop “The app”: `withBase('/#the-app')`; Support: `withBase('/support')`; coming-soon phrase is text, not a disabled CTA.
- Homepage mobile “The app” and hero “Explore AutoLog”: `withBase('/#the-app')`.
- Secondary mobile “Back to app”: `withBase('/')`.
- Setup “Check setup and compatibility”: `withBase('/support')`.
- Footer Support and Privacy: corresponding existing routes.
- Discovery section owns `id="the-app"`. Use native anchors; no client router, scroll interception, pinned narrative, or animation dependency.

## Acceptance and release boundary

Build all three routes and verify local assets at the deployment prefix. Compare rendered pages with all six approved Figma frames, then inspect 320/768/1024 px widths and 200% zoom. Check keyboard navigation, no-JS rendering, image dimensions/alt text, no console errors, no missing fonts, no horizontal overflow, and preview honesty. Record screenshots and actual command outcomes, not assumed passes.

Implement in a dedicated website worktree after checking that repository's instructions and working-tree state. Site source lives outside the current writable roots, so creating its branch/worktree may require normal tool approval. Keep planning documents here until they can be copied into the website worktree. Do not create an unrelated app implementation branch for this website change.

Use subagent-driven tasks, per-task adversarial review, whole-branch review, and a scoped fix wave. User chooses integration after verification; pushing main triggers GitHub Pages deployment.
