import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
const visibleCopy = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

for (const phrase of [
  'Compare two drives',
  'AutoLog records your drives so you can look back at the routes you took.',
  'Select a day to see the route and drive time.',
  'Monday commute', 'Sunday detour',
  'Monday’s route', 'The car took the direct route from town to home.',
  'Sunday’s route', 'The detour along the Alder River added 3.2 miles to the drive home.',
  '8.4 mi', '18 min', '11.6 mi', '27 min', 'Illustrative drive history',
  'Drive history by car', 'Sample entries', 'Connecting your car',
  'Connect the adapter', 'Pair with AutoLog', 'Choose your readings', 'Check adapter compatibility',
]) assert.ok(visibleCopy.includes(phrase), `Missing approved homepage copy: ${phrase}`);

assert.match(html, /id="the-app"/);
assert.match(html, /id="setup"/);
const radios = html.match(/<input\b[^>]*type="radio"[^>]*>/g) ?? [];
assert.equal(radios.length, 2, 'Two native day choices');
assert.equal(radios.filter(r => /\schecked(?:\s|=|>)/.test(r)).length, 1, 'One default drive');
assert.match(radios.find(r => /\schecked(?:\s|=|>)/.test(r)), /value="monday"/, 'Monday opens first');
for (const day of ['monday', 'sunday']) {
  const asset = `images/sample-drive/${day}.svg`;
  assert.ok(html.includes('/autolog-site/' + asset), `Missing ${day} map`);
  assert.match(await readFile('dist/' + asset, 'utf8'), /<svg\b/);
}
assert.doesNotMatch(html, /Explore AutoLog|Your drives\. Your cars\. Your story\.|href="#"/);
console.log('Sample drive homepage checks passed');
