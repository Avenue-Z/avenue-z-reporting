import { notFound } from 'next/navigation'
import { getClientBySlug } from '@/lib/clients.config'
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
    </div>
  )
}
