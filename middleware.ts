import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware for handling admin routes and security headers
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Redirect admin routes if not authenticated
  if (request.nextUrl.pathname.startsWith('/admin/dashboard')) {
    // Token validation happens on client side (localStorage)
    // Add server-side validation if needed
  }

  return response;
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};
