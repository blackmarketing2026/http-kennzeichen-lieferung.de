import type { Metadata } from 'next';
import { MotorcycleLandingPage } from './motorcycle-landing-page';
import { formatPrice, MOTORCYCLE_PACKAGES, SHIPPING_CENTS } from '@/config/products';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: `Motorrad-Kennzeichen bestellen – ab ${formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)} · zzgl. ${formatPrice(SHIPPING_CENTS / 100)} Versand`,
  description: `DIN 74069 Motorrad-Kennzeichen in 180 × 200 mm bestellen. DHL-Versand ${formatPrice(SHIPPING_CENTS / 100)} pro Bestellung.`,
  alternates: { canonical: absoluteUrl('/motorradkennzeichen-bestellen') },
};

export default function Page() {
  const crumbs = [{ name: 'Startseite', href: '/' }, { name: 'Motorradkennzeichen', href: '/motorradkennzeichen-bestellen' }];
  const product = { '@context': 'https://schema.org', '@type': 'Product', name: 'Motorradkennzeichen 180 × 200 mm', description: 'Zweizeiliges geprägtes Motorradkennzeichen mit zugeteilter Kombination.', offers: { '@type': 'Offer', url: absoluteUrl('/motorradkennzeichen-bestellen'), priceCurrency: 'EUR', price: (MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100).toFixed(2) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(crumbs)) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(product) }} /><MotorcycleLandingPage /></>;
}
