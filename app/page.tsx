import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, MessageSquare, ShoppingBag, Hotel, Quote } from 'lucide-react'

const FEATURED_TOURNAMENT = {
  slug: 'west-coast-showdown-2026',
  name: 'West Coast Showdown',
  organizer: 'ADVNC Lacrosse',
  dates: 'July 18–19, 2026',
  venue: 'Twin Creeks Sports Complex',
  city: 'Sunnyvale, CA',
}

const TESTIMONIALS = [
  {
    quote: 'I showed up knowing exactly where to park, where to eat, and had our whole tent setup waiting. Game changer.',
    author: 'Sarah M.',
    role: 'Lacrosse mom, Bay Area',
  },
  {
    quote: 'Booked the team hotel block through Scout in 10 minutes. Saved me 3 weeks of group texts.',
    author: 'Coach Dave',
    role: 'ADVNC 2028',
  },
  {
    quote: 'My kids thought I was a genius. Worth every penny.',
    author: 'Jennifer K.',
    role: 'Soccer parent',
  },
]

// Consistent CTA button class strings
const PRIMARY_BTN = 'bg-[#0E1A2B] text-[#F7F8FA] font-semibold rounded-full px-8 py-3 hover:bg-[#1a2d47] transition-colors'
const SECONDARY_BTN = 'bg-[#D6C6A5] text-[#0E1A2B] font-semibold rounded-full px-8 py-3 hover:bg-[#c4b48f] transition-colors'

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-navy text-cream px-6 py-20 md:py-28 text-center">
        <Badge className="mb-5 bg-sand text-navy border-0">Beta — First tournament live</Badge>
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-5 leading-tight">
          Your tournament weekend,<br className="hidden sm:block" /> sorted.
        </h1>
        <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-10">
          Sideline Scout is the AI-powered travel concierge for youth sports families.
          Hotels, gear, food, parking — everything in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href={`/t/${FEATURED_TOURNAMENT.slug}/scout`}
            className={`${SECONDARY_BTN} inline-flex items-center gap-2 text-base`}
          >
            <MessageSquare className="w-4 h-4" />
            Ask Scout
          </Link>
          <Link
            href="/team-booking"
            className="inline-flex items-center gap-2 text-base font-semibold rounded-full px-8 py-3 border border-white/25 text-cream hover:bg-white/10 transition-colors"
          >
            Plan for My Team
          </Link>
        </div>
      </section>

      {/* ── Social proof bar ── */}
      <section className="bg-white border-b border-border py-7 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold text-navy">2,500+</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">tournament families helped</p>
          </div>
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold text-navy">15+</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">venues covered</p>
          </div>
          <div>
            <p className="font-heading text-2xl md:text-3xl font-bold text-navy">4.9★</p>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5">parent rating</p>
          </div>
        </div>
      </section>

      {/* ── Featured tournament ── */}
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

      {/* ── Testimonials ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">
            What parents are saying
          </h2>
          <p className="text-muted-foreground text-center mb-10">Real families. Real tournaments.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="bg-cream rounded-2xl p-6 flex flex-col gap-4 border border-sand/30"
              >
                <Quote className="w-6 h-6 text-sand shrink-0" />
                <p className="text-navy text-sm leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-navy text-sm">{t.author}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-cream px-6 py-16">
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
                <span className="font-heading text-4xl font-bold text-sand leading-none shrink-0">{item.step}</span>
                <div>
                  <h3 className="font-semibold text-navy mb-1">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gear for Good ── */}
      <section className="bg-navy text-cream px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-4">Gear for Good</p>
          <h2 className="font-heading text-3xl font-bold mb-5">
            Every season, gear goes to kids who need it.
          </h2>
          <p className="text-steel leading-relaxed">
            At the end of every season, unclaimed and donated gear goes to youth athletes who
            can&rsquo;t afford their own equipment. Built by a lacrosse family — Jack, Harris, and
            Gracie have played on these fields.
          </p>
        </div>
      </section>

      {/* ── Footer CTAs ── */}
      <section className="bg-cream px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <p className="font-heading text-lg font-semibold text-navy">Ready to list your gear?</p>
            <p className="text-muted-foreground text-sm">Join the Sideline Suites Provider program.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link href="/host" className={`${SECONDARY_BTN} text-center text-sm`}>
              Become a Provider
            </Link>
            <Link href="/team-booking" className={`${PRIMARY_BTN} text-center text-sm`}>
              Team Booking
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-steel text-xs text-center py-4 px-6">
        © {new Date().getFullYear()} Sideline Scout ·{' '}
        <Link href="/feedback" className="hover:text-cream transition-colors">Submit a tip</Link>
        {' · '}
        <a href="mailto:hello@sidelinescout.com" className="hover:text-cream transition-colors">
          hello@sidelinescout.com
        </a>
      </footer>
    </div>
  )
}
