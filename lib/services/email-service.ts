import sgMail from "@sendgrid/mail"

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "")

export class EmailService {
  static async sendOTP(email: string, otp: string, language: "fr" | "en" = "fr") {
    const messages = {
      fr: {
        subject: "Code de vérification E-Classroom",
        text: `Votre code de vérification E-Classroom est : ${otp}. Ce code expire dans 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">E-Classroom</h2>
            <p>Votre code de vérification est :</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #6b7280;">Ce code expire dans 5 minutes.</p>
            <p style="color: #6b7280;">Si vous n'avez pas demandé ce code, ignorez ce message.</p>
          </div>
        `,
      },
      en: {
        subject: "E-Classroom Verification Code",
        text: `Your E-Classroom verification code is: ${otp}. This code expires in 5 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #2563eb;">E-Classroom</h2>
            <p>Your verification code is:</p>
            <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; margin: 20px 0;">
              ${otp}
            </div>
            <p style="color: #6b7280;">This code expires in 5 minutes.</p>
            <p style="color: #6b7280;">If you didn't request this code, please ignore this message.</p>
          </div>
        `,
      },
    }

    const msg = messages[language]

    try {
      await sgMail.send({
        to: email,
        from: process.env.SENDGRID_FROM_EMAIL || "noreply@e-classroom.com",
        subject: msg.subject,
        text: msg.text,
        html: msg.html,
      })

      console.log(`[v0] OTP email sent successfully to ${email}`)
      return { success: true }
    } catch (error) {
      console.error("[v0] Failed to send OTP email:", error)
      return { success: false, error: "Failed to send email" }
    }
  }
}
