import { getClientBySlug } from '@/lib/clients.config'
import { CHART_COLORS } from '@/lib/constants'
import { fetchFunSpotData, parseDateRange } from '@/lib/bigquery/client'
import { generateConversationalSummary, type ConversationalSummaryResponse } from '@/lib/bigquery/gemini'

interface ConversationalSummaryProps {
  clientSlug: string
  dateRange: string
}

const sentimentColor = {
  positive: CHART_COLORS.positive,
  negative: CHART_COLORS.negative,
  neutral: CHART_COLORS.neutral,
}

function formatPeriod(startDate: string, endDate: string): string {
  const start = new Date(startDate + 'T00:00:00')
  const end = new Date(endDate + 'T00:00:00')
  const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
  return `${start.toLocaleDateString('en-US', opts)} – ${end.toLocaleDateString('en-US', opts)}`
}

export async function ConversationalSummary({ clientSlug, dateRange }: ConversationalSummaryProps) {
  getClientBySlug(clientSlug) // validate client exists

  let summary: ConversationalSummaryResponse
  let period: string
  let isLive = false

  try {
    // Fetch real data from BigQuery
    const data = await fetchFunSpotData(dateRange)
    period = formatPeriod(data.dateRange.startDate, data.dateRange.endDate)

    // Generate narrative with Gemini
    summary = await generateConversationalSummary(data)
    isLive = true
  } catch (error) {
    console.error('Failed to fetch BQ/Gemini data, using fallback:', error)
    const { startDate, endDate } = parseDateRange(dateRange)
    period = formatPeriod(startDate, endDate)

    // Fallback demo data
    summary = {
      headline: 'Strong momentum across paid and organic channels.',
      greeting:
        'Here\u2019s your performance snapshot for the selected period. Overall, your marketing is trending in the right direction with meaningful gains in traffic, conversions, and efficiency.',
      highlights: [
        {
          label: 'Website Traffic',
          value: '89,234 sessions',
          delta: 'N/A',
          sentiment: 'positive',
          narrative:
            'Traffic is strong, driven primarily by organic search and paid social. New users are growing, signaling healthy top-of-funnel reach.',
        },
        {
          label: 'Meta Ads',
          value: '$5,200 spend',
          delta: 'N/A',
          sentiment: 'positive',
          narrative:
            'Meta campaigns are delivering consistent reach and conversions. CTR and CPA are within target ranges.',
        },
        {
          label: 'Website Traffic',
          value: '45,000 sessions',
          delta: 'N/A',
          sentiment: 'positive',
          narrative:
            'Website traffic is healthy with strong engagement rates. Organic search and paid social are the top traffic drivers.',
        },
      ],
      channelBreakdown: [
        { channel: 'Meta Ads', spend: '$5,200', conversions: '612', cpa: '$8.50', roas: '2.9x' },
        { channel: 'Organic Search', spend: '$0', conversions: '275', cpa: '\u2014', roas: '\u2014' },
        { channel: 'Direct', spend: '$0', conversions: '180', cpa: '\u2014', roas: '\u2014' },
      ],
      callouts: [
        { type: 'win', text: 'Blended CPA is well below target, indicating efficient spend allocation across channels.' },
        { type: 'watch', text: 'Monitor ad frequency on Meta to avoid audience fatigue as campaigns scale.' },
      ],
      closing:
        'Overall, this is a solid period. Focus on scaling efficient channels and refreshing creative where frequency is climbing. Detailed breakdowns are available in the individual report sections.',
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      {/* Hero header */}
      <div className="space-y-4">
        <p className="text-sm font-bold uppercase tracking-widest text-text-muted">
          {period}
        </p>
        <h2 className="text-4xl font-extrabold leading-tight text-white">
          {summary.headline}
        </h2>
        <p className="text-lg leading-relaxed text-white/70">
          {summary.greeting}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/[0.06]" />

      {/* Key highlights — narrative cards */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-text-muted">
          Key Highlights
        </h3>
        {summary.highlights.map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-white/[0.06] bg-bg-surface p-6"
          >
            <div className="mb-3 flex items-baseline justify-between">
              <h4 className="text-base font-bold text-white">{item.label}</h4>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-white">{item.value}</span>
                {item.delta && item.delta !== 'N/A' && (
                  <span
                    className="text-sm font-bold"
                    style={{ color: sentimentColor[item.sentiment] }}
                  >
                    {item.delta}
                  </span>
                )}
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
              {summary.channelBreakdown.map((row) => (
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
          {summary.callouts
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
          {summary.callouts
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
          {summary.closing}
        </p>
      </div>

      {/* Data freshness */}
      <p className="text-xs text-text-muted">
        {isLive
          ? `Live data from BigQuery \u2022 AI summary by Gemini \u2022 ${period}`
          : 'Demo data \u2014 BigQuery connection not configured'}
      </p>
    </div>
  )
}
