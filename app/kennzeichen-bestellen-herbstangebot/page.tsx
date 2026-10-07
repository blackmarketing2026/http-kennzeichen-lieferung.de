import type { Metadata } from 'next';
import { KennzeichenLandingPage } from '@/app/kennzeichen-bestellen/kennzeichen-landing-page';
import { HERBST_DESCRIPTION } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Herbst-Angebot: 3 Kennzeichen für 21,90 € | kennzeichen-lieferung.de',
  description: HERBST_DESCRIPTION,
  alternates: { canonical: '/kennzeichen-bestellen' },
  robots: { index: false, follow: true },
};

export default function HerbstangebotPage() {
  return <KennzeichenLandingPage offer="herbst" />;
}
