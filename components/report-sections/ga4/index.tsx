import { KpiCard } from '@/components/charts/kpi-card'
import { AreaChart } from '@/components/charts/area-chart'
import { BarChart } from '@/components/charts/bar-chart'
import { DonutChart } from '@/components/charts/donut-chart'
import { DataTable } from '@/components/charts/data-table'
import { CHART_COLORS } from '@/lib/constants'

interface GA4Props {
  clientSlug: string
  dateRange: string
}

const DEMO_KPIS = [
  { title: 'Sessions', value: '89,234', delta: 15.4 },
  { title: 'Users', value: '62,108', delta: 11.2 },
  { title: 'New Users', value: '41,893', delta: 18.1 },
  { title: 'Bounce Rate', value: '42.3', suffix: '%', delta: -3.7 },
  { title: 'Avg Session Duration', value: '2m 34s', delta: 5.1 },
  { title: 'Pages / Session', value: '3.2', delta: 2.8 },
  { title: 'Conversions', value: '1,847', delta: 22.6 },
  { title: 'Conversion Rate', value: '2.07', suffix: '%', delta: 6.3 },
]

const DEMO_SESSIONS_TREND = Array.from({ length: 30 }, (_, i) => ({
  date: `Day ${i + 1}`,
  sessions: Math.floor(2000 + Math.random() * 1500 + i * 30),
  users: Math.floor(1400 + Math.random() * 1000 + i * 20),
}))

const DEMO_CHANNEL_DATA = [
  { channel: 'Organic Search', sessions: 34200, conversions: 720 },
  { channel: 'Direct', sessions: 21500, conversions: 430 },
  { channel: 'Social', sessions: 15800, conversions: 310 },
  { channel: 'Paid Search', sessions: 10200, conversions: 245 },
  { channel: 'Email', sessions: 5100, conversions: 98 },
  { channel: 'Referral', sessions: 2434, conversions: 44 },
]

const DEMO_DEVICE_DATA = [
  { name: 'Mobile', value: 52, color: CHART_COLORS.ga4 },
  { name: 'Desktop', value: 38, color: CHART_COLORS.positive },
  { name: 'Tablet', value: 10, color: CHART_COLORS.email },
]

const DEMO_TOP_PAGES = [
  { page: '/', sessions: '12,450', bounceRate: '38.2%', avgDuration: '1m 45s' },
  { page: '/products', sessions: '8,320', bounceRate: '41.5%', avgDuration: '2m 12s' },
  { page: '/about', sessions: '5,180', bounceRate: '52.1%', avgDuration: '1m 22s' },
  { page: '/contact', sessions: '3,920', bounceRate: '35.8%', avgDuration: '3m 05s' },
  { page: '/blog', sessions: '3,410', bounceRate: '44.7%', avgDuration: '2m 48s' },
  { page: '/pricing', sessions: '2,890', bounceRate: '39.3%', avgDuration: '2m 33s' },
]

export async function GA4Report({ clientSlug, dateRange }: GA4Props) {
  // TODO: Replace with real smQuery calls using DS_IDS.GA4

  return (
    <div className="space-y-8">
      {/* Section heading */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
          Website Performance
        </p>
        <h2 className="text-3xl font-extrabold uppercase text-white">
          Web{' '}
          <span className="gradient-text-reputation">Analytics</span>
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
            suffix={kpi.suffix}
            accentGradient="reputation"
          />
        ))}
      </div>

      {/* Sessions & Users trend */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-white">
          Sessions &amp; Users Over Time
        </h3>
        <AreaChart
          data={DEMO_SESSIONS_TREND}
          xKey="date"
          yKeys={[
            { key: 'sessions', color: CHART_COLORS.ga4, label: 'Sessions' },
            { key: 'users', color: CHART_COLORS.primary, label: 'Users' },
          ]}
        />
      </div>

      {/* Channel breakdown + Device split */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">
            Traffic by Channel
          </h3>
          <BarChart
            data={DEMO_CHANNEL_DATA}
            xKey="channel"
            yKeys={[
              { key: 'sessions', color: CHART_COLORS.ga4, label: 'Sessions' },
              { key: 'conversions', color: CHART_COLORS.positive, label: 'Conversions' },
            ]}
            height={280}
          />
        </div>
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">
            Device Breakdown
          </h3>
          <DonutChart data={DEMO_DEVICE_DATA} height={280} />
        </div>
      </div>

      {/* Top Pages table */}
      <div>
        <h3 className="mb-4 text-lg font-bold text-white">Top Pages</h3>
        <DataTable
          columns={[
            { key: 'page', label: 'Page' },
            { key: 'sessions', label: 'Sessions', align: 'right' },
            { key: 'bounceRate', label: 'Bounce Rate', align: 'right' },
            { key: 'avgDuration', label: 'Avg Duration', align: 'right' },
          ]}
          rows={DEMO_TOP_PAGES}
        />
      </div>

      <p className="text-xs text-text-muted">
        Demo data — connect Google Analytics 4 to see real metrics
      </p>
    </div>
  )
}
