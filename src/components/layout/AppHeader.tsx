import { PanelLeft } from 'lucide-react'
import { motion } from 'framer-motion'
import { AppLogo } from '@/components/AppLogo'
import { useSidebarStore } from '@/store/sidebarStore'
import { cn } from '@/lib/utils'

export function AppHeader() {
  const { isOpen, toggle } = useSidebarStore()

  return (
    <header
      className={cn(
        'sticky top-0 z-30 -mx-4 mb-4 flex items-center gap-3 border-b border-cursor-border/60',
        'bg-cursor-bg/85 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8'
      )}
    >
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggle}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cursor-border',
          'bg-cursor-elevated text-cursor-text transition-colors hover:bg-cursor-hover'
        )}
      >
        <PanelLeft className={cn('h-4 w-4 transition-transform duration-300', isOpen && 'scale-x-[-1]')} />
      </motion.button>

      <div className="flex min-w-0 items-center gap-2 lg:hidden">
        <AppLogo size="sm" />
        <span className="truncate text-sm font-semibold text-cursor-text">Profile Analyser</span>
      </div>
    </header>
  )
}
