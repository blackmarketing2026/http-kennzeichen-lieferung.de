import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { CookieNotice } from '@/components/cookie-notice';
import { GoogleTagManager } from '@/components/google-tag-manager';
import { SiteLegalFooter } from '@/components/site-legal-footer';
import './globals.css';
import './legal.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Kennzeichen online bestellen | kennzeichen-lieferung.de',
  description: 'Wunschkennzeichen live konfigurieren, Ausführung wählen und transparente Kosten prüfen.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body className={`${geistSans.variable} ${geistMono.variable}`}>{children}<SiteLegalFooter /><CookieNotice /><GoogleTagManager /></body></html>;
}
