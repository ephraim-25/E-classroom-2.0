import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

// Mock database - replace with actual database
const mockUsers = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com",
    phone: "+243123456789",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    userType: "student",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie@example.com",
    phone: "+243987654321",
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi", // password
    userType: "instructor",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
]

function generateSimpleToken(userId: string, userType: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  return `${userId}_${userType}_${timestamp}_${randomString}`
}

export async function POST(request: NextRequest) {
  try {
    const { identifier, password, method } = await request.json()

    // Validate input
    if (!identifier || !password || !method) {
      return NextResponse.json({ error: "Données manquantes" }, { status: 400 })
    }

    // Find user by email or phone
    const user = mockUsers.find((u) => (method === "email" ? u.email === identifier : u.phone === identifier))

    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
    }

    const token = generateSimpleToken(user.id, user.userType)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
