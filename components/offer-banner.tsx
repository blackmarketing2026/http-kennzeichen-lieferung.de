'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function OfferBanner() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto')) {
    return null;
  }

  return (
    <div className="offer-banner" role="note">
      <span className="offer-banner-label">Kennzeichen</span>
      <span className="offer-banner-message">
        Autokennzeichen ab <strong>6,90 € pro Schild</strong> · Versandkostenfrei ab 19 € Warenwert
      </span>
      <span className="offer-banner-mobile-message">
        Autokennzeichen ab <strong>6,90 €</strong> pro Schild
      </span>
      <Link href="/kennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>
  );
}
