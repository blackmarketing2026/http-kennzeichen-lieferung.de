'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { formatPrice, getPackagePrice } from '@/config/products';

export function OfferBanner() {
  const pathname = usePathname();
  const showPrice = pathname?.replace(/\/$/, '') !== '/kennzeichen-bestellen';
  const offerPrice = formatPrice(getPackagePrice('standard', 'black', 2));

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/konto')) {
    return null;
  }

  return (
    <div className="offer-banner" role="note">
      <span className="offer-banner-label">Angebot</span>
      <span className="offer-banner-message">
        {showPrice ? (
          <>
            Auto (2 Schilder) und Motorrad (1 Schild) im Angebot:{' '}
            <strong>{offerPrice} inklusive Versand</strong>
          </>
        ) : (
          <>Auto- und Motorradkennzeichen im Angebot · DHL-Versand inklusive</>
        )}
      </span>
      <span className="offer-banner-mobile-message">
        {showPrice ? (
          <>
            Auto (2) &amp; Motorrad (1): <strong>{offerPrice} inkl. Versand</strong>
          </>
        ) : (
          <>Auto &amp; Motorrad im Angebot · Versand inklusive</>
        )}
      </span>
      <Link href="/kennzeichen-bestellen#konfigurator">Jetzt bestellen</Link>
    </div>
  );
}
