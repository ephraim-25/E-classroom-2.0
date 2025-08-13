import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
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

const JWT_SECRET = process.env.JWT_SECRET || "e-classroom-default-secret-key-2024"

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

    let token: string
    try {
      token = jwt.sign(
        {
          userId: user.id,
          userType: user.userType,
          email: user.email,
        },
        JWT_SECRET,
        {
          expiresIn: "7d",
          algorithm: "HS256",
        },
      )
    } catch (jwtError) {
      console.error("JWT generation error:", jwtError)
      return NextResponse.json({ error: "Erreur de génération du token" }, { status: 500 })
    }

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
