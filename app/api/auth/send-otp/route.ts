import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import sgMail from "@sendgrid/mail"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { identifier, type, method } = await request.json()

    // Validate input
    if (!identifier || !type || !method) {
      return NextResponse.json({ error: "Identifiant, type et méthode requis" }, { status: 400 })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()

    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    const { error: dbError } = await supabase.from("otp_codes").upsert({
      identifier,
      otp_code: otp,
      type,
      method,
      expires_at: expiresAt.toISOString(),
      attempts: 0,
      verified: false,
      created_at: new Date().toISOString(),
    })

    if (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ error: "Erreur lors de la sauvegarde du code" }, { status: 500 })
    }

    console.log("[v0] OTP generated and stored:", { identifier, otp, type, method })

    // Send OTP via email or SMS
    if (method === "email") {
      await sendEmailOTP(identifier, otp, type)
    } else if (method === "sms") {
      await sendSMSOTP(identifier, otp, type)
    }

    return NextResponse.json({
      success: true,
      message: `Code de vérification envoyé par ${method === "email" ? "email" : "SMS"}`,
      expiresIn: 300, // 5 minutes in seconds
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du code de vérification" }, { status: 500 })
  }
}

async function sendEmailOTP(email: string, otp: string, type: string) {
  console.log(`[v0] Sending email OTP to ${email}: ${otp} for ${type}`)

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: "Votre code de vérification E-Classroom",
    text: `Votre code de vérification est : ${otp}. Il expire dans 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">E-Classroom</h2>
        <p>Votre code de vérification est :</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; margin: 20px 0;">
          ${otp}
        </div>
        <p style="color: #6b7280;">Ce code expire dans 5 minutes.</p>
        <p style="color: #6b7280;">Si vous n'avez pas demandé ce code, ignorez cet email.</p>
      </div>
    `,
  }

  try {
    await sgMail.send(msg)
    console.log(`[v0] Email sent successfully to ${email}`)
    return true
  } catch (error) {
    console.error("SendGrid error:", error)
    throw new Error("Erreur lors de l'envoi de l'email")
  }
}

async function sendSMSOTP(phone: string, otp: string, type: string) {
  console.log(`[v0] SMS OTP sending not implemented yet for ${phone}: ${otp} for ${type}`)
  // SMS will be implemented later as requested
  return true
}
