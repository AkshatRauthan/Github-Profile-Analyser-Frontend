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
    <div className="inline-flex flex-col items-center">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
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
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className={cn('text-2xl font-bold tabular-nums leading-none', scoreColor(score))}>
            {Math.round(score)}
          </span>
          {label && <span className="mt-0.5 text-xs leading-none text-cursor-muted">{label}</span>}
        </div>
      </div>
      {sublabel && (
        <span className="mt-2 max-w-[140px] text-center text-sm text-cursor-muted">{sublabel}</span>
      )}
    </div>
  )
}
