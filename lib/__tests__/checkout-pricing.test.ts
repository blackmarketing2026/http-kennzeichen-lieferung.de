import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

describe('current license plate prices', () => {
  it.each([
    ['black', 1, false, 980],
    ['black', 2, false, 1960],
    ['black', 2, true, 2940],
    ['carbon', 1, false, 1460],
    ['carbon', 2, false, 2920],
    ['carbon', 2, true, 4380],
  ] as const)('charges %s for %i car plates with third plate %s', (color, quantity, thirdPlate, totalCents) => {
    for (const offer of ['standard', 'herbst']) {
      expect(getCheckoutPricing('standard', color, quantity, undefined, { parkingPlate: false, bikeRackPlate: thirdPlate }, offer))
        .toMatchObject({ totalCents, shippingCents: 0, packageDiscountCents: 0 });
    }
  });

  it.each([
    ['black', 1, 980], ['carbon', 1, 1460],
    ['black', 2, 1960], ['carbon', 2, 2920],
  ] as const)('charges %s for %i motorcycle plates', (color, quantity, totalCents) => {
    expect(getCheckoutPricing('motorcycle', color, quantity, undefined))
      .toMatchObject({ totalCents, shippingCents: 0 });
  });

  it('adds extras to the new car prices and keeps other plate types unchanged', () => {
    expect(getCheckoutPricing('standard', 'black', 2, undefined, { parkingPlate: false, bikeRackPlate: false, emissionSticker: true }))
      .toMatchObject({ totalCents: 2550, emissionStickerPriceCents: 590 });
    expect(getCheckoutPricing('electric', 'black', 2, undefined)?.totalCents).toBe(1990);
    expect(getCheckoutPricing('agriculture240', 'green', 1, undefined)?.totalCents).toBe(2490);
  });

  it('applies promotions and rejects unsupported configurations', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'TEST5'))
      .toMatchObject({ totalCents: 500, discountCents: 1460 });
    expect(getCheckoutPricing('standard', 'black', 2, 'UNKNOWN')).toBeNull();
    expect(getCheckoutPricing('motorcycle', 'carbon', 3 as 1, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'green', 2, undefined)).toBeNull();
  });
});
