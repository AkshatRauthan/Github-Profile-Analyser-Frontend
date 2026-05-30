import { motion } from 'framer-motion'
import { cn, scoreColor } from '@/lib/utils'

interface ScoreRingProps {
  score: number
  size?: number
  label?: string
  sublabel?: string
}

export function ScoreRing({ score, size = 120, label, sublabel }: ScoreRingProps) {
  const stroke = 6
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-cursor-border"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#a78bfa" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn('text-2xl font-bold tabular-nums', scoreColor(score))}>
          {Math.round(score)}
        </span>
        {label && <span className="text-[10px] text-cursor-muted mt-0.5">{label}</span>}
      </div>
      {sublabel && (
        <span className="text-xs text-cursor-muted mt-2 text-center max-w-[140px]">{sublabel}</span>
      )}
    </div>
  )
}
