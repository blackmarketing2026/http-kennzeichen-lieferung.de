import { CONSENT_CHANGED_EVENT, CONSENT_STORAGE_KEY, parseConsentRecord } from '@/lib/cookie-consent';

export type PurchaseEvent = {
  transactionId: string;
  valueCents: number;
  currency: string;
  shippingCents: number;
  itemId: string;
  itemName: string;
  quantity: number;
};

type PurchaseWindow = Window & {
  dataLayer?: unknown[];
  kl_transaction_id?: string;
  kl_value?: number;
  kl_currency?: string;
};

export function emitPurchaseEvent(purchase: PurchaseEvent): boolean {
  try {
    const consent = parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (!consent?.optional.googleTagManager) return false;
    if (!/^pi_[A-Za-z0-9_]+$/.test(purchase.transactionId) || purchase.valueCents <= 0 || purchase.currency.toUpperCase() !== 'EUR') return false;

    const key = `kl_purchase_${purchase.transactionId}`;
    if (window.localStorage.getItem(key)) return false;

    const w = window as PurchaseWindow;
    const value = purchase.valueCents / 100;
    w.kl_transaction_id = purchase.transactionId;
    w.kl_value = value;
    w.kl_currency = 'EUR';
    w.dataLayer ??= [];
    w.dataLayer.push({ ecommerce: null });
    w.dataLayer.push({
      event: 'purchase',
      ecommerce: {
        transaction_id: purchase.transactionId,
        value,
        currency: 'EUR',
        shipping: purchase.shippingCents / 100,
        items: [{
          item_id: purchase.itemId,
          item_name: purchase.itemName,
          quantity: purchase.quantity,
        }],
      },
    });
    window.localStorage.setItem(key, '1');
    return true;
  } catch {
    // Tracking must never interrupt a completed order.
    return false;
  }
}

export { CONSENT_CHANGED_EVENT };
