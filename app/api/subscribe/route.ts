import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendNotification } from '@/lib/notify'
import { sendSMS } from '@/lib/sms'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { email, tournament_slug } = body

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  let tournament_id: string | null = null
  if (tournament_slug) {
    const { data } = await supabase
      .from('tournaments')
      .select('id')
      .eq('slug', tournament_slug)
      .single()
    tournament_id = data?.id ?? null
  }

  const { error } = await supabase
    .from('tournament_subscribers')
    .insert({ email: email.toLowerCase().trim(), tournament_id })

  if (error) {
    // Unique constraint violation — already subscribed, treat as success
    if (error.code === '23505') return NextResponse.json({ success: true })
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }

  await Promise.all([
    sendNotification('New Email Subscriber', {
      'Email': email.toLowerCase().trim(),
      'Tournament Slug': tournament_slug,
    }),
    sendSMS(`New subscriber: ${email.toLowerCase().trim()}`),
  ])

  return NextResponse.json({ success: true })
}
