import { GitBranch, LineChart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AppLogoProps {
  size?: 'sm' | 'md' | 'lg'
  showBadge?: boolean
  className?: string
}

const sizes = {
  sm: { box: 'h-8 w-8', icon: 'h-4 w-4', badge: 'h-3 w-3', badgeIcon: 'h-1.5 w-1.5' },
  md: { box: 'h-9 w-9', icon: 'h-[18px] w-[18px]', badge: 'h-3.5 w-3.5', badgeIcon: 'h-2 w-2' },
  lg: { box: 'h-14 w-14', icon: 'h-7 w-7', badge: 'h-5 w-5', badgeIcon: 'h-2.5 w-2.5' },
}

export function AppLogo({ size = 'md', showBadge = true, className }: AppLogoProps) {
  const s = sizes[size]

  return (
    <div
      className={cn(
        'relative flex shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-gradient-to-br from-violet-600 to-indigo-700 shadow-lg shadow-violet-900/30',
        s.box,
        className
      )}
    >
      <GitBranch className={cn(s.icon, 'text-white')} strokeWidth={2.25} />
      {showBadge && (
        <span
          className={cn(
            'absolute -bottom-0.5 -right-0.5 flex items-center justify-center rounded-full border-2 border-cursor-bg bg-emerald-500',
            s.badge
          )}
        >
          <LineChart className={cn(s.badgeIcon, 'text-white')} strokeWidth={2.5} />
        </span>
      )}
    </div>
  )
}
