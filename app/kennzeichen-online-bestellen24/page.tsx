import type { Metadata } from 'next';
import { OnlineOrderPage } from './online-order-page';

export const metadata: Metadata = {
  title: 'Kennzeichen online bestellen24 | kennzeichen-lieferung.de',
  description: 'Kennzeichen online konfigurieren, Preis und Versand prüfen und sicher bestellen. Für Auto, E-Auto, Oldtimer, Motorrad und Landmaschinen.',
  alternates: { canonical: '/kennzeichen-online-bestellen24' },
};

export default function Page() {
  return <OnlineOrderPage />;
}
