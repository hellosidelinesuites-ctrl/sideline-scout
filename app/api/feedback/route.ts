import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  const { tournament_slug, tip, category, submitter_name } = await req.json()

  if (!tip) {
    return NextResponse.json({ error: 'Tip is required' }, { status: 400 })
  }

  const supabase = await createClient()

  // Look up tournament by name or slug
  const { data: tournament } = await supabase
    .from('tournaments')
    .select('id')
    .or(`slug.ilike.%${tournament_slug}%,name.ilike.%${tournament_slug}%`)
    .limit(1)
    .single()

  if (!tournament) {
    return NextResponse.json({ error: 'Tournament not found' }, { status: 404 })
  }

  const { error } = await supabase.from('parent_tips').insert({
    tournament_id: tournament.id,
    tip,
    category: category || null,
    submitter_name: submitter_name || null,
    status: 'pending',
  })

  if (error) {
    console.error('Tip insert error:', error)
    return NextResponse.json({ error: 'Failed to save tip' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
