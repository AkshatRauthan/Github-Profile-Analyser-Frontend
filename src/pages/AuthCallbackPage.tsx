import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { AppLogo } from '@/components/AppLogo'
import { getAuthProfile } from '@/api/auth'
import { useAuthStore } from '@/store/authStore'

export function AuthCallbackPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const setAuth = useAuthStore((s) => s.setAuth)
  const [error, setError] = useState('')

  useEffect(() => {
    const accessToken = searchParams.get('accessToken')
    const refreshToken = searchParams.get('refreshToken')
    const oauthError = searchParams.get('error')

    if (oauthError) {
      setError(decodeURIComponent(oauthError))
      return
    }

    if (!accessToken || !refreshToken) {
      setError('Missing authentication tokens. Please try signing in again.')
      return
    }

    async function completeAuth() {
      try {
        useAuthStore.setState({
          accessToken,
          refreshToken,
        })
        const user = await getAuthProfile()
        setAuth({ accessToken: accessToken!, refreshToken: refreshToken! }, user)
        navigate('/dashboard', { replace: true })
      } catch {
        setError('Failed to complete sign in. Please try again.')
        useAuthStore.getState().logout()
      }
    }

    completeAuth()
  }, [searchParams, navigate, setAuth])

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="mx-auto mb-6 flex justify-center">
          <AppLogo size="lg" />
        </div>

        {error ? (
          <>
            <h1 className="text-xl font-semibold text-cursor-text">Sign in failed</h1>
            <p className="mt-3 text-sm text-red-400">{error}</p>
            <Link
              to="/login"
              className="mt-6 inline-block text-sm text-cursor-accent-hover hover:underline"
            >
              Back to login
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold text-cursor-text">Completing sign in</h1>
            <p className="mt-2 text-sm text-cursor-muted">Setting up your workspace...</p>
            <Loader2 className="mx-auto mt-6 h-8 w-8 animate-spin text-cursor-accent" />
          </>
        )}
      </motion.div>
    </div>
  )
}
