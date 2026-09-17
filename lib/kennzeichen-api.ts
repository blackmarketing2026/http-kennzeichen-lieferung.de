import { logManufacturerEvent } from '@/lib/logger';
import { query } from '@/lib/db';

export type Gender = 'FEMALE' | 'MALE' | 'UNSPECIFIED';

export type ManufacturerAddress = {
  firstName: string;
  lastName: string;
  gender: Gender;
  streetName: string;
  houseNumber: string;
  zipCode: string;
  cityName: string;
  countryCode: 'DE';
  phoneNumber?: string;
};

export type ManufacturerOrderItem = {
  productVariantId: number;
  name: string;
  sku: string;
  quantity: number;
  customization: {
    productType: 'LICENSE_PLATE';
    licensePlateNumberComponents: { usageType: 'EURO'; city: string; middle: string; end: string };
    seasonStartMonth?: number;
    seasonEndMonth?: number;
  };
};

export type ManufacturerOrderPayload = {
  externalId: string;
  email: string;
  deliveryAddress: ManufacturerAddress;
  invoiceAddress: ManufacturerAddress;
  items: ManufacturerOrderItem[];
  shipperName?: string;
};

export type ManufacturerOrderResult =
  | { ok: true; status: number; data: { id: number; deliveries: { id: number; items: { orderItemIndex: number }[] }[]; costNetValue: string }; traceId: string | null }
  | { ok: false; status: number | null; error: string; traceId: string | null; kind: 'http' | 'network' | 'disabled' };

function getConfig() {
  const host = process.env.KENNZEICHEN_API_HOST?.trim();
  const clientId = process.env.KENNZEICHEN_API_CLIENT_ID?.trim();
  const version = process.env.KENNZEICHEN_API_VERSION?.trim();
  const username = process.env.KENNZEICHEN_API_USERNAME?.trim();
  const password = process.env.KENNZEICHEN_API_PASSWORD?.trim();
  const timeoutSeconds = Number(process.env.KENNZEICHEN_API_TIMEOUT_SECONDS ?? '55');

  if (!host || !clientId || !version || !username || !password) return null;
  return { host, clientId, version, username, password, timeoutSeconds: Number.isFinite(timeoutSeconds) ? timeoutSeconds : 55 };
}

export function isManufacturerApiCredentialsConfigured() {
  return Boolean(getConfig());
}

export async function isManufacturerApiEnabled() {
  if (!isManufacturerApiCredentialsConfigured()) return false;
  try {
    const result = await query<{ value: string }>('SELECT value FROM admin_settings WHERE setting_key = ?', ['kennzeichen_api_enabled']);
    return result.rows[0]?.value === 'true';
  } catch {
    return false;
  }
}

export async function setManufacturerApiEnabled(enabled: boolean) {
  const value = enabled ? 'true' : 'false';
  await query(
    `INSERT INTO admin_settings (setting_key, value, updated_at) VALUES ('kennzeichen_api_enabled', ?, NOW())
     ON DUPLICATE KEY UPDATE value = ?, updated_at = NOW()`,
    [value, value],
  );
}

export async function createManufacturerOrder(
  payload: ManufacturerOrderPayload,
  context: { orderId: string },
): Promise<ManufacturerOrderResult> {
  const config = getConfig();
  if (!config) {
    await logManufacturerEvent({ orderId: context.orderId, direction: 'error', endpoint: '/orders', message: 'API-Zugangsdaten fehlen' });
    return { ok: false, status: null, error: 'Zugangsdaten nicht konfiguriert', traceId: null, kind: 'disabled' };
  }

  const enabled = await isManufacturerApiEnabled();
  if (!enabled) {
    await logManufacturerEvent({ orderId: context.orderId, direction: 'error', endpoint: '/orders', message: 'API ist im Admin-Bereich deaktiviert' });
    return { ok: false, status: null, error: 'API deaktiviert', traceId: null, kind: 'disabled' };
  }

  const url = `https://${config.host}/dropshipping-api/${config.clientId}/${config.version}/orders`;
  const auth = Buffer.from(`${config.username}:${config.password}`).toString('base64');
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutSeconds * 1000);

  await logManufacturerEvent({ orderId: context.orderId, direction: 'request', endpoint: '/orders', message: 'Sende Bestellung an Hersteller', detail: { externalId: payload.externalId, itemCount: payload.items.length } });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    const traceId = response.headers.get('X-Trace-Id');
    const text = await response.text();
    let data: unknown = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      data = null;
    }

    if (response.status === 201 && data) {
      await logManufacturerEvent({ orderId: context.orderId, direction: 'response', endpoint: '/orders', httpStatus: response.status, traceId, message: 'Bestellung erstellt', detail: data });
      const created = data as { id: number; deliveries: { id: number; items: { orderItemIndex: number }[] }[]; costNetValue: string };
      return { ok: true, status: response.status, data: created, traceId };
    }

    const errorMessage = (data && typeof data === 'object' && 'error' in data && typeof (data as { error?: unknown }).error === 'string')
      ? (data as { error: string }).error
      : `Unerwarteter Status ${response.status}`;

    await logManufacturerEvent({ orderId: context.orderId, direction: 'error', endpoint: '/orders', httpStatus: response.status, traceId, message: errorMessage, detail: data });
    return { ok: false, status: response.status, error: errorMessage, traceId, kind: 'http' };
  } catch (error) {
    clearTimeout(timeout);
    const message = error instanceof Error ? error.message : 'Unbekannter Netzwerkfehler';
    await logManufacturerEvent({ orderId: context.orderId, direction: 'error', endpoint: '/orders', message: `Transportfehler: ${message}` });
    return { ok: false, status: null, error: message, traceId: null, kind: 'network' };
  }
}
