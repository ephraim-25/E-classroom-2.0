"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Smartphone, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function PaymentPendingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const transactionId = searchParams.get("transactionId")
  const method = searchParams.get("method")
  const [status, setStatus] = useState("pending")
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  const methodNames = {
    mpesa: "M-Pesa",
    airtel: "Airtel Money",
    orange: "Orange Money",
  }

  const methodName = methodNames[method as keyof typeof methodNames] || method

  // Simulate payment status checking
  useEffect(() => {
    const checkPaymentStatus = () => {
      // Mock status check - in real app, poll the API
      const random = Math.random()
      if (random > 0.7) {
        setStatus("completed")
        setTimeout(() => {
          router.push(`/payment/success?transactionId=${transactionId}`)
        }, 2000)
      } else if (random < 0.1) {
        setStatus("failed")
      }
    }

    const interval = setInterval(checkPaymentStatus, 5000)
    return () => clearInterval(interval)
  }, [transactionId, router])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && status === "pending") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      setStatus("expired")
    }
  }, [timeLeft, status])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleRetry = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              {status === "pending" && <Smartphone className="w-8 h-8 text-blue-600 animate-pulse" />}
              {status === "completed" && <CheckCircle className="w-8 h-8 text-green-600" />}
              {status === "failed" && <XCircle className="w-8 h-8 text-red-600" />}
              {status === "expired" && <Clock className="w-8 h-8 text-gray-600" />}
            </div>
            <CardTitle className="text-2xl">
              {status === "pending" && "Paiement en cours"}
              {status === "completed" && "Paiement réussi !"}
              {status === "failed" && "Paiement échoué"}
              {status === "expired" && "Temps expiré"}
            </CardTitle>
            <CardDescription>
              {status === "pending" && `Vérifiez votre téléphone pour confirmer le paiement ${methodName}`}
              {status === "completed" && "Votre paiement a été traité avec succès"}
              {status === "failed" && "Le paiement n'a pas pu être traité"}
              {status === "expired" && "Le délai de paiement a expiré"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === "pending" && (
              <>
                <div className="p-4 bg-blue-50 rounded-lg text-left">
                  <h3 className="font-semibold text-blue-900 mb-2">Instructions :</h3>
                  <ol className="text-sm text-blue-800 space-y-1">
                    <li>1. Vérifiez votre téléphone pour le SMS de {methodName}</li>
                    <li>2. Entrez votre code PIN pour confirmer</li>
                    <li>3. Attendez la confirmation de paiement</li>
                  </ol>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-900 mb-1">{formatTime(timeLeft)}</div>
                  <p className="text-sm text-gray-600">Temps restant pour confirmer</p>
                </div>

                <div className="text-xs text-gray-500">
                  <p>ID de transaction: {transactionId}</p>
                </div>
              </>
            )}

            {status === "completed" && (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-800">Redirection vers votre cours...</p>
                </div>
              </div>
            )}

            {(status === "failed" || status === "expired") && (
              <div className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-800 text-sm">
                    {status === "failed"
                      ? "Le paiement a été annulé ou a échoué. Veuillez réessayer."
                      : "Le délai de confirmation a expiré. Veuillez relancer le paiement."}
                  </p>
                </div>

                <Button onClick={handleRetry} className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer le paiement
                </Button>
              </div>
            )}

            {status === "pending" && (
              <Button variant="outline" onClick={() => router.push("/dashboard/student")} className="w-full">
                Retour au tableau de bord
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
