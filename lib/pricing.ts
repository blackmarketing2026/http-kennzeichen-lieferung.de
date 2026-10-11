export type OfferProfile = 'standard' | 'herbst';

export const HERBST_DESCRIPTION =
  'DIN-zertifizierte Autokennzeichen ab 9,80 € pro Schild, Carbon ab 14,60 €. Motorrad-Kennzeichen ab 9,80 €. Preise inklusive Mehrwertsteuer, einzeln zzgl. 3,95 € Versand.';

export function normalizeOffer(value: unknown): OfferProfile {
  return value === 'herbst' ? 'herbst' : 'standard';
}
