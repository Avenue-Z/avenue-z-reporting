import { notFound } from 'next/navigation'
import { getClientBySlug } from '@/lib/clients.config'
import { PlatformCard } from '@/components/auth-hub/platform-card'
import { DS_IDS } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'

const PLATFORMS: { dsId: DsId; icon: string }[] = [
  { dsId: DS_IDS.GA4, icon: '📊' },
  { dsId: DS_IDS.META, icon: '📘' },
  { dsId: DS_IDS.GOOGLE_ADS, icon: '📢' },
  { dsId: DS_IDS.MAILCHIMP, icon: '📧' },
]

export default async function ClientAuthPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>
}) {
  const { clientSlug } = await params
  const client = getClientBySlug(clientSlug)
  if (!client) notFound()

  // TODO: Fetch real connection status once API keys are configured
  const connectionMap: Record<string, { status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'; connectedAt?: string }> = {}

  return (
    <div className="mx-auto max-w-5xl px-8 py-12">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
          {client.name}
        </p>
        <h1 className="text-3xl font-extrabold text-white">
          Connect Your{' '}
          <span className="gradient-text-full">Platforms</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {PLATFORMS.map(({ dsId, icon }) => {
          const conn = connectionMap[dsId]
          return (
            <PlatformCard
              key={dsId}
              clientSlug={client.slug}
              dsId={dsId}
              icon={icon}
              status={conn?.status ?? 'NOT_CONNECTED'}
              connectedAt={conn?.connectedAt}
            />
          )
        })}
      </div>
    </div>
  )
}
