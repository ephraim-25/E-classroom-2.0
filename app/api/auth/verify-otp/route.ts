import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { identifier, otp, type } = await request.json()

    // Validate input
    if (!identifier || !otp || !type) {
      return NextResponse.json({ error: "Identifiant, code OTP et type requis" }, { status: 400 })
    }

    const storedOTP = await getStoredOTP(identifier, type)

    if (!storedOTP) {
      return NextResponse.json({ error: "Code de vérification non trouvé ou expiré" }, { status: 400 })
    }

    // Check if OTP is expired
    if (new Date() > storedOTP.expiresAt) {
      return NextResponse.json({ error: "Code de vérification expiré" }, { status: 400 })
    }

    // Check attempts limit
    if (storedOTP.attempts >= 3) {
      return NextResponse.json({ error: "Trop de tentatives. Demandez un nouveau code." }, { status: 429 })
    }

    // Verify OTP
    if (storedOTP.otp !== otp) {
      // Increment attempts
      await incrementOTPAttempts(identifier, type)
      return NextResponse.json({ error: "Code de vérification incorrect" }, { status: 400 })
    }

    // Mark OTP as verified
    await markOTPAsVerified(identifier, type)

    // Generate verification token for next step
    const verificationToken = generateVerificationToken(identifier, type)

    return NextResponse.json({
      success: true,
      message: "Code de vérification validé avec succès",
      verificationToken,
      type,
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json({ error: "Erreur lors de la vérification du code" }, { status: 500 })
  }
}

async function getStoredOTP(identifier: string, type: string) {
  // Mock stored OTP data
  return {
    identifier,
    otp: "123456", // In production, this would be hashed
    type,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
    attempts: 0,
    verified: false,
  }
}

async function incrementOTPAttempts(identifier: string, type: string) {
  console.log(`[v0] Incrementing OTP attempts for ${identifier}`)
}

async function markOTPAsVerified(identifier: string, type: string) {
  console.log(`[v0] Marking OTP as verified for ${identifier}`)
}

function generateVerificationToken(identifier: string, type: string): string {
  // Simple token generation - in production use JWT or similar
  return Buffer.from(`${identifier}:${type}:${Date.now()}`).toString("base64")
}
