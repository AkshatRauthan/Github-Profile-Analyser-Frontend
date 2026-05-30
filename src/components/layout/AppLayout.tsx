import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { motion } from 'framer-motion'

export function AppLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="app-reports ml-60 min-h-screen p-8"
      >
        <Outlet />
      </motion.main>
    </div>
  )
}
