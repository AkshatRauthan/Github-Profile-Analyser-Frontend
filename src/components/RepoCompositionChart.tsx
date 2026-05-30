import { useMemo, useState } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import type { CompositionSlice, RepoComposition } from '@/types'

type CompositionDimension = 'languages' | 'technologies' | 'frameworks' | 'repoTypes'

const DIMENSIONS: { key: CompositionDimension; label: string }[] = [
  { key: 'languages', label: 'Languages' },
  { key: 'technologies', label: 'Technologies' },
  { key: 'frameworks', label: 'Frameworks' },
  { key: 'repoTypes', label: 'Repo types' },
]

const CHART_COLORS = [
  '#8b5cf6',
  '#6366f1',
  '#22c55e',
  '#14b8a6',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#06b6d4',
  '#a3a3a3',
]

interface RepoCompositionChartProps {
  data: RepoComposition
}

export function RepoCompositionChart({ data }: RepoCompositionChartProps) {
  const [dimension, setDimension] = useState<CompositionDimension>('languages')

  const slices = useMemo(() => data[dimension], [data, dimension])

  const chartData = slices.map((slice) => ({
    name: slice.label,
    value: slice.count,
    percentage: slice.percentage,
  }))

  if (!chartData.length) {
    return (
      <p className="py-10 text-center text-sm text-cursor-muted">
        No repository breakdown available for this profile.
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1 rounded-lg border border-cursor-border p-0.5">
        {DIMENSIONS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setDimension(key)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              dimension === key
                ? 'bg-cursor-hover text-cursor-text'
                : 'text-cursor-muted hover:text-cursor-text'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="text-xs text-cursor-muted">
        Based on {data.totalRepos} analyzed repos · percentages show share of repositories in each
        category
      </p>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={88}
              paddingAngle={2}
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: '#1a1a1a',
                border: '1px solid #2a2a2a',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(_value, _name, item) => {
                const payload = item.payload as CompositionSlice & { name: string; value: number }
                return [`${payload.value} repos (${payload.percentage}%)`, payload.name]
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-xs text-cursor-muted">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {slices.map((slice, index) => (
          <div
            key={slice.label}
            className="flex items-center justify-between rounded-lg border border-cursor-border bg-cursor-elevated/50 px-3 py-2 text-xs"
          >
            <span className="flex items-center gap-2 text-cursor-text">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
              />
              {slice.label}
            </span>
            <span className="font-mono text-cursor-muted">
              {slice.count} · {slice.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
