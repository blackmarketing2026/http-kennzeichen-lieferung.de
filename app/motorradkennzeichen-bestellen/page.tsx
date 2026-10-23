import type { Metadata } from 'next';
import { MotorcycleLandingPage } from './motorcycle-landing-page';
import { formatPrice, MOTORCYCLE_PACKAGES, SHIPPING_CENTS } from '@/config/products';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Motorradkennzeichen bestellen | 180 × 200 mm',
  description: `Motorrad-Kennzeichen online bestellen: 180 × 200 mm, zweizeilig, Standard oder Carbon-Optik. Ab ${formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)} zzgl. ${formatPrice(SHIPPING_CENTS / 100)} Versand.`,
  alternates: { canonical: absoluteUrl('/motorradkennzeichen-bestellen') },
};

export default function Page() {
  const crumbs = [{ name: 'Startseite', href: '/' }, { name: 'Motorradkennzeichen', href: '/motorradkennzeichen-bestellen' }];
  const product = { '@context': 'https://schema.org', '@type': 'Product', name: 'Motorradkennzeichen 180 × 200 mm', description: 'Zweizeiliges geprägtes Motorradkennzeichen mit zugeteilter Kombination.', offers: { '@type': 'Offer', url: absoluteUrl('/motorradkennzeichen-bestellen'), priceCurrency: 'EUR', price: (MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100).toFixed(2) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(crumbs)) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(product) }} /><MotorcycleLandingPage /></>;
}
