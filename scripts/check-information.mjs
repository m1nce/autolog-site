import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const support = await readFile('dist/support/index.html', 'utf8');
const privacy = await readFile('dist/privacy/index.html', 'utf8');

assert.match(support, /A little help,/);
assert.equal((support.match(/<h2[\s>]/g) ?? []).length, 6);
assert.doesNotMatch(support, /<details|TESTFLIGHT BUILD|hello@|\$15|Weeks of parking are fine/);
assert.doesNotMatch(support, /<a[^>]+>Privacy page<\/a>/);
assert.match(privacy, /22 August 2026/);

const text = privacy
  .replace(/<[^>]*>/g, ' ')
  .replace(/&#39;|&#x27;|&apos;/g, "'")
  .replace(/\s+/g, ' ');

for (const paragraph of [
  'Trips, stats, and everything the app knows about your car are stored on your phone. There is no account, no sign-in, no analytics, and no AutoLog server. Delete the app and the data goes with it.',
  'Both are best effort and silent. When they fail, the app skips them and moves on.',
  "Your VIN is sent once to the NHTSA vPIC API, a US government service, to identify the car's make, model, and year. Nothing else is attached to the request.",
  "After a trip, the bounding box of the trip's area is sent to the Overpass API, an OpenStreetMap service, to fetch road shapes and names. The route you drove stays on the phone.",
  'It never uploads a route, never sells or shares driving data, and never scores your driving. There is no third party code in the app at all.',
]) assert.ok(text.includes(paragraph), paragraph);

assert.doesNotMatch(privacy, /hello@|Write to the engineer/);
console.log('Information page checks passed');
