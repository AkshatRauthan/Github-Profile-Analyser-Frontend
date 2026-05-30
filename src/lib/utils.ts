import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function personaLabel(key: string): string {
  return key
    .split('_')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export function gradeColor(grade: string): string {
  switch (grade) {
    case 'Excellent':
      return 'text-emerald-400'
    case 'Strong':
      return 'text-cursor-accent-hover'
    case 'Good':
      return 'text-blue-400'
    case 'Moderate':
      return 'text-cursor-warning'
    default:
      return 'text-cursor-muted'
  }
}

export function scoreColor(score: number): string {
  if (score >= 90) return 'text-emerald-400'
  if (score >= 75) return 'text-cursor-accent-hover'
  if (score >= 60) return 'text-blue-400'
  if (score >= 45) return 'text-cursor-warning'
  return 'text-cursor-muted'
}
