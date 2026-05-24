'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle2 } from 'lucide-react'

export default function HostPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

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
    <div className="min-h-screen bg-cream px-4 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-4xl font-bold text-navy mb-2">Become a Host</h1>
          <p className="text-muted-foreground">
            List your gear, earn money, and help tournament families have a better weekend.
          </p>
        </div>

        {submitted ? (
          <Card className="text-center py-12">
            <CardContent>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-semibold text-navy mb-2">You're on the list!</h2>
              <p className="text-muted-foreground">We'll reach out within 2 business days to get you set up.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-xl">Host Application</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="Jane Smith" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="jane@example.com" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone (optional)</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="(555) 555-5555" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tournament">Which tournament are you near?</Label>
                  <Input
                    id="tournament"
                    name="tournament"
                    placeholder="e.g. West Coast Showdown, Sunnyvale CA"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">What gear do you have to offer?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="10x10 canopy, 6 folding chairs, large cooler..."
                    rows={4}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy text-cream hover:bg-navy/90"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
