# Implement Support setup and compatibility

1. Replace the older Support FAQ in src/pages/support.astro with the approved responsive layout and semantic HTML. Use the exported connector asset, native anchors, and suitable line lengths at intermediate widths.
2. Adapt the shared shell for Support with its Home header and Privacy footer. Reuse the site typography, wordmark and route helpers. Preserve homepage and Privacy navigation.
3. Update the existing information and shell checks, then verify all three static routes. Compare browser renders with Figma and test mobile jump links, keyboard focus, enlarged text and base-prefixed navigation. Attach rendered evidence to the draft PR.

## SDD ledger

The user approved both Figma designs and authorized implementation. Work is isolated on codex/site-support. Deployment is deferred.

Both implementation tasks and the integrated branch passed independent review. The built page contains all approved Figma text labels from both layouts. The production build generated all three routes and the four site checks passed. Chrome verified the layout at 320, 390, 768, 861, 1024 and 1440 px, including enlarged text, both keyboard jump links with JavaScript disabled, and navigation to Home and Privacy. Desktop and mobile render evidence is in docs/design/support-setup.webp.
