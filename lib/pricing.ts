export type OfferProfile = 'standard' | 'herbst';

export const HERBST_DESCRIPTION =
  'DIN-zertifizierte Autokennzeichen ab 9,80 € pro Schild inklusive Mehrwertsteuer. DHL-Versand 4,90 € pro Bestellung.';

export function normalizeOffer(value: unknown): OfferProfile {
  return value === 'herbst' ? 'herbst' : 'standard';
}
