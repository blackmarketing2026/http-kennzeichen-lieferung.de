import type { Metadata } from 'next';
import { MotorcycleLandingPage } from './motorcycle-landing-page';
import { formatPrice, MOTORCYCLE_PACKAGES } from '@/config/products';

export const metadata: Metadata = {
  title: `Motorrad-Kennzeichen bestellen – ab ${formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)} versandkostenfrei`,
  description: 'DIN 74069 Motorrad-Kennzeichen in 180 × 200 mm bestellen. Versandkostenfrei, auf Wunsch mit Ersatzschild für Beschädigungen.',
  alternates: { canonical: '/motorradkennzeichen-bestellen' },
};

export default function Page() {
  return <MotorcycleLandingPage />;
}
