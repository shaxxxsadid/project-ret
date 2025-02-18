import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isConnected } from './mongodb';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  if (!isConnected()) {
    return NextResponse.json({ message: 'Database is not connected' }, { status: 500 })
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/:path*',
}