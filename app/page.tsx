import type { Metadata } from 'next';
import { OnlineOrderPage } from './kennzeichen-online-bestellen24/online-order-page';
import { absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Kennzeichen online bestellen24 | kennzeichen-lieferung.de',
  description: 'Kennzeichen online konfigurieren und sicher bestellen. Für Auto, E-Auto, Oldtimer, Motorrad und Landmaschinen.',
  alternates: { canonical: absoluteUrl('/') },
};

export default function Home() {
  return <OnlineOrderPage source="home" showKlarnaPromo showProductionPromo showDhlPickupPromo />;
}
