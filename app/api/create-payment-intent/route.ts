import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import Stripe from 'stripe';
import { isValidPlate, PRODUCTS, type PlateColor, type PlateType } from '@/config/products';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { CUSTOMER_SESSION_COOKIE, verifyCustomerSessionToken } from '@/lib/customer-auth';

export const runtime = 'nodejs';

const PLATE_TYPES = Object.keys(PRODUCTS) as PlateType[];

function getStripeConfiguration() {
  const publishableKey = process.env.stripe_api?.trim();
  const secretKey = process.env.stripe_live?.trim();

  if (!publishableKey?.startsWith('pk_') || !secretKey?.startsWith('sk_')) {
    return null;
  }

  return { publishableKey, secretKey };
}

export async function GET() {
  return Response.json({ configured: Boolean(getStripeConfiguration()) });
}

export async function POST(request: Request) {
  const config = getStripeConfiguration();
  if (!config) {
    return Response.json({ error: 'Stripe ist noch nicht vollständig konfiguriert.' }, { status: 503 });
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
  }

  let body: { plate?: string; plateType?: string; color?: string; quantity?: number; cartId?: string; promoCode?: unknown; paymentIntentId?: unknown };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }

  const plateType = body.plateType as PlateType;
  const color = body.color as PlateColor;
  const quantity = Number(body.quantity) as 1 | 2 | 3;
  const plate = body.plate?.toUpperCase().replace(/\s+/g, ' ').trim() ?? '';

  if (!PLATE_TYPES.includes(plateType) || !['black', 'carbon'].includes(color) || ![1, 2, 3].includes(quantity) || !isValidPlate(plate, plateType)) {
    return Response.json({ error: 'Bitte prüfe Kennzeichenart, Kombination und Anzahl.' }, { status: 400 });
  }

  const cartId = typeof body.cartId === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(body.cartId) ? body.cartId : null;
  if (!cartId) {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }

  if ((body.promoCode !== undefined && (typeof body.promoCode !== 'string' || body.promoCode.length > 64)) ||
      (body.paymentIntentId !== undefined && (typeof body.paymentIntentId !== 'string' || !/^pi_[a-zA-Z0-9]+$/.test(body.paymentIntentId)))) {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }

  const product = PRODUCTS[plateType];
  const pricing = getCheckoutPricing(plateType, color, quantity, body.promoCode as string | undefined);
  if (!pricing) {
    return Response.json({ error: 'Dieser Rabattcode ist ungültig oder nicht anwendbar.' }, { status: 400 });
  }

  const stripe = new Stripe(config.secretKey);
  const idempotencyKey = `kennzeichen-${cartId}`;

  try {
    const databaseReady = isDatabaseConfigured();
    if (databaseReady) await ensureSchema();
    const existingOrder = databaseReady
      ? (await query<{ id: string; status: string; stripe_payment_intent_id: string | null }>(
          'SELECT id, status, stripe_payment_intent_id FROM orders WHERE cart_id = ?', [cartId],
        )).rows[0]
      : null;

    if (existingOrder && existingOrder.status !== 'payment_pending') {
      return Response.json({ error: 'Diese Bestellung wurde bereits abgeschlossen.' }, { status: 409 });
    }
    if (existingOrder?.stripe_payment_intent_id && body.paymentIntentId && existingOrder.stripe_payment_intent_id !== body.paymentIntentId) {
      return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
    }

    const metadata = {
      kennzeichen: plate,
      kennzeichenart: product.label,
      groesse: product.size,
      schriftfarbe: color === 'carbon' ? 'Carbon' : 'Schwarz',
      anzahl: String(quantity),
      cartId,
      rabattcode: pricing.promoCode ?? '',
    };
    const intentId = existingOrder?.stripe_payment_intent_id ?? body.paymentIntentId;
    let paymentIntent: Stripe.PaymentIntent;
    if (typeof intentId === 'string') {
      const current = await stripe.paymentIntents.retrieve(intentId);
      if (current.metadata.cartId !== cartId || current.metadata.kennzeichen !== plate ||
          current.metadata.kennzeichenart !== product.label || current.metadata.anzahl !== String(quantity) ||
          current.metadata.schriftfarbe !== metadata.schriftfarbe) {
        return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
      }
      if (current.status !== 'requires_payment_method') {
        return Response.json({ error: 'Die Zahlung wird bereits verarbeitet. Der Rabattcode kann nicht mehr geändert werden.' }, { status: 409 });
      }
      paymentIntent = current.amount === pricing.totalCents && current.metadata.rabattcode === metadata.rabattcode
        ? current
        : await stripe.paymentIntents.update(intentId, { amount: pricing.totalCents, metadata });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: pricing.totalCents,
        currency: 'eur',
        description: `${quantity} × ${product.label} – ${plate}`,
        automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
        metadata,
      }, { idempotencyKey });
    }

    if (!paymentIntent.client_secret) {
      throw new Error('Stripe hat kein Client Secret zurückgegeben.');
    }

    if (databaseReady) {
      const customerToken = (await cookies()).get(CUSTOMER_SESSION_COOKIE)?.value;
      const customerId = verifyCustomerSessionToken(customerToken);

      if (!existingOrder) {
        await query(
          `INSERT INTO orders (id, cart_id, status, plate, plate_type, plate_color, quantity, unit_price_cents, shipping_cents, discount_cents, promo_code, total_cents, stripe_payment_intent_id, customer_id)
           VALUES (?, ?, 'payment_pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [randomUUID(), cartId, plate, plateType, color, quantity, pricing.unitPriceCents, pricing.shippingCents, pricing.discountCents, pricing.promoCode, pricing.totalCents, paymentIntent.id, customerId],
        );
      } else {
        const updated = await query(
          `UPDATE orders SET plate = ?, plate_type = ?, plate_color = ?, quantity = ?, unit_price_cents = ?,
             shipping_cents = ?, discount_cents = ?, promo_code = ?, total_cents = ?, stripe_payment_intent_id = ?, customer_id = COALESCE(?, customer_id), updated_at = NOW()
           WHERE id = ? AND status = 'payment_pending'`,
          [plate, plateType, color, quantity, pricing.unitPriceCents, pricing.shippingCents, pricing.discountCents, pricing.promoCode, pricing.totalCents, paymentIntent.id, customerId, existingOrder.id],
        );
        if (updated.affectedRows === 0) {
          const latest = await query<{ status: string }>('SELECT status FROM orders WHERE id = ?', [existingOrder.id]);
          if (latest.rows[0]?.status !== 'payment_pending') {
            return Response.json({ error: 'Diese Bestellung wurde bereits abgeschlossen.' }, { status: 409 });
          }
        }
      }
    }

    return Response.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id, publishableKey: config.publishableKey, pricing });
  } catch (error) {
    console.error('Stripe PaymentIntent konnte nicht erstellt werden:', error instanceof Error ? error.message : 'Unbekannter Fehler');
    return Response.json({ error: 'Die Zahlung konnte gerade nicht vorbereitet werden. Bitte versuche es erneut.' }, { status: 502 });
  }
}
