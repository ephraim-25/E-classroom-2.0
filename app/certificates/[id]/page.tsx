"use client"

import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Share2, Shield } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"

export default function CertificatePage() {
  const params = useParams()
  const certificateId = params.id as string

  // Mock certificate data - in real app, fetch from API
  const certificate = {
    id: certificateId,
    studentName: "Jean Dupont",
    courseName: "Introduction au Marketing Digital",
    instructorName: "Marie Dubois",
    completionDate: "2024-01-15",
    issueDate: "2024-01-15",
    duration: "40 heures",
    grade: "Excellent",
    verificationUrl: `${window.location.origin}/verify/${certificateId}`,
  }

  const handleDownload = () => {
    // In real app, generate and download PDF
    console.log("Downloading certificate PDF...")
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Certificat - ${certificate.courseName}`,
        text: `J'ai terminé le cours "${certificate.courseName}" sur E-Classroom !`,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Lien copié dans le presse-papiers !")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6 flex gap-4">
          <Button onClick={handleDownload} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Télécharger PDF
          </Button>
          <Button variant="outline" onClick={handleShare} className="flex items-center gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
        </div>

        {/* Certificate Display */}
        <Card className="bg-white shadow-lg">
          <CardContent className="p-12">
            <div className="text-center space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900">E-Classroom</h1>
                <h2 className="text-2xl font-semibold text-blue-600">Certificat de Réussite</h2>
              </div>

              {/* Certificate Content */}
              <div className="space-y-6 max-w-2xl mx-auto">
                <p className="text-lg text-gray-700">Ceci certifie que</p>

                <h3 className="text-3xl font-bold text-gray-900 border-b-2 border-blue-600 pb-2">
                  {certificate.studentName}
                </h3>

                <p className="text-lg text-gray-700">a terminé avec succès le cours</p>

                <h4 className="text-2xl font-semibold text-blue-600">{certificate.courseName}</h4>

                <div className="grid md:grid-cols-2 gap-6 text-left bg-gray-50 p-6 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Formateur</p>
                    <p className="font-semibold">{certificate.instructorName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Durée du cours</p>
                    <p className="font-semibold">{certificate.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Date de fin</p>
                    <p className="font-semibold">{new Date(certificate.completionDate).toLocaleDateString("fr-FR")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Évaluation</p>
                    <p className="font-semibold text-green-600">{certificate.grade}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Délivré le {new Date(certificate.issueDate).toLocaleDateString("fr-FR")}
                </p>
              </div>

              {/* QR Code and Verification */}
              <div className="flex justify-between items-end pt-8">
                <div className="text-left">
                  <p className="text-sm text-gray-600 mb-2">Vérification</p>
                  <QRCodeSVG value={certificate.verificationUrl} size={100} className="border border-gray-200" />
                  <p className="text-xs text-gray-500 mt-2 max-w-[100px]">Scannez pour vérifier</p>
                </div>

                <div className="text-right">
                  <div className="w-32 h-16 bg-gray-200 rounded flex items-center justify-center mb-2">
                    <span className="text-xs text-gray-500">Signature</span>
                  </div>
                  <p className="text-sm font-semibold">E-Classroom</p>
                  <p className="text-xs text-gray-600">Plateforme d'éducation</p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">ID du certificat: {certificate.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
