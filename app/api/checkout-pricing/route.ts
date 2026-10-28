import { PRODUCTS, type PlateColor, type PlateType } from '@/config/products';
import { getCheckoutPricing } from '@/lib/checkout-pricing';

export const runtime = 'nodejs';

// Validates a promo code for a configurator selection and returns the
// server-calculated price. Uses the same pricing as create-payment-intent.
export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch { return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  const data = body as Record<string, unknown>;
  if (typeof data.plateType !== 'string' || !Object.hasOwn(PRODUCTS, data.plateType) ||
      typeof data.color !== 'string' ||
      (data.quantity !== 1 && data.quantity !== 2) ||
      typeof data.promoCode !== 'string' || data.promoCode.length > 64) {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }
  const pricing = getCheckoutPricing(data.plateType as PlateType, data.color as PlateColor, data.quantity, data.promoCode);
  if (!pricing) {
    return Response.json({ error: 'Der Rabattcode gilt für diese Auswahl leider nicht.' }, { status: 400 });
  }
  return Response.json({ pricing });
}
