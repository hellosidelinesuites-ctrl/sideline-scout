import twilio from 'twilio'

const TO = '+16507736422'

export async function sendSMS(message: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID
  const token = process.env.TWILIO_AUTH_TOKEN
  const from = process.env.TWILIO_PHONE_NUMBER

  if (!sid || !token || !from) {
    console.warn('Twilio env vars not set — skipping SMS')
    return
  }

  try {
    await twilio(sid, token).messages.create({ body: message, from, to: TO })
  } catch (err) {
    console.error('Twilio SMS error:', err)
  }
}
