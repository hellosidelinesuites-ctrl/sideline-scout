import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Star, ExternalLink, Users } from 'lucide-react'
import type { Hotel } from '@/types/database'

const TIDES_URL = 'https://www.foratravel.com/advisor/eric-mcdearman'

function getBestFor(hotel: Hotel): string {
  const amenities = hotel.amenities.map((a) => a.toLowerCase())
  if (hotel.is_team_friendly) return 'Teams traveling together'
  if (amenities.some((a) => a.includes('pool') || a.includes('waterpark'))) return 'Families with kids'
  if ((hotel.star_rating ?? 0) >= 4) return 'Families wanting extra comfort'
  if (hotel.price_per_night < 150) return 'Budget-conscious families'
  return 'Families & solo travelers'
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
        <p className="text-muted-foreground mt-1">Sorted by distance from the complex.</p>
      </div>

      {!hotels || hotels.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p>Hotel listings coming soon. Check back closer to the tournament.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {hotels.map((hotel: Hotel) => (
            <Card key={hotel.id} className="overflow-hidden hover:shadow-md transition-shadow">
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
                <div className="flex items-center gap-1 text-muted-foreground text-sm">
                  <MapPin className="w-3.5 h-3.5" />
                  {hotel.distance_miles} mi from venue
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-navy">
                    ${hotel.price_per_night}
                    <span className="text-sm font-normal text-muted-foreground">/night</span>
                  </span>
                  {hotel.is_team_friendly && (
                    <Badge className="bg-sand text-navy border-0 text-xs">
                      <Users className="w-3 h-3 mr-1" />
                      Team Friendly
                    </Badge>
                  )}
                </div>

                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-navy">Best for:</span> {getBestFor(hotel)}
                </p>

                {hotel.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {hotel.amenities.slice(0, 4).map((a) => (
                      <Badge key={a} variant="secondary" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                )}

                {hotel.notes && (
                  <p className="text-sm text-muted-foreground">{hotel.notes}</p>
                )}

                <Button
                  asChild
                  className="w-full bg-sand text-navy hover:bg-sand/90 font-semibold"
                  size="sm"
                >
                  <a href={TIDES_URL} target="_blank" rel="noopener noreferrer">
                    Book with Tides & Timbers
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center leading-snug">
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
