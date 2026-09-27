import type { Metadata } from 'next';
import { LandmaschinenLandingPage } from './landmaschinen-landing-page';

export const metadata: Metadata = {
  title: 'Landmaschinen-Kennzeichen online bestellen | Grün oder Schwarz',
  description:
    'Kleine zweizeilige Kennzeichen für Traktor und Landmaschine in 240 × 130 mm oder 255 × 130 mm. Schwarze oder grüne Schrift, DIN-zertifiziert und schnell versandfertig.',
  alternates: {
    canonical: '/landmaschinen-kennzeichen',
  },
};

export default function Page() {
  return <LandmaschinenLandingPage />;
}
