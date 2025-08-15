"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, Mail, Phone } from "lucide-react"

export default function VerifyOTPPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  const userId = searchParams.get("userId")
  const method = searchParams.get("method") as "email" | "phone"

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.currentTarget)
    const otp = formData.get("otp") as string

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, otp, method }),
      })

      if (!response.ok) {
        throw new Error("Code OTP invalide")
      }

      const result = await response.json()
      setSuccess("Compte vérifié avec succès !")

      // Store auth token and redirect
      localStorage.setItem("auth_token", result.token)
      setTimeout(() => {
        router.push("/dashboard")
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOTP = async () => {
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, method }),
      })

      if (!response.ok) {
        throw new Error("Échec de l'envoi du code")
      }

      setSuccess("Nouveau code envoyé !")
      setCountdown(60)
      setCanResend(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-brand-blue">Vérification</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            {method === "email" ? <Mail className="h-4 w-4" /> : <Phone className="h-4 w-4" />}
            Code envoyé par {method === "email" ? "email" : "SMS"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Code de vérification</Label>
              <Input
                id="otp"
                name="otp"
                placeholder="123456"
                maxLength={6}
                pattern="[0-9]{6}"
                required
                className="text-center text-lg tracking-widest"
              />
              <p className="text-xs text-muted-foreground text-center">Saisissez le code à 6 chiffres reçu</p>
            </div>

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

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Vérifier
            </Button>
          </form>

          <div className="mt-6 text-center">
            {canResend ? (
              <Button variant="ghost" onClick={handleResendOTP} disabled={isLoading} className="text-brand-blue">
                Renvoyer le code
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">Renvoyer le code dans {countdown}s</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
