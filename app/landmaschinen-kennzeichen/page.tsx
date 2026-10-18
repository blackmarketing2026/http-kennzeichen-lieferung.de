import type { Metadata } from 'next';
import { LandmaschinenLandingPage } from './landmaschinen-landing-page';
import { PRODUCTS } from '@/config/products';
import { absoluteUrl, breadcrumbJsonLd, safeJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Landmaschinen-Kennzeichen online bestellen | Grün oder Schwarz',
  description:
    'Kleine zweizeilige Kennzeichen für Traktor und Landmaschine in 240 × 130 mm oder 255 × 130 mm. Schwarze oder grüne Schrift, DIN-zertifiziert und schnell versandfertig.',
  alternates: {
    canonical: absoluteUrl('/landmaschinen-kennzeichen'),
  },
};

export default function Page() {
  const crumbs = [{ name: 'Startseite', href: '/' }, { name: 'Landmaschinen-Kennzeichen', href: '/landmaschinen-kennzeichen' }];
  const product = { '@context': 'https://schema.org', '@type': 'Product', name: 'Landmaschinen-Kennzeichen', description: 'Zweizeiliges Kennzeichen für Landmaschinen in den angebotenen Formaten.', image: absoluteUrl('/landmaschinen/traktor-live-vorschau.png'), offers: { '@type': 'Offer', url: absoluteUrl('/landmaschinen-kennzeichen'), priceCurrency: 'EUR', price: PRODUCTS.agriculture240.prices[1].toFixed(2) } };
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbJsonLd(crumbs)) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(product) }} /><LandmaschinenLandingPage /></>;
}
