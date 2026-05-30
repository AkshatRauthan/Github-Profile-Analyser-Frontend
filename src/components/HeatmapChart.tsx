import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import type { ContributionHeatmap } from '@/types'

interface HeatmapChartProps {
  data: ContributionHeatmap
}

function getBarColor(count: number): string {
  if (count === 0) return '#1f1f1f'
  if (count < 3) return '#3b0764'
  if (count < 6) return '#6d28d9'
  if (count < 10) return '#8b5cf6'
  return '#a78bfa'
}

export function HeatmapChart({ data }: HeatmapChartProps) {
  const chartData = data.days.map((d) => ({
    date: new Date(d.date).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    count: d.count,
  }))

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="date"
            tick={{ fill: '#71717a', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <Tooltip
            contentStyle={{
              background: '#1a1a1a',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            labelStyle={{ color: '#e4e4e7' }}
            formatter={(value) => [`${value} contributions`, '']}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, i) => (
              <Cell key={i} fill={getBarColor(entry.count)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
