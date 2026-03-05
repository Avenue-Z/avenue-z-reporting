'use client'

import { useState } from 'react'
import { Link2 } from 'lucide-react'
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
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-[100px] border border-brand-green/30 bg-transparent px-5 py-2.5 text-sm font-bold text-brand-green"
      >
        <Link2 className="h-3.5 w-3.5" />
        Connected
      </button>
    )
  }

  return (
    <button
      onClick={handleConnect}
      disabled={loading}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-[100px] border border-white/20 bg-white px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-white/90 disabled:opacity-50"
    >
      <Link2 className="h-3.5 w-3.5" />
      {loading ? 'Generating...' : status === 'EXPIRED' ? 'Reconnect' : 'Connect'}
    </button>
  )
}
