import { describe, expect, it } from 'vitest';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

describe('checkout pricing', () => {
  it('keeps the regular price without a code', () => {
    expect(getCheckoutPricing('standard', 'black', 1, undefined)).toMatchObject({
      subtotalCents: 277,
      shippingCents: 447,
      discountCents: 0,
      totalCents: 724,
      promoCode: null,
    });
  });

  it('sets the payable total to five euros with TEST5', () => {
    expect(getCheckoutPricing('standard', 'black', 1, ' test5 ')).toMatchObject({
      discountCents: 224,
      totalCents: 500,
      promoCode: 'TEST5',
    });
    expect(getCheckoutPricing('motorcycle', 'carbon', 3, 'TEST5')).toMatchObject({
      discountCents: 928,
      totalCents: 500,
      promoCode: 'TEST5',
    });
  });

  it('rejects unknown codes and restores the regular total when removed', () => {
    expect(getCheckoutPricing('standard', 'black', 1, 'UNKNOWN')).toBeNull();
    expect(getCheckoutPricing('standard', 'black', 1, '')?.totalCents).toBe(724);
  });
});
