import Stripe from 'stripe';
import { getUnitPrice, isValidPlate, PRODUCTS, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';

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

  let body: { plate?: string; plateType?: string; color?: string; quantity?: number; cartId?: string };
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

  const product = PRODUCTS[plateType];
  const unitPrice = Math.round(getUnitPrice(plateType, color, quantity) * 100);
  const shippingCents = Math.round(SHIPPING_PRICE * 100);
  const amount = unitPrice * quantity + shippingCents;
  const stripe = new Stripe(config.secretKey);
  const idempotencyKey = `kennzeichen-${cartId}`;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      description: `${quantity} × ${product.label} – ${plate}`,
      automatic_payment_methods: { enabled: true, allow_redirects: 'never' },
      metadata: {
        kennzeichen: plate,
        kennzeichenart: product.label,
        groesse: product.size,
        schriftfarbe: color === 'carbon' ? 'Carbon' : 'Schwarz',
        anzahl: String(quantity),
        cartId,
      },
    }, { idempotencyKey });

    if (!paymentIntent.client_secret) {
      throw new Error('Stripe hat kein Client Secret zurückgegeben.');
    }

    if (isDatabaseConfigured()) {
      await ensureSchema();
      await query(
        `INSERT INTO orders (cart_id, status, plate, plate_type, plate_color, quantity, unit_price_cents, shipping_cents, total_cents, stripe_payment_intent_id)
         VALUES ($1, 'payment_pending', $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (cart_id) DO UPDATE SET
           plate = EXCLUDED.plate, plate_type = EXCLUDED.plate_type, plate_color = EXCLUDED.plate_color,
           quantity = EXCLUDED.quantity, unit_price_cents = EXCLUDED.unit_price_cents,
           shipping_cents = EXCLUDED.shipping_cents, total_cents = EXCLUDED.total_cents,
           stripe_payment_intent_id = EXCLUDED.stripe_payment_intent_id, updated_at = now()
         WHERE orders.status = 'payment_pending'`,
        [cartId, plate, plateType, color, quantity, unitPrice, shippingCents, amount, paymentIntent.id],
      );
    }

    return Response.json({ clientSecret: paymentIntent.client_secret, publishableKey: config.publishableKey });
  } catch (error) {
    console.error('Stripe PaymentIntent konnte nicht erstellt werden:', error instanceof Error ? error.message : 'Unbekannter Fehler');
    return Response.json({ error: 'Die Zahlung konnte gerade nicht vorbereitet werden. Bitte versuche es erneut.' }, { status: 502 });
  }
}
