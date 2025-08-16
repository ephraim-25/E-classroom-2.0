"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Phone, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  const identifier = searchParams.get("identifier")
  const type = searchParams.get("type") as "email" | "phone"
  const action = searchParams.get("action") // 'register' or 'login'

  useEffect(() => {
    if (!identifier || !type) {
      router.push("/auth/login")
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [identifier, type, router])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      setError("Veuillez entrer un code à 6 chiffres")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, otp, action }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess("Vérification réussie ! Redirection...")

        // Store auth token if provided
        if (data.token) {
          localStorage.setItem("auth_token", data.token)
        }

        // Redirect based on user role
        setTimeout(() => {
          if (data.user?.user_type === "admin") {
            router.push("/dashboard/admin")
          } else if (data.user?.user_type === "instructor") {
            router.push("/dashboard/instructor")
          } else {
            router.push("/dashboard/student")
          }
        }, 1500)
      } else {
        setError(data.error || "Erreur lors de la vérification")
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setResendLoading(true)
    setError("")
    setSuccess("")

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, type }),
      })

      const data = await response.json()

      if (data.success) {
        setSuccess(`Nouveau code envoyé par ${type === "email" ? "email" : "SMS"}`)
        setTimeLeft(300) // Reset timer
      } else {
        setError(data.error || "Erreur lors du renvoi")
      }
    } catch (error) {
      setError("Erreur de connexion")
    } finally {
      setResendLoading(false)
    }
  }

  if (!identifier || !type) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            {type === "email" ? (
              <Mail className="w-6 h-6 text-blue-600" />
            ) : (
              <Phone className="w-6 h-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Vérification OTP</CardTitle>
          <CardDescription>
            Entrez le code à 6 chiffres envoyé {type === "email" ? "par email" : "par SMS"} à{" "}
            <span className="font-medium text-gray-900">
              {type === "email" ? identifier : `***${identifier.slice(-4)}`}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <AlertDescription className="text-green-800">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="000000"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                className="text-center text-2xl font-mono tracking-widest"
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Vérification...
                </>
              ) : (
                "Vérifier le code"
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Code expire dans : <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
            </p>

            {timeLeft > 0 ? (
              <Button variant="ghost" onClick={handleResendOTP} disabled={resendLoading} className="text-sm">
                {resendLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Renvoyer le code"
                )}
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={handleResendOTP}
                disabled={resendLoading}
                className="text-sm bg-transparent"
              >
                {resendLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Envoi...
                  </>
                ) : (
                  "Renvoyer un nouveau code"
                )}
              </Button>
            )}
          </div>

          <div className="text-center">
            <Link href="/auth/login" className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Retour à la connexion
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
