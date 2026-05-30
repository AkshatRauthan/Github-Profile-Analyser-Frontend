import { cn, gradeColor } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'grade'
  grade?: string
  className?: string
}

export function Badge({ children, variant = 'default', grade, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        variant === 'default' && 'bg-cursor-hover text-cursor-muted',
        variant === 'accent' && 'bg-violet-500/15 text-cursor-accent-hover border border-violet-500/20',
        variant === 'success' && 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
        variant === 'grade' && grade && gradeColor(grade),
        variant === 'grade' && 'bg-cursor-elevated border border-cursor-border',
        className
      )}
    >
      {children}
    </span>
  )
}
