import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Code2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card } from '@/components/ui/Card'
import { analyzeProfile } from '@/api/profiles'
import { getErrorMessage } from '@/api/client'

const suggestions = ['octocat', 'gaearon', 'sindresorhus', 'tj', 'addyosmani']

export function AnalyzePage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAnalyze(target?: string) {
    const user = (target || username).trim().replace('@', '')
    if (!user) return
    setError('')
    setLoading(true)
    try {
      await analyzeProfile(user)
      navigate(`/profiles/${user}`)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gradient">Analyze profile</h1>
        <p className="mt-2 text-cursor-muted">
          Enter a GitHub username to fetch and store profile insights
        </p>
      </motion.div>

      <Card glow className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cursor-elevated">
            <Code2 className="h-5 w-5 text-cursor-text" />
          </div>
          <div>
            <p className="font-medium text-cursor-text">GitHub username</p>
            <p className="text-xs text-cursor-muted">Public profiles only</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g. octocat"
            className="font-mono"
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
          />
          <Button onClick={() => handleAnalyze()} loading={loading} className="shrink-0">
            <Search className="h-4 w-4" />
            Analyze
          </Button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {error}
          </motion.p>
        )}

        <div>
          <p className="mb-2 text-xs text-cursor-muted uppercase tracking-wider">Try these</p>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setUsername(s)
                  handleAnalyze(s)
                }}
                className="rounded-lg border border-cursor-border bg-cursor-elevated px-3 py-1.5 font-mono text-xs text-cursor-muted transition-colors hover:border-violet-500/30 hover:text-cursor-accent-hover"
              >
                @{s}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
