'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const DATE_RANGES = [
  { value: 'last_7_days', label: 'Last 7 days' },
  { value: 'last_14_days', label: 'Last 14 days' },
  { value: 'last_30_days', label: 'Last 30 days' },
  { value: 'last_90_days', label: 'Last 90 days' },
  { value: 'this_month', label: 'This month' },
  { value: 'last_month', label: 'Last month' },
  { value: 'this_quarter', label: 'This quarter' },
  { value: 'this_year', label: 'This year' },
] as const

interface DateRangePickerProps {
  value: string
  onChange: (value: string) => void
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)
  const selected = DATE_RANGES.find((r) => r.value === value)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-md border border-white/10 bg-bg-surface px-4 py-2 text-sm text-white transition-colors hover:border-white/20"
      >
        {selected?.label ?? 'Select range'}
        <ChevronDown className="h-3.5 w-3.5 text-text-muted" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-md border border-white/[0.08] bg-bg-surface py-1 shadow-lg">
          {DATE_RANGES.map((range) => (
            <button
              key={range.value}
              onClick={() => {
                onChange(range.value)
                setOpen(false)
              }}
              className={cn(
                'block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-bg-subtle',
                range.value === value
                  ? 'text-brand-cyan'
                  : 'text-white'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
