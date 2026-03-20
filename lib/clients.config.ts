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
  | 'conversational-summary'
  | 'ffci'
  | 'tiktok-shop'
  | 'pr-placements'
  | 'meeting-prep'

export interface PRConfig {
  keywords: string[]
  excludeKeywords?: string[]
  sourceLocationUri?: string[]
  language?: string
  dataTypes?: ('news' | 'pr' | 'blog')[]
  lookbackDays?: number // 7 or 31 (API constraint)
}

export interface ClientConfig {
  slug: string
  name: string
  logoUrl?: string
  smWorkspaceId: string
  smApiKey: string // Name of the env var holding their API key
  enabledReports: ReportSlug[]
  prConfig?: PRConfig
  users: {
    email: string
    role: ClientRole
  }[]
}

export const clients: ClientConfig[] = [
  {
    slug: 'fun-spot',
    name: 'Fun Spot',
    logoUrl: '/logos/fun-spot.webp',
    smWorkspaceId: 'ws_funspot_123',
    smApiKey: 'SUPERMETRICS_API_KEY_FUN_SPOT',
    enabledReports: [
      'meeting-prep',
      'conversational-summary',
      'ffci',
      'pr-placements',
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
    prConfig: {
      keywords: ['"Fun Spot America"', '"Fun Spot theme park"'],
      excludeKeywords: [],
      sourceLocationUri: ['http://en.wikipedia.org/wiki/United_States'],
      language: 'eng',
      dataTypes: ['news', 'pr'],
      lookbackDays: 31,
    },
    users: [
      { email: 'bill@avenuez.com', role: 'INTERNAL_ADMIN' },
      { email: 'contact@fun-spot.com', role: 'CLIENT_VIEWER' },
    ],
  },
  {
    slug: 'kind-patches',
    name: 'Kind Patches',
    logoUrl: '/logos/kind-patches-logo.webp',
    smWorkspaceId: 'ws_kindpatches_001',
    smApiKey: 'SUPERMETRICS_API_KEY_KIND_PATCHES',
    enabledReports: [
      'meeting-prep',
      'conversational-summary',
      'ffci',
      'pr-placements',
      'exec-summary',
      'ga4',
      'meta-ads',
      'google-ads',
      'email-marketing',
      'blended-performance',
      'linkedin-ads',
      'snapchat-ads',
      'tiktok-ads',
      'tiktok-shop',
      'shopify-performance',
      'hubspot-performance',
      'reddit-ads',
      'bing-ads',
    ],
    prConfig: {
      keywords: ['"Kind Patches"', 'kindpatches.com'],
      excludeKeywords: [],
      sourceLocationUri: ['http://en.wikipedia.org/wiki/United_States'],
      language: 'eng',
      dataTypes: ['news', 'pr', 'blog'],
      lookbackDays: 31,
    },
    users: [
      { email: 'bill@avenuez.com', role: 'INTERNAL_ADMIN' },
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
