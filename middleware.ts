import { NextResponse, type NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const raw = req.cookies.get('demo-session')?.value

  // No session → redirect to login
  if (!raw) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  let session: { role: string; clientSlug?: string }
  try {
    session = JSON.parse(raw)
  } catch {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Dashboard routes — internal only
  if (pathname.startsWith('/dashboard')) {
    if (session.role !== 'internal') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Portal routes — client must match their own slug
  if (pathname.startsWith('/portal')) {
    if (session.role !== 'client') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    const slugInUrl = pathname.split('/')[2]
    if (session.clientSlug !== slugInUrl) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*'],
}
