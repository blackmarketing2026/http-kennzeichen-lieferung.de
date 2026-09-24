import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { query, withConnection } from '@/lib/db';
import { formatPrice, PRODUCTS, VAT_RATE, type PlateColor, type PlateType } from '@/config/products';

export type InvoiceOrder = {
  id: string;
  plate: string;
  plate_type: PlateType;
  plate_color: PlateColor;
  quantity: number;
  unit_price_cents: number;
  shipping_cents: number;
  discount_cents: number;
  promo_code: string | null;
  total_cents: number;
  customer_email: string | null;
  invoice_address: {
    name?: string | null;
    address?: { line1?: string | null; line2?: string | null; city?: string | null; postal_code?: string | null; country?: string | null } | null;
  } | null;
};

export type InvoiceRecord = { invoice_number: string; issued_at: string };

/** Atomically allocates the next sequential invoice number for the current year using
 * LAST_INSERT_ID(expr), which requires both statements to run on the same connection. */
async function nextInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  return withConnection(async (conn) => {
    await conn.query('INSERT INTO invoice_counters (year, counter) VALUES (?, 1) ON DUPLICATE KEY UPDATE counter = LAST_INSERT_ID(counter + 1)', [
      year,
    ]);
    const [rows] = await conn.query('SELECT LAST_INSERT_ID() AS id');
    const counter = (rows as { id: number }[])[0].id;
    return `RE-${year}-${String(counter).padStart(6, '0')}`;
  });
}

/** Idempotently creates (or returns the existing) invoice for an order. Safe under concurrent
 * calls: order_id is UNIQUE, so a race falls back to re-reading the row the other call inserted. */
export async function ensureInvoiceForOrder(orderId: string): Promise<InvoiceRecord> {
  const existing = await query<InvoiceRecord>('SELECT invoice_number, issued_at FROM invoices WHERE order_id = ?', [orderId]);
  if (existing.rows[0]) return existing.rows[0];

  const invoiceNumber = await nextInvoiceNumber();
  try {
    await query('INSERT INTO invoices (order_id, invoice_number) VALUES (?, ?)', [orderId, invoiceNumber]);
  } catch (error) {
    const code = error && typeof error === 'object' && 'code' in error ? String((error as { code: unknown }).code) : '';
    if (code !== 'ER_DUP_ENTRY') throw error;
  }

  const result = await query<InvoiceRecord>('SELECT invoice_number, issued_at FROM invoices WHERE order_id = ?', [orderId]);
  return result.rows[0];
}

const INK = rgb(6 / 255, 22 / 255, 34 / 255);
const MUTED = rgb(90 / 255, 108 / 255, 120 / 255);
const LINE = rgb(219 / 255, 230 / 255, 238 / 255);

