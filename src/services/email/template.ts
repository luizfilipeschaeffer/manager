export function generateEmailTemplate({
  title,
  message,
  ctaLabel,
  ctaUrl,
}: {
  title: string;
  message: string;
  ctaLabel: string;
  ctaUrl: string;
}) {
  return `
  <html>
    <body style="font-family: Arial, sans-serif; background: #f4f8fb; padding: 0; margin: 0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background: #f4f8fb; padding: 32px 0;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 480px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px #0001;">
              <tr>
                <td style="padding: 32px 32px 16px 32px; text-align: center;">
                  <h2 style="color: #2563eb; margin: 0 0 16px 0;">${title}</h2>
                  <p style="color: #222; font-size: 16px; margin: 0 0 24px 0;">${message}</p>
                  <a href="${ctaUrl}" style="display: inline-block; background: #2563eb; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-weight: bold; font-size: 16px;">${ctaLabel}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 24px 32px 0 32px; text-align: center; color: #888; font-size: 13px;">
                  Se você não solicitou esta ação, ignore este e-mail.
                </td>
              </tr>
              <tr>
                <td style="padding: 16px 32px 24px 32px; text-align: center; color: #bbb; font-size: 12px;">
                  &copy; ${new Date().getFullYear()} Plataforma Multi-Tenant
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
} 