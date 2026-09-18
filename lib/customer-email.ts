import { getMailTransport, isMailConfigured, MAIL_FROM, renderEmailTemplate } from '@/lib/mail';
import { logEvent } from '@/lib/logger';

export async function sendLoginLinkEmail(email: string, loginUrl: string, origin: string) {
  if (!isMailConfigured()) {
    logEvent('warn', 'Login-Link nicht versendet: SMTP nicht konfiguriert', { email });
    throw new Error('E-Mail-Versand ist nicht konfiguriert.');
  }

  const html = renderEmailTemplate({
    logoUrl: `${origin}/kennzeichen-lieferung-logo.png`,
    preheader: 'Dein Magic Link für dein Kundenkonto – ohne Passwort anmelden',
    heading: 'Dein Magic Link',
    bodyHtml: `
      <p>Hallo,</p>
      <p>klicke auf den folgenden Button, um dich ohne Passwort in deinem Kundenkonto anzumelden. Der Magic Link ist 15 Minuten gültig und kann nur einmal verwendet werden.</p>
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
      subject: 'Dein Magic Link – Kennzeichen-Lieferung',
      text: `Melde dich ohne Passwort in deinem Kundenkonto an: ${loginUrl}\n\nDer Magic Link ist 15 Minuten gültig und einmal nutzbar. Falls du diese Anmeldung nicht angefordert hast, kannst du diese E-Mail ignorieren.`,
      html,
    });
  } catch (error) {
    logEvent('error', 'Login-Link konnte nicht gesendet werden', { email, error: error instanceof Error ? error.message : 'unbekannt' });
    throw error;
  }
}
