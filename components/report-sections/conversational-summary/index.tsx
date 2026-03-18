import { getClientBySlug } from '@/lib/clients.config'
import { CHART_COLORS } from '@/lib/constants'

interface ConversationalSummaryProps {
  clientSlug: string
  dateRange: string
}

// Demo performance snapshot — will be replaced with Supermetrics data
const DEMO = {
  period: 'February 15 – March 15, 2026',
  headline: 'Strong momentum across paid and organic channels.',
  overallSentiment: 'positive' as const,
  greeting:
    'Here\u2019s your performance snapshot for the last 30 days. Overall, your marketing is trending in the right direction with meaningful gains in traffic, conversions, and efficiency.',
  highlights: [
    {
      icon: 'sessions',
      label: 'Website Traffic',
      value: '89,234 sessions',
      delta: '+15.4%',
      sentiment: 'positive' as const,
      narrative:
        'Traffic is up significantly versus last period, driven primarily by organic search and paid social. New users grew 11.2%, signaling healthy top-of-funnel reach.',
    },
    {
      icon: 'conversions',
      label: 'Conversions',
      value: '1,847 conversions',
      delta: '+22.6%',
      sentiment: 'positive' as const,
      narrative:
        'Conversion volume hit a 90-day high. Meta Ads and Google Search are the top-performing channels, together accounting for 68% of all conversions.',
    },
    {
      icon: 'spend',
      label: 'Total Ad Spend',
      value: '$12,450',
      delta: '-2.1%',
      sentiment: 'positive' as const,
      narrative:
        'Spend decreased slightly while output increased \u2014 a sign of improving efficiency. Blended CPA dropped from $8.40 to $6.74, the lowest it\u2019s been in three months.',
    },
    {
      icon: 'roas',
      label: 'Return on Ad Spend',
      value: '3.2x ROAS',
      delta: '+7.8%',
      sentiment: 'positive' as const,
      narrative:
        'For every dollar spent on advertising, you\u2019re generating $3.20 in tracked revenue. This is above the 2.5x benchmark for your industry vertical.',
    },
    {
      icon: 'email',
      label: 'Email Performance',
      value: '18,392 opens',
      delta: '+5.3%',
      sentiment: 'neutral' as const,
      narrative:
        'Email engagement is steady. Open rates held at 24.1% and click-through rates improved slightly to 3.8%. The March promo campaign was the top performer.',
    },
  ],
  channelBreakdown: [
    { channel: 'Meta Ads', spend: '$5,200', conversions: '612', cpa: '$8.50', roas: '2.9x', trend: 'up' as const },
    { channel: 'Google Ads', spend: '$4,100', conversions: '648', cpa: '$6.33', roas: '3.8x', trend: 'up' as const },
    { channel: 'Email', spend: '$0', conversions: '312', cpa: '\u2014', roas: '\u2014', trend: 'steady' as const },
    { channel: 'Organic Search', spend: '$0', conversions: '275', cpa: '\u2014', roas: '\u2014', trend: 'up' as const },
  ],
  callouts: [
    {
      type: 'win' as const,
      text: 'Google Ads CPA dropped 24% after pausing underperforming Display campaigns and reallocating budget to PMax.',
    },
    {
      type: 'win' as const,
      text: 'The new landing page variant is converting at 4.7% vs. 3.1% for the control \u2014 recommend scaling traffic to it.',
    },
    {
      type: 'watch' as const,
      text: 'Meta Ads frequency is climbing (2.4x). Consider refreshing creative to avoid audience fatigue.',
    },
    {
      type: 'watch' as const,
      text: 'Bounce rate on mobile increased 6% \u2014 worth investigating page load times on cellular connections.',
    },
  ],
  closing:
    'Overall, this was a strong period. The focus for the next 30 days should be scaling what\u2019s working on Google Ads, refreshing Meta creative, and capitalizing on the new landing page performance. Detailed breakdowns for each channel are available in the individual report sections.',
}

const sentimentColor = {
  positive: CHART_COLORS.positive,
  negative: CHART_COLORS.negative,
  neutral: CHART_COLORS.neutral,
}

export async function ConversationalSummary({ clientSlug, dateRange }: ConversationalSummaryProps) {
  const client = getClientBySlug(clientSlug)
  const clientName = client?.name ?? clientSlug

  // TODO: Replace with AI-generated summary from real Supermetrics data

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {/* Hero header */}
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
          {DEMO.period}
        </p>
        <h2 className="text-4xl font-extrabold leading-tight text-white">
          {clientName} is performing{' '}
          <span className="gradient-text-revenue">well.</span>
        </h2>
        <p className="text-lg leading-relaxed text-white/70">
          {DEMO.greeting}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Key highlights — narrative cards */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Key Highlights
        </h3>
        {DEMO.highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-bg-surface p-6"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <h4 className="text-base font-bold text-white">{item.label}</h4>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white">{item.value}</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: sentimentColor[item.sentiment] }}
                >
                  {item.delta}
                </span>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/60">
              {item.narrative}
            </p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Channel breakdown table */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Channel Snapshot
        </h3>
        <div className="overflow-hidden rounded-xl border border-white/[0.06]">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] bg-bg-surface">
                <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-text-muted">
                  Channel
                </th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-text-muted">
                  Spend
                </th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-text-muted">
                  Conversions
                </th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-text-muted">
                  CPA
                </th>
                <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-text-muted">
                  ROAS
                </th>
              </tr>
            </thead>
            <tbody>
              {DEMO.channelBreakdown.map((row) => (
                <tr
                  key={row.channel}
                  className="border-b border-white/[0.04] last:border-0"
                >
                  <td className="px-5 py-3 font-semibold text-white">
                    {row.channel}
                  </td>
                  <td className="px-5 py-3 text-right text-white/70">{row.spend}</td>
                  <td className="px-5 py-3 text-right text-white/70">{row.conversions}</td>
                  <td className="px-5 py-3 text-right text-white/70">{row.cpa}</td>
                  <td className="px-5 py-3 text-right text-white/70">{row.roas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Wins & Watch Items */}
      <div className="grid gap-6 sm:grid-cols-2">
        {/* Wins */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: CHART_COLORS.positive }}>
            Wins
          </h3>
          {DEMO.callouts
            .filter((c) => c.type === 'win')
            .map((c, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/[0.06] bg-bg-surface p-4"
              >
                <p className="text-sm leading-relaxed text-white/70">{c.text}</p>
              </div>
            ))}
        </div>

        {/* Watch Items */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: CHART_COLORS.email }}>
            Keep an Eye On
          </h3>
          {DEMO.callouts
            .filter((c) => c.type === 'watch')
            .map((c, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/[0.06] bg-bg-surface p-4"
              >
                <p className="text-sm leading-relaxed text-white/70">{c.text}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Closing narrative */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Looking Ahead
        </h3>
        <p className="text-base leading-relaxed text-white/70">
          {DEMO.closing}
        </p>
      </div>

      {/* Data freshness */}
      <p className="text-xs text-text-muted">
        Demo data — connect Supermetrics to see real metrics and AI-generated insights
      </p>
    </div>
  )
}
