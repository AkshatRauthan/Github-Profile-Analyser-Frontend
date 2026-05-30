import { useMemo, useRef, useState } from 'react'
import type { ContributionHeatmap } from '@/types'

interface HeatmapChartProps {
  data: ContributionHeatmap
}

interface CalendarCell {
  date: string
  count: number
  inRange: boolean
}

interface TooltipState {
  text: string
  left: number
  top: number
}

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CELL_SIZE = 15
const CELL_GAP = 3
const WEEK_STEP = CELL_SIZE + CELL_GAP

function parseDateOnly(iso: string): Date {
  const [y, m, d] = iso.split('T')[0].split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function formatDateKey(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 5) return 2
  if (count <= 9) return 3
  return 4
}

const LEVEL_CLASSES: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: 'bg-[#161b22]',
  1: 'bg-[#0e4429]',
  2: 'bg-[#006d32]',
  3: 'bg-[#26a641]',
  4: 'bg-[#39d353]',
}

function buildWeeks(data: ContributionHeatmap): CalendarCell[][] {
  const countMap = new Map(data.days.map((d) => [d.date.split('T')[0], d.count]))
  const rangeStart = parseDateOnly(data.from)
  const rangeEnd = parseDateOnly(data.to)

  const gridStart = new Date(rangeStart)
  gridStart.setUTCDate(gridStart.getUTCDate() - gridStart.getUTCDay())

  const weeks: CalendarCell[][] = []
  const cursor = new Date(gridStart)

  while (cursor <= rangeEnd || cursor.getUTCDay() !== 0) {
    const week: CalendarCell[] = []
    for (let i = 0; i < 7; i += 1) {
      const key = formatDateKey(cursor)
      const inRange = cursor >= rangeStart && cursor <= rangeEnd
      week.push({
        date: key,
        count: inRange ? (countMap.get(key) ?? 0) : 0,
        inRange,
      })
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    weeks.push(week)
    if (cursor > rangeEnd && cursor.getUTCDay() === 0) break
  }

  return weeks
}

function buildMonthLabels(weeks: CalendarCell[][]): { label: string; weekIndex: number }[] {
  const labels: { label: string; weekIndex: number }[] = []
  let lastMonth = -1

  weeks.forEach((week, weekIndex) => {
    const firstInRange = week.find((cell) => cell.inRange)
    if (!firstInRange) return

    const month = parseDateOnly(firstInRange.date).getUTCMonth()
    if (month !== lastMonth) {
      labels.push({ label: MONTH_LABELS[month], weekIndex })
      lastMonth = month
    }
  })

  return labels
}

function clampTooltipPosition(
  left: number,
  top: number,
  anchorWidth: number
): { left: number; top: number } {
  const padding = 8
  const tooltipHalfWidth = 72
  const tooltipHeight = 28

  return {
    left: Math.min(
      Math.max(left, padding + tooltipHalfWidth),
      anchorWidth - padding - tooltipHalfWidth
    ),
    top: Math.max(top - tooltipHeight - 6, padding),
  }
}

export function HeatmapChart({ data }: HeatmapChartProps) {
  const weeks = useMemo(() => buildWeeks(data), [data])
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks])
  const anchorRef = useRef<HTMLDivElement>(null)
  const [tooltip, setTooltip] = useState<TooltipState | null>(null)

  const gridWidth = weeks.length * WEEK_STEP
  const gridHeight = 7 * CELL_SIZE + 6 * CELL_GAP

  function showTooltip(cell: CalendarCell, target: HTMLButtonElement) {
    const anchor = anchorRef.current
    if (!anchor || !cell.inRange) return

    const anchorRect = anchor.getBoundingClientRect()
    const cellRect = target.getBoundingClientRect()
    const left = cellRect.left - anchorRect.left + CELL_SIZE / 2
    const top = cellRect.top - anchorRect.top

    const clamped = clampTooltipPosition(left, top, anchor.offsetWidth)

    setTooltip({
      text: `${cell.count} contribution${cell.count === 1 ? '' : 's'}`,
      left: clamped.left,
      top: clamped.top,
    })
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-cursor-border/50 bg-cursor-elevated/30 px-3 py-3">
      <div ref={anchorRef} className="relative mx-auto w-fit min-w-min">
        {tooltip && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 rounded-md border border-cursor-border bg-cursor-elevated px-2 py-1 text-xs whitespace-nowrap text-cursor-text shadow-lg"
            style={{ left: tooltip.left, top: tooltip.top }}
          >
            {tooltip.text}
          </div>
        )}

        <div className="relative mb-2 ml-9 h-4" style={{ width: gridWidth }}>
          {monthLabels.map(({ label, weekIndex }) => (
            <span
              key={`${label}-${weekIndex}`}
              className="absolute text-xs text-cursor-muted"
              style={{ left: `${weekIndex * WEEK_STEP}px` }}
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <div
            className="flex w-8 shrink-0 flex-col justify-between text-xs leading-none text-cursor-muted"
            style={{ height: gridHeight }}
          >
            {DAY_LABELS.map((day, index) => (
              <span key={day} className={index % 2 === 0 ? 'opacity-0' : ''}>
                {day}
              </span>
            ))}
          </div>

          <div className="flex" style={{ gap: CELL_GAP }}>
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col" style={{ gap: CELL_GAP }}>
                {week.map((cell) => {
                  const level = cell.inRange ? getLevel(cell.count) : 0
                  return (
                    <button
                      key={cell.date}
                      type="button"
                      aria-label={`${cell.date}: ${cell.count} contributions`}
                      style={{ width: CELL_SIZE, height: CELL_SIZE }}
                      className={`rounded-[3px] border border-transparent transition-transform hover:scale-110 hover:border-cursor-border ${
                        cell.inRange ? LEVEL_CLASSES[level] : 'bg-transparent'
                      }`}
                      onMouseEnter={(e) => showTooltip(cell, e.currentTarget)}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  )
                })}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-3 flex items-center justify-center gap-1.5 text-xs text-cursor-muted"
          style={{ width: gridWidth + 40 }}
        >
          <span>Less</span>
          {([0, 1, 2, 3, 4] as const).map((level) => (
            <span
              key={level}
              className={`inline-block shrink-0 rounded-[3px] ${LEVEL_CLASSES[level]}`}
              style={{ width: CELL_SIZE, height: CELL_SIZE }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  )
}
