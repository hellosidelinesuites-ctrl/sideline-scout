'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, ShoppingBag, Star, Hotel } from 'lucide-react'

const OFFERS = [
  {
    id: 'basecamp',
    icon: ShoppingBag,
    name: 'Team Basecamp',
    price: '$350',
    tagline: 'Most popular',
    description: 'Canopy, chairs, coolers, and a folding table — delivered and set up at your field before the opening whistle.',
    includes: [
      '10×10 pop-up canopy',
      '10 folding chairs',
      '2 large coolers',
      'Folding table',
      'Setup before gates open',
      'Pickup after the tournament',
    ],
    highlight: true,
  },
  {
    id: 'premium',
    icon: Star,
    name: 'Premium Team Suite',
    price: '$750',
    tagline: 'White glove',
    description: 'Everything in Team Basecamp plus snacks, drinks, and priority setup at your assigned field.',
    includes: [
      'Everything in Team Basecamp',
      'Snacks & drinks for players',
      'Priority setup at your field',
      'End-of-day full breakdown',
    ],
  },
  {
    id: 'concierge',
    icon: Hotel,
    name: 'Full Weekend Concierge',
    price: 'Contact us',
    tagline: 'All-in',
    description: 'Sideline Suites + hotel block coordination + a Scout briefing sent to every family on your roster.',
    includes: [
      'Sideline suite delivery and setup',
      'Team hotel block coordination',
      'Scout briefing for all families',
      'Priority support all weekend',
    ],
  },
]

function TeamBookingContent() {
  const searchParams = useSearchParams()
  const packageParam = searchParams.get('package') ?? ''
  const requestType = searchParams.get('type') ?? ''

  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [teamSize, setTeamSize] = useState('')
  const [selectedPackage, setSelectedPackage] = useState(packageParam)

  // Map gear page package IDs to offer IDs
  useEffect(() => {
    const map: Record<string, string> = { family: 'basecamp', basecamp: 'basecamp', premium: 'premium' }
    if (packageParam && map[packageParam]) setSelectedPackage(map[packageParam])
  }, [packageParam])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = {
      ...Object.fromEntries(new FormData(form)),
      team_size: teamSize,
      package: selectedPackage,
      request_type: requestType,
    }

    try {
      const res = await fetch('/api/team-booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <CheckCircle2 className="w-14 h-14 text-green-500 mx-auto mb-5" />
          <h2 className="font-heading text-3xl font-bold text-navy mb-3">Request received!</h2>
          <p className="text-[#555] text-base leading-relaxed">
            We&rsquo;ll reach out within 24 hours to confirm your setup and get the details sorted.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <section className="bg-navy text-cream px-6 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Team managers, stop hauling<br className="hidden sm:block" /> the whole sideline.
          </h1>
          <p className="text-steel text-lg max-w-xl mx-auto">
            One request. We handle chairs, shade, coolers, tables, and setup for your whole team.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* Offer cards */}
        <div>
          <p className="text-sm font-semibold text-[#555] uppercase tracking-widest text-center mb-6">
            Choose your package
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {OFFERS.map((offer) => {
              const Icon = offer.icon
              const active = selectedPackage === offer.id
              return (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => setSelectedPackage(offer.id)}
                  className={`text-left rounded-2xl border-2 p-5 transition-all ${
                    active
                      ? 'border-navy bg-white shadow-md'
                      : 'border-border bg-white hover:border-navy/40 hover:shadow-sm'
                  } ${offer.highlight && !active ? 'border-sand/60' : ''}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${active ? 'bg-navy' : 'bg-navy/8'}`}>
                      <Icon className={`w-4 h-4 ${active ? 'text-sand' : 'text-navy'}`} />
                    </div>
                    {offer.highlight && (
                      <span className="text-xs font-semibold bg-sand text-navy rounded-full px-2.5 py-1">
                        Most Popular
                      </span>
                    )}
                  </div>
                  <p className="font-heading font-bold text-navy text-lg leading-tight mb-0.5">{offer.name}</p>
                  <p className="font-heading text-2xl font-bold text-navy mb-1">{offer.price}</p>
                  <p className="text-xs text-[#555] mb-3">{offer.description}</p>
                  <ul className="space-y-1.5">
                    {offer.includes.map((item) => (
                      <li key={item} className="flex items-start gap-1.5 text-xs text-[#555]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-navy shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {active && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs font-semibold text-navy">✓ Selected</p>
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Form */}
        <Card className="border-0 shadow-sm">
          <CardContent className="pt-6">
            <p className="font-heading text-xl font-bold text-navy mb-5">Tell us about your team</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="manager_name">Team Manager Name</Label>
                  <Input id="manager_name" name="manager_name" placeholder="Coach Williams" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="coach@club.com" required />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="team_name">Team / Club Name</Label>
                  <Input id="team_name" name="team_name" placeholder="ADVNC Lacrosse 2028" required />
                </div>
                <div className="space-y-1.5">
                  <Label>Team Size</Label>
                  <Select onValueChange={(v) => setTeamSize(String(v ?? ''))} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Number of families..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under_10">Under 10 families</SelectItem>
                      <SelectItem value="10_20">10–20 families</SelectItem>
                      <SelectItem value="20_30">20–30 families</SelectItem>
                      <SelectItem value="30_plus">30+ families</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="tournament">Tournament</Label>
                <Input
                  id="tournament"
                  name="tournament"
                  placeholder="West Coast Showdown, July 18–19"
                  defaultValue="West Coast Showdown, July 18–19"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label>Package</Label>
                <Select
                  value={selectedPackage}
                  onValueChange={(v) => v && setSelectedPackage(v)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a package above or choose here..." />
                  </SelectTrigger>
                  <SelectContent>
                    {OFFERS.map((o) => (
                      <SelectItem key={o.id} value={o.id}>
                        {o.name} — {o.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="needs">Anything else we should know? (optional)</Label>
                <Textarea
                  id="needs"
                  name="needs"
                  placeholder="Special requests, field numbers, arrival times..."
                  rows={3}
                  className="resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={loading || !selectedPackage || !teamSize}
                className="w-full bg-navy text-cream font-semibold rounded-full py-6 text-base hover:bg-[#1a2d47] transition-colors disabled:opacity-40"
              >
                {loading ? 'Submitting…' : 'Request Team Setup'}
              </Button>
              <p className="text-xs text-center text-[#555]">
                No charge yet — we confirm availability within 24 hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function TeamBookingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <TeamBookingContent />
    </Suspense>
  )
}
