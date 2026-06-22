import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Tent, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'West Coast Showdown Tent & Chair Rental | Sideline Suites',
  description:
    'Rent a tournament sideline setup for West Coast Showdown 2026 at Twin Creeks Sports Complex, Sunnyvale CA. Canopies, chairs, and tables delivered to your field July 18–19.',
}

const PACKAGES = [
  {
    name: 'Family Sideline Kit',
    price: '$99/day',
    includes: ['2 folding chairs', 'Shade umbrella', 'Delivery to venue parking'],
  },
  {
    name: 'Team Basecamp',
    price: '$249/day',
    includes: ['10×10 pop-up canopy', '10 folding chairs', 'Folding table', 'Delivery to venue parking'],
    popular: true,
  },
  {
    name: 'Premium Team Suite',
    price: '$499/day',
    includes: ['Double canopy setup', '10+ folding chairs', 'Folding table', 'Priority field setup included', 'End-of-day full breakdown'],
  },
]

export default function WestCoastShowdownTentRentalPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-[#0E1A2B] text-cream px-6 pt-20 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest mb-3">Sideline Suites</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
            West Coast Showdown<br />Tent &amp; Chair Rental
          </h1>
          <p className="text-[#a0b4c8] text-lg mb-2">
            Twin Creeks Sports Complex · Sunnyvale, CA · July 18–19, 2026
          </p>
          <p className="text-[#a0b4c8] text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Canopies, chairs, and tables delivered to venue parking — ready when you arrive, packed up when it ends.
            Add Field Setup (+$40) to have gear carried directly to your assigned field.
          </p>
          <Link
            href="/t/west-coast-showdown-2026/gear"
            className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-base"
          >
            <Tent className="w-4 h-4" />
            Reserve a Setup →
          </Link>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">Choose your package</h2>
          <p className="text-[#555] text-center mb-10">No charge until we confirm availability.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.name}
                className={`rounded-2xl border bg-white p-6 flex flex-col ${
                  pkg.popular ? 'border-2 border-navy shadow-lg' : 'border-border'
                }`}
              >
                {pkg.popular && (
                  <span className="self-start text-xs font-semibold bg-[#D6C6A5] text-navy rounded-full px-3 py-1 mb-3">
                    Most Popular
                  </span>
                )}
                <h3 className="font-heading text-lg font-bold text-navy mb-1">{pkg.name}</h3>
                <p className="font-heading text-3xl font-bold text-navy mb-4">
                  {pkg.price}
                </p>
                <ul className="space-y-2 flex-1 mb-6">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-[#555]">
                      <Check className="w-3.5 h-3.5 text-[#D6C6A5] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/t/west-coast-showdown-2026/gear"
                  className="block text-center font-semibold rounded-full px-6 py-3 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-sm"
                >
                  Reserve →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the venue */}
      <section className="bg-[#0E1A2B] text-cream px-6 py-14">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-4">About Twin Creeks Sports Complex</h2>
          <p className="text-[#a0b4c8] text-base leading-relaxed mb-6">
            Twin Creeks Sports Complex in Sunnyvale, CA hosts some of the Bay Area&rsquo;s largest youth lacrosse tournaments.
            With multiple turf fields, limited shade, and busy parking on tournament weekends, having your sideline gear
            pre-staged and waiting is the difference between a stressful morning haul and an easy arrival.
          </p>
          <p className="text-[#a0b4c8] text-base leading-relaxed">
            West Coast Showdown 2026 runs July 18–19. Book early — setups are limited per field assignment.
          </p>
        </div>
      </section>

      {/* Scout callout */}
      <section className="bg-cream px-6 py-14">
        <div className="max-w-2xl mx-auto flex items-start gap-4 bg-sand/20 border border-sand/40 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-[#D6C6A5]" />
          </div>
          <div>
            <p className="font-semibold text-navy text-base mb-1">Powered by Sideline Scout</p>
            <p className="text-[#555] text-sm leading-relaxed mb-3">
              Every Sideline Suite reservation includes access to Scout — AI-powered tournament intel for
              Twin Creeks parking, shade spots, field maps, weather, and local team dinner recommendations.
            </p>
            <Link
              href="/t/west-coast-showdown-2026/scout"
              className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-navy/70 transition-colors"
            >
              Ask Scout about West Coast Showdown →
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-navy text-[#a0b4c8] text-xs text-center py-5 px-6">
        © {new Date().getFullYear()} Sideline Scout · Sideline Suites ·{' '}
        <a href="mailto:hello@sidelinescout.co" className="hover:text-cream transition-colors">
          hello@sidelinescout.co
        </a>
      </footer>
    </div>
  )
}
