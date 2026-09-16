import { getMailTransport, isMailConfigured, MAIL_FROM, renderEmailTemplate } from '@/lib/mail';

export const runtime = 'nodejs';

export async function GET() {
  return Response.json({ configured: isMailConfigured() });
}

export async function POST(request: Request) {
  if (!isMailConfigured()) {
    return Response.json({ error: 'SMTP ist noch nicht vollständig konfiguriert.' }, { status: 503 });
  }

  let body: { to?: string };
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const to = body.to?.trim() || 'sjesse18@gmail.com';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    return Response.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 });
  }

  const origin = new URL(request.url).origin;
  const logoUrl = `${origin}/kennzeichen-lieferung-logo.png`;

  const html = renderEmailTemplate({
    logoUrl,
    preheader: 'Test-E-Mail von Kennzeichen-Lieferung',
    heading: 'Das E-Mail-Design funktioniert! 🎉',
    bodyHtml: `
      <p>Hallo,</p>
      <p>dies ist eine Test-E-Mail von <strong>Kennzeichen-Lieferung</strong>, um zu prüfen, ob unser E-Mail-Versand und das Design korrekt funktionieren.</p>
      <p>Wenn du diese Nachricht mit Logo und blauem Design siehst, ist alles bereit für Bestellbestätigungen und weitere Benachrichtigungen.</p>
    `,
    ctaLabel: 'Zum Shop',
    ctaUrl: origin,
  });

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: MAIL_FROM,
      to,
      subject: 'Test-E-Mail – Kennzeichen-Lieferung',
      html,
    });

    return Response.json({ success: true, to });
  } catch (error) {
    console.error('Test-E-Mail konnte nicht gesendet werden:', error instanceof Error ? error.message : 'Unbekannter Fehler');
    return Response.json({ error: 'Die E-Mail konnte nicht gesendet werden.' }, { status: 502 });
  }
}
