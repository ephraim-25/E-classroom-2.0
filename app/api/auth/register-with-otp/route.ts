import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, userType, verificationToken } = await request.json()

    // Validate verification token
    if (!verificationToken || !isValidVerificationToken(verificationToken)) {
      return NextResponse.json({ error: "Token de vérification invalide ou expiré" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await findUserByEmailOrPhone(email, phone)
    if (existingUser) {
      return NextResponse.json({ error: "Un compte existe déjà avec cet email ou numéro" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const user = await createUser({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      userType,
      isVerified: true, // Already verified via OTP
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })

    // Generate auth token
    const authToken = generateAuthToken(user)

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      success: true,
      message: "Compte créé avec succès",
      user: userWithoutPassword,
      token: authToken,
    })
  } catch (error) {
    console.error("Register with OTP error:", error)
    return NextResponse.json({ error: "Erreur lors de la création du compte" }, { status: 500 })
  }
}

function isValidVerificationToken(token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [identifier, type, timestamp] = decoded.split(":")

    // Check if token is not older than 15 minutes
    const tokenAge = Date.now() - Number.parseInt(timestamp)
    return tokenAge < 15 * 60 * 1000
  } catch {
    return false
  }
}

async function findUserByEmailOrPhone(email: string, phone: string) {
  // Mock user lookup
  console.log(`[v0] Checking if user exists: ${email} or ${phone}`)
  return null // No existing user
}

async function createUser(userData: any) {
  // Mock user creation
  const user = {
    id: Date.now().toString(),
    ...userData,
  }
  console.log(`[v0] Creating user:`, user)
  return user
}

function generateAuthToken(user: any): string {
  // Simple token generation - in production use JWT
  return Buffer.from(`${user.id}:${user.email}:${Date.now()}`).toString("base64")
}