export async function renderInvoicePdf(order: InvoiceOrder, invoice: InvoiceRecord): Promise<Buffer> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const margin = 50;

  let cursorY = 841.89 - margin;
  const write = (text: string, opts: { x?: number; size?: number; bold?: boolean; color?: ReturnType<typeof rgb>; gap?: number } = {}) => {
    page.drawText(text, { x: opts.x ?? margin, y: cursorY, size: opts.size ?? 10, font: opts.bold ? bold : font, color: opts.color ?? INK });
    cursorY -= opts.gap ?? (opts.size ?? 10) + 6;
  };
  const writeRow = (cells: { text: string; x: number; width: number; align?: 'left' | 'right' }[], opts: { size?: number; bold?: boolean; color?: ReturnType<typeof rgb> } = {}) => {
    const size = opts.size ?? 10;
    const activeFont = opts.bold ? bold : font;
    for (const cell of cells) {
      const textWidth = activeFont.widthOfTextAtSize(cell.text, size);
      const x = cell.align === 'right' ? cell.x + cell.width - textWidth : cell.x;
      page.drawText(cell.text, { x, y: cursorY, size, font: activeFont, color: opts.color ?? INK });
    }
  };
  const hr = () => {
    page.drawLine({ start: { x: margin, y: cursorY }, end: { x: 595.28 - margin, y: cursorY }, thickness: 1, color: LINE });
    cursorY -= 16;
  };

  write('Kennzeichen-Lieferung', { size: 20, bold: true, gap: 18 });
  write('kennzeichen-lieferung.de · bestellung@kennzeichen-lieferung.de', { size: 9, color: MUTED, gap: 28 });

  write('Rechnung', { size: 16, bold: true, gap: 22 });
  write(`Rechnungsnummer: ${invoice.invoice_number}`, { size: 10, color: MUTED });
  write(`Rechnungsdatum: ${new Date(invoice.issued_at).toLocaleDateString('de-DE')}`, { size: 10, color: MUTED });
  write(`Bestellnummer: ${order.id}`, { size: 10, color: MUTED, gap: 20 });

  const address = order.invoice_address;
  if (address?.name || address?.address?.line1) {
    write('Rechnungsadresse:', { size: 10, bold: true });
    if (address.name) write(address.name, { size: 10 });
    if (address.address?.line1) write(address.address.line1, { size: 10 });
    if (address.address?.line2) write(address.address.line2, { size: 10 });
    const cityLine = [address.address?.postal_code, address.address?.city].filter(Boolean).join(' ');
    if (cityLine) write(cityLine, { size: 10 });
    cursorY -= 14;
  }

  const columns = { position: { x: margin, width: 260 }, quantity: { x: 320, width: 60 }, unitPrice: { x: 390, width: 70 }, total: { x: 470, width: 75 } };
  writeRow(
    [
      { text: 'Position', ...columns.position },
      { text: 'Menge', ...columns.quantity, align: 'right' },
      { text: 'Einzelpreis', ...columns.unitPrice, align: 'right' },
      { text: 'Summe', ...columns.total, align: 'right' },
    ],
    { bold: true },
  );
  cursorY -= 8;
  hr();

  const product = PRODUCTS[order.plate_type];
  const itemLabel = `${product.label} (${order.plate_color === 'carbon' ? 'Carbon' : 'Schwarz'}) – ${order.plate}`;
  const unitPrice = order.unit_price_cents / 100;
  const baseQuantity = order.quantity === 3 ? 2 : order.quantity;
  const itemTotal = (order.unit_price_cents * baseQuantity) / 100;
  writeRow([
    { text: itemLabel, ...columns.position },
    { text: String(baseQuantity), ...columns.quantity, align: 'right' },
    { text: formatPrice(unitPrice), ...columns.unitPrice, align: 'right' },
    { text: formatPrice(itemTotal), ...columns.total, align: 'right' },
  ]);
  cursorY -= 22;

  if (order.quantity === 3) {
    const parkingExtraCents = order.total_cents + order.discount_cents - order.shipping_cents - order.unit_price_cents * baseQuantity;
    writeRow([
      { text: `Parkplatz-Kennzeichen – ${order.plate}`, ...columns.position },
      { text: '1', ...columns.quantity, align: 'right' },
      { text: formatPrice(parkingExtraCents / 100), ...columns.unitPrice, align: 'right' },
      { text: formatPrice(parkingExtraCents / 100), ...columns.total, align: 'right' },
    ]);
    cursorY -= 22;
  }

  writeRow([
    { text: order.shipping_cents === 0 ? 'Versand (inklusive)' : 'Versand', ...columns.position },
    { text: formatPrice(order.shipping_cents / 100), ...columns.total, align: 'right' },
  ]);
  cursorY -= 22;
  if (order.discount_cents > 0) {
    writeRow([
      { text: order.promo_code ? `Rabatt (${order.promo_code})` : 'Rabatt', ...columns.position },
      { text: `-${formatPrice(order.discount_cents / 100)}`, ...columns.total, align: 'right' },
    ]);
    cursorY -= 22;
  }
  write('Alle Preise verstehen sich inklusive gesetzlicher Umsatzsteuer.', { size: 8, color: MUTED, gap: 16 });
  hr();

  // Displayed prices are gross (inkl. MwSt.); back out the net/VAT split for the required breakdown.
  const grossCents = order.total_cents;
  const netCents = Math.round(grossCents / (1 + VAT_RATE));
  const vatCents = grossCents - netCents;

  writeRow([
    { text: 'Nettobetrag', x: 320, width: 150 },
    { text: formatPrice(netCents / 100), ...columns.total, align: 'right' },
  ]);
  cursorY -= 16;
  writeRow([
    { text: `zzgl. ${Math.round(VAT_RATE * 100)}% USt.`, x: 320, width: 150 },
    { text: formatPrice(vatCents / 100), ...columns.total, align: 'right' },
  ]);
  cursorY -= 16;
  hr();

  writeRow(
    [
      { text: 'Gesamtsumme (brutto)', x: 320, width: 150 },
      { text: formatPrice(grossCents / 100), ...columns.total, align: 'right' },
    ],
    { size: 12, bold: true },
  );

  const bytes = await pdfDoc.save();
  return Buffer.from(bytes);
}
