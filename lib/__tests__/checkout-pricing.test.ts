import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { HERBST_PRICING, herbstIndividualComparisonCents, herbstSetPriceCents, normalizeOffer } from '@/lib/pricing';

describe('checkout pricing', () => {
  it.each([
    ['black', 1380, 390, 1770],
    ['carbon', 2380, 0, 2380],
  ] as const)('prices two %s car plates', (color, subtotalCents, shippingCents, totalCents) => {
    expect(getCheckoutPricing('standard', color, 2, undefined)).toMatchObject({
      subtotalCents, shippingCents, totalCents, packageDiscountCents: 0,
    });
  });

  it('charges shipping below 19 euros and waives it at the threshold', () => {
    expect(getCheckoutPricing('standard', 'black', 1, undefined)).toMatchObject({ subtotalCents: 690, shippingCents: 390, totalCents: 1080 });
    expect(getCheckoutPricing('standard', 'carbon', 2, undefined)).toMatchObject({ subtotalCents: 2380, shippingCents: 0 });
  });

  it('adds the bicycle-rack plate for 4.90 euros plus 5 euros in carbon', () => {
    const extras = { parkingPlate: false, bikeRackPlate: true };
    expect(getCheckoutPricing('standard', 'black', 2, undefined, extras)).toMatchObject({ bikeRackExtraPriceCents: 490, subtotalCents: 1870, shippingCents: 390, totalCents: 2260 });
    expect(getCheckoutPricing('standard', 'carbon', 2, undefined, extras)).toMatchObject({ bikeRackExtraPriceCents: 990, subtotalCents: 3370, shippingCents: 0, totalCents: 3370 });
  });

  it('reaches the requested totals with the 5.90 euro emission sticker', () => {
    const extras = { parkingPlate: false, bikeRackPlate: false, emissionSticker: true };
    expect(getCheckoutPricing('standard', 'black', 2, undefined, extras)).toMatchObject({ emissionStickerPriceCents: 590, subtotalCents: 1970, shippingCents: 0, totalCents: 1970 });
    expect(getCheckoutPricing('standard', 'carbon', 2, undefined, extras)).toMatchObject({ emissionStickerPriceCents: 590, subtotalCents: 2970, shippingCents: 0, totalCents: 2970 });
  });

  it('keeps the existing prices of other plate types', () => {
    expect(getCheckoutPricing('motorcycle', 'black', 1, undefined)?.totalCents).toBe(1990);
    expect(getCheckoutPricing('electric', 'black', 2, undefined)?.totalCents).toBe(1990);
    expect(getCheckoutPricing('agriculture240', 'green', 1, undefined)?.totalCents).toBe(2490);
  });

  it('applies the test promotion to the payable total', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'TEST5')).toMatchObject({ totalCents: 500, discountCents: 1270 });
    expect(getCheckoutPricing('standard', 'black', 2, 'UNKNOWN')).toBeNull();
  });

  it('rejects unavailable configurations', () => {
    expect(getCheckoutPricing('motorcycle', 'carbon', 1, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'green', 2, undefined)).toBeNull();
    expect(getCheckoutPricing('agriculture240', 'carbon', 1, undefined)).toBeNull();
    expect(getCheckoutPricing('motorcycle', 'black', 1, undefined, { parkingPlate: false, bikeRackPlate: true })).toBeNull();
  });
});

describe('Herbst pricing', () => {
  const november = new Date('2026-11-30T22:59:59.000Z');
  const december = new Date('2026-11-30T23:00:00.000Z');
  const extras = (bikeRackPlate: boolean) => ({ parkingPlate: false, bikeRackPlate });

  it.each([
    ['black', 1, false, 1180], ['carbon', 1, false, 1680],
    ['black', 2, false, 1970], ['carbon', 2, false, 2970],
    ['black', 2, true, 2190], ['carbon', 2, true, 3490],
  ] as const)('prices %s × %i with bicycle rack %s in November', (color, quantity, rack, totalCents) => {
    expect(getCheckoutPricing('standard', color, quantity, undefined, extras(rack), 'herbst', november))
      .toMatchObject({ totalCents, shippingCents: rack ? 0 : HERBST_PRICING.shippingCents });
  });

  it('switches at midnight Berlin time and leaves the basis unchanged', () => {
    expect(getCheckoutPricing('standard', 'black', 2, undefined, extras(true), 'herbst', december)?.totalCents).toBe(2390);
    expect(getCheckoutPricing('standard', 'carbon', 2, undefined, extras(true), 'herbst', december)?.totalCents).toBe(3790);
    expect(getCheckoutPricing('standard', 'black', 2, undefined, extras(false), 'herbst', december)?.totalCents).toBe(1970);
    expect(getCheckoutPricing('standard', 'black', 2, undefined, extras(true), 'herbst', new Date(december.getTime() - 1))?.totalCents).toBe(2190);
  });

  it('charges shipping for a single base plate plus a bicycle-rack plate', () => {
    expect(getCheckoutPricing('standard', 'black', 1, undefined, extras(true), 'herbst', november))
      .toMatchObject({ subtotalCents: 1580, shippingCents: 390, totalCents: 1970 });
    expect(getCheckoutPricing('standard', 'carbon', 1, undefined, extras(true), 'herbst', november))
      .toMatchObject({ subtotalCents: 2580, shippingCents: 390, totalCents: 2970 });
  });

  it('derives comparison prices, savings, and carbon upgrade from configuration', () => {
    expect(herbstIndividualComparisonCents('black')).toBe(2760);
    expect(herbstIndividualComparisonCents('carbon')).toBe(4260);
    expect(herbstIndividualComparisonCents('black') - herbstSetPriceCents('black', november)).toBe(570);
    expect(herbstIndividualComparisonCents('carbon') - herbstSetPriceCents('carbon', november)).toBe(770);
    expect(herbstSetPriceCents('carbon', november) - herbstSetPriceCents('black', november)).toBe(1300);
  });

  it('keeps standard and invalid profiles at standard prices', () => {
    expect(normalizeOffer('wrong')).toBe('standard');
    for (const now of [november, december]) {
      expect(getCheckoutPricing('standard', 'black', 2, undefined, extras(true), 'standard', now)?.totalCents).toBe(2260);
      expect(getCheckoutPricing('standard', 'black', 2, undefined, extras(true), 'wrong', now)?.totalCents).toBe(2260);
      expect(getCheckoutPricing('electric', 'black', 2, undefined, extras(false), 'herbst', now)?.totalCents).toBe(1990);
      expect(getCheckoutPricing('historic', 'black', 2, undefined, extras(false), 'herbst', now)?.totalCents).toBe(1990);
      expect(getCheckoutPricing('season', 'black', 2, undefined, extras(false), 'herbst', now)?.totalCents).toBe(1990);
      expect(getCheckoutPricing('motorcycle', 'black', 1, undefined, extras(false), 'herbst', now)?.totalCents).toBe(1990);
    }
  });
});
