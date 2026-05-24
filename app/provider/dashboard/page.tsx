import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  DollarSign,
  Clock,
  TrendingUp,
  Plus,
  CalendarDays,
  Package,
  CheckCircle2,
} from 'lucide-react'

// ─── Demo data ────────────────────────────────────────────────────────────────

const PROVIDER = {
  name: 'Sarah M.',
  location: 'Sunnyvale, CA',
  payoutBalance: 423.50,
}

const EARNINGS = {
  thisMonth: 847.00,
  pendingPayout: 423.50,
  lifetime: 3284.00,
}

const LISTINGS = [
  { id: '1', name: '10×10 Pop-Up Canopy', pricePerWeekend: 90, status: 'rented' as const },
  { id: '2', name: 'Folding Wagon',        pricePerWeekend: 40, status: 'available' as const },
  { id: '3', name: 'Folding Chairs (×6)',  pricePerWeekend: 30, status: 'rented' as const },
]

const BOOKINGS = [
  {
    id: '1',
    renter: 'The Chen Family',
    gear: '10×10 Pop-Up Canopy + Folding Chairs (×6)',
    dates: 'Jul 18–19, 2026',
    tournament: 'West Coast Showdown',
    payout: 98.40,
    status: 'confirmed' as const,
  },
  {
    id: '2',
    renter: 'Torres, M.',
    gear: '10×10 Pop-Up Canopy',
    dates: 'Jun 28–29, 2026',
    tournament: 'NorCal Classic',
    payout: 73.80,
    status: 'confirmed' as const,
  },
]

const PAYOUT_HISTORY = [
  { id: '1', date: 'Jun 2, 2026',  amount: 423.50, ref: 'PAY-0042' },
  { id: '2', date: 'May 5, 2026',  amount: 311.00, ref: 'PAY-0038' },
  { id: '3', date: 'Apr 7, 2026',  amount: 258.50, ref: 'PAY-0031' },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  icon: Icon,
  sub,
}: {
  label: string
  value: string
  icon: React.ElementType
  sub?: string
}) {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <p className="text-sm text-muted-foreground font-medium">{label}</p>
          <span className="p-2 bg-navy/5 rounded-lg">
            <Icon className="w-4 h-4 text-navy" />
          </span>
        </div>
        <p className="font-heading text-3xl font-bold text-navy">{value}</p>
        {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
      </CardContent>
    </Card>
  )
}

function StatusBadge({ status }: { status: 'available' | 'rented' }) {
  return status === 'rented' ? (
    <Badge className="bg-sand text-navy border-0 text-xs">Rented</Badge>
  ) : (
    <Badge variant="secondary" className="text-xs">Available</Badge>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProviderDashboard() {
  return (
    <div className="min-h-screen bg-cream">

      {/* Top nav */}
      <header className="bg-navy text-cream px-6 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-steel uppercase tracking-widest mb-0.5">Sideline Suites</p>
            <h1 className="font-heading text-xl font-bold leading-tight">Provider Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold">{PROVIDER.name}</p>
              <p className="text-xs text-steel">{PROVIDER.location}</p>
            </div>
            <div className="bg-sand/20 border border-sand/30 rounded-xl px-4 py-2 text-right">
              <p className="text-xs text-steel">Payout balance</p>
              <p className="font-heading text-lg font-bold text-sand">
                ${PROVIDER.payoutBalance.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-10">

        {/* Earnings summary */}
        <section>
          <h2 className="font-heading text-xl font-bold text-navy mb-4">Earnings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard
              label="Earned this month"
              value={`$${EARNINGS.thisMonth.toFixed(2)}`}
              icon={TrendingUp}
              sub="June 2026"
            />
            <StatCard
              label="Pending payout"
              value={`$${EARNINGS.pendingPayout.toFixed(2)}`}
              icon={Clock}
              sub="Pays out Jun 30"
            />
            <StatCard
              label="Lifetime earnings"
              value={`$${EARNINGS.lifetime.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
              icon={DollarSign}
              sub="Since Jan 2026"
            />
          </div>
        </section>

        {/* Active listings */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-xl font-bold text-navy">Active Listings</h2>
            <Button asChild size="sm" className="bg-navy text-cream hover:bg-navy/90 gap-1.5">
              <Link href="/provider/listings/new">
                <Plus className="w-4 h-4" />
                Add New Listing
              </Link>
            </Button>
          </div>

          <Card className="border-0 shadow-sm overflow-hidden">
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-navy/5 border-b border-border">
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Item</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Price / weekend</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {LISTINGS.map((item) => (
                    <tr key={item.id} className="hover:bg-navy/2 transition-colors">
                      <td className="px-5 py-4 font-medium text-navy flex items-center gap-2">
                        <Package className="w-4 h-4 text-steel shrink-0" />
                        {item.name}
                      </td>
                      <td className="px-5 py-4 text-navy">${item.pricePerWeekend}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile list */}
            <div className="sm:hidden divide-y divide-border">
              {LISTINGS.map((item) => (
                <div key={item.id} className="flex items-center justify-between px-5 py-4 gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <Package className="w-4 h-4 text-steel shrink-0" />
                    <span className="font-medium text-navy text-sm truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-muted-foreground">${item.pricePerWeekend}/wknd</span>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Upcoming bookings */}
        <section>
          <h2 className="font-heading text-xl font-bold text-navy mb-4">Upcoming Bookings</h2>
          <div className="space-y-3">
            {BOOKINGS.map((booking) => (
              <Card key={booking.id} className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-semibold text-navy">{booking.renter}</p>
                        <Badge className="bg-navy/5 text-navy border-0 text-xs font-normal">
                          {booking.tournament}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{booking.gear}</p>
                      <div className="flex items-center gap-1 text-xs text-steel mt-1">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {booking.dates}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-heading text-2xl font-bold text-navy">
                        ${booking.payout.toFixed(2)}
                      </p>
                      <div className="flex items-center justify-end gap-1 text-xs text-green-600 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        Confirmed
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Payout history */}
        <section>
          <h2 className="font-heading text-xl font-bold text-navy mb-4">Payout History</h2>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              {PAYOUT_HISTORY.map((payout, i) => (
                <div key={payout.id}>
                  <div className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-medium text-navy text-sm">{payout.date}</p>
                      <p className="text-xs text-muted-foreground font-mono mt-0.5">{payout.ref}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading text-lg font-bold text-navy">
                        ${payout.amount.toFixed(2)}
                      </span>
                      <Badge variant="secondary" className="text-xs text-green-700 bg-green-50">
                        Paid
                      </Badge>
                    </div>
                  </div>
                  {i < PAYOUT_HISTORY.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

      </main>

      <footer className="bg-navy text-steel text-xs text-center py-5 px-6 mt-16">
        © {new Date().getFullYear()} Sideline Scout · Sideline Suites Provider Program
      </footer>
    </div>
  )
}
