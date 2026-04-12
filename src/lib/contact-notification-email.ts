import { escapeHtml } from "~/lib/html-escape";

/**
 * Dark theme — inline hex for email clients. Soft charcoal surfaces, high readability,
 * cyan accent aligned with the portfolio brand.
 */
const PAGE_BG = "#121316";
const CARD_BG = "#1c1e24";
const SHEET = "#252830";
const BORDER = "#343842";
const TEXT = "#e8eaef";
const TEXT_MUTED = "#9ba0aa";
const FOOTER_MUTED = "#6d7380";
const ACCENT = "#22d3ee";
const ACCENT_DEEP = "#0e7490";
const LINK = "#5eead4";

function metaRow(label: string, valueInnerHtml: string): string {
  return `
  <tr>
    <td style="padding: 0 0 16px 0; border-bottom: 1px solid ${BORDER};">
      <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: ${TEXT_MUTED}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        ${label}
      </p>
      <div style="margin: 0; font-size: 15px; line-height: 1.55; color: ${TEXT}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        ${valueInnerHtml}
      </div>
    </td>
  </tr>`;
}

export function buildContactNotificationHtml(input: {
  name: string;
  email: string;
  subject: string;
  message: string;
  affiliation: string;
  connection: string;
}): string {
  const name = escapeHtml(input.name);
  const emailDisplay = escapeHtml(input.email);
  const emailHref = encodeURIComponent(input.email);
  const subject = escapeHtml(input.subject);
  const affiliation = escapeHtml(input.affiliation);
  const connection = escapeHtml(input.connection);
  const message = escapeHtml(input.message);

  const emailLink = `<a href="mailto:${emailHref}" style="color: ${LINK}; text-decoration: none; font-weight: 500;">${emailDisplay}</a>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="dark" />
  <title>Portfolio contact</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${PAGE_BG}; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${PAGE_BG};">
    <tr>
      <td align="center" style="padding: 36px 16px 48px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; margin: 0 auto;">
          <tr>
            <td style="background-color: ${CARD_BG}; border-radius: 14px; border: 1px solid ${BORDER}; overflow: hidden; box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height: 4px; background: linear-gradient(90deg, ${ACCENT} 0%, ${ACCENT_DEEP} 100%); background-color: ${ACCENT};"></td>
                </tr>
                <tr>
                  <td style="padding: 28px 28px 8px 28px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: ${ACCENT}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Portfolio
                    </p>
                    <h1 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.02em; color: ${TEXT}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
                      New contact
                    </h1>
                    <p style="margin: 10px 0 0 0; font-size: 14px; line-height: 1.5; color: ${TEXT_MUTED}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Someone submitted the form on your site.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 28px 0 28px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${metaRow("From", name)}
                      ${metaRow("Email", emailLink)}
                      ${metaRow("Subject", subject)}
                      ${metaRow("Company / affiliation", affiliation)}
                      ${metaRow("Role", connection)}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 28px 28px 28px;">
                    <p style="margin: 0 0 10px 0; font-size: 11px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: ${TEXT_MUTED}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Message
                    </p>
                    <div style="background-color: ${SHEET}; border: 1px solid ${BORDER}; border-radius: 10px; padding: 18px 20px;">
                      <p style="margin: 0; font-size: 15px; line-height: 1.65; color: ${TEXT}; white-space: pre-wrap; word-break: break-word; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">${message}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 28px 24px 28px; border-top: 1px solid ${BORDER};">
                    <p style="margin: 16px 0 0 0; font-size: 12px; line-height: 1.5; color: ${FOOTER_MUTED}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                      Reply to this message to email the sender directly (Reply-To is set to their address).
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
