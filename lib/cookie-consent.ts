export const CONSENT_STORAGE_KEY = 'kl_cookie_consent_v2';
// Increment before any currently inactive tracking service is technically activated.
// Previous choices must not silently authorize a new integration.
export const CONSENT_VERSION = 3;
/** Dispatched on window with the saved OptionalPreferences as `detail` whenever the visitor saves a choice. */
export const CONSENT_CHANGED_EVENT = 'cookie-consent-changed';
const CONSENT_LIFETIME_MS = 180 * 24 * 60 * 60 * 1000;

export type OptionalService = 'googleAnalytics' | 'microsoftClarity' | 'metaPixel' | 'googleTagManager';
export type OptionalPreferences = Record<OptionalService, boolean>;
export type ConsentRecord = {
  version: number;
  savedAt: number;
  expiresAt: number;
  optional: OptionalPreferences;
};

export const NO_OPTIONAL_ALLOWED: OptionalPreferences = {
  googleAnalytics: false,
  microsoftClarity: false,
  metaPixel: false,
  googleTagManager: false,
};

export const ALL_OPTIONAL_ALLOWED: OptionalPreferences = {
  googleAnalytics: true,
  microsoftClarity: true,
  metaPixel: true,
  googleTagManager: true,
};

export function createConsentRecord(optional: OptionalPreferences, now = Date.now()): ConsentRecord {
  return { version: CONSENT_VERSION, savedAt: now, expiresAt: now + CONSENT_LIFETIME_MS, optional: { ...optional } };
}

export function parseConsentRecord(raw: string | null, now = Date.now()): ConsentRecord | null {
  if (!raw) return null;
  try {
    const record: unknown = JSON.parse(raw);
    if (!record || typeof record !== 'object') return null;
    const value = record as Partial<ConsentRecord>;
    if (value.version !== CONSENT_VERSION || typeof value.savedAt !== 'number' || typeof value.expiresAt !== 'number' || value.expiresAt <= now || value.savedAt > now || !value.optional) return null;
    for (const key of Object.keys(NO_OPTIONAL_ALLOWED) as OptionalService[]) {
      if (typeof value.optional[key] !== 'boolean') return null;
    }
    return value as ConsentRecord;
  } catch {
    return null;
  }
}
