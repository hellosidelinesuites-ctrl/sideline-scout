'use client'

import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Send, Bot, User, Loader2, Share2, Check, Compass } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Message {
  role: 'user' | 'assistant'
  content: string
  tipCount?: number
}

const QUICK_QUESTIONS = [
  'What hotels are closest to the venue?',
  'Where should we eat after games?',
  'What should I bring for tent setup?',
  "What's the weather forecast?",
  'Where do I park?',
  'Nearest grocery store?',
]

const SAMPLE_QA = [
  {
    q: 'Where should we park for early games?',
    a: 'Arrive 30–45 minutes before warm-ups. Drop gear and family at the field entrance first, then go park — saves multiple trips. Main lots fill fast on peak mornings so early arrival helps. Wagons are allowed on all paved paths throughout the complex.',
  },
  {
    q: 'Where should our team eat dinner?',
    a: 'Top pick for teams: **Lazy Dog Restaurant & Bar** (1.2 mi) — spacious booths, kids menu, full bar. OpenTable reservations strongly recommended on weekends. **BJ\'s Brewhouse** (2.1 mi) is another solid group option with deep dish pizza and a huge menu. Both can handle large parties.',
  },
  {
    q: "What's the weather forecast for tournament weekend?",
    a: 'Forecast for July 18–19: highs of 88–91°F, sunny with less than 5% chance of rain. Bay breezes typically pick up in the afternoon. Bring sunscreen (reapply every 90 min on turf), cooling towels, and at least 1 gallon of water per person per day.',
  },
]

export default function ScoutPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const [slug, setSlug] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function handleShare() {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    params.then(({ slug }) => setSlug(slug))
  }, [params])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(question: string) {
    if (!question.trim() || loading) return
    const userMessage: Message = { role: 'user', content: question }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/scout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, question, history: messages }),
      })

      if (!res.ok) throw new Error('Scout error')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.answer, tipCount: data.tipCount ?? 0 }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "Sorry, I couldn't get an answer right now. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Empty state */}
      {messages.length === 0 && (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto px-4 pt-5 pb-6">
            {/* Compact header */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-sand" />
                </div>
                <div>
                  <h2 className="font-heading text-lg font-semibold text-navy leading-tight">Ask Scout</h2>
                  <p className="text-muted-foreground text-xs">
                    Real answers about this tournament — parking, food, weather, gear.
                  </p>
                </div>
              </div>
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-navy transition-colors shrink-0 border border-border rounded-full px-3 py-1.5"
              >
                {copied ? <Check className="w-3 h-3 text-green-600" /> : <Share2 className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Share'}
              </button>
            </div>

            {/* Trust bar */}
            <div className="bg-sand/20 border border-sand/40 rounded-lg px-4 py-2.5 mb-4">
              <p className="text-xs text-navy leading-snug">
                <span className="font-semibold">Verified intel only.</span>{' '}
                Answers grounded in venue data, parent tips, and real tournament knowledge — not generic search results.
              </p>
            </div>

            {/* Sample Q&A — always expanded */}
            <div className="space-y-3 mb-5">
              {SAMPLE_QA.map((item) => (
                <div key={item.q} className="rounded-xl border border-border bg-white overflow-hidden">
                  <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-border/60 bg-muted/40">
                    <div className="w-5 h-5 rounded-full bg-steel/20 flex items-center justify-center shrink-0">
                      <User className="w-2.5 h-2.5 text-steel" />
                    </div>
                    <span className="text-sm font-medium text-navy">{item.q}</span>
                  </div>
                  <div className="flex gap-2.5 px-4 py-3 border-l-2 border-l-sand ml-0">
                    <div className="w-6 h-6 rounded-full bg-navy flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-3 h-3 text-sand" />
                    </div>
                    <p className="text-base text-[#555] leading-relaxed">
                      {item.a.split(/\*\*(.+?)\*\*/).map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-semibold text-navy">{part}</strong> : part
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick question chips */}
            <p className="text-xs text-muted-foreground mb-2 font-medium">Or ask something else:</p>
            <div className="flex flex-wrap gap-2">
              {QUICK_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-navy text-cream hover:bg-[#1a2d47] transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Messages */}
      {messages.length > 0 && (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 max-w-3xl w-full mx-auto">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={cn('flex gap-3', msg.role === 'user' && 'justify-end')}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-sand" />
                </div>
              )}
              <div className="flex flex-col gap-1 max-w-[80%]">
                <div
                  className={cn(
                    'rounded-xl px-4 py-2.5 text-sm leading-relaxed',
                    msg.role === 'assistant'
                      ? 'bg-white border border-border text-foreground'
                      : 'bg-navy text-cream whitespace-pre-wrap'
                  )}
                >
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-navy underline underline-offset-2 hover:text-navy/70 transition-colors"
                          >
                            {children}
                          </a>
                        ),
                        p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5 space-y-0.5">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5 space-y-0.5">{children}</ol>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === 'assistant' && (
                  <p className="text-[10px] text-muted-foreground px-1">
                    Based on:{' '}
                    {(msg.tipCount ?? 0) > 0
                      ? <><span className="font-medium text-navy">{msg.tipCount} parent {msg.tipCount === 1 ? 'tip' : 'tips'}</span> + verified venue data</>
                      : 'verified venue data'
                    }
                  </p>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-steel flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-sand" />
              </div>
              <div className="bg-white border border-border rounded-xl px-4 py-2.5">
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Input */}
      <div className="border-t border-border bg-white px-4 py-3">
        <div className="max-w-3xl mx-auto flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about hotels, food, parking, gear..."
            rows={1}
            className="resize-none min-h-[40px] max-h-32"
          />
          <Button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            size="icon"
            className="bg-navy text-cream hover:bg-navy/90 shrink-0"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground text-center mt-2">
          Scout answers from verified tournament data only.
        </p>
      </div>
    </div>
  )
}
