import Stripe from 'stripe'
import { PLATFORM_FEE_RATE, UPSELL_PRICES } from '@/types/database'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-01-27.acacia',
    })
  }
  return _stripe
}

export interface GearCheckoutParams {
  gearListingId: string
  renterEmail: string
  renterName: string
  days: number
  pricePerDay: number
  gearTitle: string
  setupService: boolean
  gearProtection: boolean
  placementIntel: boolean
  successUrl: string
  cancelUrl: string
}

export function calculateGearTotal(params: {
  days: number
  pricePerDay: number
  setupService: boolean
  gearProtection: boolean
  placementIntel: boolean
}) {
  const subtotal = params.days * params.pricePerDay
  const platformFee = Math.round(subtotal * PLATFORM_FEE_RATE * 100) / 100
  const upsells =
    (params.setupService ? UPSELL_PRICES.setup_service : 0) +
    (params.gearProtection ? UPSELL_PRICES.gear_protection : 0) +
    (params.placementIntel ? UPSELL_PRICES.placement_intel : 0)
  return {
    subtotal,
    platformFee,
    upsells,
    total: subtotal + platformFee + upsells,
  }
}

export async function createGearCheckoutSession(params: GearCheckoutParams) {
  const { subtotal, platformFee, upsells, total } = calculateGearTotal(params)

  const lineItems: { price_data: { currency: string; product_data: { name: string; description?: string }; unit_amount: number }; quantity: number }[] = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: params.gearTitle,
          description: `${params.days} day rental`,
        },
        unit_amount: Math.round((subtotal + platformFee) * 100),
      },
      quantity: 1,
    },
  ]

  if (params.setupService) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Setup Service' },
        unit_amount: UPSELL_PRICES.setup_service * 100,
      },
      quantity: 1,
    })
  }

  if (params.gearProtection) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Gear Protection' },
        unit_amount: UPSELL_PRICES.gear_protection * 100,
      },
      quantity: 1,
    })
  }

  if (params.placementIntel) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: { name: 'Placement Intel' },
        unit_amount: UPSELL_PRICES.placement_intel * 100,
      },
      quantity: 1,
    })
  }

  const session = await getStripe().checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    customer_email: params.renterEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: {
      gear_listing_id: params.gearListingId,
      renter_name: params.renterName,
      days: String(params.days),
      subtotal: String(subtotal),
      platform_fee: String(platformFee),
      upsells: String(upsells),
      total: String(total),
    },
  })

  return session
}
