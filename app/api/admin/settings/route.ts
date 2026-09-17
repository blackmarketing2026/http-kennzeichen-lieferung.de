import { describeDatabaseError, ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { isManufacturerApiCredentialsConfigured, isManufacturerApiEnabled, setManufacturerApiEnabled } from '@/lib/kennzeichen-api';

export const runtime = 'nodejs';

export async function GET() {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  try {
    await ensureSchema();
  } catch (error) {
    return Response.json({ error: `Datenbankverbindung fehlgeschlagen: ${describeDatabaseError(error)}` }, { status: 502 });
  }
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
