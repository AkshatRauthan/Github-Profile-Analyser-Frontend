import { motion } from 'framer-motion'
import { cn, scoreColor } from '@/lib/utils'
import type { MetricBreakdown } from '@/types'

interface RankingBreakdownProps {
  breakdown: MetricBreakdown[]
}

export function RankingBreakdown({ breakdown }: RankingBreakdownProps) {
  return (
    <div className="space-y-3">
      {breakdown.map((metric, i) => (
        <motion.div
          key={metric.key}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.05 }}
          className="space-y-1.5"
        >
          <div className="flex items-center justify-between text-base">
            <span className="text-cursor-text">{metric.label}</span>
            <span className={cn('font-mono font-medium tabular-nums', scoreColor(metric.score))}>
              {Math.round(metric.score)}
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-cursor-border">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${metric.score}%` }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: 'easeOut' }}
              className="h-full rounded-full accent-gradient"
            />
          </div>
          <p className="text-xs text-cursor-muted leading-relaxed">{metric.summary}</p>
        </motion.div>
      ))}
    </div>
  )
}
