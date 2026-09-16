import nodemailer from 'nodemailer';

function getSmtpConfig() {
  const host = process.env.smtp_server?.trim();
  const user = process.env.smtp_user?.trim();
  const pass = process.env.smtp_password?.trim();

  if (!host || !user || !pass) {
    return null;
  }

  return { host, user, pass };
}

export function isMailConfigured() {
  return Boolean(getSmtpConfig());
}

export function getMailTransport() {
  const config = getSmtpConfig();
  if (!config) {
    throw new Error('SMTP ist nicht vollständig konfiguriert (smtp_server, smtp_user, smtp_password).');
  }

  return nodemailer.createTransport({
    host: config.host,
    port: 465,
    secure: true,
    auth: { user: config.user, pass: config.pass },
  });
}

export const MAIL_FROM = '"Kennzeichen-Lieferung" <bestellung@kennzeichen-lieferung.de>';

export function renderEmailTemplate(options: {
  logoUrl: string;
  preheader?: string;
  heading: string;
  bodyHtml: string;
  ctaLabel?: string;
  ctaUrl?: string;
}) {
  const { logoUrl, preheader = '', heading, bodyHtml, ctaLabel, ctaUrl } = options;

  const cta = ctaLabel && ctaUrl
    ? `
      <tr>
        <td align="center" style="padding: 32px 0 8px;">
          <a href="${ctaUrl}" style="background-color:#0069d9;color:#ffffff;text-decoration:none;font-weight:600;font-size:15px;padding:14px 32px;border-radius:8px;display:inline-block;">
            ${ctaLabel}
          </a>
        </td>
      </tr>`
    : '';

  return `<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${heading}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#e9f5ff;font-family:'Segoe UI',Arial,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#e9f5ff;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(6,22,34,0.08);">
            <tr>
              <td style="background-color:#004da8;background:linear-gradient(135deg,#0069d9,#004da8);padding:28px 32px;text-align:center;">
                <img src="${logoUrl}" alt="Kennzeichen-Lieferung" height="40" style="height:40px;display:inline-block;" />
              </td>
            </tr>
            <tr>
              <td style="padding:36px 32px 8px;">
                <h1 style="margin:0 0 16px;color:#061622;font-size:22px;line-height:1.3;">${heading}</h1>
                <div style="color:#334752;font-size:15px;line-height:1.6;">
                  ${bodyHtml}
                </div>
              </td>
            </tr>
            ${cta}
            <tr>
              <td style="padding:32px;">
                <hr style="border:none;border-top:1px solid #e9f5ff;margin:0 0 20px;" />
                <p style="margin:0;color:#667784;font-size:12px;line-height:1.6;text-align:center;">
                  Kennzeichen-Lieferung &middot; Diese E-Mail wurde automatisch versendet.<br />
                  Fragen? Antworte einfach auf diese E-Mail.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
