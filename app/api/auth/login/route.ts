import { type NextRequest, NextResponse } from "next/server"
import { authStorage } from "@/lib/auth-storage"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { identifier, password, method } = await request.json()

    // Validate input
    if (!identifier || !password) {
      return NextResponse.json({ error: "Email et mot de passe requis" }, { status: 400 })
    }

    // Find user by email
    const user = authStorage.findUserByEmail(identifier)
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Mot de passe incorrect" }, { status: 401 })
    }

    // Generate simple token
    const token = `${user.id}_${user.role}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Connexion réussie",
      user: userWithoutPassword,
      token,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
