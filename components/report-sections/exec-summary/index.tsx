import { smQuery } from '@/lib/supermetrics/client'
import { DS_IDS } from '@/lib/supermetrics/constants'
import { KpiCard } from '@/components/charts/kpi-card'
import { AreaChart } from '@/components/charts/area-chart'
import { CHART_COLORS } from '@/lib/constants'

interface ExecSummaryProps {
  clientSlug: string
  dateRange: string
}

// Demo data for when Supermetrics API keys aren't configured yet
const DEMO_KPIS = [
  { title: 'Total Impressions', value: '1,247,893', delta: 12.3, accent: 'reputation' as const },
  { title: 'Clicks', value: '34,521', delta: 8.7, accent: 'reputation' as const },
  { title: 'Total Spend', value: '12,450', delta: -2.1, prefix: '$', accent: 'revenue' as const },
  { title: 'Sessions', value: '89,234', delta: 15.4, accent: 'revenue' as const },
  { title: 'Users', value: '62,108', delta: 11.2, accent: 'revenue' as const },
  { title: 'Conversions', value: '1,847', delta: 22.6, accent: 'revenue' as const },
  { title: 'Email Opens', value: '18,392', delta: 5.3, accent: 'revenue' as const },
  { title: 'Blended ROAS', value: '3.2', suffix: 'x', delta: 7.8, accent: 'full' as const },
]

const DEMO_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  sessions: Math.floor(2000 + Math.random() * 1500 + i * 30),
  conversions: Math.floor(40 + Math.random() * 30 + i * 2),
}))

export async function ExecSummary({ clientSlug, dateRange }: ExecSummaryProps) {
  // TODO: Replace with real Supermetrics queries once API keys are configured
  // Example of what the real data fetch would look like:
  //
  // const [ga4Data, metaData] = await Promise.all([
  //   smQuery({
  //     clientSlug,
  //     dsId: DS_IDS.GA4,
  //     fields: ['date', 'sessions', 'users', 'newUsers', 'conversions'],
  //     dateRange,
  //   }),
  //   smQuery({
  //     clientSlug,
  //     dsId: DS_IDS.META,
  //     fields: ['date', 'impressions', 'clicks', 'spend', 'conversions'],
  //     dateRange,
  //   }),
  // ])

  return (
    <div className="space-y-8">
      {/* Section heading */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
          Performance Overview
        </p>
        <h2 className="text-3xl font-extrabold uppercase text-white">
          Executive{' '}
          <span className="gradient-text-full">Summary</span>
        </h2>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {DEMO_KPIS.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
            accentGradient={kpi.accent}
          />
        ))}
      </div>

      {/* Trend chart */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-white">
          Sessions &amp; Conversions Trend
        </h3>
        <AreaChart
          data={DEMO_TREND}
          xKey="date"
          yKeys={[
            { key: 'sessions', color: CHART_COLORS.ga4, label: 'Sessions' },
            { key: 'conversions', color: CHART_COLORS.positive, label: 'Conversions' },
          ]}
          height={320}
        />
      </div>

      {/* Data freshness */}
      <p className="text-xs text-text-muted">
        Demo data — connect Supermetrics to see real metrics
      </p>
    </div>
  )
}
