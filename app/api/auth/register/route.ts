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
    password: "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi",
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

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

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.id, userType: newUser.userType },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" },
    )

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
