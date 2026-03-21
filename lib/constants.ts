/** Chart color mapping — consistent across all charts */
export const CHART_COLORS = {
  // Single-series or primary line
  primary: '#60FDFF', // cyan

  // Multi-channel series
  ga4: '#39A0FF', // blue — web/organic
  metaAds: '#6034FF', // purple — Meta paid
  googleAds: '#60FF80', // green — Google paid
  email: '#FFFC60', // yellow — email
  linkedin: '#60FDFF', // cyan — LinkedIn
  tiktok: '#FF6B8A', // pink — TikTok
  snapchat: '#FFFC60', // yellow — Snapchat
  reddit: '#FF4500', // orange-red — Reddit
  bingAds: '#00A4EF', // Microsoft blue — Bing/Microsoft Ads
  shopify: '#96BF48', // Shopify green
  hubspot: '#FF7A59', // HubSpot orange
  blended: '#FFFFFF', // white — blended/total lines

  // Positive / negative deltas
  positive: '#60FF80', // green
  negative: '#FF4444', // red
  neutral: '#8A8A8A', // grey
} as const

/** Report display names */
export const REPORT_NAMES: Record<string, string> = {
  'exec-summary': 'Executive Summary',
  ga4: 'Web Analytics',
  'meta-ads': 'Meta Ads',
  'google-ads': 'Google Ads',
  'email-marketing': 'Email Marketing',
  'blended-performance': 'Blended Performance',
  'linkedin-ads': 'LinkedIn Ads',
  'snapchat-ads': 'Snapchat Ads',
  'tiktok-ads': 'TikTok Ads',
  'shopify-performance': 'Shopify Performance',
  'hubspot-performance': 'HubSpot Performance',
  'reddit-ads': 'Reddit Ads',
  'bing-ads': 'Microsoft Ads',
  'conversational-summary': 'Conversational Summary',
  ffci: 'FFCI',
  'tiktok-shop': 'TikTok Shop',
  'pr-placements': 'PR Placements',
  'meeting-prep': 'Meeting Prep',
  'google-search-console': 'Search Console',
  salesforce: 'Salesforce',
}

/** All report slugs in display order (used by sidebar to show all sections) */
export const ALL_REPORT_SLUGS: string[] = [
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
  'tiktok-shop',
  'shopify-performance',
  'hubspot-performance',
  'salesforce',
  'reddit-ads',
  'bing-ads',
]
