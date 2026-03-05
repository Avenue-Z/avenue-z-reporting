'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PlatformCard } from '@/components/auth-hub/platform-card'
import type { DsId } from '@/lib/supermetrics/constants'

interface ClientConnectionRowProps {
  clientSlug: string
  clientName: string
  platforms: DsId[]
  connectionMap: Record<string, { status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'; connectedAt?: string }>
  connectedCount: number
  expiredCount: number
  totalCount: number
}

export function ClientConnectionRow({
  clientSlug,
  clientName,
  platforms,
  connectionMap,
  connectedCount,
  expiredCount,
  totalCount,
}: ClientConnectionRowProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.06] bg-bg-surface">
      {/* Summary row */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex items-center gap-4">
          <h3 className="text-base font-extrabold text-white">{clientName}</h3>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-brand-green">
              <span className="inline-block h-2 w-2 rounded-full bg-brand-green" />
              {connectedCount} connected
            </span>
            {expiredCount > 0 && (
              <span className="flex items-center gap-1.5 text-brand-purple">
                <span className="inline-block h-2 w-2 rounded-full bg-brand-purple" />
                {expiredCount} expired
              </span>
            )}
            <span className="text-text-muted">
              {totalCount - connectedCount - expiredCount} remaining
            </span>
          </div>
        </div>

        <ChevronDown
          className={cn(
            'h-4 w-4 text-text-muted transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {/* Expanded platform grid */}
      {isOpen && (
        <div className="border-t border-white/[0.06] px-6 py-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {platforms.map((dsId) => {
              const conn = connectionMap[dsId]
              return (
                <PlatformCard
                  key={dsId}
                  clientSlug={clientSlug}
                  dsId={dsId}
                  status={conn?.status ?? 'NOT_CONNECTED'}
                  connectedAt={conn?.connectedAt}
                />
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
