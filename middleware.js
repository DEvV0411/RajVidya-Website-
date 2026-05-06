import { NextResponse } from 'next/server'

// Fix Vercel 404s by rewriting unknown routes to the homepage.
// This keeps the site functioning even when a deep link isn't recognized.
export function middleware(request) {
  const { pathname } = request.nextUrl

  // Let Next.js internals and API routes pass through.
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) return NextResponse.next()

  // Don't rewrite requests for static files (images, icons, etc).
  if (pathname.includes('.')) return NextResponse.next()

  // Rewrite everything else to the homepage.
  return NextResponse.rewrite(new URL('/', request.url))
}

export const config = {
  matcher: ['/((?!_next|api).*)'],
}

