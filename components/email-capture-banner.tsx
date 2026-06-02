'use client'

import { useState, useEffect } from 'react'
import { X, Send, CheckCircle2 } from 'lucide-react'

interface Props {
  tournamentSlug: string
  tournamentName: string
}

export default function EmailCaptureBanner({ tournamentSlug, tournamentName }: Props) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Don't show if already dismissed this session
    if (sessionStorage.getItem(`email-banner-${tournamentSlug}`)) return

    const timer = setTimeout(() => setVisible(true), 30000)

    function handleScroll() {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0 && window.scrollY / total >= 0.6) setVisible(true)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [tournamentSlug])

  function dismiss() {
    setDismissed(true)
    sessionStorage.setItem(`email-banner-${tournamentSlug}`, '1')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    try {
      await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, tournament_slug: tournamentSlug }),
      })
      setSubmitted(true)
      setTimeout(dismiss, 3000)
    } finally {
      setLoading(false)
    }
  }

  if (!visible || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy border-t border-white/10 px-4 py-4 shadow-2xl">
      <div className="max-w-2xl mx-auto flex items-center gap-4 flex-wrap sm:flex-nowrap">
        {submitted ? (
          <div className="flex items-center gap-2 text-cream flex-1">
            <CheckCircle2 className="w-5 h-5 text-sand shrink-0" />
            <p className="text-sm font-medium">You&rsquo;re in — WCS updates coming to your inbox.</p>
          </div>
        ) : (
          <>
            <p className="text-cream text-sm font-medium shrink-0 hidden sm:block">
              Get {tournamentName} weekend updates sent to your team.
            </p>
            <p className="text-cream text-sm font-medium sm:hidden w-full">
              Get WCS weekend updates sent to your team.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2 flex-1 min-w-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="flex-1 min-w-0 rounded-full px-4 py-2 text-sm bg-white/10 border border-white/20 text-cream placeholder:text-steel focus:outline-none focus:border-sand"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-1.5 bg-sand text-navy font-semibold text-sm rounded-full px-5 py-2 hover:bg-[#c4b48f] transition-colors shrink-0 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send to my team</span>
                <span className="sm:hidden">Send</span>
              </button>
            </form>
          </>
        )}
        <button
          onClick={dismiss}
          className="text-steel hover:text-cream transition-colors shrink-0 ml-auto sm:ml-0"
          aria-label="Dismiss"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
