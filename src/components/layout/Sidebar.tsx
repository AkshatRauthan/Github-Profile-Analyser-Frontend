import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Search,
  UserPlus,
  Users,
  Trophy,
  Activity,
  LogOut,
  Sparkles,
  GitCompare,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { ThemeToggle } from '@/components/ThemeToggle'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/analyze', icon: UserPlus, label: 'Analyze' },
  { to: '/profiles', icon: Users, label: 'Profiles' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/compare', icon: GitCompare, label: 'Compare' },
  { to: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  { to: '/activity', icon: Activity, label: 'Activity' },
]

export function Sidebar() {
  const { user, logout } = useAuthStore()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-60 flex-col border-r border-cursor-border bg-cursor-surface/95 backdrop-blur-xl">
      <div className="flex items-center gap-2.5 border-b border-cursor-border px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg accent-gradient glow-accent">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-cursor-text">Profile Analyser</p>
          <p className="text-[10px] text-cursor-muted font-mono">by GitHub API</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              cn(
                'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'text-cursor-text bg-cursor-hover'
                  : 'text-cursor-muted hover:text-cursor-text hover:bg-cursor-hover/50'
              )
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg border border-violet-500/20 bg-violet-500/10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <item.icon className="relative h-4 w-4 shrink-0" />
                <span className="relative">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-cursor-border p-4 space-y-3">
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
    </aside>
  )
}
