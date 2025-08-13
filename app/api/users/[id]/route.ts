import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock user management - replace with actual database
const mockUsers = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+243123456789",
    userType: "student",
    status: "active",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    coursesEnrolled: 3,
    avatar: "/placeholder.svg?height=40&width=40",
    isVerified: true,
  },
]

// GET /api/users/[id] - Get user details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Only admin can view other users, users can view their own profile
    if (decoded.userType !== "admin" && decoded.userId !== userId) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    const user = mockUsers.find((u) => u.id === userId)
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Error fetching user:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// PUT /api/users/[id] - Update user (admin only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const userId = params.id
    const updateData = await request.json()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Only admin can update users, or users can update their own profile
    if (decoded.userType !== "admin" && decoded.userId !== userId) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    // Update user in database
    const userIndex = mockUsers.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    mockUsers[userIndex] = { ...mockUsers[userIndex], ...updateData, updatedAt: new Date().toISOString() }

    return NextResponse.json({ user: mockUsers[userIndex] })
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
