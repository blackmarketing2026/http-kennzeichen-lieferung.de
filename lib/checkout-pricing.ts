import {
  BIKE_RACK_PLATE_PRICE,
  CARBON_SURCHARGE,
  EMISSION_STICKER_PRICE,
  FREE_SHIPPING_THRESHOLD,
  getPackageDiscountCents,
  getUnitPrice,
  isAvailableConfiguration,
  isSinglePlateProduct,
  PARKING_PLATE_PRICE,
  SHIPPING_PRICE,
  type PlateColor,
  type PlateType,
} from '@/config/products';

const PROMO_CODES = {
  TEST5: { totalCents: 500 },
} as const;

export type CheckoutPricing = {
  unitPriceCents: number;
  packageDiscountCents: number;
  parkingExtraPriceCents: number;
  bikeRackExtraPriceCents: number;
  emissionStickerPriceCents: number;
  subtotalCents: number;
  shippingCents: number;
  discountCents: number;
  totalCents: number;
  promoCode: string | null;
};

export type CheckoutExtras = {
  parkingPlate: boolean;
  bikeRackPlate: boolean;
  emissionSticker?: boolean;
};

export function getCheckoutPricing(
  plateType: PlateType,
  color: PlateColor,
  baseQuantity: 1 | 2,
  requestedCode: string | undefined,
  extras: CheckoutExtras = { parkingPlate: false, bikeRackPlate: false },
): CheckoutPricing | null {
  if (!isAvailableConfiguration(plateType, color, baseQuantity)) return null;
  if (
    isSinglePlateProduct(plateType) &&
    (extras.parkingPlate || extras.bikeRackPlate)
  )
    return null;
  const promoCode = requestedCode?.trim().toUpperCase() || null;
  if (promoCode && !(promoCode in PROMO_CODES)) return null;

  const unitPriceCents = Math.round(
    getUnitPrice(plateType, color, baseQuantity) * 100,
  );
  const parkingExtraPriceCents = extras.parkingPlate
    ? Math.round(PARKING_PLATE_PRICE * 100)
    : 0;
  const bikeRackExtraPriceCents = extras.bikeRackPlate
    ? Math.round((BIKE_RACK_PLATE_PRICE + (color === 'carbon' ? CARBON_SURCHARGE : 0)) * 100)
    : 0;
  const emissionStickerPriceCents = extras.emissionSticker
    ? Math.round(EMISSION_STICKER_PRICE * 100)
    : 0;
  const subtotalCents =
    unitPriceCents * baseQuantity +
    parkingExtraPriceCents +
    bikeRackExtraPriceCents +
    emissionStickerPriceCents;
  const packageDiscountCents = getPackageDiscountCents(
    plateType,
    color,
    baseQuantity,
  );
  const shippingCents = subtotalCents - packageDiscountCents >= Math.round(FREE_SHIPPING_THRESHOLD * 100)
    ? 0
    : Math.round(SHIPPING_PRICE * 100);
  const regularTotalCents = subtotalCents + shippingCents - packageDiscountCents;
  const targetTotalCents = promoCode
    ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES].totalCents
    : regularTotalCents;
  if (targetTotalCents > regularTotalCents) return null;

  return {
    unitPriceCents,
    packageDiscountCents,
    parkingExtraPriceCents,
    bikeRackExtraPriceCents,
    emissionStickerPriceCents,
    subtotalCents,
    shippingCents,
    discountCents: subtotalCents + shippingCents - targetTotalCents,
    totalCents: targetTotalCents,
    promoCode,
  };
}
