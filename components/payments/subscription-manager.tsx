"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Crown, Calendar, CreditCard, AlertTriangle, CheckCircle } from "lucide-react"

interface Subscription {
  id: string
  planName: string
  planType: "monthly" | "yearly" | "lifetime"
  price: number
  status: "active" | "cancelled" | "expired" | "pending"
  startDate: string
  endDate?: string
  nextBillingDate?: string
  coursesAccess: number
  maxCourses: number
  features: string[]
  paymentMethod: string
}

interface SubscriptionManagerProps {
  subscription: Subscription
  onUpgrade: () => void
  onCancel: () => void
  onRenew: () => void
  onChangePayment: () => void
}

export function SubscriptionManager({
  subscription,
  onUpgrade,
  onCancel,
  onRenew,
  onChangePayment,
}: SubscriptionManagerProps) {
  const [isLoading, setIsLoading] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      case "expired":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-4 h-4" />
      case "cancelled":
      case "expired":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const handleAction = async (action: () => void) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    action()
    setIsLoading(false)
  }

  const coursesProgress = (subscription.coursesAccess / subscription.maxCourses) * 100

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Subscription Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-6 h-6 text-yellow-600" />
              <div>
                <CardTitle className="text-blue-900">{subscription.planName}</CardTitle>
                <p className="text-sm text-gray-600">
                  Plan{" "}
                  {subscription.planType === "monthly"
                    ? "mensuel"
                    : subscription.planType === "yearly"
                      ? "annuel"
                      : "à vie"}
                </p>
              </div>
            </div>
            <Badge className={getStatusColor(subscription.status)}>
              {getStatusIcon(subscription.status)}
              <span className="ml-1">
                {subscription.status === "active"
                  ? "Actif"
                  : subscription.status === "cancelled"
                    ? "Annulé"
                    : subscription.status === "expired"
                      ? "Expiré"
                      : "En attente"}
              </span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Billing Information */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Informations de facturation</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Prix:</span>
                  <span className="font-medium">
                    ${subscription.price}/
                    {subscription.planType === "monthly" ? "mois" : subscription.planType === "yearly" ? "an" : "vie"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date de début:</span>
                  <span>{new Date(subscription.startDate).toLocaleDateString("fr-FR")}</span>
                </div>
                {subscription.endDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date de fin:</span>
                    <span>{new Date(subscription.endDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                )}
                {subscription.nextBillingDate && subscription.status === "active" && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Prochaine facturation:</span>
                    <span>{new Date(subscription.nextBillingDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Méthode de paiement</h4>
              <div className="flex items-center space-x-3 p-3 border rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{subscription.paymentMethod}</p>
                  <p className="text-xs text-gray-600">Méthode par défaut</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleAction(onChangePayment)} disabled={isLoading}>
                  Modifier
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Usage Statistics */}
          <div>
            <h4 className="font-semibold text-blue-900 mb-3">Utilisation</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cours accessibles</span>
                <span className="text-sm font-medium">
                  {subscription.coursesAccess} / {subscription.maxCourses}
                </span>
              </div>
              <Progress value={coursesProgress} className="h-2" />
              {coursesProgress > 80 && (
                <p className="text-xs text-yellow-600">
                  Vous approchez de la limite de votre plan. Considérez une mise à niveau.
                </p>
              )}
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <h4 className="font-semibold text-blue-900 mb-3">Fonctionnalités incluses</h4>
            <div className="grid md:grid-cols-2 gap-2">
              {subscription.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {subscription.status === "active" && (
              <>
                <Button
                  onClick={() => handleAction(onUpgrade)}
                  disabled={isLoading}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Mettre à niveau
                </Button>
                <Button
                  onClick={() => handleAction(onCancel)}
                  disabled={isLoading}
                  variant="outline"
                  className="border-red-200 text-red-600 hover:bg-red-50"
                >
                  Annuler l'abonnement
                </Button>
              </>
            )}

            {(subscription.status === "cancelled" || subscription.status === "expired") && (
              <Button
                onClick={() => handleAction(onRenew)}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                Renouveler l'abonnement
              </Button>
            )}

            <Button onClick={() => handleAction(onChangePayment)} disabled={isLoading} variant="outline">
              Changer le paiement
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-900">Historique de facturation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { date: "2024-01-20", amount: subscription.price, status: "paid", invoice: "INV-2024-001" },
              { date: "2023-12-20", amount: subscription.price, status: "paid", invoice: "INV-2023-012" },
              { date: "2023-11-20", amount: subscription.price, status: "paid", invoice: "INV-2023-011" },
            ].map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="text-sm font-medium">${bill.amount}</p>
                  <p className="text-xs text-gray-600">
                    {new Date(bill.date).toLocaleDateString("fr-FR")} • {bill.invoice}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Payé</Badge>
                  <Button variant="ghost" size="sm">
                    Télécharger
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
