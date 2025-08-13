import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock analytics data
const mockAnalytics = {
  coursePerformance: [
    {
      courseId: "1",
      title: "Introduction au Marketing Digital",
      enrollments: 156,
      completions: 89,
      averageRating: 4.8,
      revenue: 2340,
      engagementRate: 78,
      dropoffPoints: ["Lesson 3", "Lesson 7"],
    },
  ],
  userEngagement: {
    dailyActiveUsers: 1234,
    weeklyActiveUsers: 5678,
    monthlyActiveUsers: 8901,
    averageSessionDuration: "45min",
    bounceRate: 23,
  },
  revenueAnalytics: {
    totalRevenue: 125340,
    monthlyRecurring: 8900,
    averageOrderValue: 87,
    conversionRate: 12.5,
    topPaymentMethods: [
      { method: "M-Pesa", percentage: 45 },
      { method: "Carte bancaire", percentage: 35 },
      { method: "Airtel Money", percentage: 20 },
    ],
  },
}

// GET /api/dashboard/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Only admin and instructors can access analytics
    if (!["admin", "instructor"].includes(decoded.userType)) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Filter data based on user type
    if (decoded.userType === "instructor") {
      // Return only instructor's course analytics
      return NextResponse.json({
        coursePerformance: mockAnalytics.coursePerformance.filter((course) => course.courseId === "1"), // Filter by instructor
        userEngagement: mockAnalytics.userEngagement,
      })
    }

    // Admin gets full analytics
    return NextResponse.json(mockAnalytics)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
