import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import { CONSENT_STORAGE_KEY, NO_OPTIONAL_ALLOWED, createConsentRecord } from '@/lib/cookie-consent';

const PIXEL_ID = '1531355998916855';

function browser(metaPixel: boolean) {
  const storage = new Map([
    [CONSENT_STORAGE_KEY, JSON.stringify(createConsentRecord({ ...NO_OPTIONAL_ALLOWED, metaPixel }))],
  ]);
  const script = new EventTarget();
  const context: { fbq?: { queue: unknown[][] } } = {};
  const frame = Object.assign(new EventTarget(), {
    contentWindow: context,
    contentDocument: {
      createElement: () => script,
      head: { appendChild: () => script.dispatchEvent(new Event('load')) },
    },
    remove: vi.fn(),
  });
  const appendChild = vi.fn(() => frame.dispatchEvent(new Event('load')));
  vi.stubGlobal('document', { createElement: () => frame, body: { appendChild } });
  vi.stubGlobal('window', Object.assign(new EventTarget(), {
    localStorage: { getItem: (key: string) => storage.get(key), setItem: storage.set.bind(storage) },
  }));
  return { appendChild, context, storage };
}

beforeEach(() => vi.resetModules());
afterEach(() => vi.unstubAllGlobals());

it('leaves the SDK unloaded without Meta consent', async () => {
  const { appendChild } = browser(false);
  const { trackMetaCheckout } = await import('@/lib/meta-pixel');
  trackMetaCheckout('AddShippingInfo');
  expect(appendChild).not.toHaveBeenCalled();
});

it('sends the checkout steps without values and a single paid amount per transaction', async () => {
  const { appendChild, context, storage } = browser(true);
  const { trackMetaCheckout, trackMetaPurchase } = await import('@/lib/meta-pixel');
  const purchase = {
    transactionId: 'pi_confirmed',
    valueCents: 3240,
    currency: 'eur',
    shippingCents: 0,
    itemId: 'car',
    itemName: 'Kennzeichen',
    quantity: 2,
  };
  trackMetaCheckout('AddShippingInfo');
  trackMetaCheckout('AddPaymentInfo');
  trackMetaPurchase(purchase);
  trackMetaPurchase(purchase);

  await vi.waitFor(() => expect(storage.get('kl_meta_purchase_pi_confirmed')).toBe('1'));
  expect(appendChild).toHaveBeenCalledTimes(1);
  expect(context.fbq?.queue).toEqual([
    ['set', 'autoConfig', false, PIXEL_ID],
    ['init', PIXEL_ID],
    ['trackSingleCustom', PIXEL_ID, 'AddShippingInfo'],
    ['trackSingle', PIXEL_ID, 'AddPaymentInfo'],
    ['trackSingle', PIXEL_ID, 'Purchase', { value: 32.4, currency: 'EUR' }, { eventID: 'pi_confirmed' }],
  ]);
});
