import type { Metadata } from 'next';
import { KennzeichenLandingPage } from './kennzeichen-landing-page';

export const metadata: Metadata = {
  title: 'Kennzeichen ab 6,90 € bestellen | DIN-zertifiziert',
  description:
    'Autokennzeichen ab 6,90 € pro Schild, Carbon-Optik für 5,00 € Aufpreis. Alle Preise inkl. 19 % MwSt. Versand 3,90 €, kostenlos ab 19 € Warenwert.',
  alternates: { canonical: '/kennzeichen-bestellen' },
};

export default function KennzeichenBestellenPage() {
  return <KennzeichenLandingPage />;
}
