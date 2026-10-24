import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// Validate the actual production HTML, without requiring checkout/payment integrations.
const root = '.next/server/app';
const expected = [
  'auto-anmelden-unterlagen', 'auto-anmelden-kosten', 'auto-anmelden-vollmacht',
  'sepa-mandat-kfz-steuer', 'auto-ohne-tuev-anmelden',
  'fahrzeugschein-fahrzeugbrief-unterschied', 'auto-ummelden-kennzeichen-behalten',
  'kurzzeitkennzeichen-fahrzeugueberfuehrung', 'zulassung-abgelehnt-gruende', 'kennzeichengroessen',
];
const all = (await readdir(`${root}/ratgeber`)).filter(name => name.endsWith('.html'));
assert.equal(all.length, 12, 'Ten requested topics plus two preserved legacy guides');
const overview = await readFile(`${root}/ratgeber.html`, 'utf8');
const sitemap = await readFile(`${root}/sitemap.xml.body`, 'utf8');
for (const file of all) {
  const slug = file.replace(/\.html$/, '');
  const html = await readFile(`${root}/ratgeber/${file}`, 'utf8');
  assert.equal([...html.matchAll(/<h1[\s>]/g)].length, 1, `${slug}: single H1`);
  assert.ok(html.includes(`href="https://www.kennzeichen-lieferung.de/ratgeber/${slug}"`), `${slug}: canonical`);
  assert.ok(overview.includes(`href="/ratgeber/${slug}"`), `${slug}: discoverable in overview`);
  assert.ok(sitemap.includes(`https://www.kennzeichen-lieferung.de/ratgeber/${slug}`), `${slug}: in sitemap`);
  for (const slot of ['top', 'sidebar']) assert.equal([...html.matchAll(new RegExp(`data-banner-slot="${slot}"`, 'g'))].length, 1, `${slug}: ${slot} banner`);
  assert.ok(html.includes('Min. Lesezeit'), `${slug}: reading time visible`);
  const structured = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(match => JSON.parse(match[1]));
  const article = structured.find(item => item['@type'] === 'BlogPosting');
  assert.ok(article?.wordCount > 100 && /^PT\d+M$/.test(article.timeRequired), `${slug}: article schema and real reading time`);
  if (expected.includes(slug)) {
    assert.ok(article.wordCount >= 600, `${slug}: substantive article`);
    assert.ok(html.includes('aria-label="Inhaltsverzeichnis"'), `${slug}: contents navigation`);
    assert.ok([...html.matchAll(/<details[\s>]/g)].length >= 3, `${slug}: FAQs`);
    const articleHtml = html.match(/<article>([\s\S]*?)<\/article>/)?.[1] ?? '';
    for (const [, anchor] of articleHtml.matchAll(/href="#([^"]+)"/g)) {
      assert.ok(html.includes(`id="${anchor}"`), `${slug}: anchor ${anchor} resolves`);
    }
    assert.ok(html.includes('Quellen &amp; weitere Informationen'), `${slug}: official sources`);
  }
}
for (const slot of ['top', 'sidebar']) assert.ok(overview.includes(`data-banner-slot="${slot}"`), `overview: ${slot} banner`);
const cost = await readFile(`${root}/ratgeber/auto-anmelden-kosten.html`, 'utf8');
assert.ok(cost.includes('30,60') && cost.includes('22,22'), 'Costs guide has scoped official fee examples');
console.log('Ratgeber smoke passed: 12 production articles, 10 detailed topics, banner slots, reading times, anchors, FAQ, canonical URLs and sitemap.');
