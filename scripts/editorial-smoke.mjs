import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {blogArticles} from '../config/blog.ts';
import {registrationGuides} from '../config/registration-guides.ts';
const origin=process.env.SEO_SMOKE_ORIGIN ?? 'http://localhost:56782';
const canonicalOrigin='https://www.kennzeichen-lieferung.de';
const pages=JSON.parse(readFileSync(new URL(`../docs/seo/${process.env.SEO_SMOKE_DATE ?? '2026-11-13'}-new-pages.json`,import.meta.url),'utf8'));
const allGuides=new Set([...registrationGuides.map(a=>a.slug),'kennzeichen-online-bestellen','wunschkennzeichen-reservieren']);
const urls=new Set();
for(const a of blogArticles){
 assert(!urls.has(a.slug),'unique blog slug');urls.add(a.slug);
 assert.equal(new Set(a.sections.map(s=>s.id)).size,a.sections.length,'unique section ids');
 for(const g of a.relatedGuideSlugs??[]) assert(allGuides.has(g),`unknown guide ${g}`);
}
const checked=new Map();
async function get(path){if(!checked.has(path)){const res=await fetch(origin+path);checked.set(path,{status:res.status,html:await res.text()});}return checked.get(path);}
const sitemap=(await get('/sitemap.xml')).html;
const sitemapUrls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
assert.equal(sitemapUrls.length,new Set(sitemapUrls).size,'unique sitemap entries');
for(const {path,title} of pages){
 const {status,html}=await get(path);
 assert.equal(status,200,path);
 assert.equal([...html.matchAll(/<h1[\s>]/g)].length,1,`${path} one H1`);
 assert(html.includes(title),`${path} title`);
 assert(html.includes(`rel="canonical" href="${canonicalOrigin+path}"`),`${path} canonical`);
 assert.match(html,/<meta name="description" content="[^"]+"/,`${path} description`);
 assert(!/<meta name="robots" content="[^"]*noindex/.test(html),`${path} indexable`);
 const schemas=[...html.matchAll(/<script type="application\/ld\+json">([^<]+)<\/script>/g)].map(m=>JSON.parse(m[1]));
 assert(schemas.some(s=>s['@type']==='BlogPosting'&&s.headline===title),`${path} article schema`);
 assert(schemas.some(s=>s['@type']==='BreadcrumbList'),`${path} breadcrumbs`);
 assert(sitemapUrls.includes(canonicalOrigin+path),`${path} sitemap`);
 const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
 for(const m of html.matchAll(/href="(#[^"]+)"/g)) assert(ids.has(m[1].slice(1)),`${path} broken anchor ${m[1]}`);
 for(const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {if(!m[1].startsWith('//')&&!m[1].startsWith('/_next/'))assert.equal((await get(m[1])).status,200,`${path} broken link ${m[1]}`);}
 assert(html.includes('href="/kennzeichen-bestellen"'),`${path} CTA`);
 const overview=path.startsWith('/blog/')?'/blog':'/ratgeber';
 assert((await get(overview)).html.includes(`href="${path}"`),`${path} overview link`);
 console.log(`OK ${path}`);
}
for(const path of ['/blog/seo-pruefung-unbekannt','/ratgeber/seo-pruefung-unbekannt'])assert.equal((await get(path)).status,404,path);
assert(existsSync(new URL('../public/kennzeichen-lieferung-logo.png',import.meta.url)),'logo exists');
console.log(`Editorial smoke passed: ${pages.length} new pages; ${checked.size} HTTP targets; sitemap, metadata, JSON-LD, links and 404.`);
