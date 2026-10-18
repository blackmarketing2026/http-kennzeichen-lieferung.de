import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { AttributionCapture } from '@/components/attribution-capture';
import { CookieNotice } from '@/components/cookie-notice';
import { GoogleTagManager } from '@/components/google-tag-manager';
import { OfferBanner } from '@/components/offer-banner';
import { SiteLegalFooter } from '@/components/site-legal-footer';
import { SITE_URL } from '@/lib/seo';
import { formatPrice, PRODUCTS, SHIPPING_CENTS } from '@/config/products';
import './globals.css';
import './legal.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Kennzeichen ab ${formatPrice(PRODUCTS.standard.prices[1])} bestellen | kennzeichen-lieferung.de`,
  description: `Autokennzeichen ab ${formatPrice(PRODUCTS.standard.prices[1])} pro Schild inklusive Mehrwertsteuer. DHL-Versand ${formatPrice(SHIPPING_CENTS / 100)} pro Bestellung.`,
  verification: { google: '3eVs0LhlAGvw-1_l3sJ4n2cefBlZHmvodAL6PfKm2aE' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de"><body data-clarity-unmask="true" className={`${geistSans.variable} ${geistMono.variable}`}><AttributionCapture /><OfferBanner />{children}<SiteLegalFooter /><CookieNotice /><GoogleTagManager /></body></html>;
}
