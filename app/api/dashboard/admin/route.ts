import { type NextRequest, NextResponse } from "next/server"

// Mock admin data - replace with actual database
const mockAdminData = {
  systemStats: {
    totalUsers: 10247,
    totalCourses: 523,
    totalRevenue: 125340,
    activeInstructors: 89,
    pendingApprovals: 12,
    reportedContent: 3,
    monthlyGrowth: {
      users: "+12%",
      courses: "+8%",
      revenue: "+15%",
      instructors: "+5%",
    },
  },
  users: [
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      type: "student",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      coursesEnrolled: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      type: "instructor",
      status: "active",
      joinDate: "2023-12-01",
      lastActive: "2024-01-20",
      coursesCreated: 5,
      totalStudents: 1247,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ],
  courses: [
    {
      id: "1",
      title: "Introduction au Marketing Digital",
      instructor: "Marie Dubois",
      status: "published",
      students: 156,
      revenue: 2340,
      rating: 4.8,
      createdDate: "2024-01-01",
      category: "Marketing",
      reports: 0,
    },
  ],
  recentActivity: [
    {
      id: "1",
      type: "user_registration",
      message: "Nouvel utilisateur inscrit",
      user: "Jean Dupont",
      timestamp: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      type: "course_published",
      message: "Nouveau cours publié",
      user: "Marie Dubois",
      timestamp: "2024-01-19T15:45:00Z",
    },
  ],
}

// GET /api/dashboard/admin - Get admin dashboard data
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    const decoded = validateSimpleToken(token)
    if (!decoded || decoded.userType !== "admin") {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // In real app, fetch admin-specific data from database
    return NextResponse.json(mockAdminData)
  } catch (error) {
    console.error("Error fetching admin dashboard:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

function validateSimpleToken(token: string) {
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [userId, userType, timestamp] = decoded.split(":")

    // Check if token is not older than 24 hours
    const tokenAge = Date.now() - Number.parseInt(timestamp)
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return null
    }

    return { userId, userType }
  } catch {
    return null
  }
}
