import type { DsId } from '@/lib/supermetrics/constants'
import { DS_IDS } from '@/lib/supermetrics/constants'
import {
  SiGoogleanalytics,
  SiMeta,
  SiGoogleads,
  SiMailchimp,
  SiTiktok,
  SiHubspot,
  SiSnapchat,
  SiReddit,
  SiShopify,
  SiFacebook,
  SiInstagram,
  SiSalesforce,
  SiX,
  SiWoocommerce,
  SiGooglesearchconsole,
} from 'react-icons/si'
import { FaLinkedinIn, FaMicrosoft } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import { LuGamepad2, LuChartBar } from 'react-icons/lu'

/** Platform icon mapping — keyed by Supermetrics ds_id */
export const PLATFORM_ICONS: Record<DsId, { Icon: IconType; color: string }> = {
  [DS_IDS.GA4]: { Icon: SiGoogleanalytics, color: '#E37400' },
  [DS_IDS.META]: { Icon: SiMeta, color: '#0081FB' },
  [DS_IDS.GOOGLE_ADS]: { Icon: SiGoogleads, color: '#4285F4' },
  [DS_IDS.MAILCHIMP]: { Icon: SiMailchimp, color: '#FFE01B' },
  [DS_IDS.KLAVIYO]: { Icon: LuChartBar, color: '#2DD683' },
  [DS_IDS.LINKEDIN]: { Icon: FaLinkedinIn, color: '#0A66C2' },
  [DS_IDS.TIKTOK]: { Icon: SiTiktok, color: '#FF004F' },
  [DS_IDS.HUBSPOT]: { Icon: SiHubspot, color: '#FF7A59' },
  [DS_IDS.SNAPCHAT]: { Icon: SiSnapchat, color: '#FFFC00' },
  [DS_IDS.REDDIT]: { Icon: SiReddit, color: '#FF4500' },
  [DS_IDS.BING_ADS]: { Icon: FaMicrosoft, color: '#00A4EF' },
  [DS_IDS.SHOPIFY]: { Icon: SiShopify, color: '#96BF48' },
  [DS_IDS.TIKTOK_SHOP]: { Icon: SiTiktok, color: '#FF004F' },
  [DS_IDS.LINKEDIN_PAGES]: { Icon: FaLinkedinIn, color: '#0A66C2' },
  [DS_IDS.FACEBOOK_INSIGHTS]: { Icon: SiFacebook, color: '#1877F2' },
  [DS_IDS.INSTAGRAM_INSIGHTS]: { Icon: SiInstagram, color: '#E4405F' },
  [DS_IDS.TIKTOK_INSIGHTS]: { Icon: SiTiktok, color: '#FF004F' },
  [DS_IDS.SALESFORCE]: { Icon: SiSalesforce, color: '#00A1E0' },
  [DS_IDS.X_ADS]: { Icon: SiX, color: '#FFFFFF' },
  [DS_IDS.X_INSIGHTS]: { Icon: SiX, color: '#FFFFFF' },
  [DS_IDS.WOOCOMMERCE]: { Icon: SiWoocommerce, color: '#96588A' },
  [DS_IDS.APPLOVIN]: { Icon: LuGamepad2, color: '#00B1E7' },
  [DS_IDS.AHREFS]: { Icon: LuChartBar, color: '#FF8C00' },
  [DS_IDS.GOOGLE_SEARCH_CONSOLE]: { Icon: SiGooglesearchconsole, color: '#4285F4' },
}
