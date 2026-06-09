'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { CheckCircle2, DollarSign, Package, Shield, ArrowRight } from 'lucide-react'

const GEAR_OPTIONS = [
  { id: 'tent_canopy', label: 'Tent / Canopy' },
  { id: 'wagon', label: 'Wagon' },
  { id: 'chairs', label: 'Folding Chairs' },
  { id: 'cooler', label: 'Cooler' },
  { id: 'fan', label: 'Portable Fan' },
  { id: 'other', label: 'Other' },
]

const PAYOUT_RATE = 0.82
const AVG_RATE_PER_ITEM = 50

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
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-navy font-medium">Number of gear items</Label>
              <span className="font-heading text-2xl font-bold text-navy">{items}</span>
            </div>
            <input
              type="range" min={1} max={20} value={items}
              onChange={(e) => setItems(Number(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-steel mt-1">
              <span>1 item</span><span>20 items</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <Label className="text-navy font-medium">Tournament weekends per month</Label>
              <span className="font-heading text-2xl font-bold text-navy">{weekends}</span>
            </div>
            <input
              type="range" min={1} max={4} value={weekends}
              onChange={(e) => setWeekends(Number(e.target.value))}
              className="w-full accent-navy h-2 rounded-full"
            />
            <div className="flex justify-between text-xs text-steel mt-1">
              <span>1 weekend</span><span>4 weekends</span>
            </div>
          </div>
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

// ── 3-step wizard form ──────────────────────────────────────────────

interface FormData {
  name: string
  email: string
  phone: string
  location: string
  gear: string[]
  message: string
}

function ProviderForm() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<FormData>({
    name: '', email: '', phone: '', location: '', gear: [], message: '',
  })

  function set(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  function toggleGear(id: string) {
    setData((prev) => ({
      ...prev,
      gear: prev.gear.includes(id) ? prev.gear.filter((g) => g !== id) : [...prev.gear, id],
    }))
  }

  function next() { setStep((s) => s + 1) }
  function back() { setStep((s) => s - 1) }

  async function submit() {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/host', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, gear: data.gear.join(', ') }),
      })
      const json = await res.json()
      if (res.ok && json.success) {
        setSubmitted(true)
      } else {
        setError(json.error ?? 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error — please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = 'bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand'

  if (submitted) {
    return (
      <div className="bg-navy border border-sand/30 rounded-2xl p-12 text-center">
        <CheckCircle2 className="w-12 h-12 text-sand mx-auto mb-4" />
        <h3 className="font-heading text-2xl font-semibold text-cream mb-2">Application received</h3>
        <p className="text-steel">We'll reach out within 2 business days to get you set up.</p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex items-center gap-3 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 transition-colors
              ${n < step ? 'bg-sand text-navy' : n === step ? 'bg-sand text-navy ring-2 ring-sand/40 ring-offset-2 ring-offset-navy' : 'bg-white/10 text-steel'}`}>
              {n < step ? <CheckCircle2 className="w-4 h-4" /> : n}
            </div>
            <span className={`text-xs font-medium hidden sm:block ${n === step ? 'text-cream' : 'text-steel'}`}>
              {n === 1 ? 'Contact' : n === 2 ? 'Your Gear' : 'Notes'}
            </span>
            {n < 3 && <div className={`flex-1 h-px ${n < step ? 'bg-sand/60' : 'bg-white/10'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Contact */}
      {step === 1 && (
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-steel text-sm">Full name</Label>
            <Input id="name" value={data.name} onChange={(e) => set('name', e.target.value)}
              placeholder="Jane Smith" required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-steel text-sm">Email</Label>
            <Input id="email" type="email" value={data.email} onChange={(e) => set('email', e.target.value)}
              placeholder="jane@example.com" required className={inputClass} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone" className="text-steel text-sm">Phone</Label>
            <Input id="phone" type="tel" value={data.phone} onChange={(e) => set('phone', e.target.value)}
              placeholder="(555) 555-5555" className={inputClass} />
          </div>
          <Button
            type="button"
            disabled={!data.name || !data.email}
            onClick={next}
            className="w-full bg-sand text-navy hover:bg-sand/90 font-semibold text-base py-6 rounded-xl disabled:opacity-40"
          >
            Next <ArrowRight className="w-4 h-4 ml-1.5 inline" />
          </Button>
        </div>
      )}

      {/* Step 2: Location + Gear */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="location" className="text-steel text-sm">City, State</Label>
            <Input id="location" value={data.location} onChange={(e) => set('location', e.target.value)}
              placeholder="Sunnyvale, CA" required className={inputClass} />
          </div>
          <div className="space-y-2">
            <Label className="text-steel text-sm">What gear do you own?</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {GEAR_OPTIONS.map((option) => {
                const checked = data.gear.includes(option.id)
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => toggleGear(option.id)}
                    className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition-colors text-left
                      ${checked ? 'bg-sand text-navy border-sand' : 'bg-white/5 text-steel border-white/10 hover:border-sand/50 hover:text-cream'}`}
                  >
                    {checked && <span className="mr-1.5">✓</span>}
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={back}
              className="flex-1 border-white/10 text-steel hover:text-cream hover:bg-white/5 py-6 rounded-xl">
              Back
            </Button>
            <Button type="button" disabled={!data.location || data.gear.length === 0} onClick={next}
              className="flex-[2] bg-sand text-navy hover:bg-sand/90 font-semibold text-base py-6 rounded-xl disabled:opacity-40">
              Next <ArrowRight className="w-4 h-4 ml-1.5 inline" />
            </Button>
          </div>
          <p className="text-steel/60 text-xs text-center">Select at least one gear item to continue.</p>
        </div>
      )}

      {/* Step 3: Notes + Submit */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label htmlFor="message" className="text-steel text-sm">Anything else? (optional)</Label>
            <Textarea id="message" value={data.message} onChange={(e) => set('message', e.target.value)}
              placeholder="Quantity of items, which tournaments you're near, questions..."
              rows={4}
              className="bg-white/5 border-white/10 text-cream placeholder:text-steel/50 focus:border-sand resize-none" />
          </div>
          {error && (
            <p className="text-sm text-red-400 bg-red-900/20 border border-red-500/20 rounded-lg px-4 py-2.5">{error}</p>
          )}
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={back}
              className="flex-1 border-white/10 text-steel hover:text-cream hover:bg-white/5 py-6 rounded-xl">
              Back
            </Button>
            <Button type="button" disabled={loading} onClick={submit}
              className="flex-[2] bg-sand text-navy hover:bg-sand/90 font-semibold text-base py-6 rounded-xl disabled:opacity-40">
              {loading ? 'Submitting…' : 'Apply to become a Provider'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function HostPage() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero */}
      <section className="bg-navy text-cream px-6 py-24 md:py-32 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_30%_20%,#D6C6A5,transparent_60%),radial-gradient(circle_at_70%_80%,#D6C6A5,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-6">
            Sideline Suites · Provider Program
          </p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Earn Money Renting Sideline Gear at Youth Sports Tournaments
          </h1>
          <p className="text-steel text-lg md:text-xl max-w-xl mx-auto mb-4">
            Turn your canopy, chairs, and cooler into tournament income. We handle bookings, payments, and protection — you deliver and earn.
          </p>
          {/* Scarcity */}
          <p className="text-sand/80 text-sm mb-10 max-w-md mx-auto">
            We&rsquo;re currently accepting a limited number of Providers near tournament venues. Apply now to secure your spot for West Coast Showdown 2026.
          </p>
          <Button asChild size="lg"
            className="bg-sand text-navy hover:bg-sand/90 font-semibold text-base px-8 py-6 rounded-full">
            <a href="#apply">Apply to become a Provider</a>
          </Button>
          <p className="text-steel text-sm mt-4">Free to join · No commitment</p>
        </div>
      </section>

      {/* Trust signals strip */}
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
            <Shield className="w-5 h-5 text-navy mb-1" />
            <p className="font-semibold text-navy text-sm">Damage coverage included</p>
            <p className="text-steel text-xs">Every rental is protected</p>
          </div>
        </div>
      </section>

      {/* Insurance / protection callout */}
      <section className="bg-cream px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="bg-navy/5 border border-navy/15 rounded-2xl px-6 py-6 flex gap-4 items-start">
            <Shield className="w-6 h-6 text-navy shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-navy text-base mb-1">Every rental is covered.</p>
              <p className="text-[#444] text-sm leading-relaxed">
                Sideline Suites handles payment protection and provides damage coverage on all transactions. You deliver, we handle the rest.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Start earning in 3 steps */}
      <section className="bg-cream px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sand font-semibold text-sm uppercase tracking-widest mb-3 text-center">
            How it works
          </p>
          <h2 className="font-heading text-4xl font-bold text-navy text-center mb-14">
            Start Earning in 3 Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                step: '01',
                title: 'Apply (2 min)',
                body: 'Tell us your name, what gear you own, and where you\'re located. Fast form, no commitment.',
              },
              {
                step: '02',
                title: 'Get approved and list your gear',
                body: 'We review your application and set up your Provider profile. You control your availability.',
              },
              {
                step: '03',
                title: 'Deliver and earn 82%',
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

      {/* Earnings Calculator */}
      <EarningsCalculator />

      {/* Application form */}
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
          <ProviderForm />
        </div>
      </section>

      <footer className="bg-navy border-t border-white/5 text-steel text-xs text-center py-5 px-6">
        © {new Date().getFullYear()} Sideline Scout · Sideline Suites Provider Program
      </footer>
    </div>
  )
}
