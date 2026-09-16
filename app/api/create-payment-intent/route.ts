import Stripe from 'stripe';
import { getUnitPrice, isValidPlate, PRODUCTS, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';

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

  const product = PRODUCTS[plateType];
  const unitPrice = Math.round(getUnitPrice(plateType, color, quantity) * 100);
  const amount = unitPrice * quantity + Math.round(SHIPPING_PRICE * 100);
  const stripe = new Stripe(config.secretKey);
  const idempotencyKey = typeof body.cartId === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(body.cartId)
    ? `kennzeichen-${body.cartId}`
    : undefined;

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
      },
    }, idempotencyKey ? { idempotencyKey } : undefined);

    if (!paymentIntent.client_secret) {
      throw new Error('Stripe hat kein Client Secret zurückgegeben.');
    }

    return Response.json({ clientSecret: paymentIntent.client_secret, publishableKey: config.publishableKey });
  } catch (error) {
    console.error('Stripe PaymentIntent konnte nicht erstellt werden:', error instanceof Error ? error.message : 'Unbekannter Fehler');
    return Response.json({ error: 'Die Zahlung konnte gerade nicht vorbereitet werden. Bitte versuche es erneut.' }, { status: 502 });
  }
}
