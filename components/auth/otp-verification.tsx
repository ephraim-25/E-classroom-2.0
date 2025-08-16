"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle, RefreshCw } from "lucide-react"

interface OTPVerificationProps {
  identifier: string
  method: "email" | "sms"
  type: "register" | "login" | "reset-password"
  onVerified: (verificationToken: string) => void
  onBack: () => void
}

export function OTPVerification({ identifier, method, type, onVerified, onBack }: OTPVerificationProps) {
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutes
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      setError("Veuillez saisir le code à 6 chiffres")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp, type }),
      })

      const data = await response.json()

      if (data.success) {
        onVerified(data.verificationToken)
      } else {
        setError(data.error || "Code de vérification incorrect")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, type, method }),
      })

      const data = await response.json()

      if (data.success) {
        setTimeLeft(600) // Reset timer
        setCanResend(false)
        setOtp("") // Clear current OTP
      } else {
        setError(data.error || "Erreur lors du renvoi du code")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-blue-100 shadow-lg">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-2xl font-bold text-blue-900">Vérification</CardTitle>
        <CardDescription className="text-gray-600">
          Saisissez le code à 6 chiffres envoyé {method === "email" ? "par email" : "par SMS"} à<br />
          <span className="font-medium text-blue-600">{identifier}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* OTP Input */}
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp} disabled={isLoading}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        {/* Timer */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {timeLeft > 0 ? (
              <>
                Code expire dans <span className="font-medium text-blue-600">{formatTime(timeLeft)}</span>
              </>
            ) : (
              <span className="text-red-600">Code expiré</span>
            )}
          </p>
        </div>

        {/* Verify Button */}
        <Button
          onClick={handleVerifyOTP}
          disabled={isLoading || otp.length !== 6 || timeLeft === 0}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Vérification...
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Vérifier le code
            </>
          )}
        </Button>

        {/* Resend Button */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">Vous n'avez pas reçu le code ?</p>
          <Button
            variant="outline"
            onClick={handleResendOTP}
            disabled={isLoading || !canResend}
            className="border-blue-200 hover:bg-blue-50 bg-transparent"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Envoi...
              </>
            ) : (
              "Renvoyer le code"
            )}
          </Button>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button variant="ghost" onClick={onBack} className="text-blue-600 hover:text-blue-700">
            Retour
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
