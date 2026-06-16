import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  ShoppingBag, Shield, Zap, MapPin, ArrowRight,
  Armchair, Tent, Package, Umbrella, Utensils, Truck,
  Users, Star, Check, MessageSquare,
} from 'lucide-react'
import { PLATFORM_FEE_RATE, UPSELL_PRICES } from '@/types/database'
import type { GearListing } from '@/types/database'
import Link from 'next/link'

// ─── Icon map for gear items ──────────────────────────────────────────────────

function getGearIcon(item: string) {
  const s = item.toLowerCase()
  if (s.includes('chair')) return Armchair
  if (s.includes('canopy') || s.includes('tent')) return Tent
  if (s.includes('cooler')) return Package
  if (s.includes('umbrella')) return Umbrella
  if (s.includes('snack') || s.includes('drink') || s.includes('table')) return Utensils
  if (s.includes('setup') || s.includes('priority')) return Zap
  if (s.includes('wagon')) return Truck
  return Shield
}

// ─── Managed packages ─────────────────────────────────────────────────────────

const PACKAGES = [
  {
    id: 'family',
    name: 'Family Sideline Kit',
    price: 99,
    badge: 'Family Pick',
    bestFor: 'Families with 1–2 players',
    includes: ['2 folding chairs', 'Shade umbrella', 'Cooler with ice'],
    description: 'Everything a family needs for a comfortable tournament day. Delivered to venue parking. Add Field Setup (+$40) to have it ready at your exact spot on the field.',
    highlight: false,
    Icon: Tent,
    headerImage: '/images/sideline-suites-family.png',
  },
  {
    id: 'basecamp',
    name: 'Team Basecamp',
    price: 249,
    badge: 'Most Popular',
    bestFor: 'Teams of 10–15 players',
    includes: ['10 folding chairs', '10×10 pop-up canopy', '2 large coolers', 'Folding table'],
    description: 'A full sideline command center for your team. Delivered to venue parking. Add Field Setup (+$40) and your team arrives to a ready sideline.',
    highlight: true,
    Icon: Users,
    headerImage: '/images/sideline-suites-3.png',
  },
  {
    id: 'premium',
    name: 'Premium Team Suite',
    price: 499,
    badge: 'Premium',
    bestFor: 'Teams wanting a VIP experience',
    includes: [
      '10 folding chairs',
      '10×10 pop-up canopy',
      '2 large coolers',
      'Folding table',
      'Snacks & drinks',
      'Priority setup at your field (Field Setup included)',
    ],
    description: 'Everything in Team Basecamp plus premium extras. Delivered to venue parking with priority Field Setup included — your sideline is ready before you arrive.',
    highlight: false,
    Icon: Star,
    headerImage: '/images/sideline-suites-premium.png',
  },
]

