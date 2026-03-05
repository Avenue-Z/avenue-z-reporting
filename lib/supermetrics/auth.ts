import { getClientBySlug } from '@/lib/clients.config'
import { SM_BASE_URL } from './constants'
import type { SmLoginLinkParams, SmLoginLinkResponse } from './types'

/**
 * Generate a branded login link for a client to connect a data source.
 * Server-side only.
 */
export async function createLoginLink(
  params: SmLoginLinkParams
): Promise<SmLoginLinkResponse> {
  const client = getClientBySlug(params.clientSlug)
  if (!client) throw new Error(`Unknown client: ${params.clientSlug}`)

  const apiKey = process.env[client.smApiKey]
  if (!apiKey) throw new Error(`Missing env var: ${client.smApiKey}`)

  const res = await fetch(`${SM_BASE_URL}/ds/login/link`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ds_id: params.dsId,
      description: params.description,
      expiry_time: '48 hours',
      redirect_url: `${process.env.APP_URL}/api/auth/supermetrics-callback`,
    }),
  })

  if (!res.ok) throw new Error(`Login link creation failed: ${res.status}`)
  return res.json()
}

/**
 * Get connection status for all data sources in a client's workspace.
 * Server-side only.
 */
export async function getConnectionStatus(clientSlug: string) {
  const client = getClientBySlug(clientSlug)
  if (!client) throw new Error(`Unknown client: ${clientSlug}`)

  const apiKey = process.env[client.smApiKey]
  if (!apiKey) throw new Error(`Missing env var: ${client.smApiKey}`)

  const res = await fetch(`${SM_BASE_URL}/ds/login`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  })

  if (!res.ok)
    throw new Error(`Connection status check failed: ${res.status}`)
  return res.json()
}
