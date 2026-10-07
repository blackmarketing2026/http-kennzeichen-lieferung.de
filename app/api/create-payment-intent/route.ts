import { randomUUID } from 'crypto';
import { cookies } from 'next/headers';
import { after } from 'next/server';
import Stripe from 'stripe';
import {
  isAvailableConfiguration,
  isSinglePlateProduct,
  isValidPlate,
  plateColorLabel,
  PRODUCTS,
  type PlateColor,
  type PlateType,
} from '@/config/products';
import { sanitizeAttribution } from '@/lib/attribution';
import { getCheckoutPricing } from '@/lib/checkout-pricing';
import { normalizeOffer } from '@/lib/pricing';
import { ensureCheckoutSchema, isDatabaseConfigured, query } from '@/lib/db';
import {
  CUSTOMER_SESSION_COOKIE,
  verifyCustomerSessionToken,
} from '@/lib/customer-auth';
import { logEvent } from '@/lib/logger';
import { sendCheckoutStartedEmail } from '@/lib/order-emails';
import { configuredShippingRegion, configuredShippingState, DELIVERY_PROMISE_TEXT, GUARANTEE_TERMS_VERSION } from '@/lib/delivery-promise';
import { DEFAULT_SEASON_END_MONTH, DEFAULT_SEASON_START_MONTH, isValidSeasonPeriod } from '@/lib/season-period';

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
    return Response.json(
      { error: 'Stripe ist noch nicht vollständig konfiguriert.' },
      { status: 503 },
    );
  }

  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host && new URL(origin).host !== host) {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 403 });
  }

  let body: {
    plate?: string;
    plateType?: string;
    seasonStartMonth?: number;
    seasonEndMonth?: number;
    color?: string;
    quantity?: number;
    parkingPlate?: unknown;
    bikeRackPlate?: unknown;
    cartId?: string;
    promoCode?: unknown;
    paymentIntentId?: unknown;
    attribution?: unknown;
    offer?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }

  const plateType = body.plateType as PlateType;
  const offer = normalizeOffer(body.offer);
  const color = body.color as PlateColor;
  const requestedQuantity = Number(body.quantity);
  const plate = body.plate?.toUpperCase().replace(/\s+/g, ' ').trim() ?? '';
  const seasonStartMonth = body.seasonStartMonth ?? DEFAULT_SEASON_START_MONTH;
  const seasonEndMonth = body.seasonEndMonth ?? DEFAULT_SEASON_END_MONTH;

  const hasExplicitExtras =
    body.parkingPlate !== undefined || body.bikeRackPlate !== undefined;
  if (
    (body.parkingPlate !== undefined &&
      typeof body.parkingPlate !== 'boolean') ||
    (body.bikeRackPlate !== undefined &&
      typeof body.bikeRackPlate !== 'boolean')
  ) {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }
  const extras = hasExplicitExtras
    ? {
        parkingPlate: body.parkingPlate === true,
        bikeRackPlate: body.bikeRackPlate === true,
      }
    : {
        parkingPlate:
          requestedQuantity === 3 && !isSinglePlateProduct(plateType),
        bikeRackPlate: false,
      };
  const baseQuantity = (
    hasExplicitExtras
      ? requestedQuantity
      : requestedQuantity === 3
        ? 2
        : requestedQuantity
  ) as 1 | 2;
  const quantity =
    baseQuantity + Number(extras.parkingPlate) + Number(extras.bikeRackPlate);

  if (
    !PLATE_TYPES.includes(plateType) ||
    !isAvailableConfiguration(plateType, color, baseQuantity) ||
    (isSinglePlateProduct(plateType) &&
      (extras.parkingPlate || extras.bikeRackPlate)) ||
    !isValidPlate(plate, plateType) ||
    (plateType === 'season' && !isValidSeasonPeriod(seasonStartMonth, seasonEndMonth))
  ) {
    return Response.json(
      { error: 'Bitte prüfe Kennzeichenart, Kombination und Anzahl.' },
      { status: 400 },
    );
  }

  const cartId =
    typeof body.cartId === 'string' && /^[a-zA-Z0-9-]{16,80}$/.test(body.cartId)
      ? body.cartId
      : null;
  if (!cartId) {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }

  if (
    (body.promoCode !== undefined &&
      (typeof body.promoCode !== 'string' || body.promoCode.length > 64)) ||
    (body.paymentIntentId !== undefined &&
      (typeof body.paymentIntentId !== 'string' ||
        !/^pi_[a-zA-Z0-9]+$/.test(body.paymentIntentId)))
  ) {
    return Response.json({ error: 'Ungültige Bestelldaten.' }, { status: 400 });
  }

  const product = PRODUCTS[plateType];
  const pricing = getCheckoutPricing(
    plateType,
    color,
    baseQuantity,
    body.promoCode as string | undefined,
    extras,
    offer,
  );
  if (!pricing) {
    return Response.json(
      { error: 'Dieser Rabattcode ist ungültig oder nicht anwendbar.' },
      { status: 400 },
    );
  }

  const stripe = new Stripe(config.secretKey);
  const idempotencyKey = `kennzeichen-${cartId}`;

  try {
    const databaseReady = isDatabaseConfigured();
    if (databaseReady) await ensureCheckoutSchema();
    const existingOrder = databaseReady
      ? (
          await query<{
            id: string;
            status: string;
            stripe_payment_intent_id: string | null;
          }>(
            'SELECT id, status, stripe_payment_intent_id FROM orders WHERE cart_id = ?',
            [cartId],
          )
        ).rows[0]
      : null;

    if (existingOrder && existingOrder.status !== 'payment_pending') {
      return Response.json(
        { error: 'Diese Bestellung wurde bereits abgeschlossen.' },
        { status: 409 },
      );
    }
    if (
      existingOrder?.stripe_payment_intent_id &&
      body.paymentIntentId &&
      existingOrder.stripe_payment_intent_id !== body.paymentIntentId
    ) {
      return Response.json(
        { error: 'Ungültige Bestelldaten.' },
        { status: 400 },
      );
    }

    const metadata = {
      kennzeichen: plate,
      kennzeichenart: product.label,
      groesse: product.size,
      schriftfarbe: plateColorLabel(color),
      anzahl: String(quantity),
      cartId,
      rabattcode: pricing.promoCode ?? '',
      offer,
      parkplatzkennzeichen: extras.parkingPlate ? '1' : '0',
      fahrradtraegerkennzeichen: extras.bikeRackPlate ? '1' : '0',
      ...(plateType === 'season' ? { saisonVon: String(seasonStartMonth), saisonBis: String(seasonEndMonth) } : {}),
    };
    const intentId =
      existingOrder?.stripe_payment_intent_id ?? body.paymentIntentId;
    let paymentIntent: Stripe.PaymentIntent;
    if (typeof intentId === 'string') {
      const current = await stripe.paymentIntents.retrieve(intentId);
      if (
        current.metadata.cartId !== cartId ||
        current.metadata.kennzeichen !== plate ||
        current.metadata.kennzeichenart !== product.label ||
        current.metadata.schriftfarbe !== metadata.schriftfarbe ||
        (plateType === 'season' && ((current.metadata.saisonVon ?? String(DEFAULT_SEASON_START_MONTH)) !== String(seasonStartMonth) ||
          (current.metadata.saisonBis ?? String(DEFAULT_SEASON_END_MONTH)) !== String(seasonEndMonth)))
      ) {
        return Response.json(
          { error: 'Ungültige Bestelldaten.' },
          { status: 400 },
        );
      }
      if (current.status !== 'requires_payment_method') {
        return Response.json(
          {
            error:
              'Die Zahlung wird bereits verarbeitet. Die Bestellung kann nicht mehr geändert werden.',
          },
          { status: 409 },
        );
      }
      paymentIntent =
        current.amount === pricing.totalCents &&
        current.metadata.rabattcode === metadata.rabattcode &&
        (current.metadata.offer ?? 'standard') === metadata.offer &&
        current.metadata.anzahl === String(quantity) &&
        current.metadata.parkplatzkennzeichen ===
          metadata.parkplatzkennzeichen &&
        current.metadata.fahrradtraegerkennzeichen ===
          metadata.fahrradtraegerkennzeichen
          ? current
          : await stripe.paymentIntents.update(intentId, {
              amount: pricing.totalCents,
              metadata,
              description: `${quantity} × ${product.label} – ${plate}${extras.parkingPlate ? ' + Parkplatz' : ''}${extras.bikeRackPlate ? ' + Fahrradträger' : ''}`,
            });
    } else {
      // Stripe invoices can credit this PaymentIntent only when the payment belongs to
      // the same Stripe Customer. The email and address arrive during confirmation.
      const stripeCustomer = await stripe.customers.create(
        { metadata: { cartId } },
        { idempotencyKey: `kennzeichen-customer-${cartId}` },
      );
      paymentIntent = await stripe.paymentIntents.create(
        {
          amount: pricing.totalCents,
          currency: 'eur',
          customer: stripeCustomer.id,
          description: `${quantity} × ${product.label} – ${plate}${extras.parkingPlate ? ' + Parkplatz' : ''}${extras.bikeRackPlate ? ' + Fahrradträger' : ''}`,
          automatic_payment_methods: {
            enabled: true,
          },
          metadata,
        },
        { idempotencyKey },
      );
    }

    if (!paymentIntent.client_secret) {
      throw new Error('Stripe hat kein Client Secret zurückgegeben.');
    }

    let createdOrder = false;
    if (databaseReady) {
      const customerToken = (await cookies()).get(
        CUSTOMER_SESSION_COOKIE,
      )?.value;
      const customerId = verifyCustomerSessionToken(customerToken);

      if (!existingOrder) {
        try {
          await query(
            `INSERT INTO orders (id, cart_id, status, plate, plate_type, plate_color, quantity, parking_plate, bike_rack_plate, season_start_month, season_end_month, unit_price_cents, shipping_cents, discount_cents, promo_code, total_cents, offer_profile, stripe_payment_intent_id, customer_id, ordered_at_utc, delivery_promise_text, guarantee_terms_version, shipping_origin_state, shipping_origin_holiday_region)
             VALUES (?, ?, 'payment_pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UTC_TIMESTAMP(), ?, ?, ?, ?)`,
            [
              randomUUID(),
              cartId,
              plate,
              plateType,
              color,
              quantity,
              extras.parkingPlate,
              extras.bikeRackPlate,
              plateType === 'season' ? seasonStartMonth : null,
              plateType === 'season' ? seasonEndMonth : null,
              pricing.unitPriceCents,
              pricing.shippingCents,
              pricing.discountCents,
              pricing.promoCode,
              pricing.totalCents,
              offer,
              paymentIntent.id,
              customerId,
              DELIVERY_PROMISE_TEXT,
              GUARANTEE_TERMS_VERSION,
              configuredShippingState(),
              configuredShippingRegion(configuredShippingState()),
            ],
          );
          createdOrder = true;
        } catch (error) {
          // A timed-out mobile request may still finish while the customer retries.
          // Both requests use the same cart and Stripe idempotency key.
          if (!(error && typeof error === 'object' && 'code' in error && error.code === 'ER_DUP_ENTRY')) throw error;
          const retryOrder = (
            await query<{
              status: string;
              stripe_payment_intent_id: string | null;
            }>(
              'SELECT status, stripe_payment_intent_id FROM orders WHERE cart_id = ?',
              [cartId],
            )
          ).rows[0];
          if (
            retryOrder?.status !== 'payment_pending' ||
            retryOrder.stripe_payment_intent_id !== paymentIntent.id
          ) throw error;
        }
      } else {
        const updated = await query(
          `UPDATE orders SET plate = ?, plate_type = ?, plate_color = ?, quantity = ?, parking_plate = ?, bike_rack_plate = ?, season_start_month = ?, season_end_month = ?, unit_price_cents = ?,
             shipping_cents = ?, discount_cents = ?, promo_code = ?, total_cents = ?, offer_profile = ?, stripe_payment_intent_id = ?, customer_id = COALESCE(?, customer_id), updated_at = NOW()
           WHERE id = ? AND status = 'payment_pending'`,
          [
            plate,
            plateType,
            color,
            quantity,
            extras.parkingPlate,
            extras.bikeRackPlate,
            plateType === 'season' ? seasonStartMonth : null,
            plateType === 'season' ? seasonEndMonth : null,
            pricing.unitPriceCents,
            pricing.shippingCents,
            pricing.discountCents,
            pricing.promoCode,
            pricing.totalCents,
            offer,
            paymentIntent.id,
            customerId,
            existingOrder.id,
          ],
        );
        if (updated.affectedRows === 0) {
          const latest = await query<{ status: string }>(
            'SELECT status FROM orders WHERE id = ?',
            [existingOrder.id],
          );
          if (latest.rows[0]?.status !== 'payment_pending') {
            return Response.json(
              { error: 'Diese Bestellung wurde bereits abgeschlossen.' },
              { status: 409 },
            );
          }
        }
      }
    }

    // A freshly created PaymentIntent means a new checkout visit; later calls only adjust it.
    if (typeof intentId !== 'string' && (!databaseReady || createdOrder)) {
      const details = {
        plate,
        plateType,
        plateColor: color,
        quantity,
        totalCents: pricing.totalCents,
        promoCode: pricing.promoCode,
        cartId,
        paymentIntentId: paymentIntent.id,
        attribution: sanitizeAttribution(body.attribution),
        startedAt: new Date(),
      };
      const origin = new URL(request.url).origin;
      after(() =>
        sendCheckoutStartedEmail(details, origin).catch((error) =>
          logEvent('warn', 'Checkout-Hinweis konnte nicht gesendet werden', {
            cartId,
            error: error instanceof Error ? error.message : 'unbekannt',
          }),
        ),
      );
    }

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      publishableKey: config.publishableKey,
      pricing,
    });
  } catch (error) {
    console.error(
      'Stripe PaymentIntent konnte nicht erstellt werden:',
      error instanceof Error ? error.message : 'Unbekannter Fehler',
    );
    return Response.json(
      {
        error:
          'Die Zahlung konnte gerade nicht vorbereitet werden. Bitte versuche es erneut.',
      },
      { status: 502 },
    );
  }
}
