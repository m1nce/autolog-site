# Implement the sample drive homepage

Goal: implement the approved desktop and mobile homepage with the exact wording in the [spec](../specs/2026-11-19-sample-drive-homepage.md).

1. Build the accessible sample drive component. Use native radios with a visible focus indicator and state-dependent content. Export the two approved maps. Verify switch direction, data, and layout on both sizes.
2. Implement the page sections and homepage-only navigation and footer in Astro. Use the existing brand assets and fonts, link the setup anchor and preserve support and privacy navigation. Verify published-base asset paths and visible text against Figma.
3. Update the homepage and shell checks, build the three routes, verify intermediate widths, keyboard, no-JS, reduced motion and 200% scaling. Capture actual desktop and mobile evidence. Review both tasks and the integrated branch before handoff.

## SDD ledger

The user approved the Figma concepts and authorized implementation on 19 November 2026. Work is isolated in the website repository on codex/site-sample-drive. The site deploys from main. Integration awaits the user's decision.

- Task 1 complete. The two native radio options switch the local map, route summary and metrics. Independent review confirmed the interaction and keyboard access. After the desktop title-width correction, the heading fits on one line and the metrics divider measures y568.
- Task 2 complete. The page uses the approved copy, illustrations and scoped navigation. Review identified the missing DM Sans Medium face and mobile spacing differences. The site now serves the existing licensed font locally. At 390 px the setup begins at y1399 and the parked example at y1952.
- Integration verification passed. The static build produced all three routes. All four site checks passed, including the Monday default. Chrome exercised both selections by keyboard and pointer with page JavaScript disabled, under reduced motion, at 320, 390, 720, 768, 1024 and 1440 px. Enlarged text and intermediate layouts kept the controls usable. The branch includes screenshots from the production build for PR review.
