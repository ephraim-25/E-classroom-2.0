import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

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
    if (new Date() > new Date(storedOTP.expires_at)) {
      await deleteOTP(identifier, type)
      return NextResponse.json({ error: "Code de vérification expiré" }, { status: 400 })
    }

    // Check attempts limit
    if (storedOTP.attempts >= 3) {
      return NextResponse.json({ error: "Trop de tentatives. Demandez un nouveau code." }, { status: 429 })
    }

    // Verify OTP
    if (storedOTP.otp_code !== otp) {
      // Increment attempts
      await incrementOTPAttempts(identifier, type)
      return NextResponse.json({ error: "Code de vérification incorrect" }, { status: 400 })
    }

    await markOTPAsVerified(identifier, type)
    await deleteOTP(identifier, type)

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
  const { data, error } = await supabase
    .from("otp_codes")
    .select("*")
    .eq("identifier", identifier)
    .eq("type", type)
    .eq("verified", false)
    .single()

  if (error) {
    console.error("Get OTP error:", error)
    return null
  }

  return data
}

async function incrementOTPAttempts(identifier: string, type: string) {
  console.log(`[v0] Incrementing OTP attempts for ${identifier}`)

  const { error } = await supabase
    .from("otp_codes")
    .update({ attempts: supabase.raw("attempts + 1") })
    .eq("identifier", identifier)
    .eq("type", type)

  if (error) {
    console.error("Increment attempts error:", error)
  }
}

async function markOTPAsVerified(identifier: string, type: string) {
  console.log(`[v0] Marking OTP as verified for ${identifier}`)

  const { error } = await supabase
    .from("otp_codes")
    .update({ verified: true })
    .eq("identifier", identifier)
    .eq("type", type)

  if (error) {
    console.error("Mark verified error:", error)
  }
}

async function deleteOTP(identifier: string, type: string) {
  const { error } = await supabase.from("otp_codes").delete().eq("identifier", identifier).eq("type", type)

  if (error) {
    console.error("Delete OTP error:", error)
  }
}

function generateVerificationToken(identifier: string, type: string): string {
  // Simple token generation - in production use JWT or similar
  return Buffer.from(`${identifier}:${type}:${Date.now()}`).toString("base64")
}
