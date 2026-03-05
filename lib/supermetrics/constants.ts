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
  INSTAGRAM_INSIGHTS: 'IG',
  TIKTOK_INSIGHTS: 'TIKTOK_INSIGHTS',
  SALESFORCE: 'SF',
  X_ADS: 'TW',
  X_INSIGHTS: 'TWP',
  WOOCOMMERCE: 'WOOCOMMERCE',
  APPLOVIN: 'APPLOVIN',
  AHREFS: 'AHREFS',
  GOOGLE_SEARCH_CONSOLE: 'GSC',
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
  [DS_IDS.INSTAGRAM_INSIGHTS]: 'Instagram Page Insights',
  [DS_IDS.TIKTOK_INSIGHTS]: 'TikTok Page Insights',
  [DS_IDS.SALESFORCE]: 'Salesforce',
  [DS_IDS.X_ADS]: 'X Ads',
  [DS_IDS.X_INSIGHTS]: 'X Profile Insights',
  [DS_IDS.WOOCOMMERCE]: 'WooCommerce',
  [DS_IDS.APPLOVIN]: 'AppLovin',
  [DS_IDS.AHREFS]: 'Ahrefs',
  [DS_IDS.GOOGLE_SEARCH_CONSOLE]: 'Google Search Console',
}

/** Supermetrics API base URL */
export const SM_BASE_URL = 'https://api.supermetrics.com/enterprise/v2'
