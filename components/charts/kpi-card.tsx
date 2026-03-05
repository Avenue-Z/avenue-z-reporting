import { cn } from '@/lib/utils'

interface KpiCardProps {
  title: string
  value: string | number
  delta?: number // percentage change, e.g. 12.5 or -3.2
  prefix?: string // e.g. "$"
  suffix?: string // e.g. "%"
  accentGradient?: 'revenue' | 'reputation' | 'full'
}

export function KpiCard({
  title,
  value,
  delta,
  prefix,
  suffix,
  accentGradient = 'revenue',
}: KpiCardProps) {
  const gradientClass = {
    revenue: 'bg-gradient-to-r from-brand-yellow via-brand-green to-brand-cyan',
    reputation: 'bg-gradient-to-r from-brand-cyan via-brand-blue to-brand-purple',
    full: 'bg-gradient-to-r from-brand-yellow via-brand-green via-brand-cyan via-brand-blue to-brand-purple',
  }[accentGradient]

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/[0.08] bg-bg-surface px-6 py-5">
      {/* Top gradient accent */}
      <div className={cn('absolute left-0 right-0 top-0 h-0.5', gradientClass)} />

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
