// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('token')?.value
  const isLoginPage = request.nextUrl.pathname === '/admin/login'
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')

  // Admin routes
  if (isAdminRoute) {
    // Agar token nahi hai aur login page nahi hai to redirect
    if (!token && !isLoginPage) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Agar token hai aur login page par hai to dashboard redirect
    if (token && isLoginPage) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}