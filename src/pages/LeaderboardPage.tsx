import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Medal } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { getLeaderboard, getPersonas } from '@/api/profiles'
import { cn, personaLabel } from '@/lib/utils'
import type { LeaderboardEntry, PersonaKey, PersonaSummary } from '@/types'

export function LeaderboardPage() {
  const [personas, setPersonas] = useState<PersonaSummary[]>([])
  const [persona, setPersona] = useState<PersonaKey>('frontend_developer')
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPersonas().then((list) => {
      setPersonas(list)
      if (list[0]) setPersona(list[0].key)
    })
  }, [])

  useEffect(() => {
    setLoading(true)
    getLeaderboard(persona, 1, 20)
      .then((res) => setEntries(res.items))
      .finally(() => setLoading(false))
  }, [persona])

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gradient sm:text-3xl">Leaderboard</h1>
        <p className="mt-2 text-cursor-muted">Top candidates by persona score</p>
      </motion.div>

      <div className="flex flex-wrap gap-2">
        {personas.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPersona(p.key)}
            className={cn(
              'rounded-lg border px-4 py-2 text-sm transition-all',
              persona === p.key
                ? 'border-violet-500/50 bg-violet-500/15 text-cursor-accent-hover glow-accent'
                : 'border-cursor-border text-cursor-muted hover:bg-cursor-hover'
            )}
          >
            {p.name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-xl bg-cursor-elevated" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <Card className="text-center py-12 text-cursor-muted">
          No ranked profiles for {personaLabel(persona)}. Rank some profiles first.
        </Card>
      ) : (
        <div className="space-y-3">
          {entries.map((entry, i) => (
            <motion.div
              key={entry.profile.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Link to={`/profiles/${entry.profile.githubUsername}`}>
                <Card hover className="flex items-center gap-4">
                  <div
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold',
                      entry.rank === 1 && 'bg-amber-500/20 text-amber-400',
                      entry.rank === 2 && 'bg-zinc-400/20 text-zinc-300',
                      entry.rank === 3 && 'bg-orange-600/20 text-orange-400',
                      entry.rank > 3 && 'bg-cursor-elevated text-cursor-muted'
                    )}
                  >
                    {entry.rank <= 3 ? <Medal className="h-5 w-5" /> : entry.rank}
                  </div>
                  <img
                    src={
                      entry.profile.avatarUrl ||
                      `https://github.com/${entry.profile.githubUsername}.png`
                    }
                    alt=""
                    className="h-12 w-12 rounded-lg border border-cursor-border"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-cursor-text truncate">
                      {entry.profile.name || entry.profile.githubUsername}
                    </p>
                    <p className="font-mono text-xs text-cursor-muted">
                      @{entry.profile.githubUsername}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold tabular-nums text-cursor-accent-hover">
                      {Math.round(entry.overallScore)}
                    </p>
                    <Badge variant="grade" grade={entry.grade}>
                      {entry.grade}
                    </Badge>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
