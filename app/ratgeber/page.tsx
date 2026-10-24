import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, BookOpen } from 'lucide-react';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import { guides } from '@/config/guides';
import { registrationGuides, guideReadingMinutes } from '@/config/registration-guides';
import { getGuideBanners } from '@/config/guide-banners';
import { GuideBanner } from '@/components/guide-banner';
import styles from './ratgeber.module.css';

export const metadata: Metadata = {
  title: 'Ratgeber: Auto anmelden & Kennzeichen bestellen',
  description: 'Unterlagen, Kosten, Vollmacht, HU und Kennzeichengrößen: ausführliche Ratgeber mit Checklisten für deine Zulassung und Kennzeichenbestellung.',
  alternates: { canonical: absoluteUrl('/ratgeber') },
};
export default function GuideOverview() {
  const banners = getGuideBanners();
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }])) }} />
    <header className={styles.header}><Link className={styles.logo} href="/" aria-label="kennzeichen-lieferung.de – Startseite"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link><nav aria-label="Hauptnavigation"><Link href="/">Zur Startseite</Link><Link href="/kennzeichen-bestellen">Kennzeichen bestellen <ArrowRight size={17} aria-hidden="true" /></Link></nav></header>
    <div className={styles.container}>
      <nav className={styles.crumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span aria-current="page">Ratgeber</span></nav>
      <section className={styles.hero}><span>WISSEN VOR DER BESTELLUNG</span><h1>Dein Auto. Dein Kennzeichen.<br />Dein nächster Schritt.</h1><p>Von der ersten Unterlagenliste bis zum passenden Schild: Hier findest du verständliche Antworten, praktische Checklisten und einen klaren Weg zu deiner Zulassung.</p><div className={styles.meta}><span><BookOpen size={17} aria-hidden="true" />{guides.length} Ratgeber</span><span>Mit amtlichen Quellen & praktischen Tipps</span></div></section>
      <GuideBanner content={banners.top} position="top" />
      <div className={styles.overviewLayout}>
        <section className={styles.cards} aria-label="Ratgeberartikel">{guides.map((guide, index) => {
          const article = registrationGuides.find(item => item.slug === guide.slug);
          return <Link key={guide.slug} href={`/ratgeber/${guide.slug}`}><span>{String(index + 1).padStart(2, '0')} / {article?.category ?? 'Kennzeichenwissen'}</span><h2>{guide.title}</h2><p>{guide.teaser}</p>{article && <small className={styles.cardTime}><Clock3 size={14} aria-hidden="true" />{guideReadingMinutes(article)} Min. Lesezeit</small>}<strong>Ratgeber lesen <ArrowRight size={17} aria-hidden="true" /></strong></Link>;
        })}</section>
        <aside className={styles.aside} aria-label="Kennzeichenbestellung"><GuideBanner content={banners.sidebar} position="sidebar" /></aside>
      </div>
      <section className={styles.next}><h2>Deine Kombination steht schon fest?</h2><p>Dann kannst du den Schilderkauf jetzt erledigen. Wähle deine Ausführung, prüfe deine Kombination und bestelle bequem online.</p><Link href="/kennzeichen-bestellen">Jetzt Kennzeichen bestellen <ArrowRight size={17} aria-hidden="true" /></Link><small>Schilderbestellung ohne Reservierung, Zulassung und amtliche Plaketten.</small></section>
    </div>
  </main>;
}
