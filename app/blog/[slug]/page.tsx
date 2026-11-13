import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CalendarDays, Clock3 } from 'lucide-react';
import { notFound } from 'next/navigation';
import { GuideBanner } from '@/components/guide-banner';
import { blogArticles, blogReadingMinutes, formatBlogDate } from '@/config/blog';
import { getGuideBanners } from '@/config/guide-banners';
import { guides } from '@/config/guides';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import styles from '../../ratgeber/ratgeber.module.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return blogArticles.map(article => ({ slug: article.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find(item => item.slug === slug);
  if (!article) return {};
  const url = absoluteUrl(`/blog/${article.slug}`);
  return { title: `${article.title} | Blog`, description: article.description, alternates: { canonical: url },
    openGraph: { type: 'article', locale: 'de_DE', title: article.title, description: article.description, url, publishedTime: article.publishedAt, ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}) } };
}
export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = blogArticles.find(item => item.slug === slug);
  if (!article) notFound();
  const banners = getGuideBanners();
  const related = (article.relatedGuideSlugs ?? []).map(slug => guides.find(guide => guide.slug === slug)).filter(item => item !== undefined);
  const url = absoluteUrl(`/blog/${article.slug}`);
  const breadcrumbs = [{ name: 'Startseite', href: '/' }, { name: 'Blog', href: '/blog' }, { name: article.title, href: `/blog/${article.slug}` }];
  const schema = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: article.title, description: article.description, mainEntityOfPage: url, inLanguage: 'de-DE', datePublished: article.publishedAt, ...(article.updatedAt ? { dateModified: article.updatedAt } : {}), author: { '@type': 'Organization', name: 'kennzeichen-lieferung.de', url: absoluteUrl('/') } };
  return <main className={styles.page} id="artikelanfang">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(breadcrumbs)) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
    <header className={styles.header}><Link className={styles.logo} href="/" aria-label="kennzeichen-lieferung.de ? Startseite"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link><nav aria-label="Hauptnavigation"><Link href="/blog">Alle Blogartikel</Link><Link href="/kennzeichen-bestellen">Kennzeichen bestellen <ArrowRight size={16} aria-hidden="true" /></Link></nav></header>
    <div className={styles.container}>
      <nav className={styles.crumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><Link href="/blog">Blog</Link><span>/</span><span aria-current="page">{article.title}</span></nav>
      <GuideBanner content={banners.top} position="top" />
      <div className={styles.article}><article>
        <div className={styles.articleIntro}><span>{article.category}</span><h1>{article.title}</h1><p>{article.description}</p><div className={styles.meta}><span><Clock3 size={16} aria-hidden="true" />{blogReadingMinutes(article)} Min. Lesezeit</span><span>Redaktion kennzeichen-lieferung.de</span><span><CalendarDays size={16} aria-hidden="true" />{article.updatedAt ? 'Aktualisiert: ' : 'Ver?ffentlicht: '}<time dateTime={article.updatedAt ?? article.publishedAt}>{formatBlogDate(article.updatedAt ?? article.publishedAt)}</time></span></div></div>
        <div className={styles.body}>
          {article.intro.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          <div className={styles.takeaway}><strong>Das Wichtigste vorab</strong><p>{article.takeaway}</p></div>
          <nav className={styles.toc} aria-label="Inhaltsverzeichnis"><strong>In diesem Artikel</strong><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title}</a></li>)}</ol></nav>
          {article.sections.map(section => <section key={section.id} id={section.id} className={styles.articleSection}><h2>{section.title}</h2>{section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}{section.items && <ul className={styles.checklist}>{section.items.map((item, index) => <li key={index}>{item}</li>)}</ul>}</section>)}
          {article.sources && article.sources.length > 0 && <section className={styles.sources}><h2>Quellen & weitere Informationen</h2><ul>{article.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ?</a></li>)}</ul></section>}
        </div>
        <section className={styles.next}><span>DEIN N?CHSTER SCHRITT</span><h2>Das passende Kennzeichen bestellen</h2><p>Deine Kombination steht fest? Konfiguriere deine Schilder und pr?fe den Gesamtpreis vor der Zahlung.</p><Link href="/kennzeichen-bestellen">Jetzt Kennzeichen bestellen <ArrowRight size={17} aria-hidden="true" /></Link><small>Schilderbestellung ohne Reservierung, Zulassung und amtliche Plaketten.</small></section>
        {related.length > 0 && <section className={styles.related}><h2>Das k?nnte dich auch interessieren</h2>{related.map(item => <Link href={`/ratgeber/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={17} aria-hidden="true" /></Link>)}</section>}
        <a className={styles.backTop} href="#artikelanfang">Zur?ck nach oben ?</a>
      </article><aside className={styles.aside} aria-label="Kennzeichenbestellung"><GuideBanner content={banners.sidebar} position="sidebar" /><nav className={styles.asideLinks} aria-label="Weitere Inhalte"><strong>Weiterlesen</strong><Link href="/blog">Alle Blogartikel ?</Link><Link href="/ratgeber">Alle Ratgeber ?</Link></nav></aside></div>
    </div>
  </main>;
}
