import { type NextRequest, NextResponse } from "next/server"
import { authStorage } from "@/lib/auth-storage"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, userType } = await request.json()

    // Validate input
    if (!firstName || !lastName || !email || !password || !userType) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = authStorage.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "Un utilisateur avec cet email existe déjà" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create new user
    const user = authStorage.createUser({
      name: `${firstName} ${lastName}`,
      email,
      password: hashedPassword,
      role: userType as "student" | "instructor" | "admin",
    })

    // Generate simple token
    const token = `${user.id}_${user.role}_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`

    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès",
      user,
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
