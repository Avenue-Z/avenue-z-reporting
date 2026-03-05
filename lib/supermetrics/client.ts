import { getClientBySlug } from '@/lib/clients.config'
import { SM_BASE_URL } from './constants'
import type { SmQueryParams, SmQueryResponse } from './types'

/**
 * Execute a Supermetrics data query (server-side only).
 * Uses Next.js fetch caching with 1-hour revalidation.
 */
export async function smQuery(params: SmQueryParams): Promise<SmQueryResponse> {
  const client = getClientBySlug(params.clientSlug)
  if (!client) throw new Error(`Unknown client: ${params.clientSlug}`)

  const apiKey = process.env[client.smApiKey]
  if (!apiKey) throw new Error(`Missing env var: ${client.smApiKey}`)

  const queryJson = {
    ds_id: params.dsId,
    fields: params.fields,
    date_range_type: params.dateRange,
    max_rows: params.maxRows ?? 1000,
    ...(params.filters ? { filter_by: params.filters } : {}),
  }

  const res = await fetch(
    `${SM_BASE_URL}/query/data/json?json=${encodeURIComponent(
      JSON.stringify(queryJson)
    )}`,
    {
      headers: { Authorization: `Bearer ${apiKey}` },
      next: { revalidate: 3600 },
    }
  )

  if (!res.ok) throw new Error(`Supermetrics query failed: ${res.status}`)
  return res.json()
}
