import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Hotel, TravelDeal } from '@/types/database'

export default async function TravelAdminPage() {
  const supabase = await createClient()

  const [
    { data: tournaments },
    { data: hotels },
    { data: deals },
  ] = await Promise.all([
    supabase.from('tournaments').select('id, name, slug, start_date').order('start_date'),
    supabase
      .from('hotels')
      .select('*, tournaments(name, slug)')
      .order('created_at', { ascending: false }),
    supabase
      .from('travel_deals')
      .select('*, tournaments(name, slug)')
      .order('created_at', { ascending: false }),
  ])

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-heading text-3xl font-bold text-navy">Travel Admin</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Manage hotels and travel deals across tournaments.</p>
          </div>
          <Button className="bg-navy text-cream hover:bg-navy/90" size="sm">
            + Add Hotel
          </Button>
        </div>

        {/* Tournament overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {tournaments?.map((t) => (
            <Card key={t.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="pt-4">
                <p className="font-semibold text-navy text-sm">{t.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {new Date(t.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="hotels">
          <TabsList className="mb-4">
            <TabsTrigger value="hotels">Hotels ({hotels?.length ?? 0})</TabsTrigger>
            <TabsTrigger value="deals">Travel Deals ({deals?.length ?? 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="hotels">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">All Hotel Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        <th className="pb-2 font-medium text-muted-foreground">Hotel</th>
                        <th className="pb-2 font-medium text-muted-foreground">Tournament</th>
                        <th className="pb-2 font-medium text-muted-foreground">Distance</th>
                        <th className="pb-2 font-medium text-muted-foreground">Price/night</th>
                        <th className="pb-2 font-medium text-muted-foreground">Team Friendly</th>
                        <th className="pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {hotels?.map((hotel: Hotel & { tournaments: { name: string; slug: string } | null }) => (
                        <tr key={hotel.id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 font-medium text-navy">{hotel.name}</td>
                          <td className="py-3 text-muted-foreground">{hotel.tournaments?.name}</td>
                          <td className="py-3">{hotel.distance_miles} mi</td>
                          <td className="py-3">${hotel.price_per_night}</td>
                          <td className="py-3">
                            {hotel.is_team_friendly ? (
                              <Badge className="bg-sand text-navy border-0 text-xs">Yes</Badge>
                            ) : (
                              <span className="text-muted-foreground">—</span>
                            )}
                          </td>
                          <td className="py-3">
                            <Button variant="ghost" size="sm" className="text-xs h-7">Edit</Button>
                          </td>
                        </tr>
                      ))}
                      {!hotels?.length && (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-muted-foreground">No hotels yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deals">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-heading text-lg">Travel Deals</CardTitle>
                  <Button size="sm" className="bg-navy text-cream hover:bg-navy/90">+ Add Deal</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {deals?.map((deal: TravelDeal & { tournaments: { name: string } | null }) => (
                    <div key={deal.id} className="py-3 flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="secondary" className="text-xs">{deal.deal_type}</Badge>
                          <span className="font-medium text-sm text-navy">{deal.provider}</span>
                          <span className="text-xs text-muted-foreground">{deal.tournaments?.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{deal.description}</p>
                        {deal.expires_at && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Expires {new Date(deal.expires_at).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-7 shrink-0">Edit</Button>
                    </div>
                  ))}
                  {!deals?.length && (
                    <p className="py-6 text-center text-muted-foreground text-sm">No deals yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
