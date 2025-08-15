"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Shield, Info } from "lucide-react"

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  onPaymentDataChange: (data: any) => void
  amount: number
}

const paymentMethods = [
  {
    id: "card",
    name: "Carte bancaire",
    icon: CreditCard,
    description: "Visa, Mastercard, American Express",
    fees: "Gratuit",
    processingTime: "Instantané",
    popular: false,
  },
  {
    id: "mpesa",
    name: "M-Pesa",
    icon: Smartphone,
    description: "Paiement mobile sécurisé",
    fees: "1% + 0.50$",
    processingTime: "1-2 minutes",
    popular: true,
  },
  {
    id: "airtel",
    name: "Airtel Money",
    icon: Smartphone,
    description: "Paiement mobile Airtel",
    fees: "1.5% + 0.30$",
    processingTime: "1-3 minutes",
    popular: false,
  },
  {
    id: "orange",
    name: "Orange Money",
    icon: Smartphone,
    description: "Paiement mobile Orange",
    fees: "1.2% + 0.40$",
    processingTime: "1-3 minutes",
    popular: false,
  },
]

export function PaymentMethodSelector({
  selectedMethod,
  onMethodChange,
  onPaymentDataChange,
  amount,
}: PaymentMethodSelectorProps) {
  const [paymentData, setPaymentData] = useState<any>({})

  const handleMethodChange = (method: string) => {
    onMethodChange(method)
    setPaymentData({})
    onPaymentDataChange({})
  }

  const handleInputChange = (field: string, value: string) => {
    const newData = { ...paymentData, [field]: value }
    setPaymentData(newData)
    onPaymentDataChange(newData)
  }

  const selectedMethodInfo = paymentMethods.find((m) => m.id === selectedMethod)

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-blue-900 mb-4">Choisissez votre méthode de paiement</h3>
        <RadioGroup value={selectedMethod} onValueChange={handleMethodChange} className="space-y-3">
          {paymentMethods.map((method) => {
            const Icon = method.icon
            return (
              <Card
                key={method.id}
                className={`cursor-pointer transition-all ${
                  selectedMethod === method.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:bg-gray-50"
                }`}
                onClick={() => handleMethodChange(method.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Icon className="w-6 h-6 text-blue-600" />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <Label htmlFor={method.id} className="font-medium cursor-pointer">
                          {method.name}
                        </Label>
                        {method.popular && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">Populaire</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{method.description}</p>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                        <span>Frais: {method.fees}</span>
                        <span>•</span>
                        <span>Traitement: {method.processingTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </RadioGroup>
      </div>

      {/* Payment Form Fields */}
      {selectedMethod && (
        <Card>
          <CardContent className="p-6 space-y-4">
            <h4 className="font-semibold text-blue-900">Détails de paiement - {selectedMethodInfo?.name}</h4>

            {selectedMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Numéro de carte *</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={paymentData.cardNumber || ""}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Date d'expiration *</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={paymentData.expiry || ""}
                      onChange={(e) => handleInputChange("expiry", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      placeholder="123"
                      value={paymentData.cvv || ""}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="cardName">Nom sur la carte *</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={paymentData.cardName || ""}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {(selectedMethod === "mpesa" || selectedMethod === "airtel" || selectedMethod === "orange") && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phoneNumber">Numéro de téléphone *</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+243 XXX XXX XXX"
                    value={paymentData.phoneNumber || ""}
                    onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                    className="mt-1"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: +243XXXXXXXXX (avec indicatif pays)</p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-blue-900">Instructions de paiement</p>
                      <p className="text-blue-700 mt-1">1. Vous recevrez un SMS avec les instructions de paiement</p>
                      <p className="text-blue-700">
                        2. Entrez votre code PIN {selectedMethodInfo?.name} pour confirmer
                      </p>
                      <p className="text-blue-700">3. Le paiement sera traité automatiquement</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Summary */}
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Montant du cours</span>
                <span>${amount.toFixed(2)}</span>
              </div>
              {selectedMethodInfo && selectedMethodInfo.fees !== "Gratuit" && (
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Frais de traitement</span>
                  <span>
                    {selectedMethodInfo.fees.includes("%")
                      ? `$${(amount * 0.01 + 0.5).toFixed(2)}`
                      : selectedMethodInfo.fees}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>Total à payer</span>
                <span>
                  $
                  {selectedMethodInfo && selectedMethodInfo.fees !== "Gratuit"
                    ? (amount * 1.01 + 0.5).toFixed(2)
                    : amount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Shield className="w-4 h-4" />
              <span>Paiement sécurisé SSL 256-bit • Vos données sont protégées</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
