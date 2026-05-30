import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
  delay?: number
}

export function Card({ children, className, hover = false, glow = false, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hover ? { y: -2, transition: { duration: 0.2 } } : undefined}
      className={cn(
        'glass-panel rounded-xl p-5',
        hover && 'cursor-pointer hover:border-cursor-accent/30 hover:shadow-lg hover:shadow-violet-500/5',
        glow && 'glow-accent',
        className
      )}
    >
      {children}
    </motion.div>
  )
}
