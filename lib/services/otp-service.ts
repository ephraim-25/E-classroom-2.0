import bcrypt from "bcryptjs"
import { createClient } from "@/lib/supabase/server"

export class OTPService {
  static generateOTP(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  static async storeOTP(identifier: string, otp: string, type: "email" | "phone") {
    const supabase = createClient()
    const hashedOTP = await bcrypt.hash(otp, 12)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes

    try {
      // Delete any existing OTP for this identifier
      await supabase.from("otp_codes").delete().eq("identifier", identifier)

      // Store new OTP
      const { error } = await supabase.from("otp_codes").insert({
        identifier,
        otp_hash: hashedOTP,
        type,
        expires_at: expiresAt.toISOString(),
        attempts: 0,
      })

      if (error) throw error

      console.log(`[v0] OTP stored successfully for ${identifier}`)
      return { success: true }
    } catch (error) {
      console.error("[v0] Failed to store OTP:", error)
      return { success: false, error: "Failed to store OTP" }
    }
  }

  static async verifyOTP(identifier: string, otp: string) {
    const supabase = createClient()

    try {
      const { data, error } = await supabase.from("otp_codes").select("*").eq("identifier", identifier).single()

      if (error || !data) {
        return { success: false, error: "OTP not found" }
      }

      // Check if OTP is expired
      if (new Date() > new Date(data.expires_at)) {
        await supabase.from("otp_codes").delete().eq("id", data.id)
        return { success: false, error: "OTP expired" }
      }

      // Check attempts limit
      if (data.attempts >= 3) {
        await supabase.from("otp_codes").delete().eq("id", data.id)
        return { success: false, error: "Too many attempts" }
      }

      // Verify OTP
      const isValid = await bcrypt.compare(otp, data.otp_hash)

      if (!isValid) {
        // Increment attempts
        await supabase
          .from("otp_codes")
          .update({ attempts: data.attempts + 1 })
          .eq("id", data.id)

        return { success: false, error: "Invalid OTP" }
      }

      // OTP is valid, delete it
      await supabase.from("otp_codes").delete().eq("id", data.id)

      console.log(`[v0] OTP verified successfully for ${identifier}`)
      return { success: true }
    } catch (error) {
      console.error("[v0] Failed to verify OTP:", error)
      return { success: false, error: "Verification failed" }
    }
  }
}
