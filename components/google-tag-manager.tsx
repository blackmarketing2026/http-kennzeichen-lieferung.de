'use client';

import { useEffect } from 'react';
import {
  CONSENT_CHANGED_EVENT,
  CONSENT_STORAGE_KEY,
  NO_OPTIONAL_ALLOWED,
  parseConsentRecord,
  type OptionalPreferences,
} from '@/lib/cookie-consent';

const GTM_ID = 'GTM-5CP8C6V2';

type DataLayerWindow = Window & { dataLayer?: unknown[] };

function dataLayer() {
  const w = window as DataLayerWindow;
  w.dataLayer = w.dataLayer || [];
  return w.dataLayer;
}

// Consent Mode commands must be pushed as an `arguments` object, not a plain array.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  dataLayer().push(arguments);
}

function consentState(preferences: OptionalPreferences) {
  const marketing = preferences.metaPixel ? 'granted' : 'denied';
  return {
    analytics_storage: preferences.googleAnalytics ? 'granted' : 'denied',
    ad_storage: marketing,
    ad_user_data: marketing,
    ad_personalization: marketing,
  };
}

/** Passes the visitor's choice to GTM: Google tags read Consent Mode, and the custom
 * `consent_update` event lets Clarity/Meta tags in the container gate on their own flag. */
function pushConsent(preferences: OptionalPreferences) {
  gtag('consent', 'update', consentState(preferences));
  dataLayer().push({
    event: 'consent_update',
    consent_google_analytics: preferences.googleAnalytics,
    consent_microsoft_clarity: preferences.microsoftClarity,
    consent_meta_pixel: preferences.metaPixel,
  });
}

function loadContainer(preferences: OptionalPreferences) {
  gtag('consent', 'default', consentState(NO_OPTIONAL_ALLOWED));
  pushConsent(preferences);
  dataLayer().push({ 'gtm.start': Date.now(), event: 'gtm.js' });
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
  document.head.appendChild(script);
}

/** Loads Google Tag Manager only after the visitor consented to it in the cookie dialog. */
export function GoogleTagManager() {
  useEffect(() => {
    let loaded = false;
    const apply = (preferences: OptionalPreferences) => {
      if (!preferences.googleTagManager) {
        // A loaded container can't be unloaded; reload so its tags stop running.
        if (loaded) window.location.reload();
        return;
      }
      if (loaded) {
        pushConsent(preferences);
        return;
      }
      loaded = true;
      loadContainer(preferences);
    };

    try {
      const saved = parseConsentRecord(window.localStorage.getItem(CONSENT_STORAGE_KEY));
      if (saved) apply(saved.optional);
    } catch {
      // Without browser storage there is no stored consent; wait for the dialog.
    }
    const onChange = (event: Event) => apply((event as CustomEvent<OptionalPreferences>).detail);
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGED_EVENT, onChange);
  }, []);

  return null;
}
