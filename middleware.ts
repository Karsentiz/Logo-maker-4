import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Handle API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Handle static files
  if (request.nextUrl.pathname.startsWith('/_next/')) {
    return NextResponse.next()
  }

  // Handle all other routes
  return NextResponse.rewrite(new URL('/', request.url))
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 