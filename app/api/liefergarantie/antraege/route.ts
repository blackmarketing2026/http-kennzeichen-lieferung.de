import { randomUUID } from 'node:crypto';
import { ensureSchema, isDatabaseConfigured, query } from '@/lib/db';

export const runtime = 'nodejs';
const MAX_RECEIPT_BYTES = 10 * 1024 * 1024;
const MAX_REQUEST_BYTES = MAX_RECEIPT_BYTES + 32_768;

export function receiptMime(bytes: Uint8Array): 'image/jpeg' | 'image/png' | 'application/pdf' | null {
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  if (bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((value, index) => bytes[index] === value)) return 'image/png';
  if (bytes.length >= 5 && [37, 80, 68, 70, 45].every((value, index) => bytes[index] === value)) return 'application/pdf';
  return null;
}

function field(form: FormData, name: string): string {
  const value = form.get(name);
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request: Request) {
  if (!isDatabaseConfigured()) return Response.json({ error: 'Anträge sind derzeit nicht verfügbar.' }, { status: 503 });
  if (Number(request.headers.get('content-length') ?? 0) > MAX_REQUEST_BYTES) {
    return Response.json({ error: 'Der Beleg ist größer als 10 MB.' }, { status: 413 });
  }
  const contentType = request.headers.get('content-type');
  if (!contentType?.startsWith('multipart/form-data;')) return Response.json({ error: 'Ungültiges Formular.' }, { status: 400 });
  let form: FormData;
  try {
    const reader = request.body?.getReader();
    if (!reader) return Response.json({ error: 'Das Formular ist leer.' }, { status: 400 });
    const chunks: Uint8Array[] = [];
    let total = 0;
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_REQUEST_BYTES) {
        await reader.cancel();
        return Response.json({ error: 'Der Beleg ist größer als 10 MB.' }, { status: 413 });
      }
      chunks.push(value);
    }
    form = await new Request(request.url, {
      method: 'POST', headers: { 'content-type': contentType }, body: Buffer.concat(chunks),
    }).formData();
  } catch { return Response.json({ error: 'Das Formular konnte nicht gelesen werden.' }, { status: 400 }); }
  const orderId = field(form, 'orderId');
  const email = field(form, 'email').toLowerCase();
  const replacementDate = field(form, 'replacementDate');
  const message = field(form, 'message');
  const receipt = form.get('receipt');
  if (!/^[0-9a-f-]{36}$/i.test(orderId) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255 ||
      !/^\d{4}-\d{2}-\d{2}$/.test(replacementDate) || Number.isNaN(Date.parse(`${replacementDate}T12:00:00Z`)) ||
      new Date(`${replacementDate}T12:00:00Z`).toISOString().slice(0, 10) !== replacementDate ||
      replacementDate > new Date().toISOString().slice(0, 10) || message.length > 2000 || !(receipt instanceof File)) {
    return Response.json({ error: 'Bitte prüfe deine Angaben.' }, { status: 400 });
  }
  if (receipt.size === 0 || receipt.size > MAX_RECEIPT_BYTES) return Response.json({ error: 'Der Beleg muss zwischen 1 Byte und 10 MB groß sein.' }, { status: 413 });
  const buffer = Buffer.from(await receipt.arrayBuffer());
  const mime = receiptMime(buffer);
  const extension = receipt.name.split('.').pop()?.toLowerCase();
  const expectedExtension = mime === 'image/jpeg' ? ['jpg', 'jpeg'] : mime === 'image/png' ? ['png'] : mime === 'application/pdf' ? ['pdf'] : [];
  if (!mime || !expectedExtension.includes(extension ?? '') || receipt.type !== mime) {
    return Response.json({ error: 'Bitte lade einen gültigen JPG-, PNG- oder PDF-Beleg hoch.' }, { status: 400 });
  }

  await ensureSchema();
  const orders = await query<{ id: string }>(
    `SELECT id FROM orders WHERE id = ? AND LOWER(customer_email) = ? AND paid_at_utc IS NOT NULL LIMIT 1`,
    [orderId, email],
  );
  if (!orders.rows[0]) return Response.json({ error: 'Bestellung und E-Mail-Adresse konnten nicht zugeordnet werden.' }, { status: 404 });
  const existing = await query<{ count: number }>('SELECT COUNT(*) AS count FROM delivery_guarantee_claims WHERE order_id = ?', [orderId]);
  if (Number(existing.rows[0]?.count ?? 0) >= 3) return Response.json({ error: 'Für diese Bestellung liegen bereits Anträge vor. Bitte kontaktiere den Kundenservice.' }, { status: 409 });
  await query(
    `INSERT INTO delivery_guarantee_claims (id, order_id, applicant_email, replacement_purchased_on, message, receipt_filename, receipt_mime, receipt_data)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [randomUUID(), orderId, email, replacementDate, message || null, receipt.name.slice(0, 255), mime, buffer],
  );
  return Response.json({ ok: true }, { status: 201 });
}
