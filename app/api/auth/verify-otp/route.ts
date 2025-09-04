import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { identifier, otp, type } = await request.json()

    if (!identifier || !otp || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifiant, code OTP et type requis",
        },
        { status: 400 },
      )
    }

    let verifyResponse

    // Determine if identifier is email or phone
    const isEmail = identifier.includes("@")

    if (isEmail) {
      verifyResponse = await supabase.auth.verifyOtp({
        email: identifier,
        token: otp,
        type: type === "signup" ? "signup" : "email",
      })
    } else {
      verifyResponse = await supabase.auth.verifyOtp({
        phone: identifier,
        token: otp,
        type: type === "signup" ? "signup" : "sms",
      })
    }

    if (verifyResponse.error) {
      console.error("Supabase verify OTP error:", verifyResponse.error)
      return NextResponse.json(
        {
          success: false,
          error: verifyResponse.error.message,
        },
        { status: 400 },
      )
    }

    if (type === "signup" && verifyResponse.data.user) {
      const { error: profileError } = await supabase.from("profiles").insert({
        id: verifyResponse.data.user.id,
        role: "student", // Default role
        created_at: new Date().toISOString(),
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
        // Don't fail the verification if profile creation fails
      }
    }

    return NextResponse.json({
      success: true,
      verificationToken: verifyResponse.data.session?.access_token || null,
      user: verifyResponse.data.user,
    })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de la vérification du code",
      },
      { status: 500 },
    )
  }
}
