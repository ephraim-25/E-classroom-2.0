import { type NextRequest, NextResponse } from "next/server"

// Mock database - replace with actual database
const mockUsers = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean@example.com",
    phone: "+243123456789",
    userType: "student",
    isVerified: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-01T00:00:00.000Z",
  },
]

function parseSimpleToken(token: string): { userId: string; userType: string } | null {
  try {
    const parts = token.split("_")
    if (parts.length >= 2) {
      return { userId: parts[0], userType: parts[1] }
    }
    return null
  } catch {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token manquant" }, { status: 401 })
    }

    const decoded = parseSimpleToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide ou expiré" }, { status: 401 })
    }

    // Find user
    const user = mockUsers.find((u) => u.id === decoded.userId)
    if (!user) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
