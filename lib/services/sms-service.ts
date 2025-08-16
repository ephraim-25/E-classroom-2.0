import twilio from "twilio"

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export class SMSService {
  static async sendOTP(phone: string, otp: string, language: "fr" | "en" = "fr") {
    const messages = {
      fr: `Votre code de vérification E-Classroom est : ${otp}. Ce code expire dans 5 minutes.`,
      en: `Your E-Classroom verification code is: ${otp}. This code expires in 5 minutes.`,
    }

    try {
      await client.messages.create({
        body: messages[language],
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      })

      console.log(`[v0] OTP SMS sent successfully to ${phone}`)
      return { success: true }
    } catch (error) {
      console.error("[v0] Failed to send OTP SMS:", error)
      return { success: false, error: "Failed to send SMS" }
    }
  }
}
