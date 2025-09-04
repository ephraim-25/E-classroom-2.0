import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const { identifier, method, type } = await request.json()

    if (!identifier || !method || !type) {
      return NextResponse.json(
        {
          success: false,
          error: "Identifiant, méthode et type requis",
        },
        { status: 400 },
      )
    }

    let otpResponse

    if (method === "email") {
      otpResponse = await supabase.auth.signInWithOtp({
        email: identifier,
        options: {
          shouldCreateUser: type === "signup",
          data: {
            type: type, // Pass type for later use
          },
        },
      })
    } else if (method === "sms") {
      otpResponse = await supabase.auth.signInWithOtp({
        phone: identifier,
        options: {
          shouldCreateUser: type === "signup",
          data: {
            type: type,
          },
        },
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Méthode non supportée",
        },
        { status: 400 },
      )
    }

    if (otpResponse.error) {
      console.error("Supabase OTP error:", otpResponse.error)
      return NextResponse.json(
        {
          success: false,
          error: otpResponse.error.message,
        },
        { status: 400 },
      )
    }

    return NextResponse.json({
      success: true,
      message: `Code de vérification envoyé par ${method === "email" ? "email" : "SMS"}`,
    })
  } catch (error) {
    console.error("Send OTP error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'envoi du code de vérification",
      },
      { status: 500 },
    )
  }
}
