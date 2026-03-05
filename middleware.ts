import { NextResponse } from 'next/server'

// Auth temporarily bypassed for UI preview
export default function middleware() {
  return NextResponse.next()
}

// import { auth } from '@/auth'
//
// export default auth((req) => {
//   const { pathname } = req.nextUrl
//   const session = req.auth
//
//   if (!session) {
//     return Response.redirect(new URL('/login', req.url))
//   }
//
//   // Internal routes — Avenue Z team only
//   if (pathname.startsWith('/dashboard')) {
//     if (
//       session.user.role !== 'INTERNAL_ADMIN' &&
//       session.user.role !== 'INTERNAL_ANALYST'
//     ) {
//       return Response.redirect(new URL('/unauthorized', req.url))
//     }
//   }
//
//   // Client portal — scoped to their own slug only
//   if (pathname.startsWith('/portal')) {
//     const slugInUrl = pathname.split('/')[2]
//     if (session.user.clientSlug !== slugInUrl) {
//       return Response.redirect(new URL('/unauthorized', req.url))
//     }
//   }
// })

export const config = {
  matcher: ['/dashboard/:path*', '/portal/:path*'],
}
