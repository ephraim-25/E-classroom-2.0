import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { identifier, type, method } = await request.json()

    // Validate input
    if (!identifier || !type || !method) {
      return NextResponse.json({ error: "Identifiant, type et méthode requis" }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    // Store OTP in database/cache (mock implementation)
    const otpData = {
      identifier,
      otp,
      type, // 'login', 'register', 'reset-password'
      method, // 'email' or 'sms'
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
      attempts: 0,
      verified: false,
    }

    console.log("[v0] OTP generated:", { identifier, otp, type, method })

    // Send OTP via email or SMS
    if (method === "email") {
      await sendEmailOTP(identifier, otp, type)
    } else if (method === "sms") {
      await sendSMSOTP(identifier, otp, type)
    }

    return NextResponse.json({
      success: true,
      message: `Code de vérification envoyé par ${method === "email" ? "email" : "SMS"}`,
      expiresIn: 600, // 10 minutes in seconds
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du code de vérification" }, { status: 500 })
  }
}

async function sendEmailOTP(email: string, otp: string, type: string) {
  console.log(`[v0] Sending email OTP to ${email}: ${otp} for ${type}`)

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In production, use services like:
  // - Resend, SendGrid, AWS SES, etc.
  return true
}

async function sendSMSOTP(phone: string, otp: string, type: string) {
  console.log(`[v0] Sending SMS OTP to ${phone}: ${otp} for ${type}`)

  // Simulate SMS sending delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In production, use services like:
  // - Twilio, AWS SNS, Africa's Talking, etc.
  return true
}
