import { getMailTransport, isMailConfigured, MAIL_FROM, renderEmailTemplate } from '@/lib/mail';
import { logEvent } from '@/lib/logger';
import { formatPrice, PRODUCTS, type PlateColor, type PlateType } from '@/config/products';

export type OrderEmailOrder = {
  id: string;
  plate: string;
  plate_type: PlateType;
  plate_color: PlateColor;
  quantity: number;
  total_cents: number;
  customer_email: string | null;
};

function plateLabel(order: OrderEmailOrder) {
  const product = PRODUCTS[order.plate_type];
  return `${order.plate} (${product.label}, ${order.plate_color === 'carbon' ? 'Carbon' : 'Schwarz'}, ${order.quantity}×)`;
}

export async function sendOrderConfirmationEmail(order: OrderEmailOrder, origin: string) {
  if (!order.customer_email) return;
  if (!isMailConfigured()) {
    logEvent('warn', 'Bestellbestätigung nicht versendet: SMTP nicht konfiguriert', { orderId: order.id });
    return;
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: 'Vielen Dank für deine Bestellung',
    heading: 'Vielen Dank für deine Bestellung!',
    bodyHtml: `
      <p>Hallo,</p>
      <p>wir haben deine Bestellung für das Kennzeichen <strong>${plateLabel(order)}</strong> erhalten.</p>
      <p>Rechnungssumme: <strong>${formatPrice(order.total_cents / 100)}</strong></p>
      <p>Sobald deine Rechnung bereitsteht, senden wir sie dir in einer separaten E-Mail zu.</p>
    `,
  });

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: MAIL_FROM,
      to: order.customer_email,
      subject: 'Deine Bestellung bei Kennzeichen-Lieferung',
      html,
    });
  } catch (error) {
    logEvent('error', 'Bestellbestätigung konnte nicht gesendet werden', { orderId: order.id, error: error instanceof Error ? error.message : 'unbekannt' });
  }
}

export async function sendInvoiceEmail(order: OrderEmailOrder, invoiceNumber: string, pdf: Buffer, origin: string) {
  if (!order.customer_email) throw new Error('Bestell-E-Mail fehlt für den Rechnungsversand.');
  if (!isMailConfigured()) {
    throw new Error('Rechnungs-E-Mail nicht versendet: SMTP nicht konfiguriert.');
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: `Deine Rechnung ${invoiceNumber}`,
    heading: 'Deine Rechnung',
    bodyHtml: `
      <p>Hallo,</p>
      <p>anbei findest du die von Stripe erstellte Rechnung <strong>${invoiceNumber}</strong> zu deiner Bestellung <strong>${plateLabel(order)}</strong>.</p>
      <p>Deine Zahlung ist bereits eingegangen. Du musst nichts weiter bezahlen.</p>
    `,
  });

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: MAIL_FROM,
      to: order.customer_email,
      subject: `Rechnung ${invoiceNumber} – Kennzeichen-Lieferung`,
      html,
      attachments: [{ filename: `Rechnung-${invoiceNumber}.pdf`, content: pdf, contentType: 'application/pdf' }],
    });
  } catch (error) {
    logEvent('error', 'Rechnungs-E-Mail konnte nicht gesendet werden', { orderId: order.id, error: error instanceof Error ? error.message : 'unbekannt' });
    throw error;
  }
}

export async function sendShippingEmail(order: OrderEmailOrder, trackingCode: string, origin: string) {
  if (!order.customer_email) return;
  if (!isMailConfigured()) {
    logEvent('warn', 'Versand-E-Mail nicht versendet: SMTP nicht konfiguriert', { orderId: order.id });
    return;
  }

  const trackingUrl = `https://www.dhl.de/de/privatkunden/dhl-sendungsverfolgung.html?piececode=${encodeURIComponent(trackingCode)}`;

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: 'Dein Kennzeichen ist versandfertig und wird an DHL übergeben',
    heading: 'Dein Kennzeichen ist versandfertig!',
    bodyHtml: `
      <p>Hallo,</p>
      <p>dein Kennzeichen <strong>${plateLabel(order)}</strong> ist versandfertig und wird an DHL übergeben.</p>
      <p>Sendungsverfolgungsnummer: <strong>${trackingCode}</strong></p>
    `,
    ctaLabel: 'Sendung bei DHL verfolgen',
    ctaUrl: trackingUrl,
  });

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: MAIL_FROM,
      to: order.customer_email,
      subject: 'Dein Kennzeichen ist versandfertig – Kennzeichen-Lieferung',
      html,
    });
  } catch (error) {
    logEvent('error', 'Versand-E-Mail konnte nicht gesendet werden', { orderId: order.id, error: error instanceof Error ? error.message : 'unbekannt' });
  }
}
