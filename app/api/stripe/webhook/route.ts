import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServiceClient } from '@/lib/supabase/server'
import type Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) return NextResponse.json({ error: 'No signature' }, { status: 400 })

  let event: Stripe.Event

  try {
    event = getStripe().webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabase = await createServiceClient()

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    const meta = session.metadata

    if (meta?.gear_listing_id) {
      await supabase.from('gear_reservations').update({
        status: 'confirmed',
        stripe_payment_intent_id: session.payment_intent as string,
      }).eq('stripe_payment_intent_id', session.payment_intent as string)

      // Decrement available quantity
      const { data: listing } = await supabase
        .from('gear_listings')
        .select('quantity_available')
        .eq('id', meta.gear_listing_id)
        .single()

      if (listing && listing.quantity_available > 0) {
        await supabase
          .from('gear_listings')
          .update({ quantity_available: listing.quantity_available - 1 })
          .eq('id', meta.gear_listing_id)
      }
    }
  }

  return NextResponse.json({ received: true })
}
