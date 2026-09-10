import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile('dist/index.html', 'utf8');
assert.match(html, /id="the-app"/);
assert.match(html, /href="\/autolog-site\/#the-app"/);
for (const phrase of ['Explore AutoLog', 'For every car in your life.', 'Change the layout while parked.', 'Plug it in.', 'Pair once.', 'Go about your day.']) assert.ok(html.includes(phrase), phrase);
assert.match(html, /Design preview/);
assert.doesNotMatch(html, /APP STORE BADGE|href="#"|scrolly-active|IntersectionObserver|hero-route-path/);
assert.doesNotMatch(html, /<script\b/);
console.log('Homepage checks passed');