export default async function GearPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: tournament } = await supabase
    .from('tournaments')
    .select('id, name')
    .eq('slug', slug)
    .single()

  if (!tournament) notFound()

  const { data: listings } = await supabase
    .from('gear_listings')
    .select('*, hosts(name)')
    .eq('tournament_id', tournament.id)
    .eq('is_available', true)
    .order('category')

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-navy">Sideline Suites</h1>
        <p className="text-[#555] mt-1">
          Tournament sideline setups for West Coast Showdown. Delivered to venue parking.
        </p>
      </div>

      {/* ── How it works strip ── */}
      <div className="bg-sand/15 border border-sand/40 rounded-xl p-5 mb-6">
        <p className="text-xs font-semibold text-[#555] uppercase tracking-widest mb-4 text-center">How it works</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { step: '1', label: 'Choose your package', detail: 'Pick the setup that fits your family or team' },
            { step: '2', label: 'Gear delivered to venue parking', detail: 'Add Field Setup (+$40) to have it ready at your exact field' },
            { step: '3', label: 'Enjoy the game', detail: 'We handle pickup when the tournament ends' },
          ].map((s, i) => (
            <div key={s.step} className="flex flex-col items-center gap-1.5 relative">
              <div className="w-8 h-8 rounded-full bg-navy text-cream font-bold text-sm flex items-center justify-center shrink-0">
                {s.step}
              </div>
              <p className="font-semibold text-navy text-sm">{s.label}</p>
              <p className="text-xs text-[#555]">{s.detail}</p>
              {i < 2 && (
                <ArrowRight className="hidden sm:block absolute -right-2 top-2 w-4 h-4 text-sand" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Delivery banner ── */}
      <div className="flex items-start justify-center gap-2 bg-navy/5 border border-navy/10 rounded-lg px-4 py-3 mb-6">
        <Truck className="w-4 h-4 text-navy shrink-0 mt-0.5" />
        <p className="text-sm font-medium text-navy">
          All packages include delivery to venue parking and end-of-day pickup.{' '}
          <span className="font-semibold">Add Field Setup (+$40)</span>
          <span className="font-normal text-[#555]"> to have gear carried to your field and assembled.</span>
        </p>
      </div>

      {/* ── Managed packages ── */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="font-heading text-xl font-bold text-navy">Sideline Suites Packages</h2>
          <Badge className="bg-navy text-cream border-0 text-xs">Managed by us</Badge>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PACKAGES.map((pkg) => (
            <Card
              key={pkg.id}
              className={`overflow-hidden transition-all flex flex-col ${
                pkg.highlight
                  ? 'border-2 border-navy shadow-xl ring-0 md:scale-[1.02]'
                  : 'border border-sand/40 hover:shadow-md ring-0'
              }`}
            >
              {/* Card header — photo for Team Basecamp, icon circle for others */}
              {'headerImage' in pkg && pkg.headerImage ? (
                <div className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={pkg.headerImage} alt={pkg.name} className="w-full h-[180px] object-cover" />
                  <div className="absolute inset-0 bg-navy/60 flex flex-col items-end justify-end gap-1 pb-4 px-4 text-center">
                    <div className="w-full text-center">
                      <Badge className="bg-[#D6C6A5] text-navy border-0 text-xs mb-1">{pkg.badge}</Badge>
                      <CardTitle className="font-heading text-xl text-cream leading-tight">{pkg.name}</CardTitle>
                      <p className="text-[#d0e0f0] text-xs mt-0.5">{pkg.bestFor}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-navy px-6 pt-8 pb-6 flex flex-col items-center gap-3 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#1a2d47] flex items-center justify-center shrink-0">
                    <pkg.Icon className="w-8 h-8 text-[#D6C6A5]" />
                  </div>
                  <div>
                    <Badge className="bg-[#D6C6A5] text-navy border-0 text-xs mb-2">{pkg.badge}</Badge>
                    <CardTitle className="font-heading text-xl text-cream leading-tight">{pkg.name}</CardTitle>
                    <p className="text-[#a0b0c0] text-xs mt-1">{pkg.bestFor}</p>
                  </div>
                </div>
              )}

              {/* White body */}
              <CardContent className="pt-6 pb-6 flex flex-col flex-1 gap-5 bg-white">
                <p className="text-sm text-[#555] leading-relaxed">{pkg.description}</p>
                <ul className="space-y-2">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-navy">
                      <Check className="w-3.5 h-3.5 text-[#D6C6A5] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <p className="font-heading text-3xl font-bold text-navy mb-1">
                    ${pkg.price}
                    <span className="text-sm font-normal text-[#555]">/day</span>
                  </p>
                  <Button
                    asChild
                    className="w-full bg-[#D6C6A5] text-[#0E1A2B] font-semibold rounded-full hover:bg-[#c4b48f] transition-colors mt-3"
                    size="default"
                  >
                    <Link href={`/team-booking?type=gear&package=${pkg.id}`}>
                      Reserve this package
                    </Link>
                  </Button>
                  <p className="text-xs text-[#555] text-center mt-2">
                    No charge yet — we confirm availability within 24 hours.
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Add-on chips ── */}
      <div className="mb-10">
        <p className="text-xs font-semibold text-[#555] uppercase tracking-widest mb-3">Add-ons available at checkout</p>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 border-navy bg-navy/5 text-sm text-navy">
            <Zap className="w-4 h-4 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Field Setup</span>
              <span className="font-semibold text-navy"> +$40</span>
              <span className="text-[#555]"> — We carry gear to your field and set up before you arrive. Most customers add this.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-sand/50 bg-sand/10 text-sm text-navy">
            <MapPin className="w-3.5 h-3.5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Hotel Delivery</span>
              <span className="text-[#555] font-normal"> +$25</span>
              <span className="text-[#555]"> — Gear delivered to your hotel the night before.</span>
            </div>
          </div>
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-sand/50 bg-sand/10 text-sm text-navy">
            <Shield className="w-3.5 h-3.5 text-navy shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Gear Protection</span>
              <span className="text-[#555] font-normal"> +$10</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scout intel banner ── */}
      <div className="flex items-start gap-3 bg-[#0E1A2B] rounded-xl px-5 py-4 mb-10">
        <MessageSquare className="w-4 h-4 text-[#D6C6A5] shrink-0 mt-0.5" />
        <p className="text-[#a0b4c8] text-sm leading-snug">
          Sideline Scout knows Twin Creeks Sports Complex inside and out — ask about shade spots, parking, and field locations before you arrive.{' '}
          <Link href={`/t/${slug}/scout`} className="text-[#D6C6A5] font-medium hover:underline">
            Ask Scout →
          </Link>
        </p>
      </div>

      {/* ── Host listings ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading text-xl font-bold text-navy">Individual Items from Local Hosts</h2>
          <span className="text-xs text-[#555]">
            {Math.round(PLATFORM_FEE_RATE * 100)}% platform fee included at checkout
          </span>
        </div>

        {!listings || listings.length === 0 ? (
          <div className="text-center py-12 text-[#555] border border-dashed border-border rounded-xl">
            <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-base">No individual listings yet for this tournament.</p>
            <p className="text-sm mt-1">
              Have gear to rent?{' '}
              <Link href="/host" className="text-navy underline underline-offset-2">
                Become a Provider
              </Link>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((listing: GearListing & { hosts: { name: string } | null }) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {listing.image_url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={listing.image_url}
                    alt={listing.title}
                    className="w-full h-36 object-cover"
                  />
                )}
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="font-heading text-base text-navy leading-tight">
                      {listing.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0">{listing.category}</Badge>
                  </div>
                  {listing.hosts && (
                    <p className="text-xs text-[#555]">by {listing.hosts.name}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  {listing.description && (
                    <p className="text-sm text-[#555] line-clamp-2">{listing.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-navy">
                      ${listing.price_per_day}
                      <span className="text-sm font-normal text-[#555]">/day</span>
                    </span>
                    <span className="text-xs text-[#555]">
                      {listing.quantity_available} left
                    </span>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-navy text-cream hover:bg-[#1a2d47] rounded-full transition-colors"
                    size="sm"
                  >
                    <a href={`/t/${slug}/gear/${listing.id}`}>Reserve</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
