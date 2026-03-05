import type { DsId } from '@/lib/supermetrics/constants'
import { DS_IDS } from '@/lib/supermetrics/constants'

/** Platform logo mapping — keyed by Supermetrics ds_id */
export const PLATFORM_LOGOS: Record<DsId, string> = {
  [DS_IDS.GA4]: '/logos/platforms/ga4.svg',
  [DS_IDS.META]: '/logos/platforms/meta.svg',
  [DS_IDS.GOOGLE_ADS]: '/logos/platforms/google-ads.svg',
  [DS_IDS.MAILCHIMP]: '/logos/platforms/mailchimp.svg',
  [DS_IDS.KLAVIYO]: '/logos/platforms/klaviyo.svg',
  [DS_IDS.LINKEDIN]: '/logos/platforms/linkedin.svg',
  [DS_IDS.TIKTOK]: '/logos/platforms/tiktok.svg',
  [DS_IDS.HUBSPOT]: '/logos/platforms/hubspot.svg',
  [DS_IDS.SNAPCHAT]: '/logos/platforms/snapchat.svg',
  [DS_IDS.REDDIT]: '/logos/platforms/reddit.svg',
  [DS_IDS.BING_ADS]: '/logos/platforms/bing-ads.svg',
  [DS_IDS.SHOPIFY]: '/logos/platforms/shopify.svg',
  [DS_IDS.TIKTOK_SHOP]: '/logos/platforms/tiktok.svg',
  [DS_IDS.LINKEDIN_PAGES]: '/logos/platforms/linkedin.svg',
  [DS_IDS.FACEBOOK_INSIGHTS]: '/logos/platforms/facebook.svg',
  [DS_IDS.INSTAGRAM_INSIGHTS]: '/logos/platforms/instagram.svg',
  [DS_IDS.TIKTOK_INSIGHTS]: '/logos/platforms/tiktok.svg',
  [DS_IDS.SALESFORCE]: '/logos/platforms/salesforce.svg',
  [DS_IDS.X_ADS]: '/logos/platforms/x.svg',
  [DS_IDS.X_INSIGHTS]: '/logos/platforms/x.svg',
  [DS_IDS.WOOCOMMERCE]: '/logos/platforms/woocommerce.svg',
  [DS_IDS.APPLOVIN]: '/logos/platforms/applovin.svg',
  [DS_IDS.AHREFS]: '/logos/platforms/ahrefs.svg',
  [DS_IDS.GOOGLE_SEARCH_CONSOLE]: '/logos/platforms/google-search-console.svg',
}
