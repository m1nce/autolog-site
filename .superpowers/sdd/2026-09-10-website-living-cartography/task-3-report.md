# Task 3 report — Support and Privacy

## Result

- Replaced Support cards/accordion/contact/build marker with the approved introduction and six fully visible question-and-answer sections.
- Reworked Privacy into the approved reading layout with one `h1`, five section headings, the approved date label, and all five policy paragraphs preserved.
- Reused `Base`, `reading-page`, `reading-page--privacy`, shared tokens, and `withBase('/privacy')`; no shared source changed.

## TDD evidence

RED command:

```sh
PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH npm run build && PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node scripts/check-information.mjs
```

Result: exit 1 after a successful three-route Astro build. `assert.match(support, /A little help,/)` failed against the old Support page, as expected.

GREEN command:

```sh
PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH npm run build && PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node scripts/check-information.mjs && PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node scripts/check-shell.mjs && PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node scripts/check-home.mjs
```

Result: exit 0. Astro built three pages; output ended with `Information page checks passed`, `Shared shell checks passed`, and `Homepage checks passed`.

## Self-review and concerns

- Six Support answers match approved Figma copy and render as `h2`/`p` sections with top rules.
- Privacy date and five policy paragraphs pass normalized built-output equality checks; placeholder contact copy is absent.
- The focused checker rejects the removed accordion, build marker, price, parking guarantee, and placeholder email.
- Product evidence supports the scoped Support claims. Pre-release concern remains: policy wording “Your VIN is sent once” describes a user-initiated decode, not a guaranteed once-per-install limit. It was preserved because legal copy changes were explicitly out of scope.
- Browser/Figma screenshot, 200% zoom, 320 px, and navigation checks are assigned to the controller and were not duplicated here.
