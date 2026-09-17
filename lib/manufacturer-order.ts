import { query } from '@/lib/db';
import { createManufacturerOrder, type ManufacturerAddress, type ManufacturerOrderPayload } from '@/lib/kennzeichen-api';
import { getManufacturerVariant } from '@/config/manufacturer-products';
import { logManufacturerEvent } from '@/lib/logger';
import type { PlateColor, PlateType } from '@/config/products';

export type OrderRow = {
  id: string;
  cart_id: string;
  status: string;
  plate: string;
  plate_type: PlateType;
  plate_color: PlateColor;
  quantity: number;
  total_cents: number;
  customer_email: string | null;
  delivery_address: StripeShippingAddress | null;
  invoice_address: StripeShippingAddress | null;
  stripe_payment_intent_id: string | null;
};

type StripeShippingAddress = {
  name?: string | null;
  phone?: string | null;
  address?: {
    line1?: string | null;
    line2?: string | null;
    city?: string | null;
    state?: string | null;
    postal_code?: string | null;
    country?: string | null;
  } | null;
};

/** Splits "Vorname Nachname" into first/last name; splits "Straße 12a" into street + house number. */
export function toManufacturerAddress(shipping: StripeShippingAddress | null): ManufacturerAddress | null {
  const nameParts = (shipping?.name ?? '').trim().split(/\s+/).filter(Boolean);
  const lastName = nameParts.length > 1 ? nameParts.pop()! : nameParts[0];
  const firstName = nameParts.length > 0 ? nameParts.join(' ') : lastName;
  const line1 = shipping?.address?.line1?.trim() ?? '';
  const streetMatch = /^(.*?)[,\s]+(\d+\s*[a-zA-Z]?)$/.exec(line1);
  const streetName = (streetMatch ? streetMatch[1] : line1).trim();
  const houseNumber = (streetMatch ? streetMatch[2] : '').trim() || '1';
  const cityName = shipping?.address?.city?.trim() ?? '';
  const zipCode = shipping?.address?.postal_code?.trim() ?? '';

  if (!firstName || !lastName || !streetName || !cityName || !zipCode) return null;

  return {
    firstName: firstName.slice(0, 100),
    lastName: lastName.slice(0, 100),
    gender: 'UNSPECIFIED',
    streetName: streetName.slice(0, 100),
    houseNumber: houseNumber.slice(0, 10),
    zipCode: zipCode.slice(0, 12),
    cityName: cityName.slice(0, 100),
    countryCode: 'DE',
    ...(shipping?.phone ? { phoneNumber: shipping.phone.slice(0, 20) } : {}),
  };
}

export function parsePlate(plate: string) {
  const match = /^([A-ZÄÖÜ]{1,3}) ([A-Z]{1,2}) ([1-9]\d{0,3})$/.exec(plate);
  if (!match) return null;
  const [, city, middle, end] = match;
  return { city, middle, end };
}

export type SubmitResult = { status: 'submitted' | 'failed' | 'uncertain' | 'skipped'; message: string };

export async function submitOrderToManufacturer(orderId: string): Promise<SubmitResult> {
  const lockResult = await query<OrderRow>(
    `UPDATE orders SET status = 'submitting_to_manufacturer', updated_at = now()
     WHERE id = $1 AND status IN ('paid', 'manufacturer_submission_failed', 'manufacturer_submission_uncertain')
     RETURNING *`,
    [orderId],
  );
  const order = lockResult.rows[0];
  if (!order) {
    return { status: 'skipped', message: 'Bestellung bereits verarbeitet oder nicht im richtigen Status.' };
  }

  const deliveryAddress = toManufacturerAddress(order.delivery_address);
  const invoiceAddress = toManufacturerAddress(order.invoice_address) ?? deliveryAddress;
  const plateComponents = parsePlate(order.plate);
  const variant = getManufacturerVariant(order.plate_type, order.plate_color);

  if (!deliveryAddress || !invoiceAddress || !plateComponents || !order.customer_email) {
    await query(`UPDATE orders SET status = 'manufacturer_submission_failed', last_error = $2, updated_at = now() WHERE id = $1`, [
      orderId,
      'Unvollständige Liefer- oder Kennzeichendaten.',
    ]);
    await logManufacturerEvent({ orderId, direction: 'error', endpoint: '/orders', message: 'Unvollständige Daten, Übertragung abgebrochen' });
    return { status: 'failed', message: 'Unvollständige Liefer- oder Kennzeichendaten.' };
  }

  if (order.plate.replace(/\s+/g, '').length > variant.maxLength) {
    await query(`UPDATE orders SET status = 'manufacturer_submission_failed', last_error = $2, updated_at = now() WHERE id = $1`, [
      orderId,
      'Kennzeichen überschreitet die maximale Zeichenlänge der Produktvariante.',
    ]);
    return { status: 'failed', message: 'Kennzeichen überschreitet die maximale Zeichenlänge der Produktvariante.' };
  }

  const isSeason = order.plate_type === 'season';
  const payload: ManufacturerOrderPayload = {
    externalId: order.cart_id,
    email: order.customer_email,
    deliveryAddress,
    invoiceAddress,
    items: [
      {
        productVariantId: variant.productVariantId,
        name: variant.name,
        sku: variant.sku,
        quantity: order.quantity,
        customization: {
          productType: 'LICENSE_PLATE',
          licensePlateNumberComponents: { usageType: 'EURO', ...plateComponents },
          ...(isSeason ? { seasonStartMonth: 4, seasonEndMonth: 10 } : {}),
        },
      },
    ],
  };

  const result = await createManufacturerOrder(payload, { orderId });

  if (result.ok) {
    await query(
      `UPDATE orders SET status = 'submitted_to_manufacturer', manufacturer_order_id = $2,
         manufacturer_delivery_ids = $3, manufacturer_cost_net_value = $4, manufacturer_submitted_at = now(),
         last_error = NULL, last_trace_id = $5, updated_at = now()
       WHERE id = $1`,
      [orderId, result.data.id, JSON.stringify(result.data.deliveries.map((d) => d.id)), result.data.costNetValue, result.traceId],
    );
    return { status: 'submitted', message: `Hersteller-Bestellung ${result.data.id} erstellt.` };
  }

  const status = result.kind === 'network' || result.kind === 'disabled' ? 'manufacturer_submission_uncertain' : 'manufacturer_submission_failed';
  await query(`UPDATE orders SET status = $2, last_error = $3, last_trace_id = $4, updated_at = now() WHERE id = $1`, [
    orderId,
    status,
    result.error,
    result.traceId,
  ]);
  return { status: status === 'manufacturer_submission_uncertain' ? 'uncertain' : 'failed', message: result.error };
}
