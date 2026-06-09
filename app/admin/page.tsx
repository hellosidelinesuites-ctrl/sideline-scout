import { createServiceClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TipsPanel from '@/components/admin/tips-panel'

export default async function AdminPage() {
  const supabase = await createServiceClient()

  const [
    { count: tournamentCount },
    { count: queryCount },
    { count: tipCount },
    { count: hostCount },
    { data: recentQueriesRaw },
    { data: pendingTipsRaw },
    { data: pendingHostsRaw },
  ] = await Promise.all([
    supabase.from('tournaments').select('*', { count: 'exact', head: true }),
    supabase.from('scout_queries').select('*', { count: 'exact', head: true }),
    supabase.from('parent_tips').select('*', { count: 'exact', head: true }),
    supabase.from('hosts').select('*', { count: 'exact', head: true }),
    supabase
      .from('scout_queries')
      .select('id, question, intent, created_at, latency_ms')
      .order('created_at', { ascending: false })
      .limit(20),
    supabase
      .from('parent_tips')
      .select('id, tip, category, submitter_name, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
    supabase
      .from('hosts')
      .select('id, name, email, message, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: false }),
  ])

  type QueryRow = { id: string; question: string; intent: string | null; created_at: string; latency_ms: number | null }
  type TipRow = { id: string; tip: string; category: string | null; submitter_name: string | null; created_at: string }
  type HostRow = { id: string; name: string; email: string; message: string | null; created_at: string }

  const recentQueries = recentQueriesRaw as QueryRow[] | null
  const pendingTips = pendingTipsRaw as TipRow[] | null
  const pendingHosts = pendingHostsRaw as HostRow[] | null

  return (
    <div className="min-h-screen bg-cream px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl font-bold text-navy mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tournaments', value: tournamentCount ?? 0 },
            { label: 'Scout Queries', value: queryCount ?? 0 },
            { label: 'Parent Tips', value: tipCount ?? 0 },
            { label: 'Host Applications', value: hostCount ?? 0 },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardHeader className="pb-1">
                <p className="text-xs text-muted-foreground uppercase tracking-wide">{stat.label}</p>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-navy">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="queries">
          <TabsList className="mb-4">
            <TabsTrigger value="queries">Scout Queries</TabsTrigger>
            <TabsTrigger value="tips">
              Pending Tips
              {pendingTips && pendingTips.length > 0 && (
                <Badge className="ml-1.5 bg-sand text-navy border-0 text-xs">{pendingTips.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="hosts">
              Host Applications
              {pendingHosts && pendingHosts.length > 0 && (
                <Badge className="ml-1.5 bg-sand text-navy border-0 text-xs">{pendingHosts.length}</Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Recent Scout Queries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {recentQueries?.map((q) => (
                    <div key={q.id} className="py-3 flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-navy truncate">{q.question}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {new Date(q.created_at).toLocaleString()}
                          {q.latency_ms && ` · ${q.latency_ms}ms`}
                        </p>
                      </div>
                      {q.intent && (
                        <Badge variant="secondary" className="text-xs shrink-0">{q.intent}</Badge>
                      )}
                    </div>
                  ))}
                  {!recentQueries?.length && (
                    <p className="py-6 text-center text-muted-foreground text-sm">No queries yet.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tips">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Pending Parent Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <TipsPanel initialTips={pendingTips ?? []} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hosts">
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg">Pending Host Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="divide-y divide-border">
                  {pendingHosts?.map((host) => (
                    <div key={host.id} className="py-3">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-navy">{host.name}</p>
                        <span className="text-xs text-muted-foreground">{host.email}</span>
                      </div>
                      {host.message && <p className="text-sm text-muted-foreground">{host.message}</p>}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(host.created_at).toLocaleString()}
                      </p>
                    </div>
                  ))}
                  {!pendingHosts?.length && (
                    <p className="py-6 text-center text-muted-foreground text-sm">No pending applications.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
