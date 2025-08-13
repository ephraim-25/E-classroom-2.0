import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// GET /api/certificates/analytics - Get certificate analytics (admin only)
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

    // Only admin can access analytics
    if (decoded.userType !== "admin") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Get analytics data (mock)
    const analytics = await getCertificateAnalytics()

    return NextResponse.json({
      success: true,
      analytics,
    })
  } catch (error) {
    console.error("Certificate analytics error:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des analyses" }, { status: 500 })
  }
}

async function getCertificateAnalytics() {
  // Mock analytics data
  return {
    totalCertificates: 1247,
    certificatesThisMonth: 89,
    certificatesThisWeek: 23,
    topCourses: [
      {
        courseId: "1",
        courseName: "Introduction au Marketing Digital",
        certificatesIssued: 156,
        averageGrade: 87.5,
      },
      {
        courseId: "2",
        courseName: "Développement Web avec React",
        certificatesIssued: 134,
        averageGrade: 91.2,
      },
      {
        courseId: "3",
        courseName: "Design Graphique",
        certificatesIssued: 98,
        averageGrade: 85.8,
      },
    ],
    verificationStats: {
      totalVerifications: 2341,
      verificationsThisMonth: 187,
      averageVerificationsPerCertificate: 1.9,
    },
    sharingStats: {
      totalShares: 567,
      platformBreakdown: {
        linkedin: 234,
        twitter: 156,
        facebook: 123,
        other: 54,
      },
    },
    gradeDistribution: {
      "90-100": 45,
      "80-89": 35,
      "70-79": 15,
      "60-69": 5,
    },
    monthlyTrend: [
      { month: "Jan", certificates: 89 },
      { month: "Feb", certificates: 112 },
      { month: "Mar", certificates: 134 },
      { month: "Apr", certificates: 156 },
    ],
  }
}
