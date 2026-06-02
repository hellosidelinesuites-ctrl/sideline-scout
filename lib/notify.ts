import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const TO = 'hello@sidelinescout.co'
const FROM = 'Sideline Scout <notifications@sidelinescout.co>'

function formatFields(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0;font-weight:600;white-space:nowrap;vertical-align:top">${k}</td><td style="padding:4px 0">${v}</td></tr>`)
    .join('')
}

export async function sendNotification(subject: string, data: Record<string, unknown>) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not set — skipping notification email')
    return
  }

  const rows = formatFields(data)
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
      <h2 style="color:#1a2e4a;margin-bottom:16px">${subject}</h2>
      <table style="border-collapse:collapse;width:100%;font-size:14px">
        ${rows}
      </table>
      <p style="font-size:12px;color:#888;margin-top:24px">Sideline Scout · ${new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })} PT</p>
    </div>
  `

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject,
    html,
  })

  if (error) {
    console.error('Resend notification error:', error)
  }
}
