import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  MapPin, MessageSquare, ShoppingBag, Hotel, Quote,
  Search, CalendarCheck, Heart,
} from 'lucide-react'
import EmailCaptureSection from '@/components/email-capture-section'

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

const HOW_IT_WORKS = [
  {
    icon: Search,
    title: 'Find your tournament',
    body: 'We build a dedicated hub for your event with curated local intel — hotels, parking, food, and gear — sourced from real families.',
  },
  {
    icon: MessageSquare,
    title: 'Ask Scout anything',
    body: 'Our AI concierge answers your questions grounded in real venue data and parent tips, not generic search results.',
  },
  {
    icon: CalendarCheck,
    title: 'Book & show up ready',
    body: 'Reserve gear, lock in a hotel, and share your game plan with your team group chat — all in one place.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section
        className="text-cream px-6 pt-16 md:pt-20 pb-8 md:pb-12 text-center relative overflow-hidden bg-[#0E1A2B]"
        style={{
          backgroundImage: `url('/images/hero-setup.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        {/* Navy overlay */}
        <div className="absolute inset-0 bg-[#0E1A2B]/80" />
        <div className="relative max-w-3xl mx-auto">
          <Badge className="mb-5 bg-sand text-navy border-0 text-sm px-4 py-1">
            Beta — First tournament live
          </Badge>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Your tournament<br className="hidden sm:block" /> weekend, sorted.
          </h1>
          <p className="font-['Playfair_Display'] text-[#D6C6A5] text-lg md:text-xl italic mb-4">
            Tournament weekend. Locked in.
          </p>
          <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Sideline Scout is the AI-powered travel concierge for youth sports families.
            Hotels, gear, food, parking — everything in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/t/${FEATURED_TOURNAMENT.slug}/scout`}
              className="inline-flex items-center gap-2 text-base font-semibold rounded-full px-8 py-4 bg-sand text-navy hover:bg-[#c4b48f] transition-colors w-full sm:w-auto justify-center"
            >
              <MessageSquare className="w-4 h-4" />
              Ask Scout
            </Link>
            <Link
              href="/team-booking"
              className="inline-flex items-center gap-2 text-base font-semibold rounded-full px-8 py-4 border border-white/25 text-cream hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
            >
              Plan for My Team
            </Link>
          </div>
        </div>
      </section>

      {/* ── Honest trust strip ── */}
      <section className="bg-sand/20 border-y border-sand/40 py-3 px-6 text-center">
        <p className="text-sm text-navy font-medium">
          First tournament:{' '}
          <span className="font-semibold">West Coast Showdown 2026</span>
          {' · '}Sunnyvale, CA{' · '}July 18–19
        </p>
      </section>

      {/* ── Featured tournament ── */}
      <section className="bg-cream px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <p className="text-steel text-sm font-medium uppercase tracking-widest mb-5">
            Featured Tournament
          </p>
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-navy text-cream pb-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <CardTitle className="font-heading text-3xl leading-tight">
                    {FEATURED_TOURNAMENT.name}
                  </CardTitle>
                  <p className="text-sand mt-1">{FEATURED_TOURNAMENT.organizer}</p>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <Badge className="bg-sand text-navy border-0">{FEATURED_TOURNAMENT.dates}</Badge>
                  <Badge className="bg-green-500/20 text-green-300 border border-green-500/30 text-xs">
                    Now Accepting Reservations
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-steel mt-3 text-sm">
                <MapPin className="w-3.5 h-3.5" />
                {FEATURED_TOURNAMENT.venue} · {FEATURED_TOURNAMENT.city}
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link
                  href={`/t/${FEATURED_TOURNAMENT.slug}/scout`}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border hover:border-navy hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Ask Scout</p>
                    <p className="text-xs text-[#555]">AI trip planner</p>
                  </div>
                </Link>
                <Link
                  href={`/t/${FEATURED_TOURNAMENT.slug}/hotels`}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border hover:border-navy hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                    <Hotel className="w-4 h-4 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Hotels</p>
                    <p className="text-xs text-[#555]">Curated nearby stays</p>
                  </div>
                </Link>
                <Link
                  href={`/t/${FEATURED_TOURNAMENT.slug}/gear`}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border hover:border-navy hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-4 h-4 text-navy" />
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">Gear Rentals</p>
                    <p className="text-xs text-[#555]">Tents, chairs & more</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">
            What parents are saying
          </h2>
          <p className="text-[#555] text-center mb-10">Real families. Real tournaments.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="bg-cream rounded-2xl p-6 flex flex-col gap-4 border border-sand/30 shadow-sm"
              >
                <Quote className="w-6 h-6 text-sand shrink-0" />
                <p className="text-navy text-base leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="font-semibold text-navy text-sm">{t.author}</p>
                  <p className="text-xs text-[#555]">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-cream px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">
            How it works
          </h2>
          <p className="text-[#555] text-center mb-10">Tournament prep in three steps.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {HOW_IT_WORKS.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-border"
              >
                <div className="w-10 h-10 rounded-xl bg-navy/6 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-navy" />
                </div>
                <h3 className="font-heading font-semibold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-[#555] text-base leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCaptureSection />

      {/* ── Gear for Good ── */}
      <section className="bg-navy text-cream px-6 py-14">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-10 h-10 rounded-full bg-sand/20 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-5 h-5 text-sand" />
          </div>
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-3">Gear for Good</p>
          <h2 className="font-heading text-3xl font-bold mb-5">
            Every season, gear goes to kids who need it.
          </h2>
          <p className="text-steel text-base leading-relaxed">
            At the end of every season, unclaimed and donated gear goes to youth athletes who
            can&rsquo;t afford their own equipment. Built by a lacrosse family — we&rsquo;ve played on these fields.
          </p>
        </div>
      </section>

      {/* ── Footer CTAs ── */}
      <section className="bg-cream px-6 py-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div>
            <p className="font-heading text-lg font-semibold text-navy">Ready to list your gear?</p>
            <p className="text-[#555] text-sm mt-0.5">Join the Sideline Suites Provider program.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Link
              href="/host"
              className="inline-flex items-center justify-center font-semibold rounded-full px-7 py-3 bg-sand text-navy hover:bg-[#c4b48f] transition-colors text-sm"
            >
              Become a Provider
            </Link>
            <Link
              href="/team-booking"
              className="inline-flex items-center justify-center font-semibold rounded-full px-7 py-3 bg-navy text-cream hover:bg-[#1a2d47] transition-colors text-sm"
            >
              Team Booking
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-steel text-xs text-center py-4 px-6">
        © {new Date().getFullYear()} Sideline Scout ·{' '}
        <Link href="/feedback" className="hover:text-cream transition-colors">Submit a tip</Link>
        {' · '}
        <a href="mailto:hello@sidelinescout.co" className="hover:text-cream transition-colors">
          hello@sidelinescout.co
        </a>
      </footer>
    </div>
  )
}
