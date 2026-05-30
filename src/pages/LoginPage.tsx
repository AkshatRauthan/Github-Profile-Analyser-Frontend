import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GitBranch } from 'lucide-react'
import { AppLogo } from '@/components/AppLogo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { login } from '@/api/auth'
import { getErrorMessage } from '@/api/client'
import { useAuthStore } from '@/store/authStore'
import { GoogleAuthButton } from '@/components/GoogleAuthButton'
import { ThemeToggle } from '@/components/ThemeToggle'

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const oauthError = searchParams.get('error')
    if (oauthError) setError(decodeURIComponent(oauthError))
  }, [searchParams])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user, tokens } = await login(email, password)
      setAuth(tokens, user)
      navigate('/dashboard')
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center p-6">
      <div className="absolute left-4 right-4 top-4 flex items-center justify-between">
        <Link to="/" className="text-sm text-cursor-muted hover:text-cursor-text">
          ← Back to home
        </Link>
        <ThemeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex justify-center">
            <AppLogo size="lg" />
          </div>
          <h1 className="text-2xl font-bold text-gradient">Welcome back</h1>
          <p className="mt-2 text-sm text-cursor-muted">
            Sign in to analyze and rank GitHub profiles
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-5">
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Sign in
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-cursor-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-cursor-surface px-2 text-cursor-muted">or</span>
            </div>
          </div>

          <GoogleAuthButton />
        </form>

        <p className="mt-6 text-center text-sm text-cursor-muted">
          No account?{' '}
          <Link to="/register" className="text-cursor-accent-hover hover:underline">
            Create one
          </Link>
        </p>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-cursor-muted">
          <GitBranch className="h-4 w-4" />
          Powered by GitHub API
        </div>
      </motion.div>
    </div>
  )
}
