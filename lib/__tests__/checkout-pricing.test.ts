import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

describe('current license plate prices', () => {
  it.each([
    ['black', 1, false, 1375],
    ['black', 2, false, 1960],
    ['black', 2, true, 2940],
    ['carbon', 1, false, 1855],
    ['carbon', 2, false, 2920],
    ['carbon', 2, true, 4380],
  ] as const)('charges %s for %i car plates with third plate %s', (color, quantity, thirdPlate, totalCents) => {
    for (const offer of ['standard', 'herbst']) {
      expect(getCheckoutPricing('standard', color, quantity, undefined, { parkingPlate: false, bikeRackPlate: thirdPlate }, offer))
        .toMatchObject({ totalCents, shippingCents: quantity === 1 && !thirdPlate ? 395 : 0, packageDiscountCents: 0 });
    }
  });

  it.each([
    ['black', false, false, 1960],
    ['black', true, false, 2940],
    ['black', false, true, 2940],
    ['black', true, true, 3920],
    ['carbon', false, false, 2920],
    ['carbon', true, false, 4380],
    ['carbon', false, true, 4380],
    ['carbon', true, true, 5840],
  ] as const)('prices two %s plates plus parking %s and bicycle rack %s', (color, parkingPlate, bikeRackPlate, totalCents) => {
    expect(getCheckoutPricing('standard', color, 2, undefined, { parkingPlate, bikeRackPlate }, 'herbst'))
      .toMatchObject({ totalCents, shippingCents: 0 });
  });

  it.each([
    ['black', 1, 1375], ['carbon', 1, 1855],
    ['black', 2, 1960], ['carbon', 2, 2920],
  ] as const)('charges %s for %i motorcycle plates', (color, quantity, totalCents) => {
    expect(getCheckoutPricing('motorcycle', color, quantity, undefined))
      .toMatchObject({ totalCents, shippingCents: quantity === 1 ? 395 : 0 });
  });

  it('adds extras to the new car prices and keeps other plate types unchanged', () => {
    expect(getCheckoutPricing('standard', 'black', 2, undefined, { parkingPlate: false, bikeRackPlate: false, emissionSticker: true }))
      .toMatchObject({ totalCents: 2550, emissionStickerPriceCents: 590 });
    expect(getCheckoutPricing('electric', 'black', 2, undefined)?.totalCents).toBe(1990);
    expect(getCheckoutPricing('agriculture240', 'green', 1, undefined)?.totalCents).toBe(2490);
  });

  it.each([
    ['agriculture240', 'green', 1],
    ['agriculture255', 'green', 1],
  ] as const)('ships %s plates for free', (plateType, color, quantity) => {
    expect(getCheckoutPricing(plateType, color, quantity, undefined)?.shippingCents).toBe(0);
  });

  it.each(['electric', 'historic', 'season'] as const)('adds shipping to one %s car plate', (plateType) => {
    expect(getCheckoutPricing(plateType, 'black', 1, undefined)?.shippingCents).toBe(395);
    expect(getCheckoutPricing(plateType, 'black', 2, undefined)?.shippingCents).toBe(0);
  });

  it('ships a car plate with an additional physical plate for free', () => {
    expect(getCheckoutPricing('standard', 'black', 1, undefined, { parkingPlate: true, bikeRackPlate: false }))
      .toMatchObject({ totalCents: 1960, shippingCents: 0 });
    expect(getCheckoutPricing('standard', 'carbon', 1, undefined, { parkingPlate: false, bikeRackPlate: true }))
      .toMatchObject({ totalCents: 2920, shippingCents: 0 });
  });

  it('applies promotions and rejects unsupported configurations', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'TEST5'))
      .toMatchObject({ totalCents: 500, discountCents: 1460 });
    expect(getCheckoutPricing('standard', 'black', 2, 'UNKNOWN')).toBeNull();
    expect(getCheckoutPricing('motorcycle', 'carbon', 3 as 1, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'green', 2, undefined)).toBeNull();
  });
});
