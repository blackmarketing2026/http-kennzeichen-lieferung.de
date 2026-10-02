import Link from 'next/link';
import { CookieSettingsButton } from '@/components/cookie-notice';

export function SiteLegalFooter() {
  return (
    <div className="site-legal-footer">
      <span>© {new Date().getFullYear()} Function Concept · kennzeichen-lieferung.de</span>
      <nav aria-label="Rechtliche Informationen">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <Link href="/widerruf">Widerruf</Link>
        <Link href="/liefergarantie">Liefergarantie</Link>
        <Link href="/din-74069">DIN 74069</Link>
        <CookieSettingsButton />
      </nav>
    </div>
  );
}
