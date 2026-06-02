import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendNotification } from '@/lib/notify'

export async function POST(req: NextRequest) {
  const { name, email, phone, tournament, message } = await req.json()

  if (!name || !email) {
    return NextResponse.json({ error: 'Name and email required' }, { status: 400 })
  }

  const supabase = await createClient()

  // Try to find matching tournament
  const { data: matchedTournament } = await supabase
    .from('tournaments')
    .select('id')
    .ilike('name', `%${tournament}%`)
    .limit(1)
    .single()

  const { error } = await supabase.from('hosts').insert({
    name,
    email,
    phone: phone || null,
    tournament_id: matchedTournament?.id ?? null,
    message: message || null,
    status: 'pending',
  })

  if (error) {
    console.error('Host insert error:', error)
    return NextResponse.json({ error: 'Failed to save application' }, { status: 500 })
  }

  await sendNotification('New Gear Host Application', {
    'Name': name,
    'Email': email,
    'Phone': phone,
    'Tournament': tournament,
    'Message': message,
  })

  return NextResponse.json({ success: true })
}
