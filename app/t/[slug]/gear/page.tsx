import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingBag, Shield, Zap, MapPin } from 'lucide-react'
import { PLATFORM_FEE_RATE, UPSELL_PRICES } from '@/types/database'
import type { GearListing } from '@/types/database'

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
        <h1 className="font-heading text-3xl font-bold text-navy">Gear Rentals</h1>
        <p className="text-muted-foreground mt-1">
          Rent from local hosts. {Math.round(PLATFORM_FEE_RATE * 100)}% platform fee included at checkout.
        </p>
      </div>

      {/* Upsells callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-sand/20 border border-sand/40">
          <Zap className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-navy">Setup Service</p>
            <p className="text-xs text-muted-foreground">We set it up for you. +${UPSELL_PRICES.setup_service}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-sand/20 border border-sand/40">
          <Shield className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-navy">Gear Protection</p>
            <p className="text-xs text-muted-foreground">Damage coverage. +${UPSELL_PRICES.gear_protection}</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-3 rounded-lg bg-sand/20 border border-sand/40">
          <MapPin className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-navy">Placement Intel</p>
            <p className="text-xs text-muted-foreground">Best spot tips. +${UPSELL_PRICES.placement_intel}</p>
          </div>
        </div>
      </div>

      {!listings || listings.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <ShoppingBag className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No gear listed yet. Check back closer to the tournament.</p>
          <p className="text-sm mt-1">
            Want to list gear?{' '}
            <a href="/host" className="text-navy underline underline-offset-2">Become a host</a>
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
                  <p className="text-xs text-muted-foreground">by {listing.hosts.name}</p>
                )}
              </CardHeader>
              <CardContent className="space-y-3">
                {listing.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{listing.description}</p>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-navy">
                    ${listing.price_per_day}
                    <span className="text-sm font-normal text-muted-foreground">/day</span>
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {listing.quantity_available} left
                  </span>
                </div>
                <Button
                  asChild
                  className="w-full bg-navy text-cream hover:bg-navy/90"
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
  )
}
