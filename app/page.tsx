import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, MessageSquare, ShoppingBag, Hotel } from 'lucide-react'

const FEATURED_TOURNAMENT = {
  slug: 'west-coast-showdown-2026',
  name: 'West Coast Showdown',
  organizer: 'ADVNC Lacrosse',
  dates: 'July 18–19, 2026',
  venue: 'Twin Creeks Sports Complex',
  city: 'Sunnyvale, CA',
}

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="bg-navy text-cream px-6 py-20 text-center">
        <Badge className="mb-4 bg-sand text-navy border-0">Beta — First tournament live</Badge>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Your tournament weekend,<br />sorted.
        </h1>
        <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-8">
          Sideline Scout is the AI-powered travel concierge for youth sports families.
          Hotels, gear, food, parking — everything in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            size="lg"
            className="bg-sand text-navy hover:bg-sand/90 font-semibold"
          >
            <Link href={`/t/${FEATURED_TOURNAMENT.slug}/scout`}>
              <MessageSquare className="w-4 h-4 mr-2" />
              Ask Scout
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-steel text-cream hover:bg-white/10"
          >
            <Link href="/team-booking">
              Plan for My Team
            </Link>
          </Button>
        </div>
      </section>

      {/* Featured tournament */}
      <section className="bg-cream px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-steel text-sm font-medium uppercase tracking-widest mb-6">
            Featured Tournament
          </p>
          <Card className="border-0 shadow-md overflow-hidden">
            <CardHeader className="bg-navy text-cream pb-4">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="font-heading text-3xl">{FEATURED_TOURNAMENT.name}</CardTitle>
                  <p className="text-sand mt-1">{FEATURED_TOURNAMENT.organizer}</p>
                </div>
                <Badge className="bg-sand text-navy border-0 text-sm">{FEATURED_TOURNAMENT.dates}</Badge>
              </div>
              <div className="flex items-center gap-1 text-steel mt-2 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {FEATURED_TOURNAMENT.venue} · {FEATURED_TOURNAMENT.city}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Link
                  href={`/t/${FEATURED_TOURNAMENT.slug}/scout`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-navy hover:bg-navy/5 transition-colors"
                >
                  <MessageSquare className="w-5 h-5 text-navy shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Ask Scout</p>
                    <p className="text-xs text-muted-foreground">AI trip planner</p>
                  </div>
                </Link>
                <Link
                  href={`/t/${FEATURED_TOURNAMENT.slug}/hotels`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-navy hover:bg-navy/5 transition-colors"
                >
                  <Hotel className="w-5 h-5 text-navy shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Hotels</p>
                    <p className="text-xs text-muted-foreground">Curated nearby stays</p>
                  </div>
                </Link>
                <Link
                  href={`/t/${FEATURED_TOURNAMENT.slug}/gear`}
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:border-navy hover:bg-navy/5 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5 text-navy shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Gear Rentals</p>
                    <p className="text-xs text-muted-foreground">Tents, chairs & more</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-3xl font-bold text-navy mb-2">How it works</h2>
          <p className="text-muted-foreground mb-10">Tournament prep in three steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                step: '01',
                title: 'Find your tournament',
                body: 'We set up a Sideline Scout hub for your specific event with curated local info.',
              },
              {
                step: '02',
                title: 'Ask Scout anything',
                body: 'Our AI concierge answers questions about hotels, food, parking, weather, and gear — grounded in real data.',
              },
              {
                step: '03',
                title: 'Book & go',
                body: 'Reserve gear rentals, browse hotels, and share your itinerary with your team group chat.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <span className="font-heading text-4xl font-bold text-sand leading-none">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTAs */}
      <section className="bg-cream px-6 py-12 mt-auto">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <p className="font-heading text-lg font-semibold text-navy">Hosting a tournament?</p>
            <p className="text-muted-foreground text-sm">Get your event set up on Sideline Scout.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="outline" className="border-navy text-navy hover:bg-navy/5">
              <Link href="/host">Become a Host</Link>
            </Button>
            <Button asChild className="bg-navy text-cream hover:bg-navy/90">
              <Link href="/team-booking">Team Booking</Link>
            </Button>
          </div>
        </div>
      </section>

      <div className="bg-cream px-6 py-5 text-center border-t border-border">
        <p className="text-sm text-muted-foreground italic">
          Built by a lacrosse family. Jack, Harris, and Gracie have played on these fields.
        </p>
      </div>

      <footer className="bg-navy text-steel text-xs text-center py-4 px-6">
        © {new Date().getFullYear()} Sideline Scout ·{' '}
        <Link href="/feedback" className="hover:text-cream transition-colors">Submit a tip</Link>
      </footer>
    </div>
  )
}
