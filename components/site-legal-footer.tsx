import Link from 'next/link';
import { CookieSettingsButton } from '@/components/cookie-notice';

export function SiteLegalFooter() {
  return (
    <div className="site-legal-footer">
      <span>© {new Date().getFullYear()} Function Concept · kennzeichen-lieferung.de</span>
      <nav aria-label="Rechtliche Informationen">
        <Link href="/impressum">Impressum</Link>
        <Link href="/datenschutz">Datenschutz</Link>
        <CookieSettingsButton />
      </nav>
    </div>
  );
}
