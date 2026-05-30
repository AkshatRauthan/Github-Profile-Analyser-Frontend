import { motion } from 'framer-motion'
import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'flex items-center gap-2 rounded-lg border border-cursor-border bg-cursor-elevated px-3 py-2 text-sm text-cursor-muted transition-colors hover:bg-cursor-hover hover:text-cursor-text',
        className
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDark ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isDark ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4 text-amber-500" />}
      </motion.div>
      {showLabel && <span>{isDark ? 'Dark' : 'Light'}</span>}
    </button>
  )
}
