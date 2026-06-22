import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Tent, MessageSquare } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Twin Creeks Sports Complex Sideline Setup | Bay Area Youth Sports',
  description:
    'Sideline setup delivery at Twin Creeks Sports Complex, Sunnyvale CA. Canopies, chairs, and tables staged at your field for Bay Area youth lacrosse and soccer tournaments.',
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

export default function TwinCreeksSidelineSetupPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-[#0E1A2B] text-cream px-6 pt-20 pb-14 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#D6C6A5] font-semibold text-sm uppercase tracking-widest mb-3">Sideline Suites · Bay Area</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Twin Creeks Sports Complex<br />Sideline Setup Delivery
          </h1>
          <p className="text-[#a0b4c8] text-lg mb-2">
            Sunnyvale, CA · Youth Lacrosse &amp; Soccer Tournaments
          </p>
          <p className="text-[#a0b4c8] text-base max-w-xl mx-auto mb-8 leading-relaxed">
            We deliver canopies, chairs, and tables to venue parking at Twin Creeks — ready when your team
            arrives, packed up after the final whistle. Add Field Setup (+$40) to have everything
            carried to your exact field assignment.
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

      {/* Why Sideline Suites at Twin Creeks */}
      <section className="px-6 py-14">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-2xl font-bold text-navy mb-6 text-center">
            Why families use Sideline Suites at Twin Creeks
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { title: 'Limited shade', body: 'Twin Creeks turf fields get full afternoon sun. Your canopy is already up when you walk on.' },
              { title: 'Crowded parking', body: 'No need to haul chairs across the lot. Gear is staged at the field — just walk in.' },
              { title: 'Multi-day tournaments', body: 'We reset your setup each morning and break it down at the end of the final day.' },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white rounded-2xl p-5 border border-border shadow-sm">
                <p className="font-semibold text-navy text-base mb-2">{title}</p>
                <p className="text-[#555] text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="bg-sand/10 px-6 py-14">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-navy text-center mb-2">Packages</h2>
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

      {/* Scout callout */}
      <section className="bg-cream px-6 py-14">
        <div className="max-w-2xl mx-auto flex items-start gap-4 bg-sand/20 border border-sand/40 rounded-2xl p-6">
          <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5 text-[#D6C6A5]" />
          </div>
          <div>
            <p className="font-semibold text-navy text-base mb-1">Ask Scout about Twin Creeks</p>
            <p className="text-[#555] text-sm leading-relaxed mb-3">
              Scout knows Twin Creeks inside and out — parking entrances, field maps, shade spots,
              nearby restaurants for team dinners, and weather forecasts for your tournament weekend.
            </p>
            <Link
              href="/t/west-coast-showdown-2026/scout"
              className="text-sm font-semibold text-navy underline underline-offset-2 hover:text-navy/70 transition-colors"
            >
              Ask Scout →
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
