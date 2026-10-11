import type { PlateType } from '@/config/products';

export const ADDONS = {
  holderScrews: {
    name: 'Kennzeichenhalter + Schrauben',
    priceCents: 790,
    manufacturerItems: [
      { productVariantId: 373, sku: '0195673', name: 'Kennzeichenhalter 520x110mm', quantity: 2 },
      { productVariantId: 379, sku: '0534100', name: 'Kennzeichen-Schrauben Standard', quantity: 1 },
    ],
  },
  warningVest: {
    name: 'Warnweste gelb',
    priceCents: 490,
    manufacturerItems: [
      { productVariantId: 5, sku: '0361566', name: 'Warnweste gelb', quantity: 1 },
    ],
  },
} as const;

export type AddonId = keyof typeof ADDONS;
export const ADDON_IDS = Object.keys(ADDONS) as AddonId[];

export function isAddonId(value: unknown): value is AddonId {
  return typeof value === 'string' && Object.hasOwn(ADDONS, value);
}

export function isAddonAvailable(id: AddonId, plateType: PlateType): boolean {
  return id !== 'holderScrews' || !['motorcycle', 'agriculture240', 'agriculture255'].includes(plateType);
}

export function addonTotalCents(ids: readonly AddonId[]): number {
  return ids.reduce((sum, id) => sum + ADDONS[id].priceCents, 0);
}

export function parseStoredAddons(value: unknown): AddonId[] {
  try {
    const parsed: unknown = typeof value === 'string' ? JSON.parse(value) : value;
    return Array.isArray(parsed) && parsed.every(isAddonId) && new Set(parsed).size === parsed.length
      ? parsed : [];
  } catch {
    return [];
  }
}
