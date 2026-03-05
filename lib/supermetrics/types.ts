import type { DsId } from './constants'

/** Parameters for a Supermetrics data query */
export interface SmQueryParams {
  clientSlug: string
  dsId: DsId
  fields: string[]
  dateRange: string // e.g. "last_30_days" or "2025-01-01,2025-01-31"
  filters?: string[]
  maxRows?: number
}

/** Raw Supermetrics query response */
export interface SmQueryResponse {
  meta: {
    query: {
      ds_id: string
      fields: string[]
      date_range_type: string
    }
    status: string
    rows_total: number
  }
  data: SmDataRow[]
}

/** A single row from a Supermetrics response */
export interface SmDataRow {
  [field: string]: string | number | null
}

/** Login link creation params */
export interface SmLoginLinkParams {
  clientSlug: string
  dsId: DsId
  description: string
}

/** Login link response from Supermetrics */
export interface SmLoginLinkResponse {
  data: {
    login_url: string
    link_id: string
    status_code: 'OPEN' | 'CLOSED'
  }
}

/** Connection status for a data source */
export interface SmConnectionStatus {
  ds_id: string
  ds_name: string
  status: 'CONNECTED' | 'EXPIRED' | 'NOT_CONNECTED'
  connected_at?: string
  expires_at?: string
}
