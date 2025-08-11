"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Smartphone, Shield, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [loading, setLoading] = useState(false)

  // Mock course data - in real app, fetch from API
  const course = {
    id: courseId,
    title: "Introduction au Marketing Digital",
    price: 49.99,
    instructor: "Marie Dubois",
    image: "/placeholder.svg?height=200&width=300",
  }

  const handlePayment = async () => {
    setLoading(true)
    // Simulate payment processing
    setTimeout(() => {
      router.push(`/payment/success?courseId=${courseId}`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Résumé de la commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={course.image || "/placeholder.svg"}
                  alt={course.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{course.title}</h3>
                  <p className="text-sm text-gray-600">Par {course.instructor}</p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Prix du cours</span>
                  <span>${course.price}</span>
                </div>
                <div className="flex justify-between">
                  <span>TVA (20%)</span>
                  <span>${(course.price * 0.2).toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${(course.price * 1.2).toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Méthode de paiement</CardTitle>
              <CardDescription>Choisissez votre méthode de paiement préférée</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                    <CreditCard className="w-5 h-5" />
                    Carte bancaire
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="mpesa" id="mpesa" />
                  <Label htmlFor="mpesa" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="w-5 h-5" />
                    M-Pesa
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="airtel" id="airtel" />
                  <Label htmlFor="airtel" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="w-5 h-5" />
                    Airtel Money
                  </Label>
                </div>

                <div className="flex items-center space-x-2 p-4 border rounded-lg">
                  <RadioGroupItem value="orange" id="orange" />
                  <Label htmlFor="orange" className="flex items-center gap-2 cursor-pointer">
                    <Smartphone className="w-5 h-5" />
                    Orange Money
                  </Label>
                </div>
              </RadioGroup>

              {/* Payment Form Fields */}
              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">Numéro de carte</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Date d'expiration</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">Nom sur la carte</Label>
                    <Input id="cardName" placeholder="John Doe" className="mt-1" />
                  </div>
                </div>
              )}

              {(paymentMethod === "mpesa" || paymentMethod === "airtel" || paymentMethod === "orange") && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
                    <Input id="phoneNumber" placeholder="+243 XXX XXX XXX" className="mt-1" />
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-900">Instructions de paiement</p>
                        <p className="text-blue-700 mt-1">
                          Vous recevrez un SMS avec les instructions pour finaliser le paiement via{" "}
                          {paymentMethod === "mpesa"
                            ? "M-Pesa"
                            : paymentMethod === "airtel"
                              ? "Airtel Money"
                              : "Orange Money"}
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Button onClick={handlePayment} disabled={loading} className="w-full" size="lg">
                {loading ? "Traitement en cours..." : `Payer $${(course.price * 1.2).toFixed(2)}`}
              </Button>

              <div className="text-center text-sm text-gray-600">
                <Shield className="w-4 h-4 inline mr-1" />
                Paiement sécurisé SSL 256-bit
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
