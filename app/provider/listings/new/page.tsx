'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, CheckCircle2 } from 'lucide-react'

const CATEGORIES = [
  'Tent / Canopy',
  'Wagon',
  'Folding Chairs',
  'Cooler',
  'Portable Fan',
  'Table',
  'Other',
]

export default function NewListingPage() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    // Demo: no API call yet
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-navy text-cream px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <Link
            href="/provider/dashboard"
            className="text-steel hover:text-cream transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <p className="text-xs text-steel uppercase tracking-widest mb-0.5">Sideline Suites</p>
            <h1 className="font-heading text-xl font-bold">Add New Listing</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">
        {submitted ? (
          <Card className="border-0 shadow-sm text-center py-14">
            <CardContent>
              <CheckCircle2 className="w-12 h-12 text-sand mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold text-navy mb-2">Listing added</h2>
              <p className="text-muted-foreground mb-6">Your gear is now visible to renters.</p>
              <Button asChild className="bg-navy text-cream hover:bg-navy/90">
                <Link href="/provider/dashboard">Back to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="font-heading text-xl text-navy">Gear details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="title">Item name</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. 10×10 Pop-Up Canopy"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="price_per_day">Price per day ($)</Label>
                    <Input
                      id="price_per_day"
                      name="price_per_day"
                      type="number"
                      min={1}
                      step={0.01}
                      placeholder="45.00"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="quantity">Quantity available</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min={1}
                      placeholder="1"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Condition, brand, what's included..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link href="/provider/dashboard">Cancel</Link>
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading || !category}
                    className="flex-1 bg-navy text-cream hover:bg-navy/90 disabled:opacity-40"
                  >
                    {loading ? 'Saving…' : 'Save Listing'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}
