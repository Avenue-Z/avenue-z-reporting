import { KpiCard } from '@/components/charts/kpi-card'
import { AreaChart } from '@/components/charts/area-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { DataTable } from '@/components/charts/data-table'
import { CHART_COLORS } from '@/lib/constants'

interface HubSpotPerformanceProps {
  clientSlug: string
  dateRange: string
}

const DEMO_KPIS = [
  { title: 'Contacts Created', value: '1,284', delta: 14.8 },
  { title: 'MQLs', value: '342', delta: 22.1 },
  { title: 'SQLs', value: '128', delta: 18.4 },
  { title: 'Deals Created', value: '64', delta: 12.5 },
  { title: 'Deals Won', value: '28', delta: 16.7 },
  { title: 'Revenue Closed', value: '184,200', prefix: '$', delta: 24.3 },
  { title: 'Win Rate', value: '43.8', suffix: '%', delta: 3.6 },
  { title: 'Avg Deal Size', value: '6,579', prefix: '$', delta: 6.5 },
]

const DEMO_PIPELINE_TREND = Array.from({ length: 12 }, (_, i) => ({
  date: `Week ${i + 1}`,
  contacts: Math.floor(80 + Math.random() * 40 + i * 5),
  mqls: Math.floor(20 + Math.random() * 15 + i * 2),
  sqls: Math.floor(8 + Math.random() * 6 + i),
}))

const DEMO_LEAD_SOURCES = [
  { name: 'Organic Search', value: 32, color: CHART_COLORS.ga4 },
  { name: 'Paid Ads', value: 24, color: CHART_COLORS.metaAds },
  { name: 'Email', value: 18, color: CHART_COLORS.email },
  { name: 'Social', value: 14, color: CHART_COLORS.linkedin },
  { name: 'Referral', value: 12, color: CHART_COLORS.positive },
]

const DEMO_DEALS = [
  { deal: 'Enterprise License — Acme Corp', stage: 'Closed Won', value: '$42,000', daysOpen: '34', owner: 'Sarah K.' },
  { deal: 'Annual Plan — Beta Inc', stage: 'Closed Won', value: '$28,500', daysOpen: '22', owner: 'Mike R.' },
  { deal: 'Expansion — Gamma Ltd', stage: 'Negotiation', value: '$35,000', daysOpen: '18', owner: 'Sarah K.' },
  { deal: 'New Business — Delta Co', stage: 'Proposal', value: '$52,000', daysOpen: '12', owner: 'Alex T.' },
  { deal: 'Renewal — Epsilon Inc', stage: 'Closed Won', value: '$18,200', daysOpen: '8', owner: 'Mike R.' },
]

export async function HubSpotPerformanceReport({ clientSlug, dateRange }: HubSpotPerformanceProps) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
          CRM &amp; Pipeline
        </p>
        <h2 className="text-3xl font-extrabold uppercase text-white">
          HubSpot{' '}
          <span className="gradient-text-full">Performance</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {DEMO_KPIS.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            delta={kpi.delta}
            prefix={kpi.prefix}
            suffix={kpi.suffix}
            accentGradient="full"
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Pipeline Funnel Trend</h3>
          <AreaChart
            data={DEMO_PIPELINE_TREND}
            xKey="date"
            yKeys={[
              { key: 'contacts', color: CHART_COLORS.hubspot, label: 'Contacts' },
              { key: 'mqls', color: CHART_COLORS.email, label: 'MQLs' },
              { key: 'sqls', color: CHART_COLORS.positive, label: 'SQLs' },
            ]}
            height={320}
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Lead Sources</h3>
          <DonutChart data={DEMO_LEAD_SOURCES} height={320} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-white">Recent Deals</h3>
        <DataTable
          columns={[
            { key: 'deal', label: 'Deal' },
            { key: 'stage', label: 'Stage' },
            { key: 'value', label: 'Value', align: 'right' },
            { key: 'daysOpen', label: 'Days Open', align: 'right' },
            { key: 'owner', label: 'Owner' },
          ]}
          rows={DEMO_DEALS}
        />
      </div>

      <p className="text-xs text-text-muted">Demo data — connect HubSpot to see real metrics</p>
    </div>
  )
}
