import { ensureSchema, isDatabaseConfigured } from '@/lib/db';
import { submitOrderToManufacturer } from '@/lib/manufacturer-order';

export const runtime = 'nodejs';

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Keine Datenbank konfiguriert.' }, { status: 503 });
  await ensureSchema();
  const { id } = await params;
  const result = await submitOrderToManufacturer(id);
  return Response.json(result);
}
