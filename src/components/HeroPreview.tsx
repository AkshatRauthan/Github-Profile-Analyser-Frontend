import { motion } from 'framer-motion'
import { Star, GitFork, Users, Trophy } from 'lucide-react'

const personas = [
  { label: 'Frontend', score: 87, width: '87%' },
  { label: 'Full Stack', score: 72, width: '72%' },
  { label: 'Backend', score: 64, width: '64%' },
]

const heatmap = [
  [0, 1, 2, 3, 1, 0, 2],
  [1, 3, 4, 2, 3, 1, 0],
  [2, 4, 3, 4, 2, 3, 1],
  [0, 2, 3, 1, 4, 2, 3],
]

function heatColor(level: number) {
  if (level === 0) return 'bg-cursor-elevated'
  if (level === 1) return 'bg-emerald-900/50'
  if (level === 2) return 'bg-emerald-700/60'
  if (level === 3) return 'bg-emerald-500/70'
  return 'bg-emerald-400'
}

export function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-violet-600/20 via-transparent to-emerald-500/10 blur-2xl" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="glass-panel relative overflow-hidden rounded-2xl border border-cursor-border/80 p-5 shadow-2xl shadow-black/40"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />

        {/* Window chrome */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          <span className="ml-2 font-mono text-[10px] text-cursor-muted">profile-analyser · live</span>
        </div>

        {/* Profile header */}
        <div className="flex items-start gap-4 rounded-xl border border-cursor-border bg-cursor-elevated/80 p-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 text-lg font-bold text-white">
            OC
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-cursor-text">The Octocat</h3>
              <span className="rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium text-violet-300">
                Best: Frontend
              </span>
            </div>
            <p className="font-mono text-xs text-cursor-muted">@octocat · San Francisco</p>
            <div className="mt-3 flex flex-wrap gap-4 text-xs text-cursor-muted">
              <span className="inline-flex items-center gap-1">
                <Star className="h-3 w-3 text-amber-400" /> 12.4k stars
              </span>
              <span className="inline-flex items-center gap-1">
                <GitFork className="h-3 w-3" /> 8 repos
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3 w-3" /> 9k followers
              </span>
            </div>
          </div>
          <div className="hidden shrink-0 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-center sm:block">
            <p className="text-[10px] uppercase tracking-wide text-emerald-400/80">Score</p>
            <p className="text-2xl font-bold text-emerald-400">87</p>
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {/* Persona breakdown */}
          <div className="rounded-xl border border-cursor-border bg-cursor-elevated/60 p-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-cursor-text">
              <Trophy className="h-3.5 w-3.5 text-violet-400" />
              Persona ranking
            </div>
            <div className="space-y-2.5">
              {personas.map((p, i) => (
                <motion.div
                  key={p.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  <div className="mb-1 flex justify-between text-[10px]">
                    <span className="text-cursor-muted">{p.label}</span>
                    <span className="font-mono text-cursor-text">{p.score}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-cursor-hover">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-violet-500 to-violet-400"
                      initial={{ width: 0 }}
                      animate={{ width: p.width }}
                      transition={{ delay: 0.5 + i * 0.12, duration: 0.6 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Heatmap */}
          <div className="rounded-xl border border-cursor-border bg-cursor-elevated/60 p-4">
            <p className="mb-3 text-xs font-medium text-cursor-text">Contribution activity</p>
            <div className="flex gap-1">
              {heatmap.map((col, ci) => (
                <div key={ci} className="flex flex-col gap-1">
                  {col.map((level, ri) => (
                    <motion.div
                      key={ri}
                      className={`h-2.5 w-2.5 rounded-sm ${heatColor(level)}`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.55 + (ci * 4 + ri) * 0.02 }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {['TypeScript', 'React', 'Node'].map((lang) => (
                <span
                  key={lang}
                  className="rounded-md border border-cursor-border bg-cursor-bg px-2 py-0.5 font-mono text-[10px] text-cursor-muted"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
