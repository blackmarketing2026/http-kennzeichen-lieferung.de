import { describe, expect, it } from 'vitest';
import {
  ALL_OPTIONAL_ALLOWED,
  createConsentRecord,
  NO_OPTIONAL_ALLOWED,
  parseConsentRecord,
} from '@/lib/cookie-consent';

describe('cookie preferences', () => {
  const now = 1_800_000_000_000;

  it('starts with all optional functions off', () => {
    expect(Object.values(NO_OPTIONAL_ALLOWED)).toEqual([false, false, false, false]);
  });

  it('stores and restores the selected functions', () => {
    const selection = { ...NO_OPTIONAL_ALLOWED, googleAnalytics: true };
    const record = createConsentRecord(selection, now);
    expect(parseConsentRecord(JSON.stringify(record), now + 1000)?.optional).toEqual(selection);
    expect(record.expiresAt - record.savedAt).toBe(180 * 24 * 60 * 60 * 1000);
  });

  it('expires preferences and rejects outdated or malformed records', () => {
    const record = createConsentRecord(ALL_OPTIONAL_ALLOWED, now);
    expect(parseConsentRecord(JSON.stringify(record), record.expiresAt)).toBeNull();
    expect(parseConsentRecord(JSON.stringify({ ...record, version: 1 }), now)).toBeNull();
    expect(parseConsentRecord(JSON.stringify({ ...record, optional: { googleAnalytics: true } }), now)).toBeNull();
    expect(parseConsentRecord('not json', now)).toBeNull();
  });
});
