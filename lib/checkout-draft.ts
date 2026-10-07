import {
  isAvailableConfiguration,
  isValidPlate,
  type PlateColor,
  type PlateType,
} from '@/config/products';
import { DEFAULT_SEASON_END_MONTH, DEFAULT_SEASON_START_MONTH, isValidSeasonPeriod } from '@/lib/season-period';

export type CheckoutSource =
  | 'home'
  | 'kennzeichen-bestellen'
  | 'kennzeichen-bestellen-herbstangebot'
  | 'autohaendlerpartner'
  | 'landmaschinen-kennzeichen';

export type CheckoutDraft = {
  plate: string;
  plateType: PlateType;
  plateColor: PlateColor;
  quantity: 1 | 2 | 3;
  bikeRackPlate?: boolean;
  promoCode?: string;
  seasonStartMonth?: number;
  seasonEndMonth?: number;
};

const STORAGE_PREFIX = 'kennzeichen-checkout-draft:';
const CAR_TYPES: PlateType[] = [
  'standard',
  'electric',
  'historic',
  'season',
  'motorcycle',
];
const AGRICULTURE_TYPES: PlateType[] = ['agriculture240', 'agriculture255'];

export function checkoutReturnPath(source: CheckoutSource) {
  if (source === 'home') return '/#konfigurator';
  if (source === 'autohaendlerpartner') return '/autohaendlerpartner#bestellen';
  return `/${source}#konfigurator`;
}

export function isCheckoutSource(value: unknown): value is CheckoutSource {
  return (
    value === 'home' ||
    value === 'kennzeichen-bestellen' ||
    value === 'kennzeichen-bestellen-herbstangebot' ||
    value === 'autohaendlerpartner' ||
    value === 'landmaschinen-kennzeichen'
  );
}

export function saveCheckoutDraft(source: CheckoutSource, draft: CheckoutDraft) {
  try {
    window.sessionStorage.setItem(STORAGE_PREFIX + source, JSON.stringify(draft));
  } catch {
    // Browsers with blocked storage can still complete checkout.
  }
}

export function readCheckoutDraft(source: CheckoutSource): CheckoutDraft | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_PREFIX + source);
    if (!raw) return null;
    const draft: unknown = JSON.parse(raw);
    if (!draft || typeof draft !== 'object') return null;
    const value = draft as Record<string, unknown>;
    const allowedTypes =
      source === 'landmaschinen-kennzeichen' ? AGRICULTURE_TYPES : CAR_TYPES;
    if (
      typeof value.plate !== 'string' ||
      !allowedTypes.includes(value.plateType as PlateType) ||
      (source === 'landmaschinen-kennzeichen'
        ? value.plateColor !== 'black' && value.plateColor !== 'green'
        : value.plateColor !== 'black' && value.plateColor !== 'carbon') ||
      (value.quantity !== 1 && value.quantity !== 2 && value.quantity !== 3) ||
      !isAvailableConfiguration(
        value.plateType as PlateType,
        value.plateColor as PlateColor,
        value.quantity,
      ) ||
      !isValidPlate(value.plate, value.plateType as PlateType)
      || (value.plateType === 'season' && !isValidSeasonPeriod(value.seasonStartMonth ?? DEFAULT_SEASON_START_MONTH, value.seasonEndMonth ?? DEFAULT_SEASON_END_MONTH))
    ) return null;
    return {
      plate: value.plate,
      plateType: value.plateType as PlateType,
      plateColor: value.plateColor as PlateColor,
      quantity: value.quantity,
      bikeRackPlate: value.bikeRackPlate === true,
      promoCode:
        typeof value.promoCode === 'string' ? value.promoCode.slice(0, 64) : undefined,
      seasonStartMonth: value.plateType === 'season' ? (value.seasonStartMonth ?? DEFAULT_SEASON_START_MONTH) as number : undefined,
      seasonEndMonth: value.plateType === 'season' ? (value.seasonEndMonth ?? DEFAULT_SEASON_END_MONTH) as number : undefined,
    };
  } catch {
    return null;
  }
}
