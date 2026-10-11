import { afterEach, describe, expect, it, vi } from 'vitest';
import { createConsentRecord, NO_OPTIONAL_ALLOWED } from '@/lib/cookie-consent';
import { emitPurchaseEvent, type PurchaseEvent } from '@/lib/purchase-event';

const purchase: PurchaseEvent = {
  transactionId: 'pi_test_123',
  valueCents: 1375,
  currency: 'eur',
  shippingCents: 395,
  itemId: 'standard',
  itemName: 'Autokennzeichen',
  quantity: 1,
};

function browser(consented: boolean) {
  const values = new Map<string, string>();
  values.set('kl_cookie_consent_v2', JSON.stringify(createConsentRecord({ ...NO_OPTIONAL_ALLOWED, googleTagManager: consented })));
  const dataLayer: unknown[] = [];
  vi.stubGlobal('window', {
    localStorage: {
      getItem: (key: string) => values.get(key) ?? null,
      setItem: (key: string, value: string) => { values.set(key, value); },
    },
    dataLayer,
  });
  return { dataLayer, values };
}

afterEach(() => vi.unstubAllGlobals());

describe('purchase GTM event', () => {
  it('sends the paid value, shipping and transaction once', () => {
    const { dataLayer } = browser(true);
    expect(emitPurchaseEvent(purchase)).toBe(true);
    expect(emitPurchaseEvent(purchase)).toBe(false);
    expect(dataLayer).toEqual([
      { ecommerce: null },
      { event: 'purchase', ecommerce: {
        transaction_id: 'pi_test_123', value: 13.75, currency: 'EUR', shipping: 3.95,
        items: [{ item_id: 'standard', item_name: 'Autokennzeichen', quantity: 1 }],
      } },
    ]);
  });

  it('waits for GTM consent before sending the purchase', () => {
    const { dataLayer, values } = browser(false);
    expect(emitPurchaseEvent(purchase)).toBe(false);
    values.set('kl_cookie_consent_v2', JSON.stringify(createConsentRecord({ ...NO_OPTIONAL_ALLOWED, googleTagManager: true })));
    expect(emitPurchaseEvent(purchase)).toBe(true);
    expect(dataLayer).toHaveLength(2);
  });

  it('does not send an unconfirmed amount', () => {
    const { dataLayer } = browser(true);
    expect(emitPurchaseEvent({ ...purchase, valueCents: 0 })).toBe(false);
    expect(dataLayer).toEqual([]);
  });
});
