import type { Metadata } from 'next';
import Link from 'next/link';
import { EmbeddedCheckout } from '@/components/embedded-checkout';
import { CHECKOUT_UPSELLS_ENABLED } from '@/config/checkout-features';
import { isAvailableConfiguration, isValidPlate, PRODUCTS, type PlateColor, type PlateType } from '@/config/products';
import { checkoutReturnPath, isCheckoutSource } from '@/lib/checkout-draft';
import { DEFAULT_SEASON_END_MONTH, DEFAULT_SEASON_START_MONTH, isValidSeasonPeriod } from '@/lib/season-period';
import { normalizeOffer } from '@/lib/pricing';

const PLATE_TYPES = Object.keys(PRODUCTS) as PlateType[];

export const metadata: Metadata = {
  title: 'Bestellung abschließen | kennzeichen-lieferung.de',
  description: 'Prüfe deine Kennzeichen-Bestellung und gib deine Lieferadresse ein.',
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const params = await searchParams;
  const plate = first(params.plate)?.toUpperCase().replace(/\s+/g, ' ').trim() ?? '';
  const plateType = first(params.type) as PlateType;
  const plateColor = first(params.color) as PlateColor;
  const quantity = Number(first(params.quantity)) as 1 | 2 | 3;
  const bikeRackPlate = first(params.bikeRackPlate) === '1';
  const promoCode = first(params.promo)?.slice(0, 64) ?? '';
  const source = first(params.source);
  const offer = normalizeOffer(first(params.offer));
  const seasonStartMonth = params.seasonStartMonth === undefined ? DEFAULT_SEASON_START_MONTH : Number(first(params.seasonStartMonth));
  const seasonEndMonth = params.seasonEndMonth === undefined ? DEFAULT_SEASON_END_MONTH : Number(first(params.seasonEndMonth));
  const returnPath = isCheckoutSource(source)
    ? checkoutReturnPath(source)
    : undefined;
  const isValid = PLATE_TYPES.includes(plateType) && isAvailableConfiguration(plateType, plateColor, quantity) && isValidPlate(plate, plateType) && (CHECKOUT_UPSELLS_ENABLED || quantity !== 3) && (plateType !== 'season' || isValidSeasonPeriod(seasonStartMonth, seasonEndMonth));

  if (!isValid) {
    return <main className="invalid-checkout"><h1>Bestellung nicht vollständig.</h1><p>Bitte konfiguriere dein Kennzeichen erneut.</p><Link className="button" href="/#konfigurator">Zur Konfiguration</Link></main>;
  }

  return (
    <EmbeddedCheckout
      selection={{ plate, plateType, plateColor, quantity, bikeRackPlate, ...(plateType === 'season' ? { seasonStartMonth, seasonEndMonth } : {}) }}
      initialPromoCode={promoCode}
      offer={offer}
      returnPath={returnPath}
    />
  );
}
