export type ClientRole =
  | 'INTERNAL_ADMIN'
  | 'INTERNAL_ANALYST'
  | 'CLIENT_ADMIN'
  | 'CLIENT_VIEWER'

export type ReportSlug =
  | 'exec-summary'
  | 'ga4'
  | 'meta-ads'
  | 'google-ads'
  | 'email-marketing'
  | 'blended-performance'
  | 'linkedin-ads'
  | 'snapchat-ads'
  | 'tiktok-ads'
  | 'shopify-performance'
  | 'hubspot-performance'
  | 'reddit-ads'
  | 'bing-ads'

export interface ClientConfig {
  slug: string
  name: string
  logoUrl?: string
  smWorkspaceId: string
  smApiKey: string // Name of the env var holding their API key
  enabledReports: ReportSlug[]
  users: {
    email: string
    role: ClientRole
  }[]
}

export const clients: ClientConfig[] = [
  {
    slug: 'fun-spot',
    name: 'Fun Spot',
    logoUrl: '/logos/fun-spot.png',
    smWorkspaceId: 'ws_funspot_123',
    smApiKey: 'SUPERMETRICS_API_KEY_FUN_SPOT',
    enabledReports: [
      'exec-summary',
      'ga4',
      'meta-ads',
      'google-ads',
      'email-marketing',
      'blended-performance',
      'linkedin-ads',
      'snapchat-ads',
      'tiktok-ads',
      'shopify-performance',
      'hubspot-performance',
      'reddit-ads',
      'bing-ads',
    ],
    users: [
      { email: 'bill@avenuez.com', role: 'INTERNAL_ADMIN' },
      { email: 'contact@fun-spot.com', role: 'CLIENT_VIEWER' },
    ],
  },
  // Add more clients here...
]

// --- Helpers ---

export const getClientBySlug = (slug: string) =>
  clients.find((c) => c.slug === slug)

export const getClientByEmail = (email?: string | null) =>
  email
    ? clients
        .flatMap((c) => c.users.map((u) => ({ ...u, slug: c.slug })))
        .find((u) => u.email === email)
    : null

export const getAllClients = () => clients
