import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const fontFiles = ['Newsreader-Regular.woff2', 'DMSans-Regular.woff2', 'BricolageGrotesque-Medium.woff2'];

function checkPage(html) {
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<main[\s>]/);
  assert.match(html, /href="\/autolog-site\/privacy"/);
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  assert.match(header, /href="\/autolog-site\/support"/);
  assert.match(header, /href="\/autolog-site\/#the-app"/);
  const shell = `${header}${html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? ''}`;
  assert.doesNotMatch(shell, /Get the app|hello@/);
  assert.doesNotMatch(html, /cockpit-ground/);
  assert.doesNotMatch(html, /(?:href|src)="\/fonts\//);
  for (const fontFile of fontFiles) {
    assert.match(html, new RegExp(`url\\('\\/autolog-site\\/fonts\\/${fontFile.replace('.', '\\.')}'\\)`));
  }
  assert.doesNotMatch(html, /url\(\s*["']?\/fonts\//);
}

for (const page of ['index.html', 'support/index.html', 'privacy/index.html']) {
  checkPage(await readFile(`dist/${page}`, 'utf8'));
}

const fixture = await readFile('dist/index.html', 'utf8');
assert.throws(() => checkPage(fixture.replace('href="/autolog-site/support"', 'href="/autolog-site/other"')), /autolog-site\\\/support/);
assert.throws(() => checkPage(fixture.replace("url('/autolog-site/fonts/Newsreader-Regular.woff2')", "url('/fonts/Newsreader-Regular.woff2')")), /url/);

console.log('Shared shell checks passed');
