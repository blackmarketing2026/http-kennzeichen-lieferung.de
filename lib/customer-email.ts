import { getMailTransport, isMailConfigured, MAIL_FROM, renderEmailTemplate } from '@/lib/mail';
import { logEvent } from '@/lib/logger';

export async function sendLoginLinkEmail(email: string, loginUrl: string, origin: string) {
  if (!isMailConfigured()) {
    logEvent('warn', 'Login-Link nicht versendet: SMTP nicht konfiguriert', { email });
    return;
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: 'Dein Login-Link für dein Kundenkonto',
    heading: 'Dein Login-Link',
    bodyHtml: `
      <p>Hallo,</p>
      <p>klicke auf den folgenden Button, um dich in deinem Kundenkonto anzumelden. Der Link ist 15 Minuten gültig.</p>
      <p>Falls du diese Anmeldung nicht angefordert hast, kannst du diese E-Mail ignorieren.</p>
    `,
    ctaLabel: 'Jetzt anmelden',
    ctaUrl: loginUrl,
  });

  try {
    const transport = getMailTransport();
    await transport.sendMail({
      from: MAIL_FROM,
      to: email,
      subject: 'Dein Login-Link – Kennzeichen-Lieferung',
      html,
    });
  } catch (error) {
    logEvent('error', 'Login-Link konnte nicht gesendet werden', { email, error: error instanceof Error ? error.message : 'unbekannt' });
  }
}
