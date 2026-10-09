import {
  getMailTransport,
  isMailConfigured,
  MAIL_FROM,
  renderEmailTemplate,
} from '@/lib/mail';
import { logEvent } from '@/lib/logger';
import { DELIVERY_EXPLANATION, DELIVERY_PROMISE_TEXT } from '@/lib/delivery-promise';
import { CAMPAIGN_KEYS, type Attribution } from '@/lib/attribution';
import { EVB_PARTNER_URL } from '@/lib/config';
import {
  formatPrice,
  plateColorLabel,
  PRODUCTS,
  type PlateColor,
  type PlateType,
} from '@/config/products';

export type OrderEmailOrder = {
  id: string;
  plate: string;
  plate_type: PlateType;
  plate_color: PlateColor;
  quantity: number;
  total_cents: number;
  offer_profile?: string | null;
  bike_rack_plate?: number | boolean;
  customer_email: string | null;
  delivery_promise_text?: string | null;
  delivery_deadline_date?: string | Date | null;
};

function plateLabel(order: OrderEmailOrder) {
  const product = PRODUCTS[order.plate_type];
  return `${order.plate} (${product.label}, ${plateColorLabel(order.plate_color)}, ${order.quantity}×)`;
}

export async function sendOrderConfirmationEmail(
  order: OrderEmailOrder,
  origin: string,
) {
  if (!order.customer_email) return;
  if (!isMailConfigured()) {
    logEvent(
      'warn',
      'Bestellbestätigung nicht versendet: SMTP nicht konfiguriert',
      { orderId: order.id },
    );
    return;
  }

  const includesChecklist = order.offer_profile === 'herbst' &&
    order.plate_type === 'standard' && Boolean(order.bike_rack_plate) && order.quantity === 3;
  const checklistUrl = `${origin}/downloads/checkliste-zulassung.pdf`;
  let checklistPdf: Buffer | null = null;
  if (includesChecklist) {
    try {
      const response = await fetch(checklistUrl, { signal: AbortSignal.timeout(10000) });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length > 5_000_000 || bytes.subarray(0, 5).toString() !== '%PDF-') {
        throw new Error('Ungültige Checklisten-PDF');
      }
      checklistPdf = bytes;
    } catch (error) {
      logEvent('warn', 'Checklisten-PDF konnte nicht angehängt werden', {
        orderId: order.id,
        error: error instanceof Error ? error.message : 'unbekannt',
      });
    }
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: 'Vielen Dank für deine Bestellung',
    heading: 'Vielen Dank für deine Bestellung!',
    bodyHtml: `
      <p>Hallo,</p>
      <p>wir haben deine Bestellung für das Kennzeichen <strong>${plateLabel(order)}</strong> erhalten.</p>
      <p>Rechnungssumme: <strong>${formatPrice(order.total_cents / 100)}</strong></p>
      <p>Bestellnummer: <strong>${order.id}</strong></p>
      ${includesChecklist ? `<p>Deine kostenlose <a href="${checklistUrl}">Checkliste für die Zulassung herunterladen</a>${checklistPdf ? ' – sie ist auch als PDF angehängt' : ''}.</p>` : ''}
      <p><strong>${order.delivery_promise_text ?? DELIVERY_PROMISE_TEXT}</strong></p>
      ${order.delivery_deadline_date ? `<p>Spätestens zugesagtes Lieferdatum: <strong>${new Intl.DateTimeFormat('de-DE', { timeZone: 'UTC', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(`${order.delivery_deadline_date instanceof Date ? order.delivery_deadline_date.toISOString().slice(0, 10) : String(order.delivery_deadline_date).slice(0, 10)}T12:00:00Z`))}</strong></p>` : ''}
      <p>${DELIVERY_EXPLANATION} <a href="${origin}/liefergarantie">Bedingungen der ${order.offer_profile === 'herbst' ? 'Pünktlich-Garantie' : 'Liefergarantie'} ansehen</a>.</p>
      <p>Sobald deine Rechnung fertig ist, bekommst du sie separat per E-Mail zugeschickt.</p>
      <p>Sobald dein Kennzeichen gedruckt und versandt ist, bekommst du automatisch die Trackingnummer in einer separaten E-Mail.</p>
      ${order.offer_profile === 'herbst' ? `<div style="margin:24px 0;padding:20px;border:1px solid #c9dce8;border-radius:10px;background:#f3f8fc">
        <small style="display:block;color:#536b7b">Anzeige</small>
        <h2 style="margin:8px 0">Nächster Schritt: deine eVB-Nummer</h2>
        <p>Für die Zulassung brauchst du eine eVB-Nummer. Vergleiche jetzt Kfz-Versicherungen und erhalte deine eVB direkt nach Abschluss.</p>
        <a href="${EVB_PARTNER_URL}" target="_blank" rel="sponsored noopener noreferrer" style="display:inline-block;padding:12px 16px;border-radius:6px;background:#0878dc;color:#fff;text-decoration:none">Kfz-Versicherung vergleichen</a>
      </div>` : ''}
    `,
  });

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: MAIL_FROM,
      to: order.customer_email,
      subject: 'Deine Bestellung bei Kennzeichen-Lieferung',
      html,
      ...(checklistPdf ? { attachments: [{
        filename: 'Kfz-Zulassung-Dokumente-Checkliste.pdf',
        content: checklistPdf,
        contentType: 'application/pdf',
      }] } : {}),
    });
  } catch (error) {
    logEvent('error', 'Bestellbestätigung konnte nicht gesendet werden', {
      orderId: order.id,
      error: error instanceof Error ? error.message : 'unbekannt',
    });
  }
}

