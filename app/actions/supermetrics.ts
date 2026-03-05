'use server'

import { createLoginLink } from '@/lib/supermetrics/auth'
import type { DsId } from '@/lib/supermetrics/constants'
import { DS_NAMES } from '@/lib/supermetrics/constants'

export async function generateLoginLink(clientSlug: string, dsId: DsId) {
  const dsName = DS_NAMES[dsId] ?? dsId

  const result = await createLoginLink({
    clientSlug,
    dsId,
    description: `${dsName} connection`,
  })

  return result.data.login_url
}
