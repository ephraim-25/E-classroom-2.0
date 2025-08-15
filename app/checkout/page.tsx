"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { PaymentMethodSelector } from "@/components/payments/payment-method-selector"
import { useAuth } from "@/contexts/auth-context"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const courseId = searchParams.get("courseId")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [paymentData, setPaymentData] = useState<any>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock course data - in real app, fetch from API
  const course = {
    id: courseId,
    title: "Introduction au Marketing Digital",
    price: 79,
    instructor: "Marie Dubois",
    image: "/placeholder.svg?height=200&width=300",
    features: [
      "8h 30min de contenu vidéo",
      "Ressources téléchargeables",
      "Accès à vie",
      "Certificat de fin de formation",
      "Support communautaire",
    ],
  }

  const handlePayment = async () => {
    if (!paymentMethod) {
      setError("Veuillez sélectionner une méthode de paiement")
      return
    }

    // Validate payment data
    if (paymentMethod === "card") {
      if (!paymentData.cardNumber || !paymentData.expiry || !paymentData.cvv || !paymentData.cardName) {
        setError("Veuillez remplir tous les champs de la carte")
        return
      }
    } else if (["mpesa", "airtel", "orange"].includes(paymentMethod)) {
      if (!paymentData.phoneNumber) {
        setError("Veuillez entrer votre numéro de téléphone")
        return
      }
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId,
          paymentMethod,
          amount: course.price,
          userDetails: {
            userId: user?.id,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName,
          },
          phoneNumber: paymentData.phoneNumber,
          cardDetails:
            paymentMethod === "card"
              ? {
                  number: paymentData.cardNumber,
                  expiry: paymentData.expiry,
                  cvv: paymentData.cvv,
                  name: paymentData.cardName,
                }
              : undefined,
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.redirectUrl) {
          router.push(result.redirectUrl)
        } else {
          // For mobile money, show instructions
          router.push(`/payment/pending?transactionId=${result.transactionId}&method=${paymentMethod}`)
        }
      } else {
        setError(result.error || "Erreur lors du traitement du paiement")
      }
    } catch (error) {
      setError("Erreur de connexion. Veuillez réessayer.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour au cours
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-900">Finaliser votre achat</CardTitle>
                <CardDescription>
                  Choisissez votre méthode de paiement préférée pour accéder immédiatement au cours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentMethodSelector
                  selectedMethod={paymentMethod}
                  onMethodChange={setPaymentMethod}
                  onPaymentDataChange={setPaymentData}
                  amount={course.price}
                />

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}

                <div className="mt-6">
                  <Button
                    onClick={handlePayment}
                    disabled={loading || !paymentMethod}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    {loading ? "Traitement en cours..." : `Payer $${course.price}`}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-blue-900">Résumé de la commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">{course.title}</h3>
                    <p className="text-sm text-gray-600">Par {course.instructor}</p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-900">Ce cours inclut :</h4>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Prix du cours</span>
                    <span>${course.price}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${course.price}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">Garantie de remboursement de 30 jours</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
