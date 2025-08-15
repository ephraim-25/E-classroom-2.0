import { type NextRequest, NextResponse } from "next/server"

// Mock student data - replace with actual database
const mockStudentData = {
  enrolledCourses: [
    {
      id: "1",
      title: "Introduction au Marketing Digital",
      instructor: "Marie Dubois",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      timeSpent: "8h 30min",
      lastAccessed: "2024-01-20",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      rating: 4.8,
      isFavorite: true,
      nextLesson: "Stratégies de contenu avancées",
      estimatedTimeToComplete: "2h 15min",
      certificateId: "EC-2024-001",
    },
    {
      id: "2",
      title: "Développement Web avec React",
      instructor: "Jean-Paul Kamau",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      timeSpent: "12h 45min",
      lastAccessed: "2024-01-18",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Technologie",
      rating: 4.9,
      isFavorite: false,
      nextLesson: "Hooks avancés",
      estimatedTimeToComplete: "8h 30min",
      certificateId: "EC-2024-002",
    },
  ],
  completedCourses: [
    {
      id: "3",
      title: "Bases du Marketing",
      instructor: "Sophie Martin",
      completedDate: "2024-01-15",
      finalGrade: 92,
      timeSpent: "6h 20min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      rating: 4.7,
      certificateId: "EC-2024-001",
    },
  ],
  learningStats: {
    totalTimeSpent: "31h 30min",
    coursesCompleted: 2,
    coursesInProgress: 2,
    averageGrade: 90,
    skillsAcquired: 8,
    streakDays: 15,
    monthlyGoal: 20,
    monthlyProgress: 12,
  },
}

// GET /api/dashboard/student - Get student dashboard data
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

    if (userType !== "student") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // In real app, fetch user-specific data from database
    return NextResponse.json(mockStudentData)
  } catch (error) {
    console.error("Error fetching student dashboard:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
