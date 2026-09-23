import { getUnitPrice, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';

const PROMO_CODES = {
  TEST5: { totalCents: 500 },
} as const;

export type CheckoutPricing = {
  unitPriceCents: number;
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
  const promoCode = requestedCode?.trim().toUpperCase() || null;
  if (promoCode && !(promoCode in PROMO_CODES)) return null;

  const unitPriceCents = Math.round(getUnitPrice(plateType, color, quantity) * 100);
  const subtotalCents = unitPriceCents * quantity;
  const shippingCents = Math.round(SHIPPING_PRICE * 100);
  const regularTotalCents = subtotalCents + shippingCents;
  const targetTotalCents = promoCode ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES].totalCents : regularTotalCents;
  if (targetTotalCents > regularTotalCents) return null;

  return {
    unitPriceCents,
    subtotalCents,
    shippingCents,
    discountCents: regularTotalCents - targetTotalCents,
    totalCents: targetTotalCents,
    promoCode,
  };
}
