import { cookies } from 'next/headers';
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from '@/lib/admin-auth';
import { ensureSchema, query } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdminSessionToken((await cookies()).get(ADMIN_SESSION_COOKIE)?.value)) {
    return Response.json({ error: 'Nicht angemeldet.' }, { status: 401 });
  }
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return new Response(null, { status: 404 });
  await ensureSchema();
  const result = await query<{ receipt_data: Buffer; receipt_mime: string }>(
    'SELECT receipt_data, receipt_mime FROM delivery_guarantee_claims WHERE id = ? LIMIT 1', [id],
  );
  const receipt = result.rows[0];
  if (!receipt) return new Response(null, { status: 404 });
  return new Response(new Uint8Array(receipt.receipt_data), {
    headers: {
      'Content-Type': receipt.receipt_mime,
      'Content-Disposition': `attachment; filename="beleg-${id}.${receipt.receipt_mime === 'application/pdf' ? 'pdf' : receipt.receipt_mime === 'image/png' ? 'png' : 'jpg'}"`,
      'Cache-Control': 'private, no-store',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
