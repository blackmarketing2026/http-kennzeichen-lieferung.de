import {
  BIKE_RACK_PLATE_PRICE,
  CARBON_SURCHARGE,
  EMISSION_STICKER_PRICE,
  getPackageDiscountCents,
  getMotorcyclePackage,
  getUnitPrice,
  isAvailableConfiguration,
  isSinglePlateProduct,
  PARKING_PLATE_PRICE,
  MOTORCYCLE_PACKAGES,
  SHIPPING_CENTS,
  type PlateColor,
  type PlateType,
} from '@/config/products';
import { addonTotalCents, isAddonAvailable, type AddonId } from '@/config/addons';

const PROMO_CODES = {
  TEST5: { totalCents: 500 },
} as const;

export type CheckoutPricing = {
  unitPriceCents: number;
  packageDiscountCents: number;
  parkingExtraPriceCents: number;
  bikeRackExtraPriceCents: number;
  emissionStickerPriceCents: number;
  addonPriceCents: number;
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
  addOns?: AddonId[];
};

export function getCheckoutPricing(
  plateType: PlateType,
  color: PlateColor,
  baseQuantity: 1 | 2,
  requestedCode: string | undefined,
  extras: CheckoutExtras = { parkingPlate: false, bikeRackPlate: false },
  _offer: string = 'standard',
  _now: Date = new Date(),
): CheckoutPricing | null {
  if (!isAvailableConfiguration(plateType, color, baseQuantity)) return null;
  if (
    isSinglePlateProduct(plateType) &&
    (extras.parkingPlate || extras.bikeRackPlate)
  )
    return null;
  if ((extras.addOns ?? []).some((id) => !isAddonAvailable(id, plateType)) || new Set(extras.addOns ?? []).size !== (extras.addOns ?? []).length) return null;
  const promoCode = requestedCode?.trim().toUpperCase() || null;
  if (promoCode && !(promoCode in PROMO_CODES)) return null;
  const addonPriceCents = addonTotalCents(extras.addOns ?? []);

  if (plateType === 'motorcycle') {
    const packageId = getMotorcyclePackage(color, baseQuantity);
    if (!packageId) return null;
    const subtotalCents = MOTORCYCLE_PACKAGES[packageId].priceCents;
    const emissionStickerPriceCents = extras.emissionSticker ? Math.round(EMISSION_STICKER_PRICE * 100) : 0;
    const shippingCents = SHIPPING_CENTS;
    const regularTotalCents = subtotalCents + emissionStickerPriceCents + shippingCents + addonPriceCents;
    const totalCents = promoCode ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES].totalCents + addonPriceCents : regularTotalCents;
    if (totalCents > regularTotalCents) return null;
    return {
      unitPriceCents: subtotalCents / baseQuantity, packageDiscountCents: 0,
      parkingExtraPriceCents: 0, bikeRackExtraPriceCents: 0, emissionStickerPriceCents,
      subtotalCents: subtotalCents + emissionStickerPriceCents + addonPriceCents, addonPriceCents, shippingCents,
      discountCents: regularTotalCents - totalCents, totalCents, promoCode,
    };
  }

  const unitPriceCents = Math.round(
    getUnitPrice(plateType, color, baseQuantity) * 100,
  );
  const parkingExtraPriceCents = extras.parkingPlate
    ? plateType === 'standard' ? unitPriceCents : Math.round(PARKING_PLATE_PRICE * 100)
    : 0;
  const bikeRackExtraPriceCents = extras.bikeRackPlate
    ? plateType === 'standard' ? unitPriceCents : Math.round((BIKE_RACK_PLATE_PRICE + (color === 'carbon' ? CARBON_SURCHARGE : 0)) * 100)
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
  const shippingCents = SHIPPING_CENTS;
  const regularTotalCents = subtotalCents + shippingCents - packageDiscountCents + addonPriceCents;
  const targetTotalCents = promoCode
    ? PROMO_CODES[promoCode as keyof typeof PROMO_CODES].totalCents + addonPriceCents
    : regularTotalCents;
  if (targetTotalCents > regularTotalCents) return null;

  return {
    unitPriceCents,
    packageDiscountCents,
    parkingExtraPriceCents,
    bikeRackExtraPriceCents,
    emissionStickerPriceCents,
    addonPriceCents,
    subtotalCents: subtotalCents + addonPriceCents,
    shippingCents,
    discountCents: subtotalCents + addonPriceCents + shippingCents - targetTotalCents,
    totalCents: targetTotalCents,
    promoCode,
  };
}
