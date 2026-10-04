import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

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
