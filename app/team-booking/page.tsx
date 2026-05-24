'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, Users } from 'lucide-react'

export default function TeamBookingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [teamSize, setTeamSize] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = { ...Object.fromEntries(new FormData(form)), team_size: teamSize }

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

  return (
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-sand" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-navy mb-2">Team Booking</h1>
          <p className="text-muted-foreground">
            Planning travel for the whole team? Let us coordinate hotel blocks, gear, and logistics.
          </p>
        </div>

        {submitted ? (
          <Card className="text-center py-12">
            <CardContent>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-semibold text-navy mb-2">Request received!</h2>
              <p className="text-muted-foreground">We'll reach out within 24 hours with options for your team.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-xl">Team Travel Request</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="manager_name">Team Manager Name</Label>
                    <Input id="manager_name" name="manager_name" placeholder="Coach Williams" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="team_name">Team / Club Name</Label>
                    <Input id="team_name" name="team_name" placeholder="ADVNC Lacrosse 2028" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Team Size</Label>
                    <Select onValueChange={(v) => setTeamSize(String(v ?? ''))} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select..." />
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
                    placeholder="West Coast Showdown, July 18-19"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="needs">What do you need help with?</Label>
                  <Textarea
                    id="needs"
                    name="needs"
                    placeholder="Hotel block, gear rentals for families, airport coordination..."
                    rows={4}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy text-cream hover:bg-navy/90"
                >
                  {loading ? 'Submitting...' : 'Request Team Package'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
