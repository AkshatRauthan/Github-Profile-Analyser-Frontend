import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GitCompare, Check, X, Star, Users, GitFork, Trophy } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { getProfiles, getProfileRankings } from '@/api/profiles'
import { formatNumber, personaLabel, scoreColor, cn } from '@/lib/utils'
import type { GitHubProfile, PersonaRanking } from '@/types'

const MAX_COMPARE = 4

export function ComparePage() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([])
  const [selected, setSelected] = useState<string[]>([])
  const [rankingsMap, setRankingsMap] = useState<Record<string, PersonaRanking[]>>({})
  const [loading, setLoading] = useState(true)
  const [loadingRankings, setLoadingRankings] = useState(false)

  useEffect(() => {
    getProfiles(1, 50)
      .then((res) => setProfiles(res.items))
      .finally(() => setLoading(false))
  }, [])

  function toggleSelect(username: string) {
    setSelected((prev) => {
      if (prev.includes(username)) return prev.filter((u) => u !== username)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, username]
    })
  }

  async function loadRankings() {
    if (selected.length < 2) return
    setLoadingRankings(true)
    const map: Record<string, PersonaRanking[]> = {}
    await Promise.all(
      selected.map(async (username) => {
        try {
          const res = await getProfileRankings(username)
          map[username] = res.rankings
        } catch {
          map[username] = []
        }
      })
    )
    setRankingsMap(map)
    setLoadingRankings(false)
  }

  const selectedProfiles = profiles.filter((p) => selected.includes(p.githubUsername))

  const metrics = [
    { key: 'totalStars', label: 'Total stars', icon: Star },
    { key: 'publicRepos', label: 'Public repos', icon: GitFork },
    { key: 'followers', label: 'Followers', icon: Users },
    { key: 'bestPersonaScore', label: 'Best persona score', icon: Trophy },
  ] as const

  function getMetricValue(profile: GitHubProfile, key: string): number {
    if (key === 'bestPersonaScore') return profile.bestPersonaScore ?? 0
    return profile[key as keyof GitHubProfile] as number
  }

  function getMaxForMetric(key: string): number {
    return Math.max(...selectedProfiles.map((p) => getMetricValue(p, key)), 1)
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15">
            <GitCompare className="h-5 w-5 text-cursor-accent-hover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gradient sm:text-3xl">Compare profiles</h1>
            <p className="mt-1 text-cursor-muted">
              Select 2–{MAX_COMPARE} analyzed profiles to compare side by side
            </p>
          </div>
        </div>
      </motion.div>

      <Card className="space-y-4">
        <p className="text-sm text-cursor-muted">
          Selected: {selected.length}/{MAX_COMPARE}
        </p>
        {loading ? (
          <div className="grid gap-2 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-14 animate-pulse rounded-lg bg-cursor-elevated" />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <p className="text-center py-8 text-cursor-muted">
            No profiles to compare.{' '}
            <Link to="/analyze" className="text-cursor-accent-hover hover:underline">
              Analyze some first
            </Link>
          </p>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile) => {
              const isSelected = selected.includes(profile.githubUsername)
              const disabled = !isSelected && selected.length >= MAX_COMPARE
              return (
                <button
                  key={profile.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => toggleSelect(profile.githubUsername)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border p-3 text-left transition-all',
                    isSelected
                      ? 'border-violet-500/50 bg-violet-500/10'
                      : 'border-cursor-border bg-cursor-elevated hover:border-cursor-accent/30',
                    disabled && 'opacity-40 cursor-not-allowed'
                  )}
                >
                  <img
                    src={profile.avatarUrl || `https://github.com/${profile.githubUsername}.png`}
                    alt=""
                    className="h-10 w-10 rounded-lg"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-cursor-text">
                      {profile.githubUsername}
                    </p>
                    <p className="text-xs text-cursor-muted">
                      {formatNumber(profile.totalStars)} stars
                    </p>
                  </div>
                  <div
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded border',
                      isSelected
                        ? 'border-violet-500 bg-violet-500 text-white'
                        : 'border-cursor-border'
                    )}
                  >
                    {isSelected && <Check className="h-3 w-3" />}
                  </div>
                </button>
              )
            })}
          </div>
        )}
        <div className="flex flex-wrap gap-3">
          <Button
            disabled={selected.length < 2}
            loading={loadingRankings}
            onClick={loadRankings}
          >
            Compare {selected.length} profiles
          </Button>
          {selected.length > 0 && (
            <Button variant="ghost" onClick={() => { setSelected([]); setRankingsMap({}) }}>
              <X className="h-4 w-4" />
              Clear
            </Button>
          )}
        </div>
      </Card>

      <AnimatePresence>
        {selectedProfiles.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="space-y-6"
          >
            <div className="overflow-x-auto pb-1">
              <div
                className="grid gap-4"
                style={{
                  gridTemplateColumns: `repeat(${selectedProfiles.length}, minmax(140px, 1fr))`,
                  minWidth: `${selectedProfiles.length * 140}px`,
                }}
              >
              {selectedProfiles.map((profile, i) => (
                <Card key={profile.id} delay={i * 0.05} className="text-center">
                  <img
                    src={profile.avatarUrl || `https://github.com/${profile.githubUsername}.png`}
                    alt=""
                    className="mx-auto h-16 w-16 rounded-xl border border-cursor-border"
                  />
                  <h3 className="mt-3 font-semibold text-cursor-text truncate">
                    {profile.name || profile.githubUsername}
                  </h3>
                  <Link
                    to={`/profiles/${profile.githubUsername}`}
                    className="font-mono text-xs text-cursor-accent-hover hover:underline"
                  >
                    @{profile.githubUsername}
                  </Link>
                  {profile.bestPersona && (
                    <Badge variant="accent" className="mt-2">
                      {personaLabel(profile.bestPersona)}
                    </Badge>
                  )}
                </Card>
              ))}
              </div>
            </div>

            <Card className="space-y-6">
              <h2 className="font-semibold text-cursor-text">Metrics comparison</h2>
              {metrics.map((metric) => {
                const max = getMaxForMetric(metric.key)
                return (
                  <div key={metric.key} className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-cursor-muted">
                      <metric.icon className="h-4 w-4" />
                      {metric.label}
                    </div>
                    <div
                      className="grid gap-3"
                      style={{ gridTemplateColumns: `repeat(${selectedProfiles.length}, 1fr)` }}
                    >
                      {selectedProfiles.map((profile) => {
                        const value = getMetricValue(profile, metric.key)
                        const pct = (value / max) * 100
                        return (
                          <div key={profile.id} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-cursor-muted truncate">
                                @{profile.githubUsername}
                              </span>
                              <span className="font-mono font-medium text-cursor-text">
                                {metric.key === 'bestPersonaScore'
                                  ? Math.round(value)
                                  : formatNumber(value)}
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-cursor-border">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${pct}%` }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="h-full rounded-full accent-gradient"
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </Card>

            {Object.keys(rankingsMap).length > 0 && (
              <Card className="overflow-x-auto">
                <h2 className="mb-4 font-semibold text-cursor-text">Persona scores</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-cursor-border text-left text-cursor-muted">
                      <th className="pb-3 pr-4 font-medium">Persona</th>
                      {selectedProfiles.map((p) => (
                        <th key={p.id} className="pb-3 px-2 font-medium text-center">
                          @{p.githubUsername}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(rankingsMap[selectedProfiles[0]?.githubUsername] ?? []).map((_, rowIdx) => {
                      const personaKey = rankingsMap[selectedProfiles[0].githubUsername]?.[rowIdx]?.persona
                      if (!personaKey) return null
                      return (
                        <tr key={personaKey} className="border-b border-cursor-border-subtle">
                          <td className="py-3 pr-4 text-cursor-text">
                            {personaLabel(personaKey)}
                          </td>
                          {selectedProfiles.map((p) => {
                            const ranking = rankingsMap[p.githubUsername]?.find(
                              (r) => r.persona === personaKey
                            )
                            return (
                              <td key={p.id} className="py-3 px-2 text-center">
                                {ranking ? (
                                  <span
                                    className={cn(
                                      'font-mono font-semibold',
                                      scoreColor(ranking.overallScore)
                                    )}
                                  >
                                    {Math.round(ranking.overallScore)}
                                  </span>
                                ) : (
                                  <span className="text-cursor-muted">—</span>
                                )}
                              </td>
                            )
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                {selectedProfiles.some((p) => !rankingsMap[p.githubUsername]?.length) && (
                  <p className="mt-4 text-xs text-cursor-muted">
                    Some profiles are not ranked yet.{' '}
                    <Link to="/profiles" className="text-cursor-accent-hover hover:underline">
                      Rank them on the profile page
                    </Link>
                  </p>
                )}
              </Card>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
