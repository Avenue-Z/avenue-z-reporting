import { notFound } from 'next/navigation'
import { getClientBySlug } from '@/lib/clients.config'
import { Header } from '@/components/layout/header'
import { PlatformCard } from '@/components/auth-hub/platform-card'
import { DS_IDS } from '@/lib/supermetrics/constants'
import type { DsId } from '@/lib/supermetrics/constants'

const PLATFORMS: { dsId: DsId; icon: string }[] = [
  { dsId: DS_IDS.GA4, icon: '📊' },
  { dsId: DS_IDS.META, icon: '📘' },
  { dsId: DS_IDS.GOOGLE_ADS, icon: '📢' },
  { dsId: DS_IDS.MAILCHIMP, icon: '📧' },
  { dsId: DS_IDS.LINKEDIN, icon: '💼' },
  { dsId: DS_IDS.TIKTOK, icon: '🎵' },
  { dsId: DS_IDS.SNAPCHAT, icon: '👻' },
  { dsId: DS_IDS.REDDIT, icon: '🟠' },
  { dsId: DS_IDS.BING_ADS, icon: '🔍' },
  { dsId: DS_IDS.SHOPIFY, icon: '🛍️' },
  { dsId: DS_IDS.HUBSPOT, icon: '🧡' },
  { dsId: DS_IDS.KLAVIYO, icon: '🎯' },
  { dsId: DS_IDS.TIKTOK_SHOP, icon: '🛒' },
  { dsId: DS_IDS.LINKEDIN_PAGES, icon: '📄' },
  { dsId: DS_IDS.FACEBOOK_INSIGHTS, icon: '📈' },
  { dsId: DS_IDS.INSTAGRAM_INSIGHTS, icon: '📸' },
  { dsId: DS_IDS.TIKTOK_INSIGHTS, icon: '📱' },
  { dsId: DS_IDS.SALESFORCE, icon: '☁️' },
  { dsId: DS_IDS.X_ADS, icon: '𝕏' },
  { dsId: DS_IDS.X_INSIGHTS, icon: '𝕏' },
  { dsId: DS_IDS.WOOCOMMERCE, icon: '🟣' },
  { dsId: DS_IDS.APPLOVIN, icon: '🦁' },
  { dsId: DS_IDS.AHREFS, icon: '🔗' },
  { dsId: DS_IDS.GOOGLE_SEARCH_CONSOLE, icon: '🌐' },
]

export default async function AuthHubPage({
  params,
}: {
  params: Promise<{ clientSlug: string }>
}) {
  const { clientSlug } = await params
  const client = getClientBySlug(clientSlug)
  if (!client) notFound()

  // TODO: Fetch real connection status from Supermetrics once API keys are configured
  // const connections = await getConnectionStatus(clientSlug)
  // For now, all platforms show as NOT_CONNECTED
  const connectionMap: Record<string, { status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'; connectedAt?: string }> = {}

  return (
    <>
      <Header title="Auth Hub" subtitle={client.name}>
        <span className="text-sm text-text-muted">
          Connect your marketing platforms
        </span>
      </Header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </>
  )
}
