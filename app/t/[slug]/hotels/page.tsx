import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, ExternalLink, Users, CheckCircle2 } from 'lucide-react'
import type { Hotel } from '@/types/database'

const TIDES_URL = 'https://www.foratravel.com/advisor/eric-mcdearman'

function getDriveMinutes(miles: number): number {
  return Math.round(Math.max(5, miles * 2.8))
}

function getBestFor(hotel: Hotel): string {
  const amenities = hotel.amenities.map((a) => a.toLowerCase())
  if (hotel.is_team_friendly) return 'Teams traveling together'
  if (amenities.some((a) => a.includes('pool') || a.includes('waterpark'))) return 'Families with kids'
  if ((hotel.star_rating ?? 0) >= 4) return 'Families wanting extra comfort'
  if (hotel.price_per_night < 150) return 'Budget-conscious families'
  return 'Families & solo travelers'
}

function getCardBorderClass(hotel: Hotel): string {
  if (hotel.is_team_friendly) return 'border-l-4 border-l-navy ring-0 border border-border'
  if ((hotel.star_rating ?? 0) >= 4 || hotel.price_per_night > 200) return 'border-l-4 border-l-[#1a2d47] ring-0 border border-border'
  return 'border-l-4 border-l-sand ring-0 border border-border'
}

export default async function HotelsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: tournament } = await supabase
    .from('tournaments')
    .select('id, name')
    .eq('slug', slug)
    .single()

  if (!tournament) notFound()

  const { data: hotels } = await supabase
    .from('hotels')
    .select('*')
    .eq('tournament_id', tournament.id)
    .order('distance_miles', { ascending: true })

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-heading text-3xl font-bold text-navy">Hotels Near the Venue</h1>
        <p className="text-[#555] mt-1">Sorted by distance from the complex.</p>
      </div>

      {/* Eric McDearman callout */}
      <div className="bg-sand/20 border border-sand/50 rounded-xl p-5 mb-8">
        <p className="font-bold text-navy mb-3">Why book through Sideline Scout?</p>
        <ul className="space-y-2">
          {[
            'Eric McDearman at Tides & Timbers specializes in youth sports family travel',
            'Knows which hotels do team blocks and which fill up first for WCS',
            'Knows which properties have gear storage for canopies and equipment',
            'Booking through him costs nothing extra — and often unlocks better rates',
          ].map((point) => (
            <li key={point} className="flex items-start gap-2 text-sm text-[#555]">
              <CheckCircle2 className="w-4 h-4 text-navy shrink-0 mt-0.5" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {!hotels || hotels.length === 0 ? (
        <div className="text-center py-16 text-[#555]">
          <p className="text-base">Hotel listings coming soon. Check back closer to the tournament.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((hotel: Hotel) => (
            <Card
              key={hotel.id}
              className={`overflow-hidden hover:shadow-md transition-shadow ${getCardBorderClass(hotel)}`}
            >
              {hotel.image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={hotel.image_url}
                  alt={hotel.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="font-heading text-lg text-navy">{hotel.name}</CardTitle>
                  {hotel.star_rating && (
                    <div className="flex items-center gap-0.5 shrink-0">
                      {Array.from({ length: hotel.star_rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-sand text-sand" />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[#555] text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {hotel.distance_miles} mi · ~{getDriveMinutes(hotel.distance_miles)} min drive
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-navy">
                    ${hotel.price_per_night}
                    <span className="text-sm font-normal text-[#555]">/night</span>
                  </span>
                  {hotel.is_team_friendly && (
                    <Badge className="bg-sand text-navy border-0 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Team Friendly
                    </Badge>
                  )}
                </div>

                <p className="text-sm">
                  <span className="font-bold text-navy">Best for:</span>{' '}
                  <span className="text-[#555]">{getBestFor(hotel)}</span>
                </p>

                {hotel.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 4).map((a) => (
                      <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                )}

                {hotel.notes && (
                  <p className="text-sm text-[#555] leading-relaxed">{hotel.notes}</p>
                )}

                <Button
                  asChild
                  className="w-full bg-[#D6C6A5] text-[#0E1A2B] font-semibold hover:bg-[#c4b48f] transition-colors rounded-full"
                  size="sm"
                >
                  <a href={TIDES_URL} target="_blank" rel="noopener noreferrer">
                    Book with Tides & Timbers
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </Button>
                <p className="text-xs text-[#555] text-center leading-snug">
                  Rates vary by dates and availability. Final pricing confirmed at booking.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
