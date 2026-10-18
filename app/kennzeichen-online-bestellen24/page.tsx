import type { Metadata } from 'next';
import { OnlineOrderPage } from './online-order-page';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Kennzeichen online bestellen24 | kennzeichen-lieferung.de',
  description: 'Kennzeichen online konfigurieren, Preis und Versand prüfen und sicher bestellen. Für Auto, E-Auto, Oldtimer, Motorrad und Landmaschinen.',
  alternates: { canonical: absoluteUrl('/') },
  robots: { index: false, follow: true },
};

export default function Page() {
  return <OnlineOrderPage />;
}
