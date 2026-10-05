import { CONSENT_STORAGE_KEY, parseConsentRecord } from '@/lib/cookie-consent';

export type KennzeichenGtmEvent =
  | 'kennzeichen_eingabe'
  | 'kennzeichen_adresse'
  | 'kennzeichen_zahlen';

/** Custom GTM events for the /kennzeichen-bestellen checkout funnel. */
export function trackKennzeichenGtmEvent(
  event: KennzeichenGtmEvent,
  payload: Record<string, unknown> = {},
) {
  try {
    const consent = parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY));
    if (!consent?.optional.googleTagManager) return;
    const trackingWindow = window as Window & { dataLayer?: unknown[] };
    trackingWindow.dataLayer ??= [];
    trackingWindow.dataLayer.push({ event, ...payload });
  } catch {
    // Analytics must never interrupt checkout.
  }
}
