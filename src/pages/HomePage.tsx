import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BarChart3,
  GitCompare,
  Search,
  Trophy,
  Flame,
  ArrowRight,
  Code2,
  Shield,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { ThemeToggle } from '@/components/ThemeToggle'
import { AppLogo } from '@/components/AppLogo'
import { HeroPreview } from '@/components/HeroPreview'
import { useAuthStore } from '@/store/authStore'

const features = [
  {
    icon: Code2,
    title: 'Deep profile analysis',
    description:
      'Pull repos, languages, stars, and README signals from any public GitHub username in one request.',
  },
  {
    icon: Trophy,
    title: 'Persona ranking',
    description:
      'Score candidates across Frontend, Backend, Full Stack, AI/ML, DevOps, and Mobile with a 0–100 breakdown.',
  },
  {
    icon: Flame,
    title: 'Contribution heatmaps',
    description: 'Live activity charts for the current week, month, or year — straight from GitHub GraphQL.',
  },
  {
    icon: Search,
    title: 'Search & filter',
    description:
      'Find saved profiles by language, stars, persona score, location, and more — only in your workspace.',
  },
  {
    icon: GitCompare,
    title: 'Side-by-side compare',
    description: 'Put up to four analyzed developers next to each other on metrics and persona scores.',
  },
  {
    icon: Shield,
    title: 'Your data, isolated',
    description: 'Every analyzed profile is scoped to your account. Teams never see each other’s lists.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

function AuthNavActions() {
  const authenticated = useAuthStore((s) => !!s.accessToken)
  const logout = useAuthStore((s) => s.logout)

  if (authenticated) {
    return (
      <>
        <Link to="/dashboard">
          <Button size="sm" className="gap-2">
            Open dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            logout()
          }}
        >
          Sign out
        </Button>
      </>
    )
  }

  return (
    <>
      <Link to="/login">
        <Button variant="ghost" size="sm">
          Sign in
        </Button>
      </Link>
      <Link to="/register">
        <Button size="sm">Get started</Button>
      </Link>
    </>
  )
}

function HeroActions() {
  const authenticated = useAuthStore((s) => !!s.accessToken)

  if (authenticated) {
    return (
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <Link to="/dashboard">
          <Button size="lg" className="gap-2">
            Go to dashboard
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <Link to="/analyze">
          <Button variant="secondary" size="lg">
            Analyze a profile
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4">
      <Link to="/register">
        <Button size="lg" className="gap-2">
          Create free account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <Link to="/login">
        <Button variant="secondary" size="lg">
          Sign in
        </Button>
      </Link>
    </div>
  )
}

function CtaActions() {
  const authenticated = useAuthStore((s) => !!s.accessToken)

  if (authenticated) {
    return (
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/dashboard">
          <Button size="lg">Open dashboard</Button>
        </Link>
        <Link to="/analyze">
          <Button variant="secondary" size="lg">
            Analyze a profile
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mt-8 flex flex-wrap justify-center gap-4">
      <Link to="/register">
        <Button size="lg">Get started — it&apos;s free</Button>
      </Link>
      <Link to="/login">
        <Button variant="secondary" size="lg">
          I already have an account
        </Button>
      </Link>
    </div>
  )
}

export function HomePage() {
  const authenticated = useAuthStore((s) => !!s.accessToken)

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-cursor-border/80 bg-cursor-bg/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2.5">
            <AppLogo size="md" />
            <span className="text-sm font-semibold text-cursor-text">GitHub Profile Analyser</span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm text-cursor-muted md:flex">
            <a href="#features" className="transition-colors hover:text-cursor-text">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-cursor-text">
              How it works
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AuthNavActions />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-cursor-border bg-cursor-elevated px-3 py-1 text-xs font-medium text-cursor-muted">
              <BarChart3 className="h-3.5 w-3.5 text-cursor-accent" />
              Built for recruiters & hiring teams
            </p>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-gradient md:text-5xl lg:text-[3.25rem]">
              Turn a GitHub username into hire-ready insights
            </h1>
            <p className="mt-6 max-w-lg text-lg text-cursor-muted">
              Analyze public profiles, rank developers by engineering persona, compare candidates, and
              keep everything in one searchable workspace.
            </p>
            <HeroActions />
            <p className="mt-6 text-xs text-cursor-muted">
              {authenticated
                ? 'You are signed in — jump back into your workspace anytime.'
                : 'No credit card · Works with email or Google · Public GitHub data only'}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <HeroPreview />
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-cursor-border bg-cursor-surface/40 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mb-14 text-center">
            <h2 className="text-3xl font-bold text-cursor-text">Everything you need to screen faster</h2>
            <p className="mx-auto mt-3 max-w-2xl text-cursor-muted">
              Stop opening tabs one by one. Store metrics, rank by role fit, and revisit candidates anytime.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass-panel rounded-2xl p-6 transition-colors hover:border-cursor-accent/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cursor-accent/10">
                  <feature.icon className="h-5 w-5 text-cursor-accent" />
                </div>
                <h3 className="font-semibold text-cursor-text">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-cursor-muted">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-cursor-text">How it works</h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Sign up', text: 'Create an account with email or Google in under a minute.' },
              {
                step: '02',
                title: 'Analyze',
                text: 'Enter a GitHub username. We fetch profile data and save it to your workspace.',
              },
              {
                step: '03',
                title: 'Decide',
                text: 'Rank by persona, compare side-by-side, and filter your shortlist when you are ready.',
              },
            ].map((item, i) => (
              <motion.div key={item.step} {...fadeUp} transition={{ delay: i * 0.1 }} className="text-center">
                <span className="font-mono text-4xl font-bold text-cursor-accent/40">{item.step}</span>
                <h3 className="mt-4 text-lg font-semibold text-cursor-text">{item.title}</h3>
                <p className="mt-2 text-sm text-cursor-muted">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-cursor-border py-20">
        <motion.div
          {...fadeUp}
          className="mx-auto max-w-3xl rounded-3xl border border-cursor-border bg-gradient-to-br from-cursor-accent/20 via-cursor-surface to-cursor-bg px-8 py-14 text-center glow-accent"
        >
          <h2 className="text-2xl font-bold text-cursor-text md:text-3xl">
            Ready to screen your next hire?
          </h2>
          <p className="mt-3 text-cursor-muted">
            {authenticated
              ? 'Continue screening candidates in your dashboard.'
              : 'Join and analyze your first GitHub profile in seconds.'}
          </p>
          <CtaActions />
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-cursor-border py-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm text-cursor-muted md:flex-row">
          <div className="flex items-center gap-2">
            <AppLogo size="sm" showBadge={false} />
            <span>GitHub Profile Analyser</span>
          </div>
          <div className="flex gap-6">
            {authenticated ? (
              <Link to="/dashboard" className="hover:text-cursor-text">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="hover:text-cursor-text">
                  Sign in
                </Link>
                <Link to="/register" className="hover:text-cursor-text">
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
