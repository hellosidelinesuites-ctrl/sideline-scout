import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'


// PATCH — approve a tip (optionally editing the text first)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { tip } = await req.json()

  const supabase = await createServiceClient()

  const update: Record<string, string> = { status: 'approved' }
  if (typeof tip === 'string' && tip.trim()) {
    update.tip = tip.trim()
  }

  const { error } = await supabase.from('parent_tips').update(update).eq('id', id)

  if (error) {
    console.error('Tip approve error:', error)
    return NextResponse.json({ error: 'Failed to approve tip' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

// DELETE — reject a tip
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const supabase = await createServiceClient()

  const { error } = await supabase.from('parent_tips').update({ status: 'rejected' }).eq('id', id)

  if (error) {
    console.error('Tip reject error:', error)
    return NextResponse.json({ error: 'Failed to reject tip' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
