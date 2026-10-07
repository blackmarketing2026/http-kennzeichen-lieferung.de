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
import { HERBST_PRICING, herbstSetPriceCents, normalizeOffer } from '@/lib/pricing';

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
  offer: string = 'standard',
  now: Date = new Date(),
): CheckoutPricing | null {
  if (!isAvailableConfiguration(plateType, color, baseQuantity)) return null;
  if (
    isSinglePlateProduct(plateType) &&
    (extras.parkingPlate || extras.bikeRackPlate)
  )
    return null;
  const promoCode = requestedCode?.trim().toUpperCase() || null;
  if (promoCode && !(promoCode in PROMO_CODES)) return null;

  if (normalizeOffer(offer) === 'herbst' && plateType === 'standard' && !extras.parkingPlate) {
    const unitPriceCents = color === 'carbon' ? HERBST_PRICING.carbonPlateCents : HERBST_PRICING.standardPlateCents;
    const bikeRackExtraPriceCents = extras.bikeRackPlate && baseQuantity === 2
      ? herbstSetPriceCents(color, now) - unitPriceCents * baseQuantity
      : extras.bikeRackPlate ? unitPriceCents : 0;
    const parkingExtraPriceCents = 0;
    const emissionStickerPriceCents = extras.emissionSticker ? Math.round(EMISSION_STICKER_PRICE * 100) : 0;
    const subtotalCents = unitPriceCents * baseQuantity + bikeRackExtraPriceCents + emissionStickerPriceCents;
    const shippingCents = baseQuantity + Number(extras.bikeRackPlate) >= 3 ? 0 : HERBST_PRICING.shippingCents;
    const regularTotalCents = subtotalCents + shippingCents;
    const totalCents = promoCode ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES].totalCents : regularTotalCents;
    if (totalCents > regularTotalCents) return null;
    return {
      unitPriceCents, packageDiscountCents: 0, parkingExtraPriceCents,
      bikeRackExtraPriceCents, emissionStickerPriceCents, subtotalCents, shippingCents,
      discountCents: regularTotalCents - totalCents, totalCents, promoCode,
    };
  }

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
