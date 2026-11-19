# Implement the Privacy page

1. Implement the article in src/pages/privacy.astro, including the exact approved wording, native section links, provider links and responsive layout.
2. Use the shared layout for its Home header and Support footer. Keep navigation and fonts working on the existing routes and update the shell check.
3. Replace superseded Privacy assertions in the information check, compare all rendered text with Figma, verify keyboard navigation and responsive layouts in a local browser, and include actual browser screenshots in the review.

## SDD ledger

The user approved the Figma design and requested implementation with deployment deferred. The isolated branch is codex/site-privacy.

Article and shared layout reviews passed. The integrated review verified all 36 visible text elements against both approved frames and checked the section destinations, provider URLs and site navigation. A browser check caught two wrapped mobile jump labels. After adjusting their horizontal padding, all three fit on one line at the approved 390px width.

The production build and all four repository checks passed. Chromium verified the page at 320, 390, 768, 1024 and 1440px, with additional 200% text checks at 320 and 861px. The three jumps moved keyboard focus with JavaScript disabled, and Home and Support opened under the configured site base. All three provider links returned HTTP 200. The review image in docs/design/privacy-page.webp combines the final 1440px and 390px browser screenshots.
