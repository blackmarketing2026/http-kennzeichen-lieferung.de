'use client';

import Link from 'next/link';
import { formatPrice, getPackagePrice } from '@/config/products';
import { usePathname } from 'next/navigation';

export function OfferBanner() {
  const pathname = usePathname();
  const offerPrice = formatPrice(getPackagePrice('standard', 'black', 2));

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto')) {
    return null;
  }

  return (
    <div className="offer-banner" role="note">
      <span className="offer-banner-label">Angebot</span>
      <span className="offer-banner-message">
        Auto (2 Schilder) und Motorrad (1 Schild) im Angebot:{' '}
        <strong>{offerPrice} inklusive Versand</strong>
      </span>
      <span className="offer-banner-mobile-message">
        Auto (2) &amp; Motorrad (1): <strong>{offerPrice} inkl. Versand</strong>
      </span>
      <Link href="/kennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>
  );
}
