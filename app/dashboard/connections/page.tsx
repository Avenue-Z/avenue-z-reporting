import { getAllClients } from '@/lib/clients.config'
import { Header } from '@/components/layout/header'
import { PlatformCard } from '@/components/auth-hub/platform-card'
import { DS_IDS } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'

const PLATFORMS: { dsId: DsId; icon: string }[] = [
  { dsId: DS_IDS.GA4, icon: '📊' },
  { dsId: DS_IDS.META, icon: '📘' },
  { dsId: DS_IDS.GOOGLE_ADS, icon: '📢' },
  { dsId: DS_IDS.MAILCHIMP, icon: '📧' },
  { dsId: DS_IDS.KLAVIYO, icon: '🎯' },
  { dsId: DS_IDS.LINKEDIN, icon: '💼' },
  { dsId: DS_IDS.TIKTOK, icon: '🎵' },
  { dsId: DS_IDS.SNAPCHAT, icon: '👻' },
  { dsId: DS_IDS.REDDIT, icon: '🟠' },
  { dsId: DS_IDS.BING_ADS, icon: '🔍' },
  { dsId: DS_IDS.SHOPIFY, icon: '🛍️' },
  { dsId: DS_IDS.HUBSPOT, icon: '🧡' },
]

export default function ConnectionsPage() {
  const clients = getAllClients()

  // TODO: Fetch real connection status from Supermetrics once API keys are configured
  // For now, all platforms show as NOT_CONNECTED
  const connectionMap: Record<
    string,
    { status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'; connectedAt?: string }
  > = {}

  return (
    <>
      <Header title="Connections" subtitle="Avenue Z">
        <span className="text-sm text-text-muted">
          Manage platform connections for all clients
        </span>
      </Header>

      <div className="flex flex-col gap-12">
        {clients.map((client) => (
          <section key={client.slug}>
            <h2 className="mb-4 text-xl font-extrabold text-white">
              {client.name}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
          </section>
        ))}
      </div>
    </>
  )
}
