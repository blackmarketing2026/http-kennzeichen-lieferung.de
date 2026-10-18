import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import { guides } from '@/config/guides';
import styles from './ratgeber.module.css';

export const metadata: Metadata = {
  title: 'Ratgeber rund ums Kennzeichen | kennzeichen-lieferung.de',
  description: 'Reservierung, Kennzeichengrößen und Online-Bestellung verständlich erklärt. Finde den passenden nächsten Schritt für deine Schilder.',
  alternates: { canonical: absoluteUrl('/ratgeber') },
};

export default function GuideOverview() {
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, { name: 'Ratgeber', href: '/ratgeber' }])) }} />
    <header className={styles.header}><Link href="/">← Zur Startseite</Link><Link href="/kennzeichen-bestellen">Kennzeichen bestellen <ArrowRight size={17} /></Link></header>
    <div className={styles.container}><nav className={styles.crumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><span>/</span><span>Ratgeber</span></nav><section className={styles.hero}><span>WISSEN VOR DER BESTELLUNG</span><h1>Ratgeber rund ums Kennzeichen</h1><p>Was du selbst erledigst, was die Behörde entscheidet und welches Schild zu deiner Kombination passt.</p></section><section className={styles.cards} aria-label="Ratgeberartikel">{guides.map((guide, index) => <Link key={guide.slug} href={`/ratgeber/${guide.slug}`}><span>0{index + 1} / RATGEBER</span><h2>{guide.title}</h2><p>{guide.teaser}</p><strong>Artikel lesen <ArrowRight size={17} /></strong></Link>)}</section><section className={styles.next}><h2>Deine Kombination steht schon fest?</h2><p>Wähle die Schildart im Konfigurator und prüfe Preis und Versand vor dem Bezahlen.</p><Link href="/#konfigurator">Zum Konfigurator <ArrowRight size={17} /></Link></section></div>
  </main>;
}
