import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, MessageSquare, ShoppingBag, Hotel, Heart, Tent, Users, Check, Compass } from 'lucide-react'
import EmailCaptureSection from '@/components/email-capture-section'

const FEATURED_TOURNAMENT = {
  slug: 'west-coast-showdown-2026',
  name: 'West Coast Showdown',
  organizer: 'ADVNC Lacrosse',
  dates: 'July 18–19, 2026',
  venue: 'Twin Creeks Sports Complex',
  city: 'Sunnyvale, CA',
}

const COMING_SOON = [
  {
    name: 'SASC Medina Fall Classic',
    organizer: 'SASC',
    dates: 'Sep 26–27, 2026',
    venue: 'Twin Creeks Sports Complex',
    city: 'Sunnyvale, CA',
    sport: 'Soccer',
    note: 'Same venue as West Coast Showdown',
  },
  {
    name: 'NCTB South Bay Baseball Classic',
    organizer: 'NCTB',
    dates: 'Fall 2026',
    venue: 'Twin Creeks Sports Complex',
    city: 'Sunnyvale, CA',
    sport: 'Baseball',
    note: 'Official baseball partner at Twin Creeks',
  },
  {
    name: 'Bay Area Travel Sports Weekend',
    organizer: 'Bay Area Travel Sports',
    dates: '2026–2027 Season',
    venue: 'Bay Area, CA',
    city: '',
    sport: 'Multiple Sports',
    note: 'Expanding to soccer, baseball, softball',
  },
]

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
    number: '01',
    title: 'Find your tournament',
    body: 'We build a dedicated hub for your event with curated local intel — hotels, parking, food, and gear — sourced from real families.',
  },
  {
    number: '02',
    title: 'Ask Scout anything',
    body: 'Our AI concierge answers your questions grounded in real venue data and parent tips, not generic search results.',
  },
  {
    number: '03',
    title: 'Book & show up ready',
    body: 'Reserve gear, lock in a hotel, and share your game plan with your team group chat — all in one place.',
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* ── Hero ── */}
      <section className="bg-[#0E1A2B] text-cream px-6 pt-24 md:pt-32 pb-12 md:pb-16 text-center min-h-[500px] flex items-center">
        <div className="max-w-3xl mx-auto w-full">
          <Badge className="mb-5 bg-sand text-navy border-0 text-sm px-4 py-1">
            Beta — First tournament live
          </Badge>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Tournament weekend.<br className="hidden sm:block" /> Locked in.
          </h1>
          <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-8 leading-relaxed">
            Premium tournament setups, waiting for your team when you arrive. Shade, chairs, coolers,
            and tables — delivered to the field, packed up when it ends. Powered by Sideline Scout
            for weather, parking, and local intel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/t/${FEATURED_TOURNAMENT.slug}/gear`}
              className="inline-flex items-center gap-2 text-base font-semibold rounded-full px-8 py-4 bg-sand text-navy hover:bg-[#c4b48f] transition-colors w-full sm:w-auto justify-center"
            >
              <Tent className="w-4 h-4" />
              Reserve a Sideline Suite
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

      {/* ── Stats strip ── */}
      <section className="bg-sand/20 border-y border-sand/40 py-3 px-6 text-center">
        <p className="text-sm text-navy font-medium">
          First tournament:{' '}
          <span className="font-semibold">West Coast Showdown 2026</span>
          {' · '}Sunnyvale, CA{' · '}July 18–19
        </p>
      </section>

      {/* ── Team Manager CTA ── */}
      <section className="bg-[#0E1A2B] text-cream px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest mb-3">Built for team parents</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4 leading-tight">
            One manager reserves.<br className="hidden sm:block" /> Every family shows up to a ready sideline.
          </h2>
          <p className="text-[#a0b4c8] text-base mb-6 max-w-xl mx-auto leading-relaxed">
            Team Basecamp at <span className="text-cream font-semibold">$249/day</span> split across 15 families
            {' '}= <span className="text-[#D6C6A5] font-bold text-lg">$17 per family.</span>
          </p>
          <Link
            href="/team-booking"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-base"
          >
            Book for My Team →
          </Link>
        </div>
      </section>

      {/* ── Sideline Suites intro ── */}
      <section className="bg-[#0E1A2B] text-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest mb-3">
                Sideline Suites
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-5 leading-tight">
                Introducing Sideline Suites
              </h2>
              <p className="text-[#a0b4c8] text-base leading-relaxed mb-6">
                The sideline gear rental marketplace built for tournament families. Reserve a canopy,
                chairs, and shade — delivered to venue parking, packed up when you leave.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Gear delivered to venue parking before you arrive',
                  'Add Field Setup (+$40) for field-side assembly and teardown',
                  'Family kits from $99 · Team packages from $249',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#c0d0e0]">
                    <Check className="w-4 h-4 text-[#D6C6A5] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex items-start gap-2.5 mb-8 border-l-2 border-[#D6C6A5]/40 pl-4">
                <Compass className="w-4 h-4 text-[#D6C6A5] shrink-0 mt-0.5" />
                <p className="text-[#a0b4c8] text-sm italic leading-snug">
                  Every Sideline Suite comes with Scout — your AI guide for parking, weather, shade spots, and team dinner recommendations at the venue.
                </p>
              </div>
              <Link
                href="/t/west-coast-showdown-2026/gear"
                className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-3.5 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-sm"
              >
                <Tent className="w-4 h-4" />
                Browse Packages →
              </Link>
            </div>
            <div className="flex-1 lg:self-stretch">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sideline-suites-4.png"
                alt="Sideline Suites team setup at a tournament"
                className="w-full h-full min-h-[300px] object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured tournament ── */}
      <section className="bg-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
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
                    <p className="font-semibold text-navy text-sm">Sideline Suites</p>
                    <p className="text-xs text-[#555]">Tent setups from $99/day</p>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ── Gear standalone CTA ── */}
      <section className="relative overflow-hidden border-y border-[#0E1A2B]/20 px-6 py-16 text-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/sideline-suites-2.png)' }}
        />
        <div className="absolute inset-0 bg-[#0E1A2B]/60" />
        <div className="relative z-10 max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-cream mb-1">Just need a tent?</h2>
          <p className="text-[#D6C6A5] text-sm font-medium mb-3">by Sideline Suites</p>
          <p className="text-cream/80 text-base leading-snug mb-6 max-w-lg mx-auto">
            No hotel. No full package. Just show up and find your gear waiting at the field.<br />
            <span className="font-semibold text-cream">Family Sideline Kit — $99/day.</span> Tent and chairs. Delivered to venue parking. Add Field Setup (+$40) for field-side assembly.
          </p>
          <Link
            href="/t/west-coast-showdown-2026/gear"
            className="inline-flex items-center justify-center font-semibold rounded-full px-8 py-3.5 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-sm w-full sm:w-auto"
          >
            Reserve a Setup →
          </Link>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">
            What parents are saying
          </h2>
          <p className="text-[#555] text-center mb-10">Real families. Real tournaments.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.author}
                className="bg-cream rounded-2xl p-6 flex flex-col border-l-4 border-[#D6C6A5] shadow-sm"
              >
                <p className="text-navy text-base leading-relaxed flex-1 mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-4 border-t border-sand/40">
                  <p className="font-semibold text-navy text-sm">{t.author}</p>
                  <p className="text-xs text-[#555] mt-0.5">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
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
                <p className="font-['Playfair_Display'] text-[#D6C6A5] text-4xl font-bold mb-4 leading-none">
                  {item.number}
                </p>
                <h3 className="font-heading font-semibold text-navy text-lg mb-2">{item.title}</h3>
                <p className="text-[#555] text-base leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Coming soon tournaments ── */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-navy mb-1">More tournaments coming</h2>
          <p className="text-[#555] text-sm mb-8">
            Sideline Scout is expanding sport by sport, venue by venue. Want your tournament added?{' '}
            <Link href="/team-booking" className="text-navy font-medium underline underline-offset-2 hover:text-[#1a2d47]">
              Request a tournament →
            </Link>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {COMING_SOON.map((t) => (
              <div key={t.name} className="opacity-50 rounded-2xl border border-border overflow-hidden bg-white shadow-sm" style={{ minHeight: 140 }}>
                <div className="bg-navy text-cream px-5 py-4">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-xs font-medium bg-white/20 text-white/90 border border-white/20 rounded-full px-2.5 py-0.5 shrink-0">
                      Coming Soon
                    </span>
                    <span className="text-xs font-medium bg-sand/30 text-sand rounded-full px-2.5 py-0.5 shrink-0">
                      {t.sport}
                    </span>
                  </div>
                  <p className="font-heading font-semibold text-base leading-snug">{t.name}</p>
                  <p className="text-sand/80 text-xs mt-1">{t.organizer}</p>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="flex items-center gap-1.5 text-[#555] text-xs">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {t.venue}{t.city ? ` · ${t.city}` : ''}
                  </div>
                  <p className="text-xs text-[#555]">{t.dates}</p>
                  <p className="text-xs text-[#999] italic">{t.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailCaptureSection />

      {/* ── Gear for Good ── */}
      <section className="bg-navy text-cream px-6 py-16">
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
      <section className="bg-cream px-6 py-16">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row gap-4 justify-between items-center">
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