export async function sendInvoiceEmail(
  order: OrderEmailOrder,
  invoiceNumber: string,
  pdf: Buffer,
  origin: string,
) {
  if (!order.customer_email)
    throw new Error('Bestell-E-Mail fehlt für den Rechnungsversand.');
  if (!isMailConfigured()) {
    throw new Error(
      'Rechnungs-E-Mail nicht versendet: SMTP nicht konfiguriert.',
    );
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
      attachments: [
        {
          filename: `Rechnung-${invoiceNumber}.pdf`,
          content: pdf,
          contentType: 'application/pdf',
        },
      ],
    });
  } catch (error) {
    logEvent('error', 'Rechnungs-E-Mail konnte nicht gesendet werden', {
      orderId: order.id,
      error: error instanceof Error ? error.message : 'unbekannt',
    });
    throw error;
  }
}

/** Internal copy for the shop's own bookkeeping; override the recipient via ORDER_NOTIFICATION_EMAIL. */
export const ORDER_NOTIFICATION_EMAIL =
  process.env.ORDER_NOTIFICATION_EMAIL ||
  'kennzeichenbestellung@function-concept.de';

export async function sendShopOrderNotificationEmail(
  order: OrderEmailOrder,
  invoiceNumber: string,
  pdf: Buffer,
  origin: string,
) {
  if (!isMailConfigured()) {
    throw new Error(
      'Shop-Benachrichtigung nicht versendet: SMTP nicht konfiguriert.',
    );
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: `Neue Bestellung ${order.plate}`,
    heading: 'Neue Bestellung',
    bodyHtml: `
      <p>Kennzeichennummer: <strong>${order.plate}</strong></p>
      <p>${plateLabel(order)} · ${formatPrice(order.total_cents / 100)} · ${order.customer_email ?? '–'}</p>
      <p>Die Stripe-Rechnung <strong>${invoiceNumber}</strong> ist als PDF angehängt.</p>
    `,
  });

  await getMailTransport().sendMail({
    from: MAIL_FROM,
    to: ORDER_NOTIFICATION_EMAIL,
    subject: `Neue Bestellung – ${order.plate}`,
    html,
    attachments: [
      {
        filename: `Rechnung-${invoiceNumber}.pdf`,
        content: pdf,
        contentType: 'application/pdf',
      },
    ],
  });
}

/** Recipient(s) of the "Checkout gestartet" hint; comma-separated list allowed. */
export const CHECKOUT_NOTIFICATION_EMAIL =
  process.env.CHECKOUT_NOTIFICATION_EMAIL || ORDER_NOTIFICATION_EMAIL;

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export type CheckoutStartedDetails = {
  plate: string;
  plateType: PlateType;
  plateColor: PlateColor;
  quantity: number;
  totalCents: number;
  promoCode: string | null;
  cartId: string;
  paymentIntentId: string;
  attribution: Attribution;
  startedAt: Date;
};

/** Internal hint that someone opened the checkout with a configured plate (paid or not). */
export async function sendCheckoutStartedEmail(
  details: CheckoutStartedDetails,
  origin: string,
) {
  if (!isMailConfigured()) {
    logEvent('warn', 'Checkout-Hinweis nicht versendet: SMTP nicht konfiguriert', {
      cartId: details.cartId,
    });
    return;
  }

  const timestamp = new Intl.DateTimeFormat('de-DE', {
    timeZone: 'Europe/Berlin',
    dateStyle: 'medium',
    timeStyle: 'medium',
  }).format(details.startedAt);
  const product = PRODUCTS[details.plateType];
  const campaignRows = CAMPAIGN_KEYS.filter((key) => details.attribution[key]);
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#667784;">${escapeHtml(label)}</td><td style="padding:4px 0;"><strong>${escapeHtml(value)}</strong></td></tr>`;

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: `Checkout gestartet: ${details.plate}`,
    heading: 'Checkout gestartet',
    bodyHtml: `
      <p>Kennzeichen: <strong>${escapeHtml(details.plate)}</strong></p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin:0 0 16px;">
        ${row('Zeitpunkt', timestamp)}
        ${row('Art', product.label)}
        ${row('Schriftfarbe', plateColorLabel(details.plateColor))}
        ${row('Anzahl', String(details.quantity))}
        ${row('Betrag', formatPrice(details.totalCents / 100))}
        ${details.promoCode ? row('Rabattcode', details.promoCode) : ''}
      </table>
      <p style="margin:0 0 4px;"><strong>Herkunft</strong></p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;margin:0 0 16px;">
        ${campaignRows.length ? campaignRows.map((key) => row(key, details.attribution[key]!)).join('') : row('UTM', 'keine – direkt oder organisch')}
        ${row('Referrer', details.attribution.referrer ?? '–')}
        ${row('Landingpage', details.attribution.landing_page ?? '–')}
      </table>
      <p style="font-size:12px;color:#667784;">Warenkorb ${escapeHtml(details.cartId)} · Stripe ${escapeHtml(details.paymentIntentId)}</p>
    `,
  });

  await getMailTransport().sendMail({
    from: MAIL_FROM,
    to: CHECKOUT_NOTIFICATION_EMAIL,
    subject: `Checkout gestartet – ${details.plate}`,
    html,
  });
}

