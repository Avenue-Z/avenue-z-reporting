'use client'

import { cn } from '@/lib/utils'
import { DS_NAMES } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'
import { generateLoginLink } from '@/app/actions/supermetrics'

const statusStyles = {
  CONNECTED: 'bg-brand-green',
  EXPIRED: 'bg-brand-purple',
  NOT_CONNECTED: 'bg-[#3a3a3a]',
} as const

export function ConnectionCell({
  clientSlug,
  dsId,
  status,
}: {
  clientSlug: string
  dsId: DsId
  status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'
}) {
  const handleClick = async () => {
    if (status === 'CONNECTED') return
    try {
      const loginUrl = await generateLoginLink(clientSlug, dsId)
      if (loginUrl) {
        window.open(loginUrl, '_blank', 'width=600,height=700')
      }
    } catch {
      // TODO: Show error toast
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === 'CONNECTED'}
      title={`${DS_NAMES[dsId]} — ${status.replace('_', ' ').toLowerCase()}`}
      className={cn(
        'mx-auto block h-3 w-3 rounded-full transition-all',
        statusStyles[status],
        status !== 'CONNECTED' && 'cursor-pointer hover:scale-150 hover:ring-2 hover:ring-white/20'
      )}
    />
  )
}
