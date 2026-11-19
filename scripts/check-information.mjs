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

const privacyText = privacy.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
for (const paragraph of [
  'AutoLog saves your driving history on your iPhone. Some features use outside services, and you can choose to share a trip yourself.',
  'AutoLog keeps the trip record in the app on your phone. You can record drives without an AutoLog account.',
  'If you choose VIN lookup, AutoLog sends your vehicle identification number (VIN) to the U.S. National Highway Traffic Safety Administration’s vPIC service to find the make, model, and year. You can also enter those details yourself.',
  'When AutoLog needs road data, it sends the boundaries of the trip area to the Overpass API for OpenStreetMap road names and shapes. AutoLog matches those roads to your recorded route on your iPhone.',
  'AutoLog uses Apple services to load the map area and look up place names from coordinates. For a travel-time estimate, it sends Apple the trip’s start and end coordinates after the drive or when you open its details.',
  'A card can show your route and caption. Review both before sharing. On eligible routes, you can trim the ends of the route image. Place names in the caption are edited separately.',
  'A single-trip CSV can include timestamps, car readings, and exact GPS coordinates. A vehicle CSV contains trip summaries. A diagnostic log contains the adapter’s responses. You choose where to send or save the file.',
  'AutoLog uses location to record a drive. Allowing background location lets it record routes when drives start automatically. You can change this in iPhone Settings.',
  'Depending on your settings, iCloud Backup can include AutoLog data. Deleting AutoLog removes its local data. Copies you have shared or backed up are managed separately.',
  'The sample drive uses example data. GitHub Pages hosts the site and logs visitors’ IP addresses for security.',
]) assert.ok(privacyText.includes(paragraph), paragraph);
for (const id of ['on-your-iphone', 'online-requests', 'sharing']) {
  assert.ok(privacy.includes('href="#' + id + '"'), 'Missing jump link to ' + id);
  assert.ok(privacy.includes('id="' + id + '"'), 'Missing destination ' + id);
}
for (const url of [
  'https://www.apple.com/legal/privacy/data/en/apple-maps/',
  'https://support.apple.com/en-us/108770',
  'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages',
]) assert.ok(privacy.includes('href="' + url + '"'), url);
console.log('Information page checks passed');
