import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'KFZ-Kennzeichen online bestellen | DIN-zertifiziert',
  description:
    'Auto- und Motorradkennzeichen online konfigurieren. In 10 Minuten versandfertig, dreimal täglich per DHL abgeholt und mit Tracking verschickt. Gesamtpreis im Checkout.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
