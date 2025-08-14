import { type NextRequest, NextResponse } from "next/server"

function hashPassword(password: string): string {
  // Simple hash simulation - replace with proper hashing in production
  return `hashed_${password}_${Date.now()}`
}

function generateSimpleToken(userId: string, userType: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 15)
  return `${userId}_${userType}_${timestamp}_${randomString}`
}

// Mock database - replace with actual database
const mockUsers = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com",
    phone: "+243123456789",
    password: "hashed_password_1234567890",
    userType: "student",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
]

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, phone, password, userType } = await request.json()

    // Check if user already exists
    const existingUser = mockUsers.find((u) => u.email === email || u.phone === phone)
    if (existingUser) {
      return NextResponse.json({ error: "Un utilisateur avec cet email ou ce numéro existe déjà" }, { status: 409 })
    }

    const hashedPassword = hashPassword(password)

    // Create new user
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      userType,
      isVerified: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // Add to mock database
    mockUsers.push(newUser)

    const token = generateSimpleToken(newUser.id, newUser.userType)

    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({
      token,
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
