import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'KFZ-Kennzeichen online bestellen | DIN-zertifiziert',
  description:
    'Kennzeichen in 10 Minuten geprägt und versandfertig. DHL holt an Werktagen dreimal täglich im Druckwerk ab. Sendungsverfolgung per E-Mail; Gesamtpreis im Checkout.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
