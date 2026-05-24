import { NextRequest, NextResponse } from 'next/server'
import { createGearCheckoutSession } from '@/lib/stripe'
// stripe is lazy-initialized in lib/stripe.ts

export async function POST(req: NextRequest) {
  const body = await req.json()

  const {
    gearListingId,
    renterEmail,
    renterName,
    days,
    pricePerDay,
    gearTitle,
    setupService = false,
    gearProtection = false,
    placementIntel = false,
    slug,
  } = body

  if (!gearListingId || !renterEmail || !days || !pricePerDay) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  try {
    const session = await createGearCheckoutSession({
      gearListingId,
      renterEmail,
      renterName,
      days,
      pricePerDay,
      gearTitle,
      setupService,
      gearProtection,
      placementIntel,
      successUrl: `${appUrl}/t/${slug}/gear?success=1`,
      cancelUrl: `${appUrl}/t/${slug}/gear?cancelled=1`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
