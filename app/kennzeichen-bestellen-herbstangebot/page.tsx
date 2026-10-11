import type { Metadata } from 'next';
import { KennzeichenLandingPage } from '@/app/kennzeichen-bestellen/kennzeichen-landing-page';
import { HERBST_DESCRIPTION } from '@/lib/pricing';

export const metadata: Metadata = {
  title: 'Herbst-Angebot: Autokennzeichen ab 9,80 € | kennzeichen-lieferung.de',
  description: HERBST_DESCRIPTION,
  alternates: { canonical: '/kennzeichen-bestellen' },
  robots: { index: false, follow: true },
};

export default function HerbstangebotPage() {
  return <KennzeichenLandingPage offer="herbst" />;
}
