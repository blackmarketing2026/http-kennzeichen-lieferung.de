import type { Metadata } from 'next';
import { OnlineOrderPage } from './kennzeichen-online-bestellen24/online-order-page';

export const metadata: Metadata = {
  title: 'Kennzeichen online bestellen24 | kennzeichen-lieferung.de',
  description: 'Kennzeichen online konfigurieren, Preis und Versand prüfen und sicher bestellen. Für Auto, E-Auto, Oldtimer, Motorrad und Landmaschinen.',
  alternates: { canonical: '/' },
};

export default function Home() {
  return <OnlineOrderPage source="home" showKlarnaPromo showProductionPromo showDhlPickupPromo />;
}
