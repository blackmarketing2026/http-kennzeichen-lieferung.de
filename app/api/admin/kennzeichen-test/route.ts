import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';
import { createManufacturerOrder, isManufacturerApiCredentialsConfigured, type Gender } from '@/lib/kennzeichen-api';
import { buildKennzeichenTestPayload } from '@/lib/kennzeichen-test-order';

export const runtime = 'nodejs';

type Body = {
  mode?: string;
  confirmed?: boolean;
  externalId?: string;
  productVariantId?: number;
  productName?: string;
  sku?: string;
  quantity?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: string;
  street?: string;
  houseNumber?: string;
  zipCode?: string;
  city?: string;
  phone?: string;
  plateCity?: string;
  plateMiddle?: string;
  plateEnd?: string;
};

export async function POST(request: Request) {
  // proxy.ts already gates /api/admin/*, but this route can trigger a real, billable
  // manufacturer order, so the session is re-verified here as well (defense in depth).
  const token = (await cookies()).get(ADMIN_SESSION_COOKIE)?.value;
  if (!verifyAdminSessionToken(token)) {
    return Response.json({ error: 'Nicht angemeldet.' }, { status: 401 });
  }

  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }

  const mode = body.mode === 'submit' ? 'submit' : 'preview';
  const gender: Gender = body.gender === 'FEMALE' || body.gender === 'MALE' ? body.gender : 'UNSPECIFIED';

  const built = buildKennzeichenTestPayload({
    externalId: body.externalId ?? '',
    productVariantId: Number(body.productVariantId),
    productName: body.productName ?? '',
    sku: body.sku ?? '',
    quantity: Number(body.quantity),
    email: body.email ?? '',
    firstName: body.firstName ?? '',
    lastName: body.lastName ?? '',
    gender,
    street: body.street ?? '',
    houseNumber: body.houseNumber ?? '',
    zipCode: body.zipCode ?? '',
    city: body.city ?? '',
    phone: body.phone ?? '',
    plateCity: body.plateCity ?? '',
    plateMiddle: body.plateMiddle ?? '',
    plateEnd: body.plateEnd ?? '',
  });

  if (!built.ok) {
    return Response.json({ error: built.error }, { status: 400 });
  }

  if (mode === 'preview') {
    return Response.json({ mode: 'preview', payload: built.payload });
  }

  // From here on: mode === 'submit', which can hit the real manufacturer API.
  if (body.confirmed !== true) {
    return Response.json({ error: 'Bestätigung erforderlich, bevor eine Testbestellung abgeschickt werden kann.' }, { status: 400 });
  }
  if (!isManufacturerApiCredentialsConfigured()) {
    return Response.json({ error: 'API-Zugangsdaten sind serverseitig nicht konfiguriert.' }, { status: 503 });
  }
  if (!isDatabaseConfigured()) {
    return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  }

  await ensureSchema();

  const existing = await query<{ id: number }>('SELECT id FROM kennzeichen_api_test_orders WHERE external_id = ?', [built.payload.externalId]);
  if (existing.rows.length > 0) {
    return Response.json({ error: `Externe Bestellnummer ${built.payload.externalId} wurde bereits erfolgreich verwendet.` }, { status: 409 });
  }

  const result = await createManufacturerOrder(built.payload, { orderId: null });

  if (result.ok) {
    const deliveryIds = result.data.deliveries.map((delivery) => delivery.id);
    await query(
      `INSERT INTO kennzeichen_api_test_orders
         (external_id, manufacturer_order_id, manufacturer_delivery_ids, product_variant_id, plate, manufacturer_cost_net_value, executed_by)
       VALUES (?, ?, ?, ?, ?, ?, 'admin')`,
      [
        built.payload.externalId,
        result.data.id,
        JSON.stringify(deliveryIds),
        built.payload.items[0].productVariantId,
        `${body.plateCity} ${body.plateMiddle} ${body.plateEnd}`,
        result.data.costNetValue,
      ],
    );
    return Response.json({
      mode: 'submit',
      ok: true,
      status: result.status,
      externalId: built.payload.externalId,
      manufacturerOrderId: result.data.id,
      deliveryIds,
      costNetValue: result.data.costNetValue,
      response: result.data,
    });
  }

  return Response.json(
    {
      mode: 'submit',
      ok: false,
      status: result.status,
      error: result.error,
      externalId: built.payload.externalId,
      sentPayload: built.payload,
      timestamp: new Date().toISOString(),
    },
    { status: result.status && result.status >= 400 ? result.status : 502 },
  );
}
