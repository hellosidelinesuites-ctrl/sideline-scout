'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react'

interface Tip {
  id: string
  tip: string
  category: string | null
  submitter_name: string | null
  created_at: string
}

interface TipRowProps {
  tip: Tip
  onDone: (id: string) => void
}

function TipRow({ tip, onDone }: TipRowProps) {
  const [editedText, setEditedText] = useState(tip.tip)
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState<'approve' | 'reject' | null>(null)

  async function approve() {
    setLoading('approve')
    await fetch(`/api/admin/tips/${tip.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tip: editedText }),
    })
    setLoading(null)
    onDone(tip.id)
  }

  async function reject() {
    setLoading('reject')
    await fetch(`/api/admin/tips/${tip.id}`, { method: 'DELETE' })
    setLoading(null)
    onDone(tip.id)
  }

  return (
    <div className="py-4 space-y-2">
      <div className="flex items-center gap-2 flex-wrap">
        {tip.category && <Badge variant="secondary" className="text-xs">{tip.category}</Badge>}
        {tip.submitter_name && (
          <span className="text-xs text-muted-foreground">by {tip.submitter_name}</span>
        )}
        <span className="text-xs text-muted-foreground ml-auto">
          {new Date(tip.created_at).toLocaleString()}
        </span>
      </div>

      {expanded ? (
        <Textarea
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          rows={3}
          className="text-sm text-navy"
        />
      ) : (
        <p className="text-sm text-navy">{editedText}</p>
      )}

      <div className="flex items-center gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="text-xs text-muted-foreground h-7 px-2"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <><ChevronUp className="w-3 h-3 mr-1" />Hide editor</> : <><ChevronDown className="w-3 h-3 mr-1" />Edit before approving</>}
        </Button>
        <div className="flex gap-2 ml-auto">
          <Button
            size="sm"
            variant="outline"
            className="h-7 text-xs border-red-200 text-red-600 hover:bg-red-50"
            disabled={loading !== null}
            onClick={reject}
          >
            <XCircle className="w-3.5 h-3.5 mr-1" />
            {loading === 'reject' ? 'Rejecting…' : 'Reject'}
          </Button>
          <Button
            size="sm"
            className="h-7 text-xs bg-green-600 hover:bg-green-700 text-white"
            disabled={loading !== null}
            onClick={approve}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            {loading === 'approve' ? 'Approving…' : 'Approve'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function TipsPanel({ initialTips }: { initialTips: Tip[] }) {
  const [tips, setTips] = useState(initialTips)

  function removeTip(id: string) {
    setTips((prev) => prev.filter((t) => t.id !== id))
  }

  if (tips.length === 0) {
    return <p className="py-6 text-center text-muted-foreground text-sm">No pending tips.</p>
  }

  return (
    <div className="divide-y divide-border">
      {tips.map((tip) => (
        <TipRow key={tip.id} tip={tip} onDone={removeTip} />
      ))}
    </div>
  )
}
