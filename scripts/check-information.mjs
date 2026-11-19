import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const support = await readFile('dist/support/index.html', 'utf8');
const privacy = await readFile('dist/privacy/index.html', 'utf8');

const supportText = support.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
for (const phrase of [
  'Connecting an OBD2 adapter',
  'Check which adapter works with AutoLog and how to pair it with your iPhone.',
  'Adapter compatibility', 'Look for both details in the adapter’s manual or product listing.',
  'OBD2 connector', 'Adapter type', 'ELM327-compatible OBD2',
  'Bluetooth Low Energy (BLE)', 'Adapters that use only Bluetooth Classic or Wi-Fi won’t connect to AutoLog.',
  'Setup steps', 'Connect the adapter',
  'While parked, plug the adapter into your car’s OBD2 port and turn the ignition on.',
  'Pair with AutoLog', 'Open AutoLog and choose Pair adapter for your car. When your adapter appears, tap Pair next to its name.',
  'Wait for confirmation', 'Keep the ignition on while AutoLog checks the connection. When you see “Adapter paired,” the adapter is saved for that car.',
  'Connection help', 'My adapter doesn’t appear',
  'Check that Bluetooth is on and that AutoLog has Bluetooth access in iPhone Settings. Keep the ignition on, then tap Look again in AutoLog.',
  'The first connection is taking a while', 'Some cars use a slower connection. Leave the pairing screen open while the adapter checks how to communicate with your car.',
]) assert.ok(supportText.includes(phrase), phrase);
for (const id of ['compatibility', 'setup-steps']) {
  assert.ok(support.includes('href="#' + id + '"'), 'Missing jump link to ' + id);
  assert.ok(support.includes('id="' + id + '"'), 'Missing destination ' + id);
}
const diagram = 'images/support/obd2-connector.svg';
assert.ok(support.includes('/autolog-site/' + diagram));
assert.match(await readFile('dist/' + diagram, 'utf8'), /<svg\b/);
assert.doesNotMatch(support, /A little help,|<details|TESTFLIGHT BUILD|hello@|\$15|Weeks of parking are fine/);
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
