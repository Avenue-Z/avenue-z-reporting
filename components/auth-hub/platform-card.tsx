import { cn } from '@/lib/utils'
import { DS_NAMES } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'
import { ConnectButton } from './connect-button'
import { PLATFORM_ICONS } from './platform-icons'

interface PlatformCardProps {
  clientSlug: string
  dsId: DsId
  status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'
  connectedAt?: string
}

const statusConfig = {
  CONNECTED: {
    label: 'Connected',
    className: 'border-brand-green text-brand-green',
  },
  EXPIRED: {
    label: 'Expired',
    className: 'border-brand-purple text-brand-purple',
  },
  NOT_CONNECTED: {
    label: 'Not Connected',
    className: 'border-text-muted/30 text-text-muted',
  },
} as const

export function PlatformCard({
  clientSlug,
  dsId,
  status,
  connectedAt,
}: PlatformCardProps) {
  const badge = statusConfig[status]
  const platform = PLATFORM_ICONS[dsId]

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-bg-surface p-6">
      <div className="mb-4">
        <platform.Icon size={32} color={platform.color} />
      </div>
      <h3 className="text-lg font-bold text-white">{DS_NAMES[dsId]}</h3>

      <span
        className={cn(
          'mt-2 inline-flex items-center rounded-[100px] border px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest',
          badge.className
        )}
      >
        {badge.label}
      </span>

      {connectedAt && (
        <p className="mt-2 text-xs text-text-muted">
          Connected {new Date(connectedAt).toLocaleDateString()}
        </p>
      )}

      <ConnectButton clientSlug={clientSlug} dsId={dsId} status={status} />
    </div>
  )
}
