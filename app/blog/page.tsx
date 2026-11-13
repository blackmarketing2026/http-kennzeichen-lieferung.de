import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, BookOpen, Clock3 } from 'lucide-react';
import { GuideBanner } from '@/components/guide-banner';
import { getGuideBanners } from '@/config/guide-banners';
import { blogArticles, blogReadingMinutes, formatBlogDate } from '@/config/blog';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import styles from '../ratgeber/ratgeber.module.css';

export const metadata: Metadata = {
  title: 'Blog rund um Kennzeichen und Zulassung',
  description: 'Wissenswertes und praktische Tipps rund um Kennzeichen, Fahrzeuge und Zulassung im Blog von kennzeichen-lieferung.de.',
  alternates: { canonical: absoluteUrl('/blog') },
};

export default function BlogOverview() {
  const banners = getGuideBanners();
  const articles = [...blogArticles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, { name: 'Blog', href: '/blog' }])) }} />
    <header className={styles.header}><Link className={styles.logo} href="/" aria-label="kennzeichen-lieferung.de ? Startseite"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link><nav aria-label="Hauptnavigation"><Link href="/ratgeber">Ratgeber</Link><Link href="/kennzeichen-bestellen">Kennzeichen bestellen <ArrowRight size={17} aria-hidden="true" /></Link></nav></header>
    <div className={styles.container}>
      <nav className={styles.crumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span aria-current="page">Blog</span></nav>
      <section className={styles.hero}><span>WISSEN F?R UNTERWEGS</span><h1>Der Blog rund ums Kennzeichen.</h1><p>Ideen, Hintergr?nde und praktische Tipps f?r alles, was dich rund um dein Fahrzeug und dein Kennzeichen besch?ftigt.</p><div className={styles.meta}><span><BookOpen size={17} aria-hidden="true" />{articles.length} Artikel</span></div></section>
      <GuideBanner content={banners.top} position="top" />
      <div className={styles.overviewLayout}>
        <section aria-label="Blogartikel">{articles.length ? <div className={styles.cards}>{articles.map(article => <Link key={article.slug} href={`/blog/${article.slug}`}><span>{article.category}</span><h2>{article.title}</h2><p>{article.description}</p><small className={styles.cardTime}><Clock3 size={14} aria-hidden="true" />{blogReadingMinutes(article)} Min. Lesezeit ? <time dateTime={article.publishedAt}>{formatBlogDate(article.publishedAt)}</time></small><strong>Artikel lesen <ArrowRight size={17} aria-hidden="true" /></strong></Link>)}</div> : <div className={styles.takeaway}><strong>Hier entstehen neue Beitr?ge</strong><p>Bis die ersten Blogartikel erscheinen, findest du praktische Informationen und Checklisten in unseren <Link href="/ratgeber">Ratgebern</Link>.</p></div>}</section>
        <aside className={styles.aside} aria-label="Kennzeichenbestellung"><GuideBanner content={banners.sidebar} position="sidebar" /></aside>
      </div>
      <section className={styles.next}><h2>Du suchst konkrete Antworten?</h2><p>Unsere Ratgeber helfen dir bei der Vorbereitung deiner Zulassung und der Wahl des passenden Kennzeichens.</p><Link href="/ratgeber">Alle Ratgeber ansehen <ArrowRight size={17} aria-hidden="true" /></Link></section>
    </div>
  </main>;
}
