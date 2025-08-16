"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, FileText, Mail, Printer } from "lucide-react"

interface InvoiceData {
  id: string
  transactionId: string
  studentName: string
  studentEmail: string
  courseName: string
  instructorName: string
  amount: number
  tax: number
  total: number
  paymentMethod: string
  paymentDate: string
  status: "paid" | "pending" | "failed"
}

interface InvoiceGeneratorProps {
  invoice: InvoiceData
  onDownload?: () => void
  onEmail?: () => void
  onPrint?: () => void
}

export function InvoiceGenerator({ invoice, onDownload, onEmail, onPrint }: InvoiceGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("[v0] Generating PDF invoice for:", invoice.id)
    onDownload?.()
    setIsGenerating(false)
  }

  const handleEmailInvoice = async () => {
    setIsGenerating(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    console.log("[v0] Emailing invoice to:", invoice.studentEmail)
    onEmail?.()
    setIsGenerating(false)
  }

  const handlePrintInvoice = () => {
    window.print()
    onPrint?.()
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Invoice Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900">Facture #{invoice.id}</h2>
        <div className="flex space-x-2">
          <Button onClick={handleDownloadPDF} disabled={isGenerating} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "Génération..." : "Télécharger PDF"}
          </Button>
          <Button
            onClick={handleEmailInvoice}
            disabled={isGenerating}
            variant="outline"
            className="border-blue-200 bg-transparent"
          >
            <Mail className="w-4 h-4 mr-2" />
            Envoyer par email
          </Button>
          <Button onClick={handlePrintInvoice} variant="outline" className="border-blue-200 bg-transparent">
            <Printer className="w-4 h-4 mr-2" />
            Imprimer
          </Button>
        </div>
      </div>

      {/* Invoice Content */}
      <Card className="print:shadow-none">
        <CardHeader className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-blue-900">E-Classroom</h1>
              <p className="text-gray-600">Plateforme d'apprentissage en ligne</p>
              <div className="mt-4 text-sm text-gray-600">
                <p>123 Avenue de l'Éducation</p>
                <p>Kinshasa, République Démocratique du Congo</p>
                <p>contact@e-classroom.cd</p>
                <p>+243 XXX XXX XXX</p>
              </div>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold text-blue-900">FACTURE</h2>
              <div className="mt-4 space-y-1 text-sm">
                <p>
                  <span className="font-medium">Numéro:</span> #{invoice.id}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {new Date(invoice.paymentDate).toLocaleDateString("fr-FR")}
                </p>
                <p>
                  <span className="font-medium">Transaction:</span> {invoice.transactionId}
                </p>
                <Badge
                  className={
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-800 hover:bg-green-200"
                      : invoice.status === "pending"
                        ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                  }
                >
                  {invoice.status === "paid" ? "Payé" : invoice.status === "pending" ? "En attente" : "Échoué"}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Billing Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Facturé à:</h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">{invoice.studentName}</p>
                <p className="text-gray-600">{invoice.studentEmail}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-3">Détails du paiement:</h3>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Méthode:</span> {invoice.paymentMethod}
                </p>
                <p>
                  <span className="font-medium">Date:</span> {new Date(invoice.paymentDate).toLocaleDateString("fr-FR")}
                </p>
                <p>
                  <span className="font-medium">Statut:</span>
                  <span
                    className={`ml-1 ${
                      invoice.status === "paid"
                        ? "text-green-600"
                        : invoice.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {invoice.status === "paid" ? "Payé" : invoice.status === "pending" ? "En attente" : "Échoué"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Course Details */}
          <div>
            <h3 className="font-semibold text-blue-900 mb-4">Détails du cours</h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Description</th>
                    <th className="text-left p-4 font-medium text-gray-900">Formateur</th>
                    <th className="text-right p-4 font-medium text-gray-900">Montant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{invoice.courseName}</p>
                          <p className="text-sm text-gray-600">Accès à vie au cours</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{invoice.instructorName}</td>
                    <td className="p-4 text-right font-medium">${invoice.amount.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-80 space-y-3">
              <div className="flex justify-between">
                <span>Sous-total:</span>
                <span>${invoice.amount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>TVA (20%):</span>
                <span>${invoice.tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold text-blue-900">
                <span>Total:</span>
                <span>${invoice.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-8 border-t text-center text-sm text-gray-600">
            <p className="mb-2">Merci pour votre confiance en E-Classroom !</p>
            <p>
              Cette facture a été générée automatiquement. Pour toute question, contactez-nous à support@e-classroom.cd
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
