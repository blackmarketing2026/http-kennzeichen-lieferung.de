'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatPrice, PRODUCTS } from '@/config/products';

export function OfferBanner() {
  const pathname = usePathname();
  const offerPrice = formatPrice(PRODUCTS.standard.prices[2]);

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto')) {
    return null;
  }

  return (
    <div className="offer-banner" role="note">
      <span className="offer-banner-label">Angebot</span>
      <span className="offer-banner-message">
        Alle Auto- und Motorradkennzeichen im Angebot:{' '}
        <strong>{offerPrice} pro Schild</strong>{' '}
        inklusive Versand
      </span>
      <span className="offer-banner-mobile-message">
        Auto &amp; Motorrad: <strong>{offerPrice} pro Schild</strong> inkl.
        Versand
      </span>
      <Link href="/kennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>
  );
}
