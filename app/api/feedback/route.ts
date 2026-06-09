import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

// GET /api/feedback?slug=... — returns approved tip count for a tournament
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug')
  if (!slug) return NextResponse.json({ count: 0 })

  const supabase = await createServiceClient()

  const { data: tournament } = await supabase
    .from('tournaments')
    .select('id')
    .or(`slug.ilike.%${slug}%,name.ilike.%${slug}%`)
    .limit(1)
    .single()

  if (!tournament) return NextResponse.json({ count: 0 })

  const { count } = await supabase
    .from('parent_tips')
    .select('*', { count: 'exact', head: true })
    .eq('tournament_id', tournament.id)
    .eq('status', 'approved')

  return NextResponse.json({ count: count ?? 0 })
}

export async function POST(req: NextRequest) {
  const { tournament_slug, tip, category, submitter_name } = await req.json()

  if (!tip || !tip.trim()) {
    return NextResponse.json({ error: 'Tip is required' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  // Try to match tournament — don't fail if not found, store tip without tournament_id
  let tournament_id: string | null = null
  if (tournament_slug?.trim()) {
    const { data: tournament } = await supabase
      .from('tournaments')
      .select('id')
      .or(`slug.ilike.%${tournament_slug.trim()}%,name.ilike.%${tournament_slug.trim()}%`)
      .limit(1)
      .single()
    tournament_id = tournament?.id ?? null
  }

  const { error } = await supabase.from('parent_tips').insert({
    tournament_id,
    tip: tip.trim(),
    category: category || null,
    submitter_name: submitter_name?.trim() || null,
    status: 'pending',
  })

  if (error) {
    console.error('Tip insert error:', error)
    return NextResponse.json({ error: 'Failed to save tip' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
