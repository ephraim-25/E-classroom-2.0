import { type NextRequest, NextResponse } from "next/server"

// Mock instructor data - replace with actual database
const mockInstructorData = {
  myCourses: [
    {
      id: "1",
      title: "Introduction au Marketing Digital",
      students: 156,
      revenue: 2340,
      rating: 4.8,
      reviews: 23,
      status: "published",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-15",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      level: "Débutant",
      price: 79,
      totalLessons: 12,
      totalDuration: "8h 30min",
      enrollmentTrend: "+12%",
    },
    {
      id: "2",
      title: "Stratégies de Contenu Avancées",
      students: 89,
      revenue: 1780,
      rating: 4.9,
      reviews: 15,
      status: "published",
      createdDate: "2023-12-15",
      lastUpdated: "2024-01-10",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      level: "Avancé",
      price: 99,
      totalLessons: 15,
      totalDuration: "10h 45min",
      enrollmentTrend: "+8%",
    },
  ],
  recentStudents: [
    {
      id: "1",
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Introduction au Marketing Digital",
      enrolledDate: "2024-01-18",
      progress: 45,
      lastActive: "2024-01-20",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Stratégies de Contenu Avancées",
      enrolledDate: "2024-01-17",
      progress: 78,
      lastActive: "2024-01-19",
    },
  ],
  monthlyStats: {
    totalRevenue: 4120,
    totalStudents: 245,
    averageRating: 4.85,
    totalCourses: 3,
    newEnrollments: 28,
    completionRate: 78,
    revenueGrowth: "+15%",
    studentGrowth: "+22%",
  },
  recentReviews: [
    {
      id: "1",
      student: "Marie Dubois",
      course: "Introduction au Marketing Digital",
      rating: 5,
      comment: "Excellent cours ! Très bien expliqué et pratique.",
      date: "2024-01-19",
    },
  ],
}

// GET /api/dashboard/instructor - Get instructor dashboard data
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Simple token verification (replace JWT)
    if (!token.startsWith("token_")) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const [, userId, userType] = token.split("_")

    if (userType !== "instructor") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // In real app, fetch instructor-specific data from database
    return NextResponse.json(mockInstructorData)
  } catch (error) {
    console.error("Error fetching instructor dashboard:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
