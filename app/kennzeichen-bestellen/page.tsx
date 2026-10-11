import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'Kennzeichen ab 9,80 € bestellen | DIN-zertifiziert',
  description:
    'Autokennzeichen ab 9,80 € pro Schild, Carbon-Optik ab 14,60 €. Alle Preise inkl. 19 % MwSt. und Versand.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
