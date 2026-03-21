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
  | 'google-search-console'
  | 'salesforce'
  | 'gohighlevel'
  | 'ticket-sales'

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
  hiddenReports?: ReportSlug[]
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
      'exec-summary',
      'ga4',
      'meta-ads',
      'email-marketing',
      'gohighlevel',
      'ticket-sales',
      'blended-performance',
    ],
    hiddenReports: ['salesforce', 'hubspot-performance', 'shopify-performance'],
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
      'reddit-ads',
      'bing-ads',
    ],
    hiddenReports: ['gohighlevel', 'salesforce', 'hubspot-performance', 'ticket-sales'],
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
  {
    slug: 'avenue-z',
    name: 'Avenue Z',
    logoUrl: '/logos/AvenueZ_White.png',
    smWorkspaceId: 'ws_avenuez_001',
    smApiKey: 'SUPERMETRICS_API_KEY_AVENUE_Z',
    enabledReports: [
      'meeting-prep',
      'conversational-summary',
      'ffci',
      'pr-placements',
      'exec-summary',
      'ga4',
      'google-search-console',
      'meta-ads',
      'google-ads',
      'email-marketing',
      'blended-performance',
      'linkedin-ads',
      'snapchat-ads',
      'tiktok-ads',
      'hubspot-performance',
      'reddit-ads',
      'bing-ads',
    ],
    hiddenReports: ['ticket-sales', 'shopify-performance', 'salesforce', 'gohighlevel', 'tiktok-shop'],
    prConfig: {
      keywords: ['"Avenue Z"', '"Avenue Z Agency"', '"Avenue Z marketing"', 'avenuez.com'],
      excludeKeywords: ['"avenue z-line"', '"avenue zone"', '"avenue zip"'],
      sourceLocationUri: ['http://en.wikipedia.org/wiki/United_States'],
      language: 'eng',
      dataTypes: ['news', 'pr', 'blog'],
      lookbackDays: 31,
    },
    users: [
      { email: 'bill@avenuez.com', role: 'INTERNAL_ADMIN' },
    ],
  },
  {
    slug: 'renaissance-benefits',
    name: 'Renaissance Benefits',
    logoUrl: '/logos/RenaissanceBenefits.jpeg',
    smWorkspaceId: 'ws_renbene_001',
    smApiKey: 'SUPERMETRICS_API_KEY_RENAISSANCE',
    enabledReports: [
      'meeting-prep',
      'conversational-summary',
      'ffci',
      'pr-placements',
      'exec-summary',
      'ga4',
      'google-search-console',
      'google-ads',
      'meta-ads',
      'linkedin-ads',
      'email-marketing',
      'salesforce',
      'blended-performance',
    ],
    hiddenReports: ['ticket-sales'],
    prConfig: {
      keywords: ['"Renaissance Benefits"', 'renaissancebenefits.com'],
      excludeKeywords: [],
      sourceLocationUri: ['http://en.wikipedia.org/wiki/United_States'],
      language: 'eng',
      dataTypes: ['news', 'pr'],
      lookbackDays: 31,
    },
    users: [
      { email: 'bill@avenuez.com', role: 'INTERNAL_ADMIN' },
    ],
  },
  {
    slug: 'piper-aircraft',
    name: 'Piper Aircraft',
    logoUrl: '/logos/PiperAircraft.jpeg',
    smWorkspaceId: 'ws_piper_001',
    smApiKey: 'SUPERMETRICS_API_KEY_PIPER',
    enabledReports: [
      'meeting-prep',
      'conversational-summary',
      'ffci',
      'exec-summary',
      'ga4',
      'google-search-console',
      'google-ads',
      'meta-ads',
      'linkedin-ads',
      'blended-performance',
    ],
    hiddenReports: ['salesforce', 'hubspot-performance', 'shopify-performance', 'ticket-sales'],
    prConfig: {
      keywords: ['"Piper Aircraft"', '"Piper M600"', '"Piper Archer"'],
      excludeKeywords: ['"pied piper"'],
      sourceLocationUri: ['http://en.wikipedia.org/wiki/United_States'],
      language: 'eng',
      dataTypes: ['news', 'pr'],
      lookbackDays: 31,
    },
    users: [
      { email: 'bill@avenuez.com', role: 'INTERNAL_ADMIN' },
    ],
  },
  {
    slug: 'hydrafacial',
    name: 'HydraFacial',
    logoUrl: '/logos/Hydrafacial.png',
    smWorkspaceId: 'ws_hydrafacial_001',
    smApiKey: 'SUPERMETRICS_API_KEY_HYDRAFACIAL',
    enabledReports: [
      'meeting-prep',
      'conversational-summary',
      'ffci',
      'exec-summary',
      'ga4',
      'google-search-console',
      'blended-performance',
    ],
    hiddenReports: ['ticket-sales'],
    prConfig: {
      keywords: ['"HydraFacial"', '"Hydra Facial"', 'hydrafacial.com'],
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
