import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { sendNotification } from '@/lib/notify'
import { sendSMS } from '@/lib/sms'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { manager_name, email, team_name, team_size, tournament, needs, request_type, package: pkg } = body

  if (!manager_name || !email || !team_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const isGear = request_type === 'gear'
  const eventType = isGear ? 'gear_reservation_request' : 'team_booking_request'

  // Log as an event
  const { error } = await supabase.from('events').insert({
    event_type: eventType,
    payload: { manager_name, email, team_name, team_size, tournament, needs, package: pkg },
  })

  if (error) {
    console.error('Team booking event error:', error)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }

  const subject = isGear ? 'New Gear Reservation Request' : 'New Team Booking Request'
  const smsText = isGear
    ? `New gear reservation: ${team_name} for ${tournament}`
    : `New team booking: ${team_name} for ${tournament}`

  await Promise.all([
    sendNotification(subject, {
      'Type': isGear ? 'Gear Reservation' : 'Team Package',
      'Package': pkg,
      'Manager Name': manager_name,
      'Email': email,
      'Team Name': team_name,
      'Team Size': team_size,
      'Tournament': tournament,
      'Needs / Notes': needs,
    }),
    sendSMS(smsText),
  ])

  return NextResponse.json({ success: true })
}
