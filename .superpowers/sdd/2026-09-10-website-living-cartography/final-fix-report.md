# Final checker fix wave

Date: 2026-09-10
Branch: `codex/site-living-cartography`
Base: `c256b07`

## Change

Updated `scripts/check-shell.mjs` only. The checker now scopes required Support and The app links to the desktop/mobile header, verifies the three prefixed CSS `@font-face` URLs, and rejects unprefixed CSS `url('/fonts/...')` paths. Two in-memory mutations are asserted to fail: removing the header Support destination and unprefixing the Newsreader font URL.

## Verification

Passed:

```text
PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH npm run build
3 page(s) built in 167ms
Complete!

PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node scripts/check-shell.mjs
Shared shell checks passed
```

The existing browser checks were each run once, as requested, but Chrome could not launch in this environment (SIGABRT/EPERM before any page was opened):

```text
PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node .superpowers/sdd/2026-09-10-website-living-cartography/check-browser.mjs
browserType.launch: Target page, context or browser has been closed
signal=SIGABRT

PATH=/Users/minchan/.nvm/versions/node/v22.21.1/bin:$PATH node .superpowers/sdd/2026-09-10-website-living-cartography/check-zoom-keyboard.mjs
browserType.launch: Target page, context or browser has been closed
signal=SIGABRT
```

`git diff --check` passed after the scoped edit.
