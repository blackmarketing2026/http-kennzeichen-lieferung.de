export type OfferProfile = 'standard' | 'herbst';

export const HERBST_DESCRIPTION =
  'DIN-zertifizierte Autokennzeichen ab 9,80 € pro Schild, Carbon ab 14,60 €. Motorrad-Kennzeichen ab 9,80 €. Preise inklusive Versand und Mehrwertsteuer.';

export function normalizeOffer(value: unknown): OfferProfile {
  return value === 'herbst' ? 'herbst' : 'standard';
}
