import { type NextRequest, NextResponse } from "next/server"

const otpCodes: Map<string, { code: string; expires: number; method: string }> = new Map()

export async function POST(request: NextRequest) {
  try {
    const { userId, method } = await request.json()

    if (!userId || !method) {
      return NextResponse.json({ error: "UserId et méthode requis" }, { status: 400 })
    }

    // Generate new OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString()
    const otpExpires = Date.now() + 10 * 60 * 1000 // 10 minutes

    otpCodes.set(userId, {
      code: otpCode,
      expires: otpExpires,
      method,
    })

    // In production, send OTP via email/SMS
    console.log(`[DEV] New OTP for ${userId}: ${otpCode}`)

    return NextResponse.json({
      message: "Nouveau code OTP envoyé",
    })
  } catch (error) {
    console.error("Resend OTP error:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
