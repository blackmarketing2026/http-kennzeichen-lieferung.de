'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HerbstCountdown } from '@/components/herbst-countdown';

export function OfferBanner() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto') || pathname?.startsWith('/checkout')) {
    return null;
  }

  if (pathname === '/kennzeichen-bestellen-herbstangebot') {
    return <div className="offer-banner" role="note">
      <span className="offer-banner-label">Herbst-Angebot</span>
      <span className="offer-banner-message"><HerbstCountdown /></span>
      <span className="offer-banner-mobile-message"><HerbstCountdown compact /></span>
      <Link href="/kennzeichen-bestellen-herbstangebot#angebote">Angebote ansehen</Link>
    </div>;
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
