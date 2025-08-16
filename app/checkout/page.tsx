"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Shield, ArrowLeft, Lock, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    phoneNumber: "",
  })

  // Mock course data - in real app, fetch from API
  const course = {
    id: courseId,
    title: "Introduction au Marketing Digital",
    price: 49.99,
    instructor: "Marie Dubois",
    image: "/placeholder.svg?height=200&width=300",
    originalPrice: 79.99,
    discount: 38,
  }

  const tax = course.price * 0.2
  const total = course.price + tax

  const paymentMethods = [
    {
      id: "card",
      name: "Carte bancaire",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
      processingTime: "Instantané",
    },
    {
      id: "mpesa",
      name: "M-Pesa",
      icon: Smartphone,
      description: "Paiement mobile sécurisé",
      processingTime: "1-2 minutes",
    },
    {
      id: "airtel",
      name: "Airtel Money",
      icon: Smartphone,
      description: "Paiement mobile Airtel",
      processingTime: "1-2 minutes",
    },
    {
      id: "orange",
      name: "Orange Money",
      icon: Smartphone,
      description: "Paiement mobile Orange",
      processingTime: "1-2 minutes",
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    setLoading(true)

    try {
      const paymentData = {
        courseId,
        paymentMethod,
        amount: total,
        userDetails: {
          userId: "user-123", // In real app, get from auth context
          email: "user@example.com",
        },
        ...(paymentMethod === "card"
          ? {
              cardDetails: {
                number: formData.cardNumber,
                expiry: formData.expiryDate,
                cvv: formData.cvv,
                name: formData.cardName,
              },
            }
          : {
              phoneNumber: formData.phoneNumber,
            }),
      }

      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })

      const result = await response.json()

      if (result.success) {
        if (result.redirectUrl) {
          router.push(result.redirectUrl)
        } else {
          // For mobile money, show instructions
          alert(result.message)
        }
      } else {
        alert("Erreur de paiement: " + result.message)
      }
    } catch (error) {
      console.error("Payment error:", error)
      alert("Erreur lors du traitement du paiement")
    } finally {
      setLoading(false)
    }
  }

  const isFormValid = () => {
    if (paymentMethod === "card") {
      return (
        formData.cardNumber.length >= 16 &&
        formData.expiryDate.length >= 5 &&
        formData.cvv.length >= 3 &&
        formData.cardName.length > 0
      )
    } else {
      return formData.phoneNumber.length >= 10
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
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
                    {course.discount > 0 && (
                      <Badge className="bg-red-100 text-red-800 hover:bg-red-200 mt-1">
                        -{course.discount}% de réduction
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Prix du cours</span>
                    <div className="text-right">
                      <span className="font-medium">${course.price}</span>
                      {course.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">${course.originalPrice}</div>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg text-blue-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="pt-4 border-t space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Accès à vie au cours</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Certificat de fin de formation</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Support technique inclus</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Méthode de paiement</CardTitle>
                <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon
                      return (
                        <div key={method.id} className="relative">
                          <RadioGroupItem value={method.id} id={method.id} className="peer sr-only" />
                          <Label
                            htmlFor={method.id}
                            className="flex flex-col p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all"
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <Icon className="w-6 h-6 text-blue-600" />
                              <span className="font-medium">{method.name}</span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                            <p className="text-xs text-gray-500">Traitement: {method.processingTime}</p>
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>

                {/* Payment Form Fields */}
                {paymentMethod === "card" && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">Informations de la carte</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="cardNumber">Numéro de carte</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="expiry">Date d'expiration</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="cardName">Nom sur la carte</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange("cardName", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {(paymentMethod === "mpesa" || paymentMethod === "airtel" || paymentMethod === "orange") && (
                  <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">
                      Paiement{" "}
                      {paymentMethod === "mpesa"
                        ? "M-Pesa"
                        : paymentMethod === "airtel"
                          ? "Airtel Money"
                          : "Orange Money"}
                    </h4>
                    <div>
                      <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                      <Input
                        id="phoneNumber"
                        placeholder="+243 XXX XXX XXX"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-start gap-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-blue-900 mb-1">Instructions de paiement</p>
                          <p className="text-blue-700">
                            Après avoir cliqué sur "Payer", vous recevrez un SMS avec les instructions pour finaliser le
                            paiement via{" "}
                            {paymentMethod === "mpesa"
                              ? "M-Pesa"
                              : paymentMethod === "airtel"
                                ? "Airtel Money"
                                : "Orange Money"}
                            .
                          </p>
                          <p className="text-blue-600 mt-2 text-xs">
                            Le paiement sera traité en 1-2 minutes après confirmation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <Button
                  onClick={handlePayment}
                  disabled={loading || !isFormValid()}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  {loading ? "Traitement en cours..." : `Payer $${total.toFixed(2)}`}
                </Button>

                <div className="text-center text-sm text-gray-600 space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <Shield className="w-4 h-4" />
                    <span>Paiement sécurisé SSL 256-bit</span>
                  </div>
                  <p>Vos informations de paiement sont protégées et chiffrées</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
