'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function OfferBanner() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto') || pathname?.startsWith('/checkout')) {
    return null;
  }

  if (pathname === '/kennzeichen-bestellen-herbstangebot') {
    return <div className="offer-banner" role="note">
      <span className="offer-banner-label">Herbst-Angebot</span>
      <span className="offer-banner-message">Für kostenlosen Versand gib den Code <strong>neuekennzeichen</strong> ein.</span>
      <span className="offer-banner-mobile-message">Gratis Versand: <strong>neuekennzeichen</strong></span>
      <Link href="/kennzeichen-bestellen-herbstangebot#konfigurator">Jetzt bestellen</Link>
    </div>;
  }

  if (pathname === '/motorradkennzeichen-bestellen') {
    return <div className="offer-banner" role="note">
      <span className="offer-banner-label">Motorrad</span>
      <span className="offer-banner-message">Für kostenlosen Versand gib den Code <strong>neuekennzeichen</strong> ein.</span>
      <span className="offer-banner-mobile-message">Gratis Versand: <strong>neuekennzeichen</strong></span>
      <Link href="/motorradkennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>;
  }

  return (
    <div className="offer-banner" role="note">
      <span className="offer-banner-label">Kennzeichen</span>
      <span className="offer-banner-message">
        Für kostenlosen Versand gib den Code <strong>neuekennzeichen</strong> ein.
      </span>
      <span className="offer-banner-mobile-message">
        Gratis Versand: <strong>neuekennzeichen</strong>
      </span>
      <Link href="/kennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>
  );
}
