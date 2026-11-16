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

type PixelContext = { fbq: Pixel; history: History; lastPagePath?: string };

let pixel: Promise<PixelContext | null> | undefined;

function currentPixelUrl() {
  const source = new URL(window.location.href);
  const url = new URL(source.origin);
  url.pathname = source.pathname;
  const clickId = source.searchParams.get('fbclid');
  if (clickId && /^[A-Za-z0-9_-]{1,512}$/.test(clickId)) url.searchParams.set('fbclid', clickId);
  return url;
}

function hasMetaConsent() {
  try {
    return parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY))?.optional.metaPixel === true;
  } catch {
    return false;
  }
}

function loadPixel() {
  pixel ??= new Promise<PixelContext | null>((resolve) => {
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
      context.history.replaceState(null, '', currentPixelUrl().href);
      fbq('set', 'autoConfig', false, PIXEL_ID);
      fbq('init', PIXEL_ID);

      const updateConsent = () => fbq('consent', hasMetaConsent() ? 'grant' : 'revoke');
      window.addEventListener(CONSENT_CHANGED_EVENT, updateConsent);
      const script = doc.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      script.addEventListener('load', () => resolve({ fbq, history: context.history }), { once: true });
      script.addEventListener('error', () => {
        window.removeEventListener(CONSENT_CHANGED_EVENT, updateConsent);
        frame.remove();
        resolve(null);
      }, { once: true });
      doc.head.appendChild(script);
    }, { once: true });
    document.body.appendChild(frame);
  }).then((context) => {
    if (!context) pixel = undefined;
    return context;
  });
  return pixel;
}

async function track(event: 'PageView' | 'AddShippingInfo' | 'AddPaymentInfo' | 'Purchase', purchase?: PurchaseEvent) {
  try {
    if (!hasMetaConsent()) return;
    const key = purchase && `kl_meta_purchase_${purchase.transactionId}`;
    if (key && window.localStorage.getItem(key)) return;
    const context = await loadPixel();
    if (!context || !hasMetaConsent()) return;
    const { fbq } = context;
    const url = currentPixelUrl();
    if (context.lastPagePath !== url.pathname) {
      context.history.replaceState(null, '', url.href);
      fbq('trackSingle', PIXEL_ID, 'PageView');
      context.lastPagePath = url.pathname;
    }
    if (event === 'PageView') return;

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

export function trackMetaPageView() {
  void track('PageView');
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
