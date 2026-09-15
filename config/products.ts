export type PlateType = 'standard' | 'motorcycle' | 'electric' | 'historic' | 'season';

export const SHIPPING_PRICE = 4.47;

export const PRODUCTS: Record<PlateType, {
  label: string;
  shortLabel: string;
  size: string;
  format: 'long' | 'motorcycle';
  prices: Record<1 | 2 | 3, number>;
  suffix?: 'E' | 'H';
}> = {
  standard: { label: 'Auto', shortLabel: 'Standard', size: '520 mm', format: 'long', prices: { 1: 2.77, 2: 2.62, 3: 2.56 } },
  motorcycle: { label: 'Motorrad', shortLabel: 'Motorrad', size: 'zweizeilig', format: 'motorcycle', prices: { 1: 2.97, 2: 2.82, 3: 2.77 } },
  electric: { label: 'E-Kennzeichen', shortLabel: 'Elektro', size: '520 mm', format: 'long', prices: { 1: 2.77, 2: 2.62, 3: 2.56 }, suffix: 'E' },
  historic: { label: 'H-Kennzeichen', shortLabel: 'Historisch', size: '520 mm', format: 'long', prices: { 1: 2.77, 2: 2.62, 3: 2.56 }, suffix: 'H' },
  season: { label: 'Saison', shortLabel: 'Saison', size: '520 mm', format: 'long', prices: { 1: 2.77, 2: 2.62, 3: 2.56 } },
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
