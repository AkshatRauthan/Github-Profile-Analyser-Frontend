import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Star,
  Users,
  GitFork,
  MapPin,
  Building2,
  ExternalLink,
  Trophy,
  BarChart3,
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { ScoreRing } from '@/components/ui/ScoreRing'
import { RankingBreakdown } from '@/components/RankingBreakdown'
import { HeatmapChart } from '@/components/HeatmapChart'
import {
  getProfile,
  rankProfile,
  getProfileRankings,
  getHeatmap,
} from '@/api/profiles'
import { getErrorMessage } from '@/api/client'
import { formatNumber, personaLabel } from '@/lib/utils'
import type { GitHubProfile, PersonaRanking, ContributionHeatmap, HeatmapPeriod } from '@/types'

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<GitHubProfile | null>(null)
  const [rankings, setRankings] = useState<PersonaRanking[]>([])
  const [bestMatch, setBestMatch] = useState<PersonaRanking | null>(null)
  const [heatmap, setHeatmap] = useState<ContributionHeatmap | null>(null)
  const [heatmapPeriod, setHeatmapPeriod] = useState<HeatmapPeriod>('currYear')
  const [selectedPersona, setSelectedPersona] = useState<PersonaRanking | null>(null)
  const [loading, setLoading] = useState(true)
  const [ranking, setRanking] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!username) return
    setLoading(true)
    getProfile(username)
      .then(setProfile)
      .catch((e) => setError(getErrorMessage(e)))
      .finally(() => setLoading(false))
  }, [username])

  useEffect(() => {
    if (!username) return
    getProfileRankings(username)
      .then((res) => {
        setRankings(res.rankings)
        setBestMatch(res.bestMatch)
        setSelectedPersona(res.bestMatch)
      })
      .catch(() => {
        setRankings([])
        setBestMatch(null)
      })
  }, [username, profile?.lastRankedAt])

  useEffect(() => {
    if (!username) return
    getHeatmap(username, heatmapPeriod)
      .then(setHeatmap)
      .catch(() => setHeatmap(null))
  }, [username, heatmapPeriod])

  async function handleRank() {
    if (!username) return
    setRanking(true)
    setError('')
    try {
      const result = await rankProfile(username)
      setProfile(result.profile)
      setRankings(result.rankings)
      setBestMatch(result.bestMatch)
      setSelectedPersona(result.bestMatch)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setRanking(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cursor-accent border-t-transparent" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">{error || 'Profile not found'}</p>
        <Link to="/profiles" className="mt-4 inline-block text-cursor-accent-hover">
          Back to profiles
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <Link
        to="/profiles"
        className="inline-flex items-center gap-2 text-sm text-cursor-muted hover:text-cursor-text"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to profiles
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-6 lg:flex-row lg:items-start"
      >
        <img
          src={profile.avatarUrl || `https://github.com/${profile.githubUsername}.png`}
          alt=""
          className="h-24 w-24 rounded-2xl border border-cursor-border"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-cursor-text">
            {profile.name || profile.githubUsername}
          </h1>
          <a
            href={`https://github.com/${profile.githubUsername}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-mono text-cursor-accent-hover hover:underline"
          >
            @{profile.githubUsername}
            <ExternalLink className="h-3 w-3" />
          </a>
          {profile.bio && <p className="mt-3 max-w-2xl text-cursor-muted">{profile.bio}</p>}
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-cursor-muted">
            {profile.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {profile.location}
              </span>
            )}
            {profile.company && (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" /> {profile.company}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-400" /> {formatNumber(profile.totalStars)} stars
            </span>
            <span className="flex items-center gap-1">
              <GitFork className="h-4 w-4" /> {profile.publicRepos} repos
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" /> {formatNumber(profile.followers)} followers
            </span>
          </div>
        </div>
        <Button onClick={handleRank} loading={ranking} size="lg">
          <Trophy className="h-4 w-4" />
          {rankings.length ? 'Re-rank' : 'Rank profile'}
        </Button>
      </motion.div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {profile.topLanguages?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {profile.topLanguages.map((l) => (
            <Badge key={l.language} variant="accent">
              {l.language} ({l.count})
            </Badge>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-6">
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-cursor-accent-hover" />
            <h2 className="font-semibold text-cursor-text">Persona rankings</h2>
          </div>
          {!rankings.length ? (
            <p className="text-sm text-cursor-muted">
              No rankings yet. Click &quot;Rank profile&quot; to score across all personas.
            </p>
          ) : (
            <>
              <div className="flex justify-center py-4">
                <ScoreRing
                  score={selectedPersona?.overallScore ?? bestMatch?.overallScore ?? 0}
                  label="/ 100"
                  sublabel={selectedPersona?.personaName ?? bestMatch?.personaName}
                />
              </div>
              {selectedPersona && (
                <Badge variant="grade" grade={selectedPersona.grade} className="mx-auto block w-fit">
                  {selectedPersona.grade}
                </Badge>
              )}
              <div className="flex flex-wrap gap-2">
                {rankings.map((r) => (
                  <button
                    key={r.persona}
                    type="button"
                    onClick={() => setSelectedPersona(r)}
                    className={`rounded-lg border px-3 py-1.5 text-xs transition-colors ${
                      selectedPersona?.persona === r.persona
                        ? 'border-violet-500/50 bg-violet-500/15 text-cursor-accent-hover'
                        : 'border-cursor-border text-cursor-muted hover:bg-cursor-hover'
                    }`}
                  >
                    {personaLabel(r.persona)} · {Math.round(r.overallScore)}
                  </button>
                ))}
              </div>
              {selectedPersona && (
                <RankingBreakdown breakdown={selectedPersona.breakdown} />
              )}
            </>
          )}
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <h2 className="font-semibold text-cursor-text">Contributions</h2>
            </div>
            <div className="flex gap-1 rounded-lg border border-cursor-border p-0.5">
              {(['currWeek', 'currMonth', 'currYear'] as HeatmapPeriod[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setHeatmapPeriod(p)}
                  className={`rounded-md px-2 py-1 text-[10px] font-medium transition-colors ${
                    heatmapPeriod === p
                      ? 'bg-cursor-hover text-cursor-text'
                      : 'text-cursor-muted hover:text-cursor-text'
                  }`}
                >
                  {p === 'currWeek' ? 'Week' : p === 'currMonth' ? 'Month' : 'Year'}
                </button>
              ))}
            </div>
          </div>
          {heatmap ? (
            <>
              <p className="text-sm text-cursor-muted">
                <span className="font-semibold text-cursor-text">
                  {heatmap.totalContributions}
                </span>{' '}
                contributions in this period
              </p>
              <HeatmapChart data={heatmap} />
            </>
          ) : (
            <p className="text-sm text-cursor-muted py-8 text-center">Loading heatmap...</p>
          )}
        </Card>
      </div>
    </div>
  )
}
