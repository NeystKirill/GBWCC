/**
 * lib/mailer.js — отправка email через Resend
 *
 * Требуемые переменные окружения:
 *   RESEND_API_KEY — API ключ с resend.com (начинается с re_)
 *   CONTACT_TO     — куда приходят заявки (info@gbwc.network)
 */

const RESEND_API = 'https://api.resend.com/emails'

// Пока домен gbwc.network не верифицирован в Resend,
// отправляем с onboarding@resend.dev (работает без верификации)
// После верификации домена заменить на: noreply@gbwc.network
const FROM_NOTIFICATION = 'GBWC Форма <onboarding@resend.dev>'
const FROM_AUTOREPLY    = 'GBWC <onboarding@resend.dev>'

async function sendEmail({ from, to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY не задан')

  const body = { from, to, subject, html }
  if (replyTo) body.reply_to = replyTo

  const res = await fetch(RESEND_API, {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(`Resend error: ${err.message || res.status}`)
  }

  return res.json()
}

/**
 * Отправляет уведомление о новой заявке на корпоративную почту
 */
export async function sendContactNotification({ name, email, company, subject, message }) {
  const to = process.env.CONTACT_TO || 'info@gbwc.network'

  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .card { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header { background: #0a0a0a; color: #fff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 600; letter-spacing: 0.5px; }
    .header p  { margin: 6px 0 0; color: #aaa; font-size: 13px; }
    .body { padding: 28px 32px; }
    .row { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: #888; margin-bottom: 4px; }
    .value { font-size: 15px; color: #1a1a1a; }
    .message-box { background: #f8f8f8; border-left: 3px solid #c9a84c; padding: 14px 18px; border-radius: 4px; font-size: 14px; color: #333; line-height: 1.6; white-space: pre-wrap; }
    .footer { background: #fafafa; border-top: 1px solid #eee; padding: 16px 32px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>📩 Новая заявка — GBWC</h1>
      <p>${new Date().toLocaleString('ru-RU', { timeZone: 'Asia/Almaty' })} (Алматы)</p>
    </div>
    <div class="body">
      <div class="row">
        <div class="label">Имя</div>
        <div class="value">${escHtml(name)}</div>
      </div>
      <div class="row">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escHtml(email)}">${escHtml(email)}</a></div>
      </div>
      ${company ? `
      <div class="row">
        <div class="label">Компания / Организация</div>
        <div class="value">${escHtml(company)}</div>
      </div>` : ''}
      <div class="row">
        <div class="label">Тема</div>
        <div class="value">${escHtml(subject)}</div>
      </div>
      <div class="row">
        <div class="label">Сообщение</div>
        <div class="message-box">${escHtml(message)}</div>
      </div>
    </div>
    <div class="footer">
      Письмо сформировано автоматически · gbwc.network
    </div>
  </div>
</body>
</html>`.trim()

  await sendEmail({
    from:    FROM_NOTIFICATION,
    to,
    subject: `[GBWC] Новая заявка: ${subject}`,
    html,
    replyTo: email,
  })
}

/**
 * Отправляет автоответ заявителю
 */
export async function sendContactAutoReply({ name, email, subject }) {
  const html = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
    .card { background: #fff; max-width: 600px; margin: 0 auto; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
    .header { background: #0a0a0a; color: #fff; padding: 28px 32px; }
    .header h1 { margin: 0; font-size: 20px; }
    .body { padding: 28px 32px; font-size: 15px; color: #333; line-height: 1.7; }
    .footer { background: #fafafa; border-top: 1px solid #eee; padding: 16px 32px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>GBWC — Global Business Women Community</h1>
    </div>
    <div class="body">
      <p>Здравствуйте, <strong>${escHtml(name)}</strong>!</p>
      <p>Ваша заявка <strong>«${escHtml(subject)}»</strong> успешно получена. Мы свяжемся с вами в ближайшее время.</p>
      <p>Спасибо за интерес к GBWC!</p>
      <p>С уважением,<br>Команда GBWC</p>
    </div>
    <div class="footer">gbwc.network · info@gbwc.network</div>
  </div>
</body>
</html>`.trim()

  await sendEmail({
    from:    FROM_AUTOREPLY,
    to:      email,
    subject: `Ваша заявка получена — ${subject}`,
    html,
  })
}

function escHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