/** One follow-up when the customer completes the address step before payment. */
export async function sendCheckoutAddressAddedEmail(
  details: { plate: string; cartId: string; paymentIntentId: string },
  origin: string,
) {
  if (!isMailConfigured()) {
    throw new Error('SMTP nicht konfiguriert');
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: 'Update: Lieferadresse hinzugefügt, aber noch nicht bezahlt',
    heading: 'Checkout gestartet',
    bodyHtml: `
      <p><strong>Update: Lieferadresse hinzugefügt, aber noch nicht bezahlt</strong></p>
      <p>Kennzeichen: <strong>${escapeHtml(details.plate)}</strong></p>
      <p style="font-size:12px;color:#667784;">Warenkorb ${escapeHtml(details.cartId)} · Stripe ${escapeHtml(details.paymentIntentId)}</p>
    `,
  });

  await getMailTransport().sendMail({
    from: MAIL_FROM,
    to: CHECKOUT_NOTIFICATION_EMAIL,
    subject: `Lieferadresse hinzugefügt – ${details.plate}`,
    html,
  });
}

export async function sendAbandonedCheckoutReminderEmail(
  details: {
    email: string;
    firstName: string;
    city: string;
    plate: string;
    resumeUrl: string;
  },
  origin: string,
) {
  if (!isMailConfigured()) throw new Error('SMTP nicht konfiguriert');

  const plate = escapeHtml(details.plate);
  const firstName = escapeHtml(details.firstName);
  const city = escapeHtml(details.city);
  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: `Deine Bestellung für ${details.plate} wartet noch auf dich`,
    heading: `Dein Kennzeichen ${plate} fehlt noch?`,
    bodyHtml: `
      <p>Hallo ${firstName},</p>
      <p><strong>Dein Kennzeichen ${plate} fehlt noch an deinem Fahrzeug?</strong></p>
      <p>Du hast deine Bestellung begonnen, aber noch nicht abgeschlossen. Mit wenigen Klicks kannst du das jetzt erledigen.</p>
      <p>Sobald deine Bestellung bezahlt und für die Produktion freigegeben ist, ist <strong>${plate} in nur 10 Minuten fertig gedruckt.</strong></p>
      <p>📦 <strong>DHL holt dreimal täglich bei uns ab.</strong> So kann dein Paket bei einer der nächsten Abholungen seine Reise nach <strong>${city}</strong> starten.</p>
      <p>Mach jetzt den nächsten Schritt – damit deine Kennzeichen bald bei dir ankommen:</p>
      <p>Viele Grüße<br />Dein Team von Kennzeichen-Lieferung.de</p>
      <p style="font-size:12px;color:#667784;">Du erhältst diese einmalige Erinnerung, weil du im Checkout zugestimmt hast. Wenn du keine weiteren Nachrichten hierzu möchtest, antworte einfach auf diese E-Mail.</p>
    `,
    ctaLabel: `Bestellung für ${plate} abschließen`,
    ctaUrl: details.resumeUrl,
  });

  await getMailTransport().sendMail({
    from: MAIL_FROM,
    to: details.email,
    subject: `${details.plate} – in 10 Minuten gedruckt 🚗`,
    html,
  });
}

export async function sendShippingEmail(
  order: OrderEmailOrder,
  trackingCode: string,
  origin: string,
) {
  if (!order.customer_email) return;
  if (!isMailConfigured()) {
    logEvent(
      'warn',
      'Versand-E-Mail nicht versendet: SMTP nicht konfiguriert',
      { orderId: order.id },
    );
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
    logEvent('error', 'Versand-E-Mail konnte nicht gesendet werden', {
      orderId: order.id,
      error: error instanceof Error ? error.message : 'unbekannt',
    });
  }
}
