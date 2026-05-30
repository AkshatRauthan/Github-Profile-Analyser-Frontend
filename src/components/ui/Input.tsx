import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => (
    <div className="space-y-1.5">
      {label && (
        <label className="text-xs font-medium text-cursor-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-lg border border-cursor-border bg-cursor-elevated px-4 py-2.5 text-sm text-cursor-text',
          'placeholder:text-cursor-muted/60 focus:outline-none focus:ring-2 focus:ring-cursor-accent/40 focus:border-cursor-accent/50',
          'transition-all duration-200',
          error && 'border-red-500/50 focus:ring-red-500/30',
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
)
Input.displayName = 'Input'
