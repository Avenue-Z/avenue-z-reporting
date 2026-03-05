import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  delta?: number // percentage change, e.g. 12.5 or -3.2
  prefix?: string // e.g. "$"
  suffix?: string // e.g. "%"
}

export function KpiCard({
  title,
  value,
  delta,
  prefix,
  suffix,
}: KpiCardProps) {
  return (
    <div className="rounded-lg border border-white/[0.08] bg-bg-surface px-6 py-5">

      <p className="text-xs font-extrabold uppercase tracking-widest text-text-muted">
        {title}
      </p>

      <p className="mt-2 text-3xl font-extrabold text-white">
        {prefix}
        {typeof value === 'number' ? value.toLocaleString() : value}
        {suffix}
      </p>

      {delta !== undefined && (
        <p
          className={cn(
            'mt-1 text-sm font-bold',
            delta > 0
              ? 'text-brand-green'
              : delta < 0
                ? 'text-[#FF4444]'
                : 'text-text-muted'
          )}
        >
          {delta > 0 ? '↑' : delta < 0 ? '↓' : '—'}{' '}
          {Math.abs(delta).toFixed(1)}% vs prior period
        </p>
      )}
    </div>
  )
}
