import type { PlateColor, PlateType } from '@/config/products';

/**
 * Zuordnung der Shop-Produkttypen zu den Herstellervarianten aus Produktkatalog.csv.
 * Werte 1:1 aus der CSV übernommen (Zeilen KFZ-/Elektro-/Oldtimer-/Saison-Kennzeichen
 * 520x110mm einzeilig sowie KFZ-Kennzeichen 180x200mm zweizeilig für Motorrad).
 */
export const MANUFACTURER_VARIANTS: Record<PlateType, Record<PlateColor, {
  productVariantId: number;
  sku: string;
  name: string;
  maxLength: number;
}>> = {
  standard: {
    black: { productVariantId: 2, sku: 'UD44520', name: 'KFZ-Kennzeichen 520x110mm - einzeilig', maxLength: 8 },
    carbon: { productVariantId: 64, sku: 'UDC4520', name: 'KFZ-Kennzeichen 520x110mm - einzeilig - Carbonoptik', maxLength: 8 },
  },
  motorcycle: {
    black: { productVariantId: 61, sku: 'UD44180', name: 'KFZ-Kennzeichen 180x200mm - zweizeilig', maxLength: 7 },
    carbon: { productVariantId: 92, sku: 'UDC4180', name: 'KFZ-Kennzeichen 180x200mm - zweizeilig - Carbonoptik', maxLength: 7 },
  },
  electric: {
    black: { productVariantId: 166, sku: 'UU44520', name: 'Elektro-Kennzeichen 520x110mm - einzeilig', maxLength: 7 },
    carbon: { productVariantId: 148, sku: 'UUC4520', name: 'Elektro-Kennzeichen 520x110mm - einzeilig - Carbonoptik', maxLength: 7 },
  },
  historic: {
    black: { productVariantId: 240, sku: 'UH44520', name: 'Oldtimer-Kennzeichen 520x110mm - einzeilig', maxLength: 7 },
    carbon: { productVariantId: 222, sku: 'UHC4520', name: 'Oldtimer-Kennzeichen 520x110mm - einzeilig - Carbonoptik', maxLength: 7 },
  },
  season: {
    black: { productVariantId: 131, sku: 'US44520', name: 'Saison-Kennzeichen 520x110mm - einzeilig', maxLength: 7 },
    carbon: { productVariantId: 113, sku: 'USC4520', name: 'Saison-Kennzeichen 520x110mm - einzeilig - Carbonoptik', maxLength: 7 },
  },
};

export function getManufacturerVariant(plateType: PlateType, color: PlateColor) {
  return MANUFACTURER_VARIANTS[plateType][color];
}
