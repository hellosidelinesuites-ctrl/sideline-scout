import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Tent, Users, Star, Check, Truck, ArrowRight, Shield, Zap,
  Cloud, Map, Utensils, MessageSquare, Hotel,
} from 'lucide-react'

const PACKAGES = [
  {
    id: 'family',
    name: 'Family Sideline Kit',
    price: 85,
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
    price: 195,
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
    price: 395,
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

const HOW_IT_WORKS = [
  { step: '1', label: 'Choose your package', detail: 'Pick the setup that fits your family or team. No charge until we confirm.' },
  { step: '2', label: 'We set it up at your field', detail: 'Gear is staged and ready before you arrive on game day.' },
  { step: '3', label: 'Enjoy the game', detail: 'We handle pickup when the tournament ends. Just walk away.' },
]

const WHATS_INCLUDED = [
  { Icon: Truck, title: 'Delivery to venue parking', body: 'We bring everything to venue parking. Add Field Setup (+$40) to have gear carried to your exact field and fully assembled.' },
  { Icon: Zap, title: 'Field-side setup', body: 'Canopy staked, chairs arranged, coolers stocked — ready before gates open.' },
  { Icon: ArrowRight, title: 'End-of-day pickup', body: 'We pack up and clear out after the final whistle. Nothing left for you to haul.' },
  { Icon: Check, title: 'Text confirmation', body: "You'll get a text when setup is complete and another when we've packed up." },
]

const FAQ = [
  {
    q: 'Is payment due now?',
    a: 'No. When you submit a reservation request, we confirm availability first. You\'ll only be charged after we confirm your package.',
  },
  {
    q: 'What if tents aren\'t allowed at the venue?',
    a: 'We check venue rules before confirming every reservation. If shade structures aren\'t permitted, we\'ll let you know and adjust your package.',
  },
  {
    q: 'What if the weather is bad?',
    a: 'We monitor forecasts and will advise on setup adjustments — such as swapping a canopy for windbreaks or moving gear to a sheltered spot.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. Cancel up to 48 hours before the tournament for a full refund. No questions asked.',
  },
]

export default function SuitesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-cream">

      {/* Hero */}
      <section className="relative bg-[#0E1A2B] text-cream px-6 pt-24 md:pt-32 pb-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/sideline-suites-1.png)' }}
        />
        <div className="absolute inset-0 bg-[#0E1A2B]/65" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <Badge className="mb-5 bg-[#D6C6A5] text-navy border-0 text-sm px-4 py-1">
            West Coast Showdown 2026 · Now Booking
          </Badge>
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Tournament sideline setups, delivered.
          </h1>
          <p className="text-[#a0b4c8] text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Chairs, shade, coolers, team tables, and game-day essentials — set up at the field before
            you arrive, packed up when you leave.
          </p>
          <Link
            href="/t/west-coast-showdown-2026/gear"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-base"
          >
            <Tent className="w-4 h-4" />
            Reserve a Setup
          </Link>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">Choose your package</h2>
          <p className="text-[#555] text-center mb-6">No charge until we confirm availability.</p>
          <div className="flex items-start justify-center gap-2 bg-navy/5 border border-navy/10 rounded-lg px-4 py-3 mb-8">
            <Truck className="w-4 h-4 text-navy shrink-0 mt-0.5" />
            <p className="text-sm font-medium text-navy">
              All packages include delivery to venue parking and end-of-day pickup.{' '}
              <span className="font-semibold">Add Field Setup (+$40)</span>
              <span className="font-normal text-[#555]"> to have gear carried to your field and assembled.</span>
            </p>
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
                {'headerImage' in pkg && pkg.headerImage ? (
                  <div className="relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={pkg.headerImage as string} alt={pkg.name} className="w-full h-[180px] object-cover" />
                    <div className="absolute inset-0 bg-navy/60 flex flex-col justify-end pb-4 px-4 text-center">
                      <Badge className="bg-[#D6C6A5] text-navy border-0 text-xs mb-1 self-center">{pkg.badge}</Badge>
                      <p className="font-heading text-xl text-cream font-bold leading-tight">{pkg.name}</p>
                      <p className="text-[#d0e0f0] text-xs mt-0.5">{pkg.bestFor}</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-navy px-6 pt-8 pb-6 flex flex-col items-center gap-3 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#1a2d47] flex items-center justify-center shrink-0">
                      <pkg.Icon className="w-8 h-8 text-[#D6C6A5]" />
                    </div>
                    <div>
                      <Badge className="bg-[#D6C6A5] text-navy border-0 text-xs mb-2">{pkg.badge}</Badge>
                      <p className="font-heading text-xl text-cream font-bold leading-tight">{pkg.name}</p>
                      <p className="text-[#a0b0c0] text-xs mt-1">{pkg.bestFor}</p>
                    </div>
                  </div>
                )}
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
                      <span className="text-sm font-normal text-[#555]">/weekend</span>
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
      </section>

      {/* How it works */}
      <section className="bg-[#0E1A2B] text-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-center mb-2">How it works</h2>
          <p className="text-[#a0b4c8] text-center mb-12">Three steps from signup to sideline.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {HOW_IT_WORKS.map((s, i) => (
              <div key={s.step} className="flex flex-col items-center gap-3 relative">
                <div className="w-10 h-10 rounded-full bg-[#D6C6A5] text-navy font-bold text-base flex items-center justify-center shrink-0">
                  {s.step}
                </div>
                <p className="font-semibold text-cream text-base">{s.label}</p>
                <p className="text-[#a0b4c8] text-sm leading-relaxed">{s.detail}</p>
                {i < 2 && (
                  <ArrowRight className="hidden sm:block absolute -right-4 top-3 w-4 h-4 text-[#D6C6A5]/50" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's included in every package */}
      <section className="bg-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">What&rsquo;s included in every package</h2>
          <p className="text-[#555] text-center mb-10">Every Sideline Suites order includes the same core service.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHATS_INCLUDED.map(({ Icon, title, body }) => (
              <div key={title} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div className="w-10 h-10 rounded-xl bg-navy/5 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-navy" />
                </div>
                <div>
                  <p className="font-semibold text-navy text-base mb-1">{title}</p>
                  <p className="text-[#555] text-sm leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Powered by Scout */}
      <section className="bg-[#0E1A2B] text-cream px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4 text-[#D6C6A5]" />
            <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest">Powered by Sideline Scout</p>
          </div>
          <h2 className="font-heading text-3xl font-bold text-center mb-3">More than gear — we know your venue.</h2>
          <p className="text-[#a0b4c8] text-center text-base mb-12 max-w-xl mx-auto">
            Sideline Scout layers AI-powered local intel on top of every reservation so your team arrives informed, not guessing.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                Icon: Cloud,
                title: 'Weather intel',
                body: 'Scout monitors forecasts and advises on setup adjustments before your confirmation is sent.',
              },
              {
                Icon: Map,
                title: 'Venue knowledge',
                body: 'Field maps, prime shade spots, parking entrances, and gate timing — specific to your venue.',
              },
              {
                Icon: Utensils,
                title: 'Local recommendations',
                body: 'Team dinners, grocery runs, coffee stops, and family-friendly spots near the complex.',
              },
            ].map(({ Icon, title, body }) => (
              <div key={title} className="flex flex-col items-center text-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="w-10 h-10 rounded-xl bg-[#D6C6A5]/10 flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-[#D6C6A5]" />
                </div>
                <p className="font-semibold text-cream text-base">{title}</p>
                <p className="text-[#a0b4c8] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/t/west-coast-showdown-2026/scout"
              className="inline-flex items-center gap-2 font-semibold rounded-full px-7 py-3 border border-[#D6C6A5]/40 text-[#D6C6A5] hover:bg-white/5 transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Ask Scout about your venue →
            </Link>
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="bg-sand/15 border-y border-sand/40 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-semibold text-[#555] uppercase tracking-widest mb-4 text-center">Optional add-ons</p>
          <div className="max-w-xl mx-auto flex flex-col gap-2">
            <div className="flex items-start gap-3 px-4 py-3.5 rounded-xl border-2 border-navy bg-navy/5 text-sm text-navy">
              <Zap className="w-4 h-4 text-navy shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Field Setup</span>
                <span className="font-semibold text-navy"> +$40</span>
                <span className="text-[#555]"> — We carry gear to your field and set up before you arrive. Most customers add this.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-sand/50 bg-white text-sm text-navy">
              <Hotel className="w-3.5 h-3.5 text-navy shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Hotel Delivery</span>
                <span className="text-[#555] font-normal"> +$25</span>
                <span className="text-[#555]"> — Gear delivered to your hotel the night before.</span>
              </div>
            </div>
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-sand/50 bg-white text-sm text-navy">
              <Shield className="w-3.5 h-3.5 text-navy shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Gear Protection</span>
                <span className="text-[#555] font-normal"> +$10</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-10">Common questions</h2>
          <div className="space-y-6">
            {FAQ.map(({ q, a }) => (
              <div key={q} className="border-b border-border pb-6 last:border-0 last:pb-0">
                <p className="font-semibold text-navy text-base mb-2">{q}</p>
                <p className="text-[#555] text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Provider CTA */}
      <section className="bg-navy text-cream px-6 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest mb-3">For Gear Owners</p>
          <h2 className="font-heading text-3xl font-bold mb-4">Earn by renting your sideline gear</h2>
          <p className="text-[#a0b4c8] text-base leading-relaxed mb-8">
            Join our network of approved Providers and earn 82% on every rental. We handle bookings,
            payments, and protection — you deliver and earn.
          </p>
          <Button asChild size="lg" className="bg-[#D6C6A5] text-navy hover:bg-[#c4b48f] font-semibold rounded-full px-8">
            <Link href="/host">Become a Provider</Link>
          </Button>
        </div>
      </section>

      <footer className="bg-navy border-t border-white/5 text-steel text-xs text-center py-5 px-6">
        © {new Date().getFullYear()} Sideline Scout · Sideline Suites{' '}
        <span className="mx-1">·</span>
        <a href="mailto:hello@sidelinescout.co" className="hover:text-cream transition-colors">
          hello@sidelinescout.co
        </a>
      </footer>
    </div>
  )
}
