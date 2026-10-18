import assert from 'node:assert/strict';

const local = process.env.SEO_SMOKE_ORIGIN ?? 'http://localhost:56782';
const publicOrigin = 'https://www.kennzeichen-lieferung.de';
const products = [
  '/kennzeichen-bestellen', '/motorradkennzeichen-bestellen', '/fahrradtraeger-kennzeichen',
  '/anhaengerkennzeichen', '/e-kennzeichen', '/h-kennzeichen', '/saisonkennzeichen',
  '/carbon-kennzeichen', '/kennzeichenhalter',
];
const guides = [
  '/ratgeber', '/ratgeber/wunschkennzeichen-reservieren',
  '/ratgeber/kennzeichengroessen', '/ratgeber/kennzeichen-online-bestellen',
];

for (const path of ['/', ...products, ...guides]) {
  const response = await fetch(local + path);
  assert.equal(response.status, 200, `${path} should load`);
  const html = await response.text();
  assert.match(html, /<h1[\s>]/, `${path} needs a visible H1`);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/);
  assert.equal(canonical?.[1], path === '/' ? publicOrigin : publicOrigin + path, `${path} canonical`);
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(match => JSON.parse(match[1]));
  if (products.includes(path)) {
    assert.ok(jsonLd.some(item => item['@type'] === 'Product' && item.offers?.price), `${path} Product/Offer`);
    assert.ok(jsonLd.some(item => item['@type'] === 'BreadcrumbList'), `${path} breadcrumbs`);
  } else if (guides.includes(path)) {
    assert.ok(!jsonLd.some(item => item['@type'] === 'Product'), `${path} has no Product markup`);
  }
}

for (const [alias, target] of [['/autokennzeichen', '/kennzeichen-bestellen'], ['/motorradkennzeichen', '/motorradkennzeichen-bestellen']]) {
  const response = await fetch(local + alias, { redirect: 'manual' });
  assert.equal(response.status, 308, `${alias} redirect status`);
  assert.equal(response.headers.get('location'), target, `${alias} redirect target`);
}

const checkout = await (await fetch(local + '/checkout')).text();
assert.match(checkout, /<meta\s+name="robots"\s+content="[^"]*noindex/, 'checkout noindex');
const sitemap = await (await fetch(local + '/sitemap.xml')).text();
const sitemapPaths = [
  '/', ...products, ...guides, '/landmaschinen-kennzeichen', '/autohaendlerpartner',
  '/din-74069', '/liefergarantie', '/impressum', '/datenschutz', '/widerruf',
];
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
assert.deepEqual(new Set(sitemapUrls).size, sitemapUrls.length, 'sitemap has no duplicate URLs');
assert.equal(sitemapUrls.length, sitemapPaths.length, 'sitemap contains only intended public pages');
for (const path of sitemapPaths) assert.ok(sitemapUrls.includes(publicOrigin + path), `${path} in sitemap`);
for (const path of ['/checkout', '/kennzeichen-online-bestellen24', '/autokennzeichen', '/motorradkennzeichen']) {
  assert.ok(!sitemapUrls.includes(publicOrigin + path), `${path} excluded from sitemap`);
}
const robots = await (await fetch(local + '/robots.txt')).text();
assert.ok(robots.includes(publicOrigin + '/sitemap.xml'), 'robots advertises sitemap');
console.log(`SEO smoke passed: ${1 + products.length + guides.length} pages, redirects, checkout, sitemap and robots.`);
