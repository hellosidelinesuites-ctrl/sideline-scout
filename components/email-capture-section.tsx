'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function EmailCaptureSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tournament_slug: 'west-coast-showdown-2026' }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-sand/20 border-y border-sand/40 px-6 py-14">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
          Be the most prepared parent at WCS.
        </h2>
        <p className="text-[#555] text-base mb-8">
          Get the weekend guide sent to your inbox — parking, hotels, gear, and weather intel.
        </p>
        {submitted ? (
          <div className="flex items-center justify-center gap-2 text-navy">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-medium">You&rsquo;re on the list. Check your inbox before July 18.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 rounded-full px-5 py-3 text-sm border border-sand bg-white text-navy placeholder:text-[#aaa] focus:outline-none focus:border-navy"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 bg-navy text-cream font-semibold text-sm rounded-full px-7 py-3 hover:bg-[#1a2d47] transition-colors shrink-0 disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              {loading ? 'Sending…' : 'Get the WCS guide'}
            </button>
          </form>
          <p className="text-xs text-[#888] mt-3">No spam. Tournament intel only.</p>
        )}
      </div>
    </section>
  )
}
