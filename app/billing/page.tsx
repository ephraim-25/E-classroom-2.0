"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { InvoiceGenerator } from "@/components/payments/invoice-generator"
import { PaymentNotifications } from "@/components/payments/payment-notifications"
import { SubscriptionManager } from "@/components/payments/subscription-manager"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BillingPage() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "success" as const,
      title: "Paiement réussi",
      message: 'Votre paiement de $79 pour le cours "Marketing Digital" a été traité avec succès.',
      amount: 79,
      courseName: "Marketing Digital",
      timestamp: new Date().toISOString(),
      read: false,
    },
    {
      id: "2",
      type: "pending" as const,
      title: "Paiement en attente",
      message: "Votre paiement M-Pesa est en cours de traitement.",
      amount: 99,
      courseName: "Développement Web",
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: false,
    },
  ])

  // Mock data
  const mockInvoice = {
    id: "INV-2024-001",
    transactionId: "TXN-2024-001",
    studentName: "Jean Dupont",
    studentEmail: "jean.dupont@email.com",
    courseName: "Introduction au Marketing Digital",
    instructorName: "Marie Dubois",
    amount: 79,
    tax: 15.8,
    total: 94.8,
    paymentMethod: "M-Pesa",
    paymentDate: new Date().toISOString(),
    status: "paid" as const,
  }

  const mockSubscription = {
    id: "sub-001",
    planName: "Plan Premium",
    planType: "monthly" as const,
    price: 29.99,
    status: "active" as const,
    startDate: "2024-01-01",
    nextBillingDate: "2024-02-01",
    coursesAccess: 15,
    maxCourses: 50,
    features: [
      "Accès illimité aux cours",
      "Certificats vérifiables",
      "Support prioritaire",
      "Téléchargement hors ligne",
      "Sessions live exclusives",
    ],
    paymentMethod: "M-Pesa (**** 1234)",
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const handleDismiss = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PaymentNotifications notifications={notifications} onMarkAsRead={handleMarkAsRead} onDismiss={handleDismiss} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-blue-900">Facturation et Paiements</h1>
          <p className="text-gray-600 mt-2">Gérez vos abonnements, factures et historique de paiements</p>
        </div>

        <Tabs defaultValue="subscription" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-blue-100">
            <TabsTrigger value="subscription">Abonnement</TabsTrigger>
            <TabsTrigger value="invoices">Factures</TabsTrigger>
            <TabsTrigger value="history">Historique</TabsTrigger>
          </TabsList>

          <TabsContent value="subscription">
            <SubscriptionManager
              subscription={mockSubscription}
              onUpgrade={() => console.log("Upgrade subscription")}
              onCancel={() => console.log("Cancel subscription")}
              onRenew={() => console.log("Renew subscription")}
              onChangePayment={() => console.log("Change payment method")}
            />
          </TabsContent>

          <TabsContent value="invoices">
            <InvoiceGenerator
              invoice={mockInvoice}
              onDownload={() => console.log("Download invoice")}
              onEmail={() => console.log("Email invoice")}
              onPrint={() => console.log("Print invoice")}
            />
          </TabsContent>

          <TabsContent value="history">
            <div className="text-center py-12">
              <p className="text-gray-600">Historique des paiements à venir...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
