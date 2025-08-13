import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"

// Routes that require authentication
const protectedRoutes = ["/dashboard", "/courses/learn", "/profile", "/certificates"]

// Routes that should redirect authenticated users
const authRoutes = ["/auth/login", "/auth/register"]

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

    try {
      // Verify token
      jwt.verify(token, process.env.JWT_SECRET || "your-secret-key")
    } catch (error) {
      // Redirect to login if token is invalid
      return NextResponse.redirect(new URL("/auth/login", request.url))
    }
  }

  if (isAuthRoute && token) {
    try {
      // Verify token and redirect authenticated users
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as { userType: string }

      const redirectPath = getRedirectPath(decoded.userType)
      return NextResponse.redirect(new URL(redirectPath, request.url))
    } catch (error) {
      // Token is invalid, allow access to auth routes
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
