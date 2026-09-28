/** Campaign parameters we forward from the landing page URL to the checkout notification. */
export const CAMPAIGN_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const;

const ATTRIBUTION_KEYS = [...CAMPAIGN_KEYS, 'referrer', 'landing_page'] as const;
const STORAGE_KEY = 'kl_attribution';
const MAX_VALUE_LENGTH = 200;

export type Attribution = Partial<
  Record<(typeof ATTRIBUTION_KEYS)[number], string>
>;

/** Keeps only known keys with non-empty string values; anything else from the client is dropped. */
export function sanitizeAttribution(value: unknown): Attribution {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const input = value as Record<string, unknown>;
  const result: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const raw = input[key];
    if (typeof raw !== 'string') continue;
    const trimmed = raw.trim().slice(0, MAX_VALUE_LENGTH);
    if (trimmed) result[key] = trimmed;
  }
  return result;
}

/**
 * Remembers the first landing page of the browser session. A later visit with fresh campaign
 * parameters (new ad click) replaces it. Session-only storage, nothing survives the tab.
 */
export function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const campaign: Attribution = {};
    for (const key of CAMPAIGN_KEYS) {
      const value = params.get(key);
      if (value) campaign[key] = value;
    }
    const hasCampaign = Object.keys(campaign).length > 0;
    if (!hasCampaign && window.sessionStorage.getItem(STORAGE_KEY)) return;

    let referrer = '';
    try {
      if (
        document.referrer &&
        new URL(document.referrer).host !== window.location.host
      )
        referrer = document.referrer;
    } catch {}

    const attribution = sanitizeAttribution({
      ...campaign,
      referrer,
      landing_page: window.location.pathname,
    });
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(attribution));
  } catch {}
}

export function readAttribution(): Attribution {
  try {
    return sanitizeAttribution(
      JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) ?? '{}'),
    );
  } catch {
    return {};
  }
}
