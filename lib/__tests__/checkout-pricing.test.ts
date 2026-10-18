import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

describe('current license plate prices', () => {
  it.each([
    ['black', 1, false, 1470],
    ['black', 2, false, 2450],
    ['black', 2, true, 3430],
    ['carbon', 1, false, 1950],
    ['carbon', 2, false, 3410],
    ['carbon', 2, true, 4870],
  ] as const)('charges %s for %i car plates with third plate %s', (color, quantity, thirdPlate, totalCents) => {
    for (const offer of ['standard', 'herbst']) {
      expect(getCheckoutPricing('standard', color, quantity, undefined, { parkingPlate: false, bikeRackPlate: thirdPlate }, offer))
        .toMatchObject({ totalCents, shippingCents: 490, packageDiscountCents: 0 });
    }
  });

  it.each([
    ['black', false, false, 2450],
    ['black', true, false, 3430],
    ['black', false, true, 3430],
    ['black', true, true, 4410],
    ['carbon', false, false, 3410],
    ['carbon', true, false, 4870],
    ['carbon', false, true, 4870],
    ['carbon', true, true, 6330],
  ] as const)('prices two %s plates plus parking %s and bicycle rack %s', (color, parkingPlate, bikeRackPlate, totalCents) => {
    expect(getCheckoutPricing('standard', color, 2, undefined, { parkingPlate, bikeRackPlate }, 'herbst'))
      .toMatchObject({ totalCents, shippingCents: 490 });
  });

  it.each([
    ['black', 1, 1470], ['carbon', 1, 1950],
    ['black', 2, 2450], ['carbon', 2, 3410],
  ] as const)('charges %s for %i motorcycle plates', (color, quantity, totalCents) => {
    expect(getCheckoutPricing('motorcycle', color, quantity, undefined))
      .toMatchObject({ totalCents, shippingCents: 490 });
  });

  it('adds extras to car prices and charges 4.90 shipping for all plate types', () => {
    expect(getCheckoutPricing('standard', 'black', 2, undefined, { parkingPlate: false, bikeRackPlate: false, emissionSticker: true }))
      .toMatchObject({ totalCents: 3040, emissionStickerPriceCents: 590 });
    expect(getCheckoutPricing('electric', 'black', 2, undefined)?.totalCents).toBe(2480);
    expect(getCheckoutPricing('agriculture240', 'green', 1, undefined)?.totalCents).toBe(2980);
  });

  it.each([
    ['agriculture240', 'green', 1],
    ['agriculture255', 'green', 1],
  ] as const)('charges 4.90 shipping for %s plates', (plateType, color, quantity) => {
    expect(getCheckoutPricing(plateType, color, quantity, undefined)?.shippingCents).toBe(490);
  });

  it.each(['electric', 'historic', 'season'] as const)('charges shipping for one or two %s plates', (plateType) => {
    expect(getCheckoutPricing(plateType, 'black', 1, undefined)?.shippingCents).toBe(490);
    expect(getCheckoutPricing(plateType, 'black', 2, undefined)?.shippingCents).toBe(490);
  });

  it('charges shipping once when a car plate has an additional physical plate', () => {
    expect(getCheckoutPricing('standard', 'black', 1, undefined, { parkingPlate: true, bikeRackPlate: false }))
      .toMatchObject({ totalCents: 2450, shippingCents: 490 });
    expect(getCheckoutPricing('standard', 'carbon', 1, undefined, { parkingPlate: false, bikeRackPlate: true }))
      .toMatchObject({ totalCents: 3410, shippingCents: 490 });
  });

  it.each([
    [[], 2450],
    [['holderScrews'], 3240],
    [['warningVest'], 2940],
    [['holderScrews', 'warningVest'], 3730],
  ] as const)('prices checkout add-ons %j separately from the plates', (addOns, totalCents) => {
    expect(getCheckoutPricing('standard', 'black', 2, undefined, {
      parkingPlate: false, bikeRackPlate: false, addOns: [...addOns],
    })).toMatchObject({ totalCents, addonPriceCents: totalCents - 2450, shippingCents: 490 });
  });

  it('keeps paid add-ons on top of a fixed-price promotion', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'TEST5', {
      parkingPlate: false, bikeRackPlate: false, addOns: ['holderScrews'],
    })).toMatchObject({ totalCents: 1290, addonPriceCents: 790 });
  });

  it.each([
    ['standard', 'black', 2, 1960],
    ['motorcycle', 'black', 1, 980],
    ['agriculture240', 'green', 1, 2490],
  ] as const)('makes shipping free with neuekennzeichen for %s', (plateType, color, quantity, totalCents) => {
    expect(getCheckoutPricing(plateType, color, quantity, ' neuekennzeichen '))
      .toMatchObject({ totalCents, shippingCents: 0, promoCode: 'NEUEKENNZEICHEN' });
    expect(getCheckoutPricing(plateType, color, quantity, undefined)?.totalCents)
      .toBe(totalCents + 490);
  });

  it('keeps paid extras while removing only the shipping charge', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'neuekennzeichen', {
      parkingPlate: false, bikeRackPlate: true, addOns: ['holderScrews'],
    })).toMatchObject({ totalCents: 3730, shippingCents: 0, addonPriceCents: 790 });
  });

  it('applies promotions and rejects unsupported configurations', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'TEST5'))
      .toMatchObject({ totalCents: 500, shippingCents: 490, discountCents: 1950 });
    expect(getCheckoutPricing('standard', 'black', 2, 'UNKNOWN')).toBeNull();
    expect(getCheckoutPricing('motorcycle', 'carbon', 3 as 1, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'green', 2, undefined)).toBeNull();
  });
});
