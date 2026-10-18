import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';
import { CARBON_SURCHARGE, formatPrice, PRODUCTS, SHIPPING_CENTS } from '@/config/products';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Autokennzeichen bestellen | Kennzeichen prägen lassen',
  description:
    `Autokennzeichen ab ${formatPrice(PRODUCTS.standard.prices[1])} pro Schild, Carbon-Optik ab ${formatPrice(PRODUCTS.standard.prices[1] + CARBON_SURCHARGE)}. Alle Preise inkl. 19 % MwSt., zzgl. ${formatPrice(SHIPPING_CENTS / 100)} Versand pro Bestellung.`,
  alternates: { canonical: absoluteUrl('/kennzeichen-bestellen') },
};

export default function KennzeichenBestellenPage() {
  const crumbs = [{ name: 'Startseite', href: '/' }, { name: 'Autokennzeichen', href: '/kennzeichen-bestellen' }];
  const product = { '@context': 'https://schema.org', '@type': 'Product', name: 'Autokennzeichen 520 × 110 mm', description: 'Geprägtes einzeiliges Autokennzeichen mit zugeteilter Kombination.', image: absoluteUrl('/shipping/kennzeichen-versandkarton.webp'), offers: { '@type': 'Offer', url: absoluteUrl('/kennzeichen-bestellen'), priceCurrency: 'EUR', price: PRODUCTS.standard.prices[1].toFixed(2) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(crumbs)) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(product) }} /><KennzeichenLandingPage /></>;
}
