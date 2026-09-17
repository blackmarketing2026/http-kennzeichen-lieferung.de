import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { isManufacturerApiCredentialsConfigured, isManufacturerApiEnabled, setManufacturerApiEnabled } from '@/lib/kennzeichen-api';

export const runtime = 'nodejs';

export async function GET() {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  await ensureSchema();
  return Response.json({
    credentialsConfigured: isManufacturerApiCredentialsConfigured(),
    enabled: await isManufacturerApiEnabled(),
  });
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  await ensureSchema();
  let body: { enabled?: boolean };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: 'Ungültige Anfrage.' }, { status: 400 });
  }
  await setManufacturerApiEnabled(Boolean(body.enabled));
  return Response.json({ ok: true, enabled: Boolean(body.enabled) });
}
