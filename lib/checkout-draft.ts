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
  | 'autokennzeichen-express-lieferung'
  | 'kennzeichen-online-bestellen24'
  | 'kennzeichen-bestellen-herbstangebot'
  | 'motorradkennzeichen-bestellen'
  | 'autohaendlerpartner'
  | 'landmaschinen-kennzeichen'
  | 'fahrradtraeger-kennzeichen'
  | 'anhaengerkennzeichen'
  | 'e-kennzeichen'
  | 'h-kennzeichen'
  | 'saisonkennzeichen'
  | 'carbon-kennzeichen'
  | 'kennzeichenhalter';

export type CheckoutDraft = {
  plate: string;
  plateType: PlateType;
  plateColor: PlateColor;
  quantity: 1 | 2 | 3;
  parkingPlate?: boolean;
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
    value === 'autokennzeichen-express-lieferung' ||
    value === 'kennzeichen-online-bestellen24' ||
    value === 'kennzeichen-bestellen-herbstangebot' ||
    value === 'motorradkennzeichen-bestellen' ||
    value === 'autohaendlerpartner' ||
    value === 'landmaschinen-kennzeichen' ||
    value === 'fahrradtraeger-kennzeichen' ||
    value === 'anhaengerkennzeichen' ||
    value === 'e-kennzeichen' ||
    value === 'h-kennzeichen' ||
    value === 'saisonkennzeichen' ||
    value === 'carbon-kennzeichen' ||
    value === 'kennzeichenhalter'
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
      source === 'landmaschinen-kennzeichen' ? AGRICULTURE_TYPES : source === 'home' || source === 'kennzeichen-online-bestellen24' ? [...CAR_TYPES, ...AGRICULTURE_TYPES] : CAR_TYPES;
    const agricultureColor = source === 'landmaschinen-kennzeichen' ||
      ((source === 'home' || source === 'kennzeichen-online-bestellen24') && AGRICULTURE_TYPES.includes(value.plateType as PlateType));
    if (
      typeof value.plate !== 'string' ||
      !allowedTypes.includes(value.plateType as PlateType) ||
      (agricultureColor
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
      parkingPlate: value.parkingPlate === true,
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
