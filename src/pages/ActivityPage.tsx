import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, Clock } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { getAnalysisRequests } from '@/api/profiles'
import type { AnalysisRequest } from '@/types'

export function ActivityPage() {
  const [requests, setRequests] = useState<AnalysisRequest[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAnalysisRequests(1, 30)
      .then((res) => setRequests(res.items))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gradient">Activity log</h1>
        <p className="mt-2 text-cursor-muted">History of all profile analyze requests</p>
      </motion.div>

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-cursor-elevated" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <Card className="py-12 text-center text-cursor-muted">No activity yet.</Card>
      ) : (
        <div className="space-y-2">
          {requests.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="flex items-center gap-4 py-4">
                {req.status === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
                ) : (
                  <XCircle className="h-5 w-5 shrink-0 text-red-400" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm text-cursor-text">@{req.githubUsername}</p>
                  {req.errorMessage && (
                    <p className="mt-0.5 truncate text-xs text-red-400">{req.errorMessage}</p>
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-cursor-muted shrink-0">
                  <Clock className="h-3 w-3" />
                  {new Date(req.createdAt).toLocaleString()}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
