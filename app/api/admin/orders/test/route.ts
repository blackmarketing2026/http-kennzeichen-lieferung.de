import { randomUUID } from 'crypto';
import { getUnitPrice, isValidPlate, PRODUCTS, SHIPPING_PRICE, type PlateColor, type PlateType } from '@/config/products';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { submitOrderToManufacturer } from '@/lib/manufacturer-order';

export const runtime = 'nodejs';

const PLATE_TYPES = Object.keys(PRODUCTS) as PlateType[];

type TestOrderBody = {
  plate?: string;
  plateType?: string;
  color?: string;
  quantity?: number;
  firstName?: string;
  lastName?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) {
    return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  }

  let body: TestOrderBody;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const plateType = body.plateType as PlateType;
  const color = body.color as PlateColor;
  const quantity = Number(body.quantity) as 1 | 2 | 3;
  const plate = body.plate?.toUpperCase().replace(/\s+/g, ' ').trim() ?? '';
  const email = body.email?.trim() ?? '';
  const firstName = body.firstName?.trim() ?? '';
  const lastName = body.lastName?.trim() ?? '';
  const street = body.street?.trim() ?? '';
  const houseNumber = body.houseNumber?.trim() ?? '';
  const zipCode = body.zipCode?.trim() ?? '';
  const city = body.city?.trim() ?? '';

  if (
    !PLATE_TYPES.includes(plateType) ||
    !['black', 'carbon'].includes(color) ||
    ![1, 2, 3].includes(quantity) ||
    !isValidPlate(plate, plateType) ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    !firstName ||
    !lastName ||
    !street ||
    !houseNumber ||
    !zipCode ||
    !city
  ) {
    return Response.json({ error: 'Bitte alle Felder korrekt ausfüllen.' }, { status: 400 });
  }

  await ensureSchema();

  const cartId = `test-${randomUUID()}`;
  const unitPriceCents = Math.round(getUnitPrice(plateType, color, quantity) * 100);
  const shippingCents = Math.round(SHIPPING_PRICE * 100);
  const totalCents = unitPriceCents * quantity + shippingCents;
  const address = {
    name: `${firstName} ${lastName}`,
    phone: body.phone?.trim() || null,
    address: { line1: `${street} ${houseNumber}`, city, postal_code: zipCode, country: 'DE' },
  };

  const inserted = await query<{ id: string }>(
    `INSERT INTO orders (cart_id, status, plate, plate_type, plate_color, quantity, unit_price_cents, shipping_cents, total_cents, customer_email, delivery_address, invoice_address)
     VALUES ($1, 'paid', $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $10::jsonb)
     RETURNING id`,
    [cartId, plate, plateType, color, quantity, unitPriceCents, shippingCents, totalCents, email, JSON.stringify(address)],
  );

  const orderId = inserted.rows[0].id;
  const result = await submitOrderToManufacturer(orderId);

  return Response.json({ orderId, ...result });
}
