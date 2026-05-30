import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AppLogo } from '@/components/AppLogo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { register } from '@/api/auth'
import { getErrorMessage } from '@/api/client'
import { useAuthStore } from '@/store/authStore'
import { GoogleAuthButton } from '@/components/GoogleAuthButton'
import { ThemeToggle } from '@/components/ThemeToggle'

export function RegisterPage() {
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { user, tokens } = await register(form.email, form.password, form.username)
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
          <h1 className="text-2xl font-bold text-gradient">Create account</h1>
          <p className="mt-2 text-sm text-cursor-muted">Start screening GitHub developers</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-2xl p-8 space-y-5">
          {error && (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-400">
              {error}
            </p>
          )}
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            placeholder="recruiter_name"
            required
          />
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <Button type="submit" className="w-full" size="lg" loading={loading}>
            Create account
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
          Already have an account?{' '}
          <Link to="/login" className="text-cursor-accent-hover hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
