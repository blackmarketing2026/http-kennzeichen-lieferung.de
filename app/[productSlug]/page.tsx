import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, ChevronRight, Truck } from 'lucide-react';
import { SeoProductConfigurator } from '@/components/seo-product-configurator';
import { ADDONS } from '@/config/addons';
import { SEO_PRODUCTS, SEO_PRODUCT_SLUGS } from '@/config/seo-products';
import { formatPrice, SHIPPING_CENTS } from '@/config/products';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';
import styles from './product-page.module.css';

type Props = { params: Promise<{ productSlug: string }> };

export function generateStaticParams() { return SEO_PRODUCT_SLUGS.map(productSlug => ({ productSlug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = SEO_PRODUCTS[(await params).productSlug];
  if (!product) return {};
  return { title: product.title, description: product.description, alternates: { canonical: absoluteUrl(`/${product.slug}`) } };
}

export default async function ProductPage({ params }: Props) {
  const product = SEO_PRODUCTS[(await params).productSlug];
  if (!product) notFound();
  const pricing = getCheckoutPricing(product.type, product.color, product.quantity, undefined, { parkingPlate: false, bikeRackPlate: product.bikeRack === true });
  const itemPrice = product.holderAddon ? ADDONS.holderScrews.priceCents / 100 : pricing ? (pricing.totalCents - pricing.shippingCents) / 100 : 0;
  const breadcrumbs = [{ name: 'Startseite', href: '/' }, { name: product.h1, href: `/${product.slug}` }];
  const productJsonLd = {
    '@context': 'https://schema.org', '@type': 'Product', name: product.bikeRack ? 'Zwei Autokennzeichen mit Fahrradträger-Wiederholungskennzeichen' : product.h1,
    description: product.intro, image: absoluteUrl(product.image),
    offers: { '@type': 'Offer', url: absoluteUrl(`/${product.slug}`), priceCurrency: 'EUR', price: itemPrice.toFixed(2), ...(product.holderAddon ? { description: 'Nur als Zusatz zu einer Kennzeichenbestellung erhältlich' } : {}) },
  };
  return <main className={styles.page}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(breadcrumbs)) }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(productJsonLd) }} />
    <header className={styles.header}><Link className={styles.logo} href="/"><Image src="/kennzeichen-lieferung-logo.png" alt="kennzeichen-lieferung.de" width={2172} height={724} priority /></Link><nav aria-label="Hauptnavigation"><Link href="/kennzeichen-bestellen">Autokennzeichen</Link><Link href="/motorradkennzeichen-bestellen">Motorrad</Link><Link href="/ratgeber">Ratgeber</Link></nav><a href="#konfigurator">Jetzt konfigurieren <ArrowRight size={17} /></a></header>
    <nav className={styles.breadcrumb} aria-label="Brotkrumennavigation"><Link href="/">Startseite</Link><ChevronRight size={14} /><span>{product.h1}</span></nav>
    <div className={styles.hero}><div className={styles.intro}><span className={styles.eyebrow}>{product.eyebrow}</span><h1>{product.h1}</h1><p>{product.intro}</p><div className={styles.price}><strong>{product.holderAddon ? `${formatPrice(itemPrice)} als Zusatz` : `Ab ${formatPrice(itemPrice)} für die Auswahl`}</strong><span>inkl. MwSt. · zzgl. {formatPrice(SHIPPING_CENTS / 100)} Versand pro Bestellung</span></div><ul><li><Check size={17} /> Preis vor dem Bezahlen sehen</li><li><Truck size={17} /> DHL-Versand mit Sendungsverfolgung</li><li><Check size={17} /> Keine Reservierung oder Zulassung im Shop</li></ul><figure className={styles.photo}><Image src={product.image} alt={product.imageAlt} width={1536} height={1024} sizes="(max-width: 900px) 100vw, 50vw" priority /><figcaption>Illustrative Aufnahme · die konkrete Schildausführung zeigt der Konfigurator</figcaption></figure></div><SeoProductConfigurator product={product} /></div>
    <section className={styles.details}><div><span className={styles.eyebrow}>GUT ZU WISSEN</span><h2>{product.detailTitle}</h2>{product.detail.map(text => <p key={text}>{text}</p>)}</div><aside><h3>Auf einen Blick</h3><ul>{product.specs.map(spec => <li key={spec}><Check size={17} />{spec}</li>)}</ul><p>Die verfügbaren Formate im Shop stammen aus der zentralen Produktauswahl. Ob eine bestimmte Kombination und Schildform für dein Fahrzeug zugeteilt wird, entscheidet die Zulassungsbehörde.</p></aside></section>
    <section className={styles.process}><span className={styles.eyebrow}>SO BESTELLST DU</span><h2>Von der Kombination zum fertigen Schild</h2><div><article><strong>01</strong><h3>Kombination eingeben</h3><p>Trage die zugeteilten Zeichen ein und prüfe die Vorschau. Hier wird nichts reserviert.</p></article><article><strong>02</strong><h3>Auswahl prüfen</h3><p>{product.holderAddon ? 'Bestelle passende Kennzeichen und füge die Halter im Checkout hinzu.' : 'Wähle Menge und angebotene Ausführung; die Gesamtsumme wird direkt berechnet.'}</p></article><article><strong>03</strong><h3>Adresse und Zahlung</h3><p>Im bestehenden Checkout gibst du die Lieferadresse ein, prüfst den Preis und wählst die Zahlungsart.</p></article></div></section>
    <section className={styles.faq}><div><span className={styles.eyebrow}>FRAGEN ZUM PRODUKT</span><h2>Häufig gefragt</h2></div><div>{product.faqs.map(faq => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <section className={styles.related}><h2>Passend dazu</h2><div>{product.related.map(link => <Link key={link.href} href={link.href}>{link.label}<ArrowRight size={18} /></Link>)}<Link href="/ratgeber/kennzeichen-online-bestellen">So funktioniert die Bestellung<ArrowRight size={18} /></Link></div><p>Mehr zu amtlichen Schildern und Maßen: <a href="https://www.gesetze-im-internet.de/fzv_2023/__12.html" target="_blank" rel="noopener noreferrer">§ 12 FZV</a> und <a href="https://www.gesetze-im-internet.de/fzv_2023/anlage_4.html" target="_blank" rel="noopener noreferrer">Anlage 4 FZV</a>.</p></section>
  </main>;
}
