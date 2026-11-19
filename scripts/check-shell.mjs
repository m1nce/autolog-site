import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const fontFiles = ['Newsreader-Regular.woff2', 'DMSans-Regular.woff2', 'BricolageGrotesque-Medium.woff2'];

function checkPage(html, page) {
  assert.match(html, /<html[^>]*lang="en"/);
  assert.match(html, /<main[\s>]/);
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';
  assert.match(footer, /href="\/autolog-site\/privacy"[^>]*>Privacy<\/a>/);
  if (page === 'support/index.html') {
    assert.match(header, /href="\/autolog-site\/"[^>]*>Home<\/a>/);
    for (const region of [header, footer]) {
      assert.equal((region.match(/<a\s/g) ?? []).length, 2);
      assert.match(region, /href="\/autolog-site\/"[^>]*>\s*<img[^>]+>\s*AutoLog<\/a>/);
    }
    assert.doesNotMatch(footer, /Your drives/);
    assert.match(html, /url\('\/autolog-site\/fonts\/DMSans-Medium.ttf'\)/);
  } else {
    assert.match(header, /href="\/autolog-site\/support"/);
    assert.match(footer, /href="\/autolog-site\/support"/);
    if (page === 'index.html') assert.match(header, /href="(?:\/autolog-site\/)?#setup"/);
    else assert.match(header, /href="\/autolog-site\/#the-app"/);
  }
  const shell = `${header}${footer}`;
  assert.doesNotMatch(shell, /Get the app|hello@/);
  assert.doesNotMatch(html, /cockpit-ground/);
  assert.doesNotMatch(html, /(?:href|src)="\/fonts\//);
  for (const fontFile of fontFiles) {
    assert.match(html, new RegExp(`url\\('\\/autolog-site\\/fonts\\/${fontFile.replace('.', '\\.')}'\\)`));
  }
  assert.doesNotMatch(html, /url\(\s*["']?\/fonts\//);
}

for (const page of ['index.html', 'support/index.html', 'privacy/index.html']) {
  checkPage(await readFile(`dist/${page}`, 'utf8'), page);
}

const fixture = await readFile('dist/index.html', 'utf8');
assert.throws(() => checkPage(fixture.replace('href="/autolog-site/support"', 'href="/autolog-site/other"'), 'index.html'), /autolog-site\\\/support/);
assert.throws(() => checkPage(fixture.replace("url('/autolog-site/fonts/Newsreader-Regular.woff2')", "url('/fonts/Newsreader-Regular.woff2')"), 'index.html'), /url/);

console.log('Shared shell checks passed');
