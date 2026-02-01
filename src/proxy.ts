import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Next.js 16: This is now called 'proxy' instead of 'middleware'
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Create a response that we'll modify with cookies
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create Supabase client with proper cookie handling
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
          // Set cookies in both request and response
          cookiesToSet.forEach(({ name, value, options }: { name: string; value: string; options?: any }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // IMPORTANT: This refreshes the session and updates cookies automatically
  const getUserPromise = supabase.auth.getUser()

  // Handle the async getUser call
  return getUserPromise.then(({ data: { user } }) => {
    // Protect admin dashboard routes
    if (pathname.startsWith('/admin/dashboard')) {
      if (!user) {
        // Not authenticated - redirect to login
        const loginUrl = new URL('/admin/login', request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
      }
      // User is authenticated, continue with the response that has refreshed cookies
      return response
    }

    // Handle /admin/login page
    if (pathname === '/admin/login') {
      if (user) {
        // Already logged in - redirect to dashboard
        const dashboardUrl = new URL('/admin/dashboard', request.url)
        return NextResponse.redirect(dashboardUrl)
      }
      // Not logged in, show login page
      return response
    }

    // For all other routes, just pass through with cookies
    return response
  })
}

export const config = {
  matcher: [
    '/admin/login',
    '/admin/dashboard/:path*'
  ]
}