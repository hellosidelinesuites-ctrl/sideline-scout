import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Tent, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Bay Area Lacrosse Tournament Tent Rental | Sideline Suites',
  description:
    'Tent and chair rental for Bay Area lacrosse tournaments. Sideline Suites delivers canopies, chairs, and tables to your field — set up before you arrive, packed up at the end.',
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

export default function BayAreaLacrosseTentRentalPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-[#0E1A2B] text-cream px-6 pt-20 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest mb-3">Sideline Suites · Bay Area</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Bay Area Lacrosse<br />Tournament Tent Rental
          </h1>
          <p className="text-[#a0b4c8] text-lg mb-2">
            Serving tournaments across Sunnyvale, San Jose, and the greater Bay Area
          </p>
          <p className="text-[#a0b4c8] text-base max-w-xl mx-auto mb-8 leading-relaxed">
            Stop hauling gear across the parking lot. Sideline Suites delivers canopies, chairs,
            and tables to venue parking before your first game — packed up when the tournament ends.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/t/west-coast-showdown-2026/gear"
              className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 bg-[#D6C6A5] text-[#0E1A2B] hover:bg-[#c4b48f] transition-colors text-base"
            >
              <Tent className="w-4 h-4" />
              Reserve for West Coast Showdown →
            </Link>
            <Link
              href="/team-booking"
              className="inline-flex items-center gap-2 font-semibold rounded-full px-8 py-4 border border-white/25 text-cream hover:bg-white/10 transition-colors text-base"
            >
              Book for My Team
            </Link>
          </div>
        </div>
      </section>

      {/* Team math */}
      <section className="bg-sand/20 border-y border-sand/40 px-6 py-8 text-center">
        <p className="text-navy text-base font-medium">
          Team Basecamp at <span className="font-bold">$249/day</span> split across 15 families
          {' '}= <span className="font-bold text-navy">$17 per family.</span>
          {' '}One manager books. Every family benefits.
        </p>
      </section>

      {/* Packages */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">Sideline setup packages</h2>
          <p className="text-[#555] text-center mb-10">
            All packages include delivery to venue parking and end-of-day pickup. Add Field Setup (+$40) to have gear staged at your exact field.
          </p>
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
                <p className="font-heading text-3xl font-bold text-navy mb-4">{pkg.price}</p>
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

      {/* How it works */}
      <section className="bg-[#0E1A2B] text-cream px-6 py-14">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading text-2xl font-bold mb-10">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { n: '1', label: 'Reserve your package', detail: 'Choose a package and submit a request. No charge until we confirm.' },
              { n: '2', label: 'We deliver to the venue', detail: 'Gear arrives at venue parking before your first game.' },
              { n: '3', label: 'Walk away clean', detail: 'We handle full pickup after the final whistle. Nothing to haul.' },
            ].map((s) => (
              <div key={s.n} className="flex flex-col items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#D6C6A5] text-navy font-bold flex items-center justify-center shrink-0">
                  {s.n}
                </div>
                <p className="font-semibold text-cream">{s.label}</p>
                <p className="text-[#a0b4c8] text-sm leading-relaxed">{s.detail}</p>
              </div>
            ))}
          </div>
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
              Every reservation includes Scout — AI-powered local intel for parking, field maps, shade spots,
              weather, and team dinner spots at your specific venue.
            </p>
            <Link
              href="/t/west-coast-showdown-2026/scout"
              className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-navy/70 transition-colors"
            >
              Ask Scout about your tournament →
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
