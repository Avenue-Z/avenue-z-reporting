import { getAllClients } from '@/lib/clients.config'
import { Header } from '@/components/layout/header'
import { DS_IDS, DS_NAMES } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'
import { PLATFORM_ICONS } from '@/components/auth-hub/platform-icons'
import { ConnectionCell } from './connection-cell'

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
      <Header title="Connections" subtitle="Avenue Z">
        <div className="flex items-center gap-6 text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-green" />
            Connected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-brand-purple" />
            Expired
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#3a3a3a]" />
            Not Connected
          </span>
        </div>
      </Header>

      <div className="overflow-x-auto rounded-lg border border-white/[0.06]">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-white/[0.06] bg-bg-surface">
              <th className="sticky left-0 z-10 bg-bg-surface px-4 py-3 text-left text-xs font-extrabold uppercase tracking-widest text-text-muted">
                Client
              </th>
              {PLATFORMS.map((dsId) => {
                const platform = PLATFORM_ICONS[dsId]
                return (
                  <th
                    key={dsId}
                    className="px-2 py-3 text-center"
                    title={DS_NAMES[dsId]}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <platform.Icon size={16} color={platform.color} />
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => {
              const clientConnections = connectionData[client.slug] ?? {}
              return (
                <tr
                  key={client.slug}
                  className="border-b border-white/[0.06] transition-colors hover:bg-white/[0.02]"
                >
                  <td className="sticky left-0 z-10 bg-black px-4 py-3 text-sm font-bold text-white">
                    {client.name}
                  </td>
                  {PLATFORMS.map((dsId) => {
                    const conn = clientConnections[dsId]
                    const status = conn?.status ?? 'NOT_CONNECTED'
                    return (
                      <td key={dsId} className="px-2 py-3 text-center">
                        <ConnectionCell
                          clientSlug={client.slug}
                          dsId={dsId}
                          status={status}
                        />
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
