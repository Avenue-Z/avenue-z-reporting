import { NextRequest, NextResponse } from 'next/server'

/**
 * POST-OAuth redirect handler for Supermetrics branded authentication.
 * After a client completes the OAuth flow, Supermetrics redirects here.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const linkId = searchParams.get('link_id')
  const status = searchParams.get('status')

  // TODO: Look up which client this link_id belongs to,
  // then redirect them back to their auth hub page.

  // For now, redirect to dashboard
  const redirectUrl = new URL('/dashboard', req.url)
  if (linkId) redirectUrl.searchParams.set('link_id', linkId)
  if (status) redirectUrl.searchParams.set('status', status)

  return NextResponse.redirect(redirectUrl)
}
