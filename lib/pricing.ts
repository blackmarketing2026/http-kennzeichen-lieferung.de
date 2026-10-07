import type { PlateColor, PlateType } from '@/config/products';

export type OfferProfile = 'standard' | 'herbst';
export type HerbstPackage = 'basis' | 'complete' | 'premium';

export const HERBST_PRICING = {
  standardPlateCents: 790,
  carbonPlateCents: 1290,
  shippingCents: 390,
  completeCents: 2190,
  premiumCents: 3490,
  completeAfterOfferCents: 2390,
  premiumAfterOfferCents: 3790,
  // Berlin uses CET (UTC+01:00) on 31 October and 1 November 2026.
  endsAt: '2026-10-31T23:59:59+01:00',
  changesAt: '2026-11-01T00:00:00+01:00',
} as const;

export const HERBST_DESCRIPTION =
  '3 DIN-Kennzeichen inkl. Fahrradträger-Schild für 21,90 €, versandkostenfrei. In 10 Minuten geprägt. Pünktlich-Garantie: nicht in 4 Werktagen da = Geld zurück.';

export function normalizeOffer(value: unknown): OfferProfile {
  return value === 'herbst' ? 'herbst' : 'standard';
}

export function getHerbstPackage(
  plateType: PlateType,
  color: PlateColor,
  baseQuantity: number,
  bikeRackPlate: boolean,
  parkingPlate = false,
): HerbstPackage | null {
  if (plateType !== 'standard' || (color !== 'black' && color !== 'carbon') || baseQuantity !== 2 || parkingPlate) return null;
  if (bikeRackPlate) return color === 'carbon' ? 'premium' : 'complete';
  return color === 'black' ? 'basis' : null;
}

export function herbstSetPriceCents(color: PlateColor, now: Date = new Date()) {
  const afterOffer = now.getTime() >= Date.parse(HERBST_PRICING.changesAt);
  return color === 'carbon'
    ? afterOffer ? HERBST_PRICING.premiumAfterOfferCents : HERBST_PRICING.premiumCents
    : afterOffer ? HERBST_PRICING.completeAfterOfferCents : HERBST_PRICING.completeCents;
}

export function herbstIndividualComparisonCents(color: 'black' | 'carbon') {
  return 3 * (color === 'carbon' ? HERBST_PRICING.carbonPlateCents : HERBST_PRICING.standardPlateCents)
    + HERBST_PRICING.shippingCents;
}
