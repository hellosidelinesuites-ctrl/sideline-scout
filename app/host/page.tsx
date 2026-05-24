'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle2, DollarSign, Package, CalendarCheck, ArrowDown } from 'lucide-react'

const GEAR_OPTIONS = [
  { id: 'tent_canopy', label: 'Tent / Canopy' },
  { id: 'wagon', label: 'Wagon' },
  { id: 'chairs', label: 'Folding Chairs' },
  { id: 'cooler', label: 'Cooler' },
  { id: 'fan', label: 'Portable Fan' },
  { id: 'other', label: 'Other' },
]

const PAYOUT_RATE = 0.82
const AVG_RATE_PER_ITEM = 50 // blended avg $/item/weekend

function EarningsCalculator() {
  const [items, setItems] = useState(8)
  const [weekends, setWeekends] = useState(2)

  const monthly = Math.round(items * AVG_RATE_PER_ITEM * weekends * PAYOUT_RATE)

  return (
    <section className="bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-3 text-center">
          Earnings Calculator
        </p>
        <h2 className="font-heading text-4xl font-bold text-navy text-center mb-2">
          How much could you earn?
        </h2>
        <p className="text-steel text-center mb-12">
          Adjust the sliders to estimate your monthly payout at {Math.round(PAYOUT_RATE * 100)}%.
        </p>

        <div className="bg-cream rounded-2xl p-8 space-y-8">
          {/* Items slider */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-navy font-medium">Number of gear items</Label>
              <span className="font-heading text-2xl font-bold text-navy">{items}</span>
            </div>
            <input
              type="range"
              min={1}
              max={20}
              value={items}
              onChange={(e) => setItems(Number(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-steel mt-1">
              <span>1 item</span>
              <span>20 items</span>
            </div>
          </div>

          {/* Weekends slider */}
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-navy font-medium">Tournament weekends per month</Label>
              <span className="font-heading text-2xl font-bold text-navy">{weekends}</span>
            </div>
            <input
              type="range"
              min={1}
              max={4}
              value={weekends}
              onChange={(e) => setWeekends(Number(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-steel mt-1">
              <span>1 weekend</span>
              <span>4 weekends</span>
            </div>
          </div>

          {/* Output */}
          <div className="bg-navy rounded-xl p-6 text-center">
            <p className="text-steel text-sm mb-1">Estimated monthly earnings</p>
            <p className="font-heading text-6xl font-bold text-cream mb-1">
              ${monthly.toLocaleString()}
            </p>
            <p className="text-sand text-sm">
              {items} items × {weekends} weekend{weekends > 1 ? 's' : ''} × ${AVG_RATE_PER_ITEM} avg × {Math.round(PAYOUT_RATE * 100)}% payout
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function HostPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [gear, setGear] = useState<string[]>([])

  function toggleGear(id: string) {
    setGear((prev) => prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id])
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = { ...Object.fromEntries(new FormData(form)), gear: gear.join(', ') }

    try {
      const res = await fetch('/api/host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="bg-navy text-cream px-6 py-24 md:py-32 text-center relative overflow-hidden">
        {/* subtle texture */}
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,#D6C6A5,transparent_60%),radial-gradient(circle_at_70%_80%,#D6C6A5,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-6">
            Sideline Suites · Provider Program
          </p>
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Earn $400–800<br />per tournament weekend
          </h1>
          <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-10">
            Turn your sideline gear into income. We handle bookings, payments, and insurance — you deliver and earn.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-sand text-navy hover:bg-sand/90 font-semibold text-base px-8 py-6 rounded-full"
          >
            <a href="#apply">
              Apply to become a Provider
            </a>
          </Button>
          <p className="text-steel text-sm mt-4">Free to join · No commitment</p>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-steel animate-bounce">
          <ArrowDown className="w-5 h-5" />
        </div>
      </section>

      {/* Trust signals */}
      <section className="bg-sand/30 border-y border-sand/50 px-6 py-6">
        <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-1">
            <DollarSign className="w-5 h-5 text-navy mb-1" />
            <p className="font-semibold text-navy text-sm">82% payout on every rental</p>
            <p className="text-steel text-xs">Among the highest in the category</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Package className="w-5 h-5 text-navy mb-1" />
            <p className="font-semibold text-navy text-sm">We handle payments</p>
            <p className="text-steel text-xs">Stripe payouts, no invoicing needed</p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <CalendarCheck className="w-5 h-5 text-navy mb-1" />
            <p className="font-semibold text-navy text-sm">Provider community</p>
            <p className="text-steel text-xs">Support, tips, and early access</p>
          </div>
        </div>
      </section>

      {/* Earnings Calculator */}
      <EarningsCalculator />

      {/* How it works */}
      <section className="bg-cream px-6 py-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-3 text-center">
            How it works
          </p>
          <h2 className="font-heading text-4xl font-bold text-navy text-center mb-14">
            Simple from day one
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'List your gear',
                body: 'Tell us what you have — canopy, wagon, chairs, cooler, fan. We create your Provider profile and list your setup.',
              },
              {
                step: '02',
                title: 'We handle bookings',
                body: 'Families rent directly through Sideline Suites. We manage scheduling, payments, and a rental agreement on your behalf.',
              },
              {
                step: '03',
                title: 'You deliver and earn',
                body: 'Drop gear at the venue on tournament morning. Pick it up when it ends. Payout hits your account within 2 business days.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-5">
                <span className="font-heading text-5xl font-bold text-sand/70 leading-none shrink-0">
                  {item.step}
                </span>
                <div>
                  <h3 className="font-semibold text-navy text-lg mb-2">{item.title}</h3>
                  <p className="text-steel text-sm leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signup form */}
      <section id="apply" className="bg-navy px-6 py-20">
        <div className="max-w-xl mx-auto">
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-3 text-center">
            Apply Now
          </p>
          <h2 className="font-heading text-4xl font-bold text-cream text-center mb-3">
            Become a Provider
          </h2>
          <p className="text-steel text-center mb-10">
            We review every application and follow up within 2 business days.
          </p>

          {submitted ? (
            <div className="bg-navy border border-sand/30 rounded-2xl p-12 text-center">
              <CheckCircle2 className="w-12 h-12 text-sand mx-auto mb-4" />
              <h3 className="font-heading text-2xl font-semibold text-cream mb-2">
                Application received
              </h3>
              <p className="text-steel">
                We'll reach out within 2 business days to get you set up.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-steel text-sm">Full name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Smith"
                    required
                    className="bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-steel text-sm">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                    className="bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand"
                  />
                </div>
              </div>

              {/* Phone + City/State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-steel text-sm">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(555) 555-5555"
                    required
                    className="bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location" className="text-steel text-sm">City, State</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Sunnyvale, CA"
                    required
                    className="bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand"
                  />
                </div>
              </div>

              {/* Gear checkboxes */}
              <div className="space-y-2">
                <Label className="text-steel text-sm">What gear do you own?</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GEAR_OPTIONS.map((option) => {
                    const checked = gear.includes(option.id)
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => toggleGear(option.id)}
                        className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors text-left
                          ${checked
                            ? 'bg-sand text-navy border-sand'
                            : 'bg-white/5 text-steel border-white/10 hover:border-sand/50 hover:text-cream'
                          }`}
                      >
                        {checked && <span className="mr-1.5">✓</span>}
                        {option.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-steel text-sm">
                  Anything else? (optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Quantity of items, which tournaments you're near, questions..."
                  rows={3}
                  className="bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand resize-none"
                />
              </div>

              <Button
                type="submit"
                disabled={loading || gear.length === 0}
                className="w-full bg-sand text-navy hover:bg-sand/90 font-semibold text-base py-6 rounded-xl disabled:opacity-40"
              >
                {loading ? 'Submitting…' : 'Apply to become a Provider'}
              </Button>
              <p className="text-steel/60 text-xs text-center">
                Select at least one gear item to apply.
              </p>
            </form>
          )}
        </div>
      </section>

      <footer className="bg-navy border-t border-white/5 text-steel text-xs text-center py-5 px-6">
        © {new Date().getFullYear()} Sideline Scout · Sideline Suites Provider Program
      </footer>
    </div>
  )
}
