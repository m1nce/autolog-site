import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

for (const page of ['index.html', 'support/index.html', 'privacy/index.html']) {
  const html = await readFile(`dist/${page}`, 'utf8');
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /href="\/autolog-site\/support"/);
  assert.match(html, /href="\/autolog-site\/privacy"/);
  const shell = `${html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? ''}${html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? ''}`;
  assert.doesNotMatch(shell, /Get the app|hello@/);
  assert.doesNotMatch(html, /cockpit-ground/);
  assert.doesNotMatch(html, /(?:href|src)="\/fonts\//);
}

console.log('Shared shell checks passed');
