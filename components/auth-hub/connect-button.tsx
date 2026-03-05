'use client'

import { useState } from 'react'
import { generateLoginLink } from '@/app/actions/supermetrics'
import type { DsId } from '@/lib/supermetrics/constants'

interface ConnectButtonProps {
  clientSlug: string
  dsId: DsId
  status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'
}

export function ConnectButton({ clientSlug, dsId, status }: ConnectButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleConnect = async () => {
    setLoading(true)
    try {
      const loginUrl = await generateLoginLink(clientSlug, dsId)
      window.open(loginUrl, '_blank', 'width=600,height=700')
    } catch {
      // TODO: show error toast
      console.error('Failed to generate login link')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'CONNECTED') {
    return (
      <button
        disabled
        className="mt-4 block w-full cursor-default rounded-[100px] border border-brand-green/30 bg-transparent px-5 py-2.5 text-sm font-bold text-brand-green"
      >
        Connected
      </button>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="mt-4 block w-full rounded-[100px] bg-gradient-to-r from-brand-yellow via-brand-green to-brand-cyan px-5 py-2.5 text-sm font-extrabold uppercase tracking-wider text-black transition-opacity hover:opacity-90 disabled:opacity-50"
    >
      {loading ? 'Generating...' : status === 'EXPIRED' ? 'Reconnect' : 'Connect'}
    </button>
  )
}
