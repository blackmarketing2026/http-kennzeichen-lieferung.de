import { getUnitPrice, isAvailableConfiguration, PARKING_PLATE_PRICE, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';

const PROMO_CODES = {
  TEST5: { totalCents: 500 },
} as const;

export type CheckoutPricing = {
  unitPriceCents: number;
  parkingExtraPriceCents: number;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  promoCode: string | null;
};

export function getCheckoutPricing(
  plateType: PlateType,
  color: PlateColor,
  quantity: 1 | 2 | 3,
  requestedCode: string | undefined,
): CheckoutPricing | null {
  if (!isAvailableConfiguration(plateType, color, quantity)) return null;
  const promoCode = requestedCode?.trim().toUpperCase() || null;
  if (promoCode && !(promoCode in PROMO_CODES)) return null;

  const baseQuantity = quantity === 3 ? 2 : quantity;
  const unitPriceCents = Math.round(getUnitPrice(plateType, color, baseQuantity) * 100);
  const parkingExtraPriceCents = quantity === 3 ? Math.round(PARKING_PLATE_PRICE * 100) : 0;
  const subtotalCents = unitPriceCents * baseQuantity + parkingExtraPriceCents;
  const shippingCents = Math.round(SHIPPING_PRICE * 100);
  const regularTotalCents = subtotalCents + shippingCents;
  const targetTotalCents = promoCode ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES].totalCents : regularTotalCents;
  if (targetTotalCents > regularTotalCents) return null;

  return {
    unitPriceCents,
    parkingExtraPriceCents,
    subtotalCents,
    shippingCents,
    discountCents: regularTotalCents - targetTotalCents,
    totalCents: targetTotalCents,
    promoCode,
  };
}
