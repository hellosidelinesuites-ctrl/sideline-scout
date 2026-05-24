import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { manager_name, email, team_name, team_size, tournament, needs } = body

  if (!manager_name || !email || !team_name) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const supabase = await createClient()

  // Log as an event
  const { error } = await supabase.from('events').insert({
    event_type: 'team_booking_request',
    payload: { manager_name, email, team_name, team_size, tournament, needs },
  })

  if (error) {
    console.error('Team booking event error:', error)
    return NextResponse.json({ error: 'Failed to submit request' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
