export type OfferProfile = 'standard' | 'herbst';

export const HERBST_DESCRIPTION =
  'DIN-zertifizierte Autokennzeichen ab 9,80 € pro Schild inklusive Mehrwertsteuer. Ab zwei Schildern ist der Versand kostenlos.';

export function normalizeOffer(value: unknown): OfferProfile {
  return value === 'herbst' ? 'herbst' : 'standard';
}
