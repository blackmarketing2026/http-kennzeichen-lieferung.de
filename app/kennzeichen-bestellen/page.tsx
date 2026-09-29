import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'KFZ-Kennzeichen online bestellen | DIN-zertifiziert',
  description:
    'Kennzeichen jetzt im Angebot für 14,90 € inklusive DHL-Versand. In 10 Minuten geprägt und versandfertig; Sendungsverfolgung per E-Mail.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
