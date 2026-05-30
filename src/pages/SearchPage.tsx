import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { ProfileCard } from '@/components/ProfileCard'
import { searchProfiles } from '@/api/profiles'
import { getPersonas } from '@/api/profiles'
import { getErrorMessage } from '@/api/client'
import type { GitHubProfile, PersonaSummary, PersonaKey } from '@/types'
import { useEffect } from 'react'

export function SearchPage() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([])
  const [personas, setPersonas] = useState<PersonaSummary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    q: '',
    languages: '',
    minStars: '',
    minRepos: '',
    persona: '' as PersonaKey | '',
    minPersonaScore: '',
    sortBy: 'lastAnalyzedAt',
    sortOrder: 'desc',
  })

  useEffect(() => {
    getPersonas().then(setPersonas).catch(() => {})
  }, [])

  async function handleSearch(e?: React.FormEvent) {
    e?.preventDefault()
    setLoading(true)
    setError('')
    try {
      const params: Record<string, string> = {
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder,
      }
      if (filters.q) params.q = filters.q
      if (filters.languages) params.languages = filters.languages
      if (filters.minStars) params.minStars = filters.minStars
      if (filters.minRepos) params.minRepos = filters.minRepos
      if (filters.persona) {
        params.persona = filters.persona
        if (filters.minPersonaScore) params.minPersonaScore = filters.minPersonaScore
        if (filters.sortBy === 'lastAnalyzedAt') params.sortBy = 'personaScore'
      }
      const res = await searchProfiles(params)
      setProfiles(res.items)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gradient sm:text-3xl">Search profiles</h1>
        <p className="mt-2 text-cursor-muted">Filter and sort your analyzed candidates</p>
      </motion.div>

      <Card className="space-y-5">
        <div className="flex items-center gap-2 text-cursor-muted">
          <SlidersHorizontal className="h-4 w-4" />
          <span className="text-sm font-medium">Filters</span>
        </div>
        <form onSubmit={handleSearch} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            label="Search"
            value={filters.q}
            onChange={(e) => setFilters({ ...filters, q: e.target.value })}
            placeholder="Keyword..."
          />
          <Input
            label="Languages"
            value={filters.languages}
            onChange={(e) => setFilters({ ...filters, languages: e.target.value })}
            placeholder="JavaScript,TypeScript"
          />
          <Input
            label="Min stars"
            type="number"
            value={filters.minStars}
            onChange={(e) => setFilters({ ...filters, minStars: e.target.value })}
          />
          <Input
            label="Min repos"
            type="number"
            value={filters.minRepos}
            onChange={(e) => setFilters({ ...filters, minRepos: e.target.value })}
          />
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-cursor-muted uppercase tracking-wider">
              Persona
            </label>
            <select
              value={filters.persona}
              onChange={(e) => setFilters({ ...filters, persona: e.target.value as PersonaKey | '' })}
              className="w-full rounded-lg border border-cursor-border bg-cursor-elevated px-4 py-2.5 text-sm text-cursor-text focus:outline-none focus:ring-2 focus:ring-cursor-accent/40"
            >
              <option value="">Any</option>
              {personas.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <Input
            label="Min persona score"
            type="number"
            value={filters.minPersonaScore}
            onChange={(e) => setFilters({ ...filters, minPersonaScore: e.target.value })}
            disabled={!filters.persona}
          />
        </form>
        <Button onClick={() => handleSearch()} loading={loading}>
          <Search className="h-4 w-4" />
          Search
        </Button>
        {error && <p className="text-sm text-red-400">{error}</p>}
      </Card>

      {profiles.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p, i) => (
            <ProfileCard key={p.id} profile={p} index={i} />
          ))}
        </div>
      )}
    </div>
  )
}
