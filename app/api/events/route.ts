import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { event_type, payload } = await req.json()

  if (!event_type) {
    return NextResponse.json({ error: 'event_type required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  const { error } = await supabase.from('events').insert({ event_type, payload: payload ?? {} })

  if (error) {
    console.error('Event insert error:', error)
    return NextResponse.json({ error: 'Failed to log event' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
