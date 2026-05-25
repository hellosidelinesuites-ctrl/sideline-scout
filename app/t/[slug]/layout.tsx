import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { MessageSquare, Hotel, ShoppingBag, Home } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: tournament } = await supabase
    .from('tournaments')
    .select('name, organizer')
    .eq('slug', slug)
    .single()

  if (!tournament) return { title: 'Tournament — Sideline Scout' }
  return { title: `${tournament.name} — Sideline Scout` }
}

export default async function TournamentLayout({ children, params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: tournament } = await supabase
    .from('tournaments')
    .select('id, name, organizer, start_date, end_date, venues(city, state)')
    .eq('slug', slug)
    .single()

  if (!tournament) notFound()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const venue = (tournament.venues as any) as { city: string; state: string } | null

  const navLinks = [
    { href: `/t/${slug}/scout`, label: 'Scout', icon: MessageSquare },
    { href: `/t/${slug}/hotels`, label: 'Hotels', icon: Hotel },
    { href: `/t/${slug}/gear`, label: 'Gear', icon: ShoppingBag },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Tournament header */}
      <header className="bg-navy text-cream">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" className="flex items-center gap-2 text-sand hover:text-cream transition-colors text-sm">
            <Home className="w-4 h-4" />
            Sideline Scout
          </Link>
          <div className="text-center flex-1">
            <p className="font-heading font-semibold text-base leading-tight">{tournament.name}</p>
            {venue && (
              <p className="text-steel text-xs">{venue.city}, {venue.state}</p>
            )}
          </div>
          <div className="text-right text-xs text-steel hidden sm:block">
            {new Date(tournament.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}–
            {new Date(tournament.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Sub-nav */}
        <nav className="border-t border-white/10">
          <div className="max-w-5xl mx-auto px-4 flex gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-steel hover:text-cream transition-colors border-b-2 border-transparent hover:border-sand"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-navy text-steel text-xs text-center py-4 px-4 leading-relaxed">
        Sideline Scout · Built by a lacrosse family · Gear for Good program
        {' · '}
        <a href="mailto:hello@sidelinescout.com" className="hover:text-cream transition-colors">
          hello@sidelinescout.com
        </a>
        {' · '}
        <Link href="/feedback" className="hover:text-cream transition-colors">Submit a tip</Link>
      </footer>
    </div>
  )
}
