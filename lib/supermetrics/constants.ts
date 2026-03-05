export const DS_IDS = {
  GA4: 'GAWA',
  META: 'FA',
  GOOGLE_ADS: 'AW',
  MAILCHIMP: 'MC',
  KLAVIYO: 'KLAVIYO',
  LINKEDIN: 'LI',
  TIKTOK: 'TIKTOK',
  HUBSPOT: 'HS',
  SNAPCHAT: 'SNAPCHAT',
  REDDIT: 'REDDIT',
  BING_ADS: 'BA',
  SHOPIFY: 'SHOPIFY',
  TIKTOK_SHOP: 'TIKTOK_SHOP',
  LINKEDIN_PAGES: 'LIP',
  FACEBOOK_INSIGHTS: 'FI',
} as const

export type DsId = (typeof DS_IDS)[keyof typeof DS_IDS]

/** Human-readable names for each data source */
export const DS_NAMES: Record<DsId, string> = {
  [DS_IDS.GA4]: 'Google Analytics 4',
  [DS_IDS.META]: 'Meta Ads',
  [DS_IDS.GOOGLE_ADS]: 'Google Ads',
  [DS_IDS.MAILCHIMP]: 'Mailchimp',
  [DS_IDS.KLAVIYO]: 'Klaviyo',
  [DS_IDS.LINKEDIN]: 'LinkedIn Ads',
  [DS_IDS.TIKTOK]: 'TikTok Ads',
  [DS_IDS.HUBSPOT]: 'HubSpot',
  [DS_IDS.SNAPCHAT]: 'Snapchat Ads',
  [DS_IDS.REDDIT]: 'Reddit Ads',
  [DS_IDS.BING_ADS]: 'Microsoft Ads',
  [DS_IDS.SHOPIFY]: 'Shopify',
  [DS_IDS.TIKTOK_SHOP]: 'TikTok Shop',
  [DS_IDS.LINKEDIN_PAGES]: 'LinkedIn Pages',
  [DS_IDS.FACEBOOK_INSIGHTS]: 'Facebook Page Insights',
}

/** Supermetrics API base URL */
export const SM_BASE_URL = 'https://api.supermetrics.com/enterprise/v2'
