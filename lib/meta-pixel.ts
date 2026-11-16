import { CONSENT_CHANGED_EVENT, CONSENT_STORAGE_KEY, parseConsentRecord } from '@/lib/cookie-consent';
import type { PurchaseEvent } from '@/lib/purchase-event';

const PIXEL_ID = '1531355998916855';

type Pixel = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Pixel;
  loaded: boolean;
  version: string;
  disablePushState: boolean;
};

let pixel: Promise<Pixel | null> | undefined;

function hasMetaConsent() {
  try {
    return parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY))?.optional.metaPixel === true;
  } catch {
    return false;
  }
}

function loadPixel() {
  pixel ??= new Promise<Pixel | null>((resolve) => {
    // Give the SDK a clean URL and referrer, separate from checkout query parameters.
    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.title = 'Meta Pixel';
    frame.referrerPolicy = 'no-referrer';
    frame.src = '/meta-pixel-frame.html';
    frame.addEventListener('load', () => {
      const context = frame.contentWindow as (Window & { fbq?: Pixel; _fbq?: Pixel }) | null;
      const doc = frame.contentDocument;
      if (!context || !doc || !hasMetaConsent()) {
        frame.remove();
        resolve(null);
        return;
      }

      const fbq = ((...args: unknown[]) => {
        if (fbq.callMethod) fbq.callMethod(...args);
        else fbq.queue.push(args);
      }) as Pixel;
      Object.assign(fbq, { queue: [], push: fbq, loaded: true, version: '2.0', disablePushState: true });
      context.fbq = context._fbq = fbq;
      fbq('set', 'autoConfig', false, PIXEL_ID);
      fbq('init', PIXEL_ID);

      const updateConsent = () => fbq('consent', hasMetaConsent() ? 'grant' : 'revoke');
      window.addEventListener(CONSENT_CHANGED_EVENT, updateConsent);
      const script = doc.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.addEventListener('load', () => resolve(fbq), { once: true });
      script.addEventListener('error', () => {
        window.removeEventListener(CONSENT_CHANGED_EVENT, updateConsent);
        frame.remove();
        resolve(null);
      }, { once: true });
      doc.head.appendChild(script);
    }, { once: true });
    document.body.appendChild(frame);
  }).then((fbq) => {
    if (!fbq) pixel = undefined;
    return fbq;
  });
  return pixel;
}

async function track(event: 'AddShippingInfo' | 'AddPaymentInfo' | 'Purchase', purchase?: PurchaseEvent) {
  try {
    if (!hasMetaConsent()) return;
    const key = purchase && `kl_meta_purchase_${purchase.transactionId}`;
    if (key && window.localStorage.getItem(key)) return;
    const fbq = await loadPixel();
    if (!fbq || !hasMetaConsent()) return;

    if (!purchase || !key) {
      fbq(event === 'AddShippingInfo' ? 'trackSingleCustom' : 'trackSingle', PIXEL_ID, event);
      return;
    }
    if (window.localStorage.getItem(key)) return;
    fbq('trackSingle', PIXEL_ID, 'Purchase', {
      value: purchase.valueCents / 100,
      currency: 'EUR',
    }, { eventID: purchase.transactionId });
    window.localStorage.setItem(key, '1');
  } catch {
    // Tracking must not interrupt checkout.
  }
}

export function trackMetaCheckout(event: 'AddShippingInfo' | 'AddPaymentInfo') {
  void track(event);
}

export function trackMetaPurchase(purchase: PurchaseEvent) {
  if (/^pi_[A-Za-z0-9_]+$/.test(purchase.transactionId) &&
    Number.isFinite(purchase.valueCents) && purchase.valueCents > 0 &&
    purchase.currency.toUpperCase() === 'EUR') {
    void track('Purchase', purchase);
  }
}
