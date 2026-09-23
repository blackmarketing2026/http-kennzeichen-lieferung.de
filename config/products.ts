export type PlateType = 'standard' | 'motorcycle' | 'electric' | 'historic' | 'season';
export type PlateColor = 'black' | 'carbon';

// Shipping is included in the displayed plate-package prices.
export const SHIPPING_PRICE = 0;

/** All prices in this file are consumer-facing gross prices (inkl. MwSt.), as required for B2C
 * price display in Germany (PAngV). License plates are taxed at the standard rate, not the
 * reduced one. */
export const VAT_RATE = 0.19;

export const PRODUCTS: Record<PlateType, {
  label: string;
  shortLabel: string;
  size: string;
  format: 'long' | 'motorcycle';
  prices: Record<1 | 2 | 3, number>;
  suffix?: 'E' | 'H';
}> = {
  standard: { label: 'Auto', shortLabel: 'Standard', size: '520 mm', format: 'long', prices: { 1: 14.95, 2: 14.95, 3: 14.95 } },
  motorcycle: { label: 'Motorrad', shortLabel: 'Motorrad', size: 'zweizeilig', format: 'motorcycle', prices: { 1: 24.90, 2: 24.90, 3: 24.90 } },
  electric: { label: 'E-Kennzeichen', shortLabel: 'Elektro', size: '520 mm', format: 'long', prices: { 1: 14.95, 2: 14.95, 3: 14.95 }, suffix: 'E' },
  historic: { label: 'H-Kennzeichen', shortLabel: 'Historisch', size: '520 mm', format: 'long', prices: { 1: 14.95, 2: 14.95, 3: 14.95 }, suffix: 'H' },
  season: { label: 'Saison', shortLabel: 'Saison', size: '520 mm', format: 'long', prices: { 1: 14.95, 2: 14.95, 3: 14.95 } },
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);

const CARBON_PRICES = {
  long: { 1: 3.27, 2: 3.12, 3: 3.06 },
  motorcycle: { 1: 3.47, 2: 3.32, 3: 3.27 },
} satisfies Record<'long' | 'motorcycle', Record<1 | 2 | 3, number>>;

export function getUnitPrice(plateType: PlateType, color: PlateColor, quantity: 1 | 2 | 3) {
  const product = PRODUCTS[plateType];
  return color === 'carbon' ? CARBON_PRICES[product.format][quantity] : product.prices[quantity];
}

export function isAvailableConfiguration(plateType: PlateType, color: PlateColor, quantity: number) {
  if (!(plateType in PRODUCTS)) return false;
  if (color !== 'black') return false;
  if (plateType === 'motorcycle') return quantity === 1;
  return quantity === 2 || quantity === 3;
}

export function isValidPlate(plate: string, plateType: PlateType) {
  const match = /^([A-ZÄÖÜ]{1,3}) ([A-Z]{1,2}) ([1-9]\d{0,3})$/.exec(plate);
  if (!match) return false;
  const [, city, letters, numbers] = match;
  if (plateType === 'motorcycle') return letters.length + numbers.length <= 5;
  const maximum = plateType === 'standard' ? 8 : 7;
  return city.length + letters.length + numbers.length <= maximum;
}
