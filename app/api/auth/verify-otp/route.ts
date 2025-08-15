import { type NextRequest, NextResponse } from "next/server"

const users: any[] = []
const otpCodes: Map<string, { code: string; expires: number; method: string }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { userId, otp, method } = await request.json()

    if (!userId || !otp) {
      return NextResponse.json({ error: "UserId et code OTP requis" }, { status: 400 })
    }

    // Check OTP
    const storedOTP = otpCodes.get(userId)
    if (!storedOTP) {
      return NextResponse.json({ error: "Code OTP expiré ou invalide" }, { status: 400 })
    }

    if (storedOTP.code !== otp) {
      return NextResponse.json({ error: "Code OTP incorrect" }, { status: 400 })
    }

    if (Date.now() > storedOTP.expires) {
      otpCodes.delete(userId)
      return NextResponse.json({ error: "Code OTP expiré" }, { status: 400 })
    }

    // Find and verify user
    const userIndex = users.findIndex((u) => u.id === userId)
    if (userIndex === -1) {
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 })
    }

    // Mark user as verified
    users[userIndex].isVerified = true
    users[userIndex].updatedAt = new Date().toISOString()

    // Remove OTP
    otpCodes.delete(userId)

    // Generate auth token (simplified)
    const token = `token_${userId}_${Date.now()}`

    return NextResponse.json({
      message: "Compte vérifié avec succès",
      token,
      user: {
        id: users[userIndex].id,
        firstName: users[userIndex].firstName,
        lastName: users[userIndex].lastName,
        email: users[userIndex].email,
        phone: users[userIndex].phone,
        userType: users[userIndex].userType,
        isVerified: true,
      },
    })
  } catch (error) {
    console.error("OTP verification error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
