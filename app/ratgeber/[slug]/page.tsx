import type { Metadata } from 'next';
import { Children, isValidElement, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock3, ArrowRight, CalendarDays } from 'lucide-react';
import { notFound } from 'next/navigation';
import { guides } from '@/config/guides';
import { registrationGuides, guideReadingMinutes, guideWordCount, GUIDE_REVIEWED_DATE } from '@/config/registration-guides';
import { getGuideBanners } from '@/config/guide-banners';
import { GuideBanner } from '@/components/guide-banner';
import { legacyGuideContent } from '@/components/legacy-guide-content';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import styles from '../ratgeber.module.css';

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map(guide => ({ slug: guide.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Ratgeber`, description: guide.teaser,
    alternates: { canonical: absoluteUrl(`/ratgeber/${guide.slug}`) },
    openGraph: { type: 'article', locale: 'de_DE', title: guide.title, description: guide.teaser, url: absoluteUrl(`/ratgeber/${guide.slug}`) },
  };
}
function legacyText(node: ReactNode): string {
  return Children.toArray(node).map(child => {
    if (typeof child === 'string' || typeof child === 'number') return String(child);
    if (isValidElement<{ children?: ReactNode }>(child)) return legacyText(child.props.children);
    return '';
  }).join(' ');
}
export default async function GuideArticle({ params }: Props) {
  const { slug } = await params;
  const guide = guides.find(item => item.slug === slug);
  if (!guide) notFound();
  const article = registrationGuides.find(item => item.slug === slug);
  const legacy = article ? null : legacyGuideContent(slug);
  const wordCount = article ? guideWordCount(article) : legacyText(legacy).trim().split(/\s+/u).length;
  const readingMinutes = article ? guideReadingMinutes(article) : Math.max(1, Math.ceil(wordCount / 200));
  const banners = getGuideBanners(slug);
  const related = article ? article.related.map(item => guides.find(guide => guide.slug === item)).filter(item => item !== undefined) : registrationGuides.slice(0, 3);
  const breadcrumbs = [{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }, { name: guide.title, href: `/ratgeber/${slug}` }];
  const schema = {
    '@context': 'https://schema.org', '@type': 'BlogPosting', headline: guide.title, description: guide.teaser,
    mainEntityOfPage: absoluteUrl(`/ratgeber/${slug}`), inLanguage: 'de-DE', wordCount, timeRequired: `PT${readingMinutes}M`,
    author: { '@type': 'Organization', name: 'kennzeichen-lieferung.de', url: absoluteUrl('/') },
    ...(article ? { dateModified: GUIDE_REVIEWED_DATE } : {}),
  };
  return <main className={styles.page} id="artikelanfang">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(breadcrumbs)) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(schema) }} />
    <header className={styles.header}>
      <Link className={styles.logo} href="/" aria-label="kennzeichen-lieferung.de – Startseite"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link>
      <nav aria-label="Hauptnavigation"><Link href="/ratgeber">Alle Ratgeber</Link><Link href="/kennzeichen-bestellen">Kennzeichen bestellen <ArrowRight size={16} aria-hidden="true" /></Link></nav>
    </header>
    <div className={styles.container}>
      <nav className={styles.crumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><Link href="/ratgeber">Ratgeber</Link><span>/</span><span aria-current="page">{guide.title}</span></nav>
      <GuideBanner content={banners.top} position="top" />
      <div className={styles.article}>
        <article>
          <div className={styles.articleIntro}><span>{article?.category ?? 'KENNZEICHENWISSEN'}</span><h1>{guide.title}</h1><p>{guide.teaser}</p>
            <div className={styles.meta}><span><Clock3 size={16} aria-hidden="true" />{readingMinutes} Min. Lesezeit</span><span>Redaktion kennzeichen-lieferung.de</span>{article && <span><CalendarDays size={16} aria-hidden="true" />Stand: <time dateTime={GUIDE_REVIEWED_DATE}>24. Oktober 2026</time></span>}</div>
          </div>
          <div className={styles.body}>
            {article ? <>
              {article.intro.map(text => <p key={text}>{text}</p>)}
              <div className={styles.takeaway}><strong>Das Wichtigste vorab</strong><p>{article.takeaway}</p></div>
              <nav className={styles.toc} aria-label="Inhaltsverzeichnis"><strong>In diesem Ratgeber</strong><ol>{article.sections.map(section => <li key={section.id}><a href={`#${section.id}`}>{section.title.replace(/^\d+\. /u, '')}</a></li>)}<li><a href="#haeufige-fragen">Häufige Fragen</a></li></ol></nav>
              {article.sections.map(section => <section key={section.id} id={section.id} className={styles.articleSection}>
                <h2>{section.title}</h2>{section.paragraphs.map(text => <p key={text}>{text}</p>)}
                {section.items && <ul className={styles.checklist}>{section.items.map(text => <li key={text}>{text}</li>)}</ul>}
                {section.table && <div className={styles.tableWrap} role="region" aria-label={section.title} tabIndex={0}><table><thead><tr>{section.table.headers.map(header => <th scope="col" key={header}>{header}</th>)}</tr></thead><tbody>{section.table.rows.map(row => <tr key={row[0]}>{row.map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div>}
              </section>)}
              <section id="haeufige-fragen" className={styles.faq}><h2>Häufige Fragen</h2>{article.faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</section>
              <section className={styles.sources}><h2>Quellen & weitere Informationen</h2><p>Die folgenden amtlichen Informationen ergänzen diesen Ratgeber. Für Unterlagen, Gebühren und Sonderfälle prüfe die Angaben deiner zuständigen Zulassungsstelle.</p><ul>{article.sources.map(source => <li key={source.href}><a href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul></section>
            </> : legacy}
          </div>
          <section className={styles.next}><span>DEIN NÄCHSTER SCHRITT</span><h2>Schilderkauf? Kannst du jetzt erledigen.</h2><p>{article?.cta ?? 'Deine Kombination steht fest? Konfiguriere die passenden Schilder und prüfe den Gesamtpreis vor der Zahlung.'}</p><Link href="/kennzeichen-bestellen">Jetzt Kennzeichen bestellen <ArrowRight size={17} aria-hidden="true" /></Link><small>Geprägte Schilder ohne Reservierung, Zulassung und amtliche Plaketten.</small></section>
          <section className={styles.related}><h2>Das könnte dich auch interessieren</h2>{related.map(item => <Link href={`/ratgeber/${item.slug}`} key={item.slug}>{item.title}<ArrowRight size={17} aria-hidden="true" /></Link>)}</section>
          <a className={styles.backTop} href="#artikelanfang">Zurück nach oben ↑</a>
        </article>
        <aside className={styles.aside} aria-label="Kennzeichen bestellen und weitere Ratgeber">
          <GuideBanner content={banners.sidebar} position="sidebar" />
          <nav className={styles.asideLinks} aria-label="Weitere Schritte"><strong>Gut vorbereitet weiter</strong><Link href="/ratgeber/auto-anmelden-unterlagen">Unterlagen zur Anmeldung</Link><Link href="/ratgeber/kennzeichengroessen">Die passende Schildgröße</Link><Link href="/ratgeber">Alle Ratgeber ansehen →</Link></nav>
        </aside>
      </div>
    </div>
  </main>;
}
