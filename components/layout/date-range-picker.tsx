'use client'

import { useState } from 'react'
import { format, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear, subMonths, subQuarters, subYears } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { DateRange } from 'react-day-picker'

const PRESETS = [
  { value: 'last_7_days', label: 'Last 7 Days' },
  { value: 'last_14_days', label: 'Last 14 Days' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: 'last_60_days', label: 'Last 60 Days' },
  { value: 'last_90_days', label: 'Last 90 Days' },
  { value: 'this_week', label: 'This Week' },
  { value: 'last_week', label: 'Last Week' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
  { value: 'this_quarter', label: 'This Quarter' },
  { value: 'last_quarter', label: 'Last Quarter' },
  { value: 'this_year', label: 'This Year' },
  { value: 'last_year', label: 'Last Year' },
  { value: 'year_to_date', label: 'Year to Date' },
] as const

function getDisplayLabel(value: string): string {
  const preset = PRESETS.find((p) => p.value === value)
  if (preset) return preset.label

  if (value.startsWith('custom:')) {
    const [start, end] = value.replace('custom:', '').split(',')
    if (start && end) {
      return `${format(new Date(start), 'MMM d, yyyy')} – ${format(new Date(end), 'MMM d, yyyy')}`
    }
  }

  return 'Last 30 Days'
}

function presetToDateRange(value: string): DateRange | undefined {
  const today = new Date()

  switch (value) {
    case 'last_7_days':
      return { from: subDays(today, 7), to: today }
    case 'last_14_days':
      return { from: subDays(today, 14), to: today }
    case 'last_30_days':
      return { from: subDays(today, 30), to: today }
    case 'last_60_days':
      return { from: subDays(today, 60), to: today }
    case 'last_90_days':
      return { from: subDays(today, 90), to: today }
    case 'this_week':
      return { from: startOfWeek(today), to: today }
    case 'last_week': {
      const lastWeekStart = startOfWeek(subDays(today, 7))
      return { from: lastWeekStart, to: endOfWeek(lastWeekStart) }
    }
    case 'this_month':
      return { from: startOfMonth(today), to: today }
    case 'last_month': {
      const lastMonthStart = startOfMonth(subMonths(today, 1))
      return { from: lastMonthStart, to: endOfMonth(lastMonthStart) }
    }
    case 'this_quarter':
      return { from: startOfQuarter(today), to: today }
    case 'last_quarter': {
      const lastQuarterStart = startOfQuarter(subQuarters(today, 1))
      return { from: lastQuarterStart, to: endOfQuarter(lastQuarterStart) }
    }
    case 'this_year':
      return { from: startOfYear(today), to: today }
    case 'last_year': {
      const lastYearStart = startOfYear(subYears(today, 1))
      return { from: lastYearStart, to: endOfYear(lastYearStart) }
    }
    case 'year_to_date':
      return { from: startOfYear(today), to: today }
    default:
      return undefined
  }
}

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const [calendarRange, setCalendarRange] = useState<DateRange | undefined>(
    presetToDateRange(value)
  )

  const handlePresetSelect = (preset: string) => {
    setCalendarRange(presetToDateRange(preset))
    onChange(preset)
    setOpen(false)
  }

  const handleCalendarSelect = (range: DateRange | undefined) => {
    setCalendarRange(range)
  }

  const handleApplyCustom = () => {
    if (calendarRange?.from && calendarRange?.to) {
      const start = format(calendarRange.from, 'yyyy-MM-dd')
      const end = format(calendarRange.to, 'yyyy-MM-dd')
      onChange(`custom:${start},${end}`)
      setOpen(false)
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-2 rounded-md border border-white/10 bg-bg-surface px-4 py-2 text-sm text-white transition-colors hover:border-white/20">
          <CalendarIcon className="h-3.5 w-3.5 text-text-muted" />
          {getDisplayLabel(value)}
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto border-white/[0.08] bg-[#1a1a1a] p-0"
        align="end"
        sideOffset={8}
      >
        <div className="flex">
          {/* Presets */}
          <div className="flex w-44 flex-col border-r border-white/[0.06] py-2">
            <p className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-widest text-text-muted">
              Quick Select
            </p>
            <div className="max-h-[360px] overflow-y-auto">
              {PRESETS.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => handlePresetSelect(preset.value)}
                  className={cn(
                    'block w-full px-3 py-1.5 text-left text-[13px] transition-colors hover:bg-white/[0.06]',
                    preset.value === value
                      ? 'font-bold text-brand-cyan'
                      : 'text-white/80'
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar */}
          <div className="flex flex-col p-3">
            <p className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-text-muted">
              Custom Range
            </p>
            <Calendar
              mode="range"
              selected={calendarRange}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              disabled={{ after: new Date() }}
              className="!bg-transparent"
            />

            {/* Custom range footer */}
            <div className="mt-2 flex items-center justify-between border-t border-white/[0.06] pt-3">
              <p className="text-xs text-text-muted">
                {calendarRange?.from && calendarRange?.to
                  ? `${format(calendarRange.from, 'MMM d, yyyy')} – ${format(calendarRange.to, 'MMM d, yyyy')}`
                  : calendarRange?.from
                    ? `${format(calendarRange.from, 'MMM d, yyyy')} – ...`
                    : 'Select start and end dates'}
              </p>
              <button
                onClick={handleApplyCustom}
                disabled={!calendarRange?.from || !calendarRange?.to}
                className="rounded-[100px] bg-gradient-to-r from-brand-yellow via-brand-green to-brand-cyan px-4 py-1.5 text-xs font-bold text-black transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
