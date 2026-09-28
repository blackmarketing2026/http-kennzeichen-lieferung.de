import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'KFZ-Kennzeichen online bestellen | DIN-zertifiziert',
  description:
    'Zwei Auto- oder ein Motorradkennzeichen für 14,99 € inklusive DHL-Versand. In 10 Minuten versandfertig, dreimal täglich abgeholt und mit Tracking.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
