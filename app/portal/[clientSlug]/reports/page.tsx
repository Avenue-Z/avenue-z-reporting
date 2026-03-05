import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { getClientBySlug } from '@/lib/clients.config'
import { REPORT_NAMES } from '@/lib/constants'
import { ReportErrorBoundary } from '@/components/report-sections/error-boundary'
import { ExecSummary } from '@/components/report-sections/exec-summary'
import { GA4Report } from '@/components/report-sections/ga4'
import { MetaAdsReport } from '@/components/report-sections/meta-ads'
import { GoogleAdsReport } from '@/components/report-sections/google-ads'
import { EmailMarketingReport } from '@/components/report-sections/email-marketing'
import { BlendedPerformanceReport } from '@/components/report-sections/blended-performance'
import { LinkedInAdsReport } from '@/components/report-sections/linkedin-ads'
import { SnapchatAdsReport } from '@/components/report-sections/snapchat-ads'
import { TikTokAdsReport } from '@/components/report-sections/tiktok-ads'
import { ShopifyPerformanceReport } from '@/components/report-sections/shopify-performance'
import { HubSpotPerformanceReport } from '@/components/report-sections/hubspot-performance'
import { RedditAdsReport } from '@/components/report-sections/reddit-ads'
import { BingAdsReport } from '@/components/report-sections/bing-ads'
import { PortalReportDateRange } from './[reportSlug]/report-date-range'
import { PortalReportNav } from './report-nav'
import type { ReportSlug } from '@/lib/clients.config'

function SectionSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-lg border border-white/[0.06] bg-bg-surface"
          />
        ))}
      </div>
      <div className="h-80 animate-pulse rounded-lg border border-white/[0.06] bg-bg-surface" />
    </div>
  )
}

function getReportComponent(slug: ReportSlug, clientSlug: string, dateRange: string) {
  switch (slug) {
    case 'exec-summary':
      return <ExecSummary clientSlug={clientSlug} dateRange={dateRange} />
    case 'ga4':
      return <GA4Report clientSlug={clientSlug} dateRange={dateRange} />
    case 'meta-ads':
      return <MetaAdsReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'google-ads':
      return <GoogleAdsReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'email-marketing':
      return <EmailMarketingReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'blended-performance':
      return <BlendedPerformanceReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'linkedin-ads':
      return <LinkedInAdsReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'snapchat-ads':
      return <SnapchatAdsReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'tiktok-ads':
      return <TikTokAdsReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'shopify-performance':
      return <ShopifyPerformanceReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'hubspot-performance':
      return <HubSpotPerformanceReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'reddit-ads':
      return <RedditAdsReport clientSlug={clientSlug} dateRange={dateRange} />
    case 'bing-ads':
      return <BingAdsReport clientSlug={clientSlug} dateRange={dateRange} />
  }
}

export default async function PortalReportPage({
  params,
  searchParams,
}: {
  params: Promise<{ clientSlug: string }>
  searchParams: Promise<{ dateRange?: string; section?: string }>
}) {
  const { clientSlug } = await params
  const { dateRange: dateRangeParam, section } = await searchParams
  const client = getClientBySlug(clientSlug)
  if (!client) notFound()

  const dateRange = dateRangeParam ?? 'last_30_days'

  const activeSection = (
    client.enabledReports.includes(section as ReportSlug)
      ? section
      : client.enabledReports[0]
  ) as ReportSlug

  const reportName = REPORT_NAMES[activeSection] ?? activeSection

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
            {client.name}
          </p>
          <h1 className="text-3xl font-extrabold uppercase text-white">
            {reportName}
          </h1>
        </div>
        <PortalReportDateRange value={dateRange} />
      </div>

      <div className="divider-full mb-6" />

      <PortalReportNav
        sections={client.enabledReports}
        activeSection={activeSection}
        clientSlug={clientSlug}
      />

      <ReportErrorBoundary sectionName={reportName}>
        <Suspense fallback={<SectionSkeleton />}>
          {getReportComponent(activeSection, clientSlug, dateRange)}
        </Suspense>
      </ReportErrorBoundary>
    </div>
  )
}
