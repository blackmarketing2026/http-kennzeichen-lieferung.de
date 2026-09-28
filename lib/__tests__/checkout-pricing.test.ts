import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

describe('checkout pricing', () => {
  it('charges 14.99 for one motorcycle plate with shipping included', () => {
    expect(getCheckoutPricing('motorcycle', 'black', 1, undefined)).toMatchObject({
      subtotalCents: 1499,
      shippingCents: 0,
      discountCents: 0,
      totalCents: 1499,
      promoCode: null,
    });
  });

  it.each([
    ['agriculture240', 'black'],
    ['agriculture240', 'green'],
    ['agriculture255', 'black'],
    ['agriculture255', 'green'],
  ] as const)('charges 24.90 for one %s plate in %s', (type, color) => {
    expect(getCheckoutPricing(type, color, 1, undefined)).toMatchObject({
      unitPriceCents: 2490,
      subtotalCents: 2490,
      shippingCents: 0,
      totalCents: 2490,
    });
  });

  it.each(['standard', 'electric', 'historic', 'season'] as const)('charges 29.98 for two %s plates', (type) => {
    expect(getCheckoutPricing(type, 'black', 2, undefined)).toMatchObject({
      unitPriceCents: 1499,
      subtotalCents: 2998,
      shippingCents: 0,
      totalCents: 2998,
    });
  });

  it('sets the payable total to five euros with TEST5', () => {
    expect(getCheckoutPricing('standard', 'black', 2, ' test5 ')).toMatchObject({
      discountCents: 2498,
      totalCents: 500,
      promoCode: 'TEST5',
    });
    expect(getCheckoutPricing('motorcycle', 'black', 1, 'TEST5')).toMatchObject({
      discountCents: 999,
      totalCents: 500,
      promoCode: 'TEST5',
    });
  });

  it('rejects unknown codes and restores the regular total when removed', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'UNKNOWN')).toBeNull();
    expect(getCheckoutPricing('standard', 'black', 2, '')?.totalCents).toBe(2998);
  });

  it('rejects unavailable quantities and carbon', () => {
    expect(getCheckoutPricing('motorcycle', 'black', 2, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'black', 1, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'carbon', 2, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'green', 2, undefined)).toBeNull();
    expect(getCheckoutPricing('agriculture240', 'green', 2, undefined)).toBeNull();
    expect(getCheckoutPricing('agriculture240', 'carbon', 1, undefined)).toBeNull();
  });

  it('rejects extras for a land-machine plate', () => {
    expect(
      getCheckoutPricing('agriculture255', 'green', 1, undefined, {
        parkingPlate: true,
        bikeRackPlate: false,
      }),
    ).toBeNull();
  });

  it.each(['standard', 'electric', 'historic', 'season'] as const)('adds one parking plate to %s for five euros', (type) => {
    expect(getCheckoutPricing(type, 'black', 2, undefined, { parkingPlate: true, bikeRackPlate: false })).toMatchObject({ unitPriceCents: 1499, parkingExtraPriceCents: 500, bikeRackExtraPriceCents: 0, subtotalCents: 3498, shippingCents: 0, totalCents: 3498 });
    expect(getCheckoutPricing(type, 'black', 2, undefined)?.totalCents).toBe(2998);
  });

  it('adds the bicycle-rack plate independently and charges five euros for each extra', () => {
    expect(getCheckoutPricing('standard', 'black', 2, undefined, { parkingPlate: false, bikeRackPlate: true })).toMatchObject({ subtotalCents: 3498, totalCents: 3498 });
    expect(getCheckoutPricing('standard', 'black', 2, undefined, { parkingPlate: true, bikeRackPlate: true })).toMatchObject({ parkingExtraPriceCents: 500, bikeRackExtraPriceCents: 500, subtotalCents: 3998, totalCents: 3998 });
  });

  it('keeps an applied promotion consistent when the parking extra is added', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'TEST5', { parkingPlate: true, bikeRackPlate: true })).toMatchObject({ subtotalCents: 3998, discountCents: 3498, totalCents: 500 });
  });
});
