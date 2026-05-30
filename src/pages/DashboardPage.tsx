import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Star, Trophy, ArrowRight, Zap } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ProfileCard } from '@/components/ProfileCard'
import { getProfiles } from '@/api/profiles'
import { formatNumber } from '@/lib/utils'
import type { GitHubProfile } from '@/types'

export function DashboardPage() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProfiles(1, 6)
      .then((res) => setProfiles(res.items))
      .catch(() => setProfiles([]))
      .finally(() => setLoading(false))
  }, [])

  const totalStars = profiles.reduce((s, p) => s + p.totalStars, 0)
  const ranked = profiles.filter((p) => p.bestPersonaScore != null).length

  const stats = [
    { label: 'Profiles analyzed', value: profiles.length, icon: Users, color: 'text-violet-400' },
    { label: 'Total stars tracked', value: formatNumber(totalStars), icon: Star, color: 'text-amber-400' },
    { label: 'Ranked profiles', value: ranked, icon: Trophy, color: 'text-emerald-400' },
  ]

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold tracking-tight text-gradient sm:text-3xl">Dashboard</h1>
        <p className="mt-2 text-sm text-cursor-muted">
          Overview of your GitHub screening workspace
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat, i) => (
          <Card key={stat.label} delay={i * 0.08} className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cursor-elevated">
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold tabular-nums text-cursor-text">{stat.value}</p>
              <p className="text-sm text-cursor-muted">{stat.label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card glow className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15">
            <Zap className="h-6 w-6 text-cursor-accent-hover" />
          </div>
          <div>
            <h2 className="font-semibold text-cursor-text">Analyze a new profile</h2>
            <p className="text-base text-cursor-muted">Fetch insights from any public GitHub user</p>
          </div>
        </div>
        <Link to="/analyze">
          <Button>
            Get started
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </Card>

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-cursor-text">Recent profiles</h2>
          <Link to="/profiles" className="text-base text-cursor-accent-hover hover:underline">
            View all
          </Link>
        </div>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 animate-pulse rounded-xl bg-cursor-elevated" />
            ))}
          </div>
        ) : profiles.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-cursor-muted">No profiles yet. Analyze your first GitHub user!</p>
            <Link to="/analyze" className="mt-4 inline-block">
              <Button>Analyze profile</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((p, i) => (
              <ProfileCard key={p.id} profile={p} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
