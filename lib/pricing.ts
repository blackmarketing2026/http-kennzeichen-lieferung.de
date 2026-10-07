import type { PlateColor, PlateType } from '@/config/products';

export type OfferProfile = 'standard' | 'herbst';

export const HERBST_PRICING = {
  standardPlateCents: 790,
  carbonPlateCents: 1290,
  shippingCents: 390,
  completeCents: 2190,
  premiumCents: 3490,
  completeDecemberCents: 2390,
  premiumDecemberCents: 3790,
  // Berlin uses CET (UTC+01:00) on 30 November and 1 December 2026.
  endsAt: '2026-11-30T23:59:59+01:00',
  changesAt: '2026-12-01T00:00:00+01:00',
} as const;

export const HERBST_DESCRIPTION =
  '3 DIN-Kennzeichen inkl. Fahrradträger-Schild für 21,90 €, versandkostenfrei. In 10 Minuten geprägt. Pünktlich-Garantie: nicht in 4 Werktagen da = Geld zurück.';

export function normalizeOffer(value: unknown): OfferProfile {
  return value === 'herbst' ? 'herbst' : 'standard';
}

export function isHerbstPackageEligible(plateType: PlateType, bikeRackPlate: boolean) {
  return plateType === 'standard' && bikeRackPlate;
}

export function herbstSetPriceCents(color: PlateColor, now: Date = new Date()) {
  const december = now.getTime() >= Date.parse(HERBST_PRICING.changesAt);
  return color === 'carbon'
    ? december ? HERBST_PRICING.premiumDecemberCents : HERBST_PRICING.premiumCents
    : december ? HERBST_PRICING.completeDecemberCents : HERBST_PRICING.completeCents;
}

export function herbstIndividualComparisonCents(color: 'black' | 'carbon') {
  return 3 * (color === 'carbon' ? HERBST_PRICING.carbonPlateCents : HERBST_PRICING.standardPlateCents)
    + HERBST_PRICING.shippingCents;
}
