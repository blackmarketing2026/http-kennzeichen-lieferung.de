import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'KFZ-Kennzeichen online bestellen | DIN-zertifiziert',
  description:
    'Auto- und Motorradkennzeichen ab 14,99 € pro Schild inklusive DHL-Versand. In 10 Minuten versandfertig, dreimal täglich abgeholt und mit Tracking.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
