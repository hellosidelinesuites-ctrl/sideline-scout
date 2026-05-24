'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CheckCircle2, Lightbulb } from 'lucide-react'

const CATEGORIES = [
  'Hotels',
  'Parking',
  'Food & Restaurants',
  'Tent Setup',
  'Gear',
  'Weather',
  'Getting There',
  'Other',
]

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const data = { ...Object.fromEntries(new FormData(form)), category }

    try {
      const res = await fetch('/api/feedback', {
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
            <Lightbulb className="w-6 h-6 text-sand" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-navy mb-2">Share a Tip</h1>
          <p className="text-muted-foreground">
            Been to this tournament before? Help other families with what you know.
          </p>
        </div>

        {submitted ? (
          <Card className="text-center py-12">
            <CardContent>
              <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-semibold text-navy mb-2">Thanks for the tip!</h2>
              <p className="text-muted-foreground">We'll review it and add it to the guide if it's a good fit.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-xl">Submit a Parent Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="tournament_slug">Tournament</Label>
                  <Input
                    id="tournament_slug"
                    name="tournament_slug"
                    placeholder="e.g. West Coast Showdown 2026"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select onValueChange={(v) => setCategory(String(v ?? ''))} required>
                    <SelectTrigger>
                      <SelectValue placeholder="What's your tip about?" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="tip">Your Tip</Label>
                  <Textarea
                    id="tip"
                    name="tip"
                    placeholder="The shaded spots on Field 3 go fast — get there by 7:30am..."
                    rows={4}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="submitter_name">Your Name (optional)</Label>
                  <Input id="submitter_name" name="submitter_name" placeholder="Alex P." />
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-navy text-cream hover:bg-navy/90"
                >
                  {loading ? 'Submitting...' : 'Submit Tip'}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
