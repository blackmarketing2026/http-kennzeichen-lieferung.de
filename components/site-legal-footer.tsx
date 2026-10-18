'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CookieSettingsButton } from '@/components/cookie-notice';

export function SiteLegalFooter() {
  const pathname = usePathname();
  const isHerbst = pathname === '/kennzeichen-bestellen-herbstangebot';
  if (pathname === '/checkout') return null;
  return (
    <><nav className="site-directory" aria-label="Produkte und Ratgeber">
      <div><strong>Kennzeichen</strong><Link href="/kennzeichen-bestellen">Autokennzeichen</Link><Link href="/motorradkennzeichen-bestellen">Motorradkennzeichen</Link><Link href="/anhaengerkennzeichen">Anhängerkennzeichen</Link><Link href="/fahrradtraeger-kennzeichen">Fahrradträger-Kennzeichen</Link></div>
      <div><strong>Ausführungen</strong><Link href="/e-kennzeichen">E-Kennzeichen</Link><Link href="/h-kennzeichen">H-Kennzeichen</Link><Link href="/saisonkennzeichen">Saisonkennzeichen</Link><Link href="/carbon-kennzeichen">Carbon-Optik</Link><Link href="/kennzeichenhalter">Kennzeichenhalter</Link></div>
      <div><strong>Ratgeber</strong><Link href="/ratgeber">Alle Ratgeber</Link><Link href="/ratgeber/wunschkennzeichen-reservieren">Wunschkennzeichen reservieren</Link><Link href="/ratgeber/kennzeichengroessen">Kennzeichengrößen</Link><Link href="/ratgeber/kennzeichen-online-bestellen">Online bestellen</Link></div>
    </nav><div className="site-legal-footer">
      <span>© {new Date().getFullYear()} Function Concept · kennzeichen-lieferung.de</span>
      <nav aria-label="Rechtliche Informationen">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/widerruf">Widerruf</Link>
        <Link href="/liefergarantie">{isHerbst ? 'Pünktlich-Garantie' : 'Liefergarantie'}</Link>
        <Link href="/din-74069">DIN 74069</Link>
        <CookieSettingsButton />
      </nav>
    </div></>
  );
}
