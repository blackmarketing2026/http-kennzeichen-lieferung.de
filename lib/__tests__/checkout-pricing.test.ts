import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

describe('checkout pricing', () => {
  it('charges 24.90 for one motorcycle plate with shipping included', () => {
    expect(getCheckoutPricing('motorcycle', 'black', 1, undefined)).toMatchObject({
      subtotalCents: 2490,
      shippingCents: 0,
      discountCents: 0,
      totalCents: 2490,
      promoCode: null,
    });
  });

  it.each(['standard', 'electric', 'historic', 'season'] as const)('charges 29.90 for two %s plates', (type) => {
    expect(getCheckoutPricing(type, 'black', 2, undefined)).toMatchObject({
      unitPriceCents: 1495,
      subtotalCents: 2990,
      shippingCents: 0,
      totalCents: 2990,
    });
  });

  it('sets the payable total to five euros with TEST5', () => {
    expect(getCheckoutPricing('standard', 'black', 2, ' test5 ')).toMatchObject({
      discountCents: 2490,
      totalCents: 500,
      promoCode: 'TEST5',
    });
    expect(getCheckoutPricing('motorcycle', 'black', 1, 'TEST5')).toMatchObject({
      discountCents: 1990,
      totalCents: 500,
      promoCode: 'TEST5',
    });
  });

  it('rejects unknown codes and restores the regular total when removed', () => {
    expect(getCheckoutPricing('standard', 'black', 2, 'UNKNOWN')).toBeNull();
    expect(getCheckoutPricing('standard', 'black', 2, '')?.totalCents).toBe(2990);
  });

  it('rejects unavailable quantities and carbon', () => {
    expect(getCheckoutPricing('motorcycle', 'black', 2, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'black', 1, undefined)).toBeNull();
    expect(getCheckoutPricing('standard', 'carbon', 2, undefined)).toBeNull();
  });

  it.each(['standard', 'electric', 'historic', 'season'] as const)('adds one parking plate to %s with the server-side unit price', (type) => {
    expect(getCheckoutPricing(type, 'black', 3, undefined)).toMatchObject({ unitPriceCents: 1495, subtotalCents: 4485, shippingCents: 0, totalCents: 4485 });
    expect(getCheckoutPricing(type, 'black', 2, undefined)?.totalCents).toBe(2990);
  });

  it('keeps an applied promotion consistent when the parking extra is added', () => {
    expect(getCheckoutPricing('standard', 'black', 3, 'TEST5')).toMatchObject({ subtotalCents: 4485, discountCents: 3985, totalCents: 500 });
  });
});
