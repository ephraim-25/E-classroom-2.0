import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/courses/learn", "/profile", "/certificates"]

// Routes that should redirect authenticated users
const authRoutes = ["/auth/login", "/auth/register"]

function parseSimpleToken(token: string): { userId: string; userType: string } | null {
  try {
    const parts = token.split("_")
    if (parts.length >= 2) {
      return { userId: parts[0], userType: parts[1] }
    }
    return null
  } catch {
    return null
  }
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value || request.headers.get("authorization")?.replace("Bearer ", "")

  const { pathname } = request.nextUrl

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Check if route is auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }

    const decoded = parseSimpleToken(token)
    if (!decoded) {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  if (isAuthRoute && token) {
    const decoded = parseSimpleToken(token)
    if (decoded) {
      const redirectPath = getRedirectPath(decoded.userType)
      return NextResponse.redirect(new URL(redirectPath, request.url))
    }
  }

  return NextResponse.next()
}

function getRedirectPath(userType: string) {
  switch (userType) {
    case "student":
      return "/dashboard/student"
    case "instructor":
      return "/dashboard/instructor"
    case "admin":
      return "/dashboard/admin"
    default:
      return "/dashboard"
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
