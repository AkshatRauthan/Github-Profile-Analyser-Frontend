import { Outlet } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sidebar } from './Sidebar'
import { AppHeader } from './AppHeader'
import { useSidebarLayout } from '@/hooks/useSidebarLayout'
import { useSidebarStore, SIDEBAR_WIDTH } from '@/store/sidebarStore'

const mainTransition = { type: 'spring' as const, stiffness: 400, damping: 35 }

export function AppLayout() {
  useSidebarLayout()
  const { isOpen, isMobile } = useSidebarStore()

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Sidebar />

      <motion.main
        initial={false}
        animate={{
          marginLeft: !isMobile && isOpen ? SIDEBAR_WIDTH : 0,
        }}
        transition={mainTransition}
        className="app-reports min-h-screen min-w-0 w-full p-4 sm:p-6 lg:p-8"
      >
        <AppHeader />
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Outlet />
        </motion.div>
      </motion.main>
    </div>
  )
}
