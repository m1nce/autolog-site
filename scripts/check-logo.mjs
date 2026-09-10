import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const pages = ['index.html', 'support/index.html', 'privacy/index.html'];
const logoPattern = /<img[^>]*src="\/autolog-site\/images\/brand\/autolog-symbol\.svg"[^>]*>/g;

for (const page of pages) {
  const html = await readFile(`dist/${page}`, 'utf8');
  const header = html.match(/<header[\s\S]*?<\/header>/)?.[0] ?? '';
  const footer = html.match(/<footer[\s\S]*?<\/footer>/)?.[0] ?? '';

  for (const region of [header, footer]) {
    const logos = region.match(logoPattern) ?? [];
    assert.equal(logos.length, 1, `${page} logo count`);
    assert.match(logos[0], /\bwidth="44"/);
    assert.match(logos[0], /\bheight="44"/);
    assert.match(logos[0], /\balt=""/);
    assert.match(region, /<a[^>]*>[\s\S]*AutoLog[\s\S]*<\/a>/, `${page} visible AutoLog text`);
  }

  assert.doesNotMatch(html, /(?:src|href)="\/images\/brand\//, `${page} root-relative brand URL`);
}

console.log('Logo checks passed');
