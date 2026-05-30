import { NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Search,
  UserPlus,
  Users,
  Trophy,
  Activity,
  LogOut,
  GitCompare,
  PanelLeftClose,
} from 'lucide-react'
import { useEffect } from 'react'
import { AppLogo } from '@/components/AppLogo'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useSidebarStore, SIDEBAR_WIDTH } from '@/store/sidebarStore'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analyze', icon: UserPlus, label: 'Analyze' },
  { to: '/profiles', icon: Users, label: 'Profiles' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/compare', icon: GitCompare, label: 'Compare' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/activity', icon: Activity, label: 'Activity' },
]

const sidebarTransition = { type: 'spring' as const, stiffness: 400, damping: 35 }

export function Sidebar() {
  const { user, logout } = useAuthStore()
  const { isOpen, isMobile, close } = useSidebarStore()
  const location = useLocation()

  useEffect(() => {
    if (isMobile) close()
  }, [location.pathname, isMobile, close])

  return (
    <>
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.button
            type="button"
            aria-label="Close sidebar overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden"
            onClick={close}
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: isOpen ? 0 : -SIDEBAR_WIDTH }}
        transition={sidebarTransition}
        style={{ width: SIDEBAR_WIDTH }}
        className={cn(
          'fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-cursor-border',
          'bg-cursor-surface/95 shadow-xl backdrop-blur-xl',
          isMobile ? 'shadow-2xl' : 'shadow-none'
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-cursor-border px-4 py-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <AppLogo size="sm" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-cursor-text">Profile Analyser</p>
              <p className="truncate text-[10px] font-mono text-cursor-muted">by GitHub API</p>
            </div>
          </div>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={close}
            aria-label="Close sidebar"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-cursor-muted transition-colors hover:bg-cursor-hover hover:text-cursor-text"
          >
            <PanelLeftClose className="h-4 w-4" />
          </motion.button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/dashboard'}
              onClick={() => {
                if (isMobile) close()
              }}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-cursor-hover text-cursor-text'
                    : 'text-cursor-muted hover:bg-cursor-hover/50 hover:text-cursor-text'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-lg border border-violet-500/20 bg-violet-500/10"
                      transition={sidebarTransition}
                    />
                  )}
                  <item.icon className="relative h-4 w-4 shrink-0" />
                  <span className="relative">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="space-y-3 border-t border-cursor-border p-4">
          <ThemeToggle className="w-full justify-center" showLabel />
          <div className="rounded-lg bg-cursor-elevated px-3 py-2">
            <p className="truncate text-xs font-medium text-cursor-text">{user?.username}</p>
            <p className="truncate text-[10px] text-cursor-muted">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout()
              window.location.href = '/login'
            }}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-cursor-muted transition-colors hover:bg-cursor-hover hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </motion.aside>
    </>
  )
}
