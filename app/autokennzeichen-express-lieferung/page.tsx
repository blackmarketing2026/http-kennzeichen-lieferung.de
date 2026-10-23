import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Clock3, PackageCheck, ShieldCheck, Truck } from 'lucide-react';
import { ExpressConfigurator } from './express-configurator';
import { DELIVERY_PROMISE_TEXT } from '@/lib/delivery-promise';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import { formatPrice, PRODUCTS, SHIPPING_CENTS } from '@/config/products';
import styles from './page.module.css';

const path = '/autokennzeichen-express-lieferung';

export const metadata: Metadata = {
  title: 'Autokennzeichen & Autoschilder mit Expresslieferung bestellen',
  description: `Autokennzeichen online bestellen: in 10 Minuten geprägt und versandfertig, DHL-Abholung 3-mal täglich an Werktagen. Mit Liefergarantie. Ab ${formatPrice(PRODUCTS.standard.prices[1])} zzgl. ${formatPrice(SHIPPING_CENTS / 100)} Versand.`,
  alternates: { canonical: absoluteUrl(path) },
};

export default function ExpressPage() {
  const crumbs = [{ name: 'Startseite', href: '/' }, { name: 'Autokennzeichen Expresslieferung', href: path }];
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(crumbs)) }} />
    <header className={styles.header}><Link href="/" className={styles.logo}>kennzeichen<span>-lieferung.de</span></Link><nav aria-label="Navigation"><Link href="/kennzeichen-bestellen">Autokennzeichen</Link><Link href="/liefergarantie">Liefergarantie</Link></nav><a href="#konfigurator" className={styles.headerCta}>Jetzt bestellen <ArrowRight size={17} /></a></header>
    <div className={styles.breadcrumb}><Link href="/">Startseite</Link><span>/</span> Autokennzeichen Expresslieferung</div>
    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>Autoschilder schnell bestellen</p>
        <h1>Autokennzeichen mit <em>Expresslieferung</em> bestellen</h1>
        <p className={styles.lead}>Dein Autoschild wird nach dem Kauf schnell bearbeitet: Innerhalb von 10 Minuten geprägt und versandfertig. DHL holt an Werktagen dreimal täglich bei uns ab.</p>
        <div className={styles.heroFacts}><div><Clock3 /><strong>10 Minuten</strong><span>bis versandfertig</span></div><div><Truck /><strong>3× täglich</strong><span>DHL-Abholung an Werktagen</span></div></div>
        <p className={styles.shippingNote}>{DELIVERY_PROMISE_TEXT} Die tatsächliche Zustellung hängt vom DHL-Transport ab.</p>
      </div>
      <ExpressConfigurator />
    </section>
    <section className={styles.process}><div className={styles.container}><p className={styles.eyebrow}>Schnelle Abwicklung</p><h2>So kommen deine Nummernschilder auf den Weg</h2><div className={styles.cards}><article><span>01</span><h3>Kombination eingeben</h3><p>Gib deine zugeteilte oder reservierte Kombination ein und prüfe die Vorschau. Die Reservierung selbst erfolgt bei deiner Zulassungsstelle.</p></article><article><span>02</span><h3>Direkt prägen</h3><p>Nach erfolgreicher Bestellung und Zahlung werden deine Autokennzeichen innerhalb von 10 Minuten geprägt, verpackt und für den Versand vorbereitet.</p></article><article><span>03</span><h3>DHL übernimmt</h3><p>An Werktagen gibt es drei DHL-Abholungen. Sobald die Sendung erfasst wurde, kannst du den Versand über die Sendungsverfolgung prüfen.</p></article></div></div></section>
    <section className={styles.guarantee}><div className={styles.container}><ShieldCheck size={38} /><div><p className={styles.eyebrow}>Mit Liefergarantie</p><h2>Für deinen Zulassungstermin gut abgesichert</h2><p>Wird die bei deiner Bestellung zugesagte Lieferfrist überschritten und musst du deshalb vor Ort Ersatzkennzeichen kaufen, erstatten wir unter den Bedingungen unserer Liefergarantie den bei uns gezahlten Kaufpreis für die betroffenen Schilder.</p><Link href="/liefergarantie">Bedingungen der Liefergarantie ansehen <ArrowRight size={17} /></Link></div></div></section>
    <section className={styles.faq}><div className={styles.container}><p className={styles.eyebrow}>Häufige Fragen</p><h2>Autoschilder und Expresslieferung</h2><details><summary>Wann sind meine Autokennzeichen versandfertig?</summary><p>Nach Bestellung und erfolgreicher Zahlung prägen und verpacken wir deine Kennzeichenschilder innerhalb von 10 Minuten.</p></details><details><summary>Werden die Autoschilder noch am selben Tag geliefert?</summary><p>Eine Zustellung am selben Tag ist nicht zugesagt. DHL holt an Werktagen dreimal täglich ab. Für Lieferungen innerhalb Deutschlands gilt die bei der Bestellung zugesagte Frist von 1–4 Werktagen nach Bestellung und erfolgreicher Zahlung.</p></details><details><summary>Gilt die Liefergarantie auch für Autokennzeichen?</summary><p>Ja. Die freiwillige Liefergarantie gilt nach ihren Bedingungen auch für betroffene Autokennzeichen. Die Voraussetzungen und den Antrag findest du auf der <Link href="/liefergarantie">Seite zur Liefergarantie</Link>.</p></details><details><summary>Sind die amtlichen Plaketten enthalten?</summary><p>Nein. Die Plaketten erhältst du bei der Zulassungsstelle; sie sind nicht Teil der Schilderbestellung.</p></details><a className={styles.bottomCta} href="#konfigurator"><PackageCheck size={19} /> Autoschilder jetzt konfigurieren <ArrowRight size={18} /></a></div></section>
  </main>;
}
