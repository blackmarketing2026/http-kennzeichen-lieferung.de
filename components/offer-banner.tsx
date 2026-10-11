'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatPrice, MOTORCYCLE_PACKAGES } from '@/config/products';

export function OfferBanner() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto') || pathname?.startsWith('/checkout')) {
    return null;
  }

  if (pathname === '/kennzeichen-bestellen-herbstangebot') {
    return <div className="offer-banner" role="note">
      <span className="offer-banner-label">Herbst-Angebot</span>
      <span className="offer-banner-message">Autokennzeichen ab <strong>9,80 €</strong> · Carbon ab <strong>14,60 €</strong></span>
      <span className="offer-banner-mobile-message">Autokennzeichen ab <strong>9,80 €</strong></span>
      <Link href="/kennzeichen-bestellen-herbstangebot#konfigurator">Jetzt bestellen</Link>
    </div>;
  }

  if (pathname === '/motorradkennzeichen-bestellen') {
    return <div className="offer-banner" role="note">
      <span className="offer-banner-label">Motorrad</span>
      <span className="offer-banner-message">Motorrad-Kennzeichen ab <strong>{formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)}</strong> · Versandkostenfrei</span>
      <span className="offer-banner-mobile-message">Motorrad-Schild ab <strong>{formatPrice(MOTORCYCLE_PACKAGES.motorrad_1.priceCents / 100)}</strong></span>
      <Link href="/motorradkennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>;
  }

  return (
    <div className="offer-banner" role="note">
      <span className="offer-banner-label">Kennzeichen</span>
      <span className="offer-banner-message">
        Autokennzeichen ab <strong>9,80 € pro Schild</strong> · versandkostenfrei
      </span>
      <span className="offer-banner-mobile-message">
        Autokennzeichen ab <strong>9,80 €</strong> pro Schild
      </span>
      <Link href="/kennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>
  );
}
