import { getAllClients } from '@/lib/clients.config'
import { Header } from '@/components/layout/header'
import { DS_IDS } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'
import { ClientConnectionRow } from './client-connection-row'

const PLATFORMS: DsId[] = [
  DS_IDS.GA4,
  DS_IDS.META,
  DS_IDS.GOOGLE_ADS,
  DS_IDS.MAILCHIMP,
  DS_IDS.KLAVIYO,
  DS_IDS.LINKEDIN,
  DS_IDS.TIKTOK,
  DS_IDS.SNAPCHAT,
  DS_IDS.REDDIT,
  DS_IDS.BING_ADS,
  DS_IDS.SHOPIFY,
  DS_IDS.HUBSPOT,
  DS_IDS.TIKTOK_SHOP,
  DS_IDS.LINKEDIN_PAGES,
  DS_IDS.FACEBOOK_INSIGHTS,
  DS_IDS.INSTAGRAM_INSIGHTS,
  DS_IDS.TIKTOK_INSIGHTS,
  DS_IDS.SALESFORCE,
  DS_IDS.X_ADS,
  DS_IDS.X_INSIGHTS,
  DS_IDS.WOOCOMMERCE,
  DS_IDS.APPLOVIN,
  DS_IDS.AHREFS,
  DS_IDS.GOOGLE_SEARCH_CONSOLE,
]

export default function ConnectionsPage() {
  const clients = getAllClients()

  // TODO: Fetch real connection status from Supermetrics once API keys are configured
  // Shape: { [clientSlug]: { [dsId]: { status, connectedAt? } } }
  const connectionData: Record<
    string,
    Record<string, { status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'; connectedAt?: string }>
  > = {}

  return (
    <>
      <Header title="Connections" subtitle="Avenue Z" />

      <div className="flex flex-col gap-3">
        {clients.map((client) => {
          const clientConnections = connectionData[client.slug] ?? {}
          const connectedCount = PLATFORMS.filter(
            (dsId) => clientConnections[dsId]?.status === 'CONNECTED'
          ).length
          const expiredCount = PLATFORMS.filter(
            (dsId) => clientConnections[dsId]?.status === 'EXPIRED'
          ).length

          return (
            <ClientConnectionRow
              key={client.slug}
              clientSlug={client.slug}
              clientName={client.name}
              platforms={PLATFORMS}
              connectionMap={clientConnections}
              connectedCount={connectedCount}
              expiredCount={expiredCount}
              totalCount={PLATFORMS.length}
            />
          )
        })}
      </div>
    </>
  )
}
