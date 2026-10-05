import { afterEach, describe, expect, it, vi } from 'vitest';
import { createConsentRecord, NO_OPTIONAL_ALLOWED } from '@/lib/cookie-consent';
import { trackKennzeichenGtmEvent } from '@/lib/kennzeichen-gtm-events';

afterEach(() => vi.unstubAllGlobals());

describe('Kennzeichen GTM events', () => {
  it('emits the three funnel events and the current euro amount with GTM consent', () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', {
      localStorage: { getItem: () => JSON.stringify(createConsentRecord({ ...NO_OPTIONAL_ALLOWED, googleTagManager: true })) },
      dataLayer,
    });

    trackKennzeichenGtmEvent('kennzeichen_eingabe');
    trackKennzeichenGtmEvent('kennzeichen_adresse');
    trackKennzeichenGtmEvent('kennzeichen_zahlen', { currency: 'EUR', value: 17.7 });

    expect(dataLayer).toEqual([
      { event: 'kennzeichen_eingabe' },
      { event: 'kennzeichen_adresse' },
      { event: 'kennzeichen_zahlen', currency: 'EUR', value: 17.7 },
    ]);
  });

  it('does not emit events without GTM consent', () => {
    const dataLayer: unknown[] = [];
    vi.stubGlobal('window', {
      localStorage: { getItem: () => JSON.stringify(createConsentRecord(NO_OPTIONAL_ALLOWED)) },
      dataLayer,
    });

    trackKennzeichenGtmEvent('kennzeichen_zahlen', { currency: 'EUR', value: 17.7 });

    expect(dataLayer).toEqual([]);
  });
});
