import { getAllClients } from '@/lib/clients.config'
import { Header } from '@/components/layout/header'
import { PlatformCard } from '@/components/auth-hub/platform-card'
import { DS_IDS } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'

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
              {PLATFORMS.map((dsId) => {
                const conn = connectionMap[dsId]
                return (
                  <PlatformCard
                    key={dsId}
                    clientSlug={client.slug}
                    dsId={dsId}
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
