"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Award, Download, Share2 } from "lucide-react"

interface CertificateModalProps {
  isOpen: boolean
  onClose: () => void
  courseTitle: string
  studentName: string
  instructorName: string
  certificateId?: string
}

export function CertificateModal({
  isOpen,
  onClose,
  courseTitle,
  studentName,
  instructorName,
  certificateId,
}: CertificateModalProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedCertId, setGeneratedCertId] = useState(certificateId)

  const generateCertificate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "user_123", // In real app, get from auth context
          courseId: "course_123",
          studentName,
          courseName: courseTitle,
          instructorName,
        }),
      })

      const data = await response.json()
      if (data.success) {
        setGeneratedCertId(data.certificate.id)
      }
    } catch (error) {
      console.error("Certificate generation failed:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleViewCertificate = () => {
    if (generatedCertId) {
      window.open(`/certificates/${generatedCertId}`, "_blank")
    }
  }

  const handleShare = () => {
    if (generatedCertId && navigator.share) {
      navigator.share({
        title: `Certificat - ${courseTitle}`,
        text: `J'ai terminé le cours "${courseTitle}" sur E-Classroom !`,
        url: `${window.location.origin}/certificates/${generatedCertId}`,
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-yellow-600" />
            <DialogTitle>Félicitations !</DialogTitle>
          </div>
          <DialogDescription>Vous avez terminé le cours avec succès. Votre certificat est prêt !</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <Award className="w-12 h-12 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-semibold text-lg">{courseTitle}</h3>
            <p className="text-sm text-gray-600 mt-1">Certificat de réussite</p>
          </div>

          {!generatedCertId ? (
            <Button onClick={generateCertificate} disabled={isGenerating} className="w-full" size="lg">
              {isGenerating ? "Génération en cours..." : "Générer mon certificat"}
            </Button>
          ) : (
            <div className="space-y-3">
              <Button onClick={handleViewCertificate} className="w-full" size="lg">
                <Award className="w-4 h-4 mr-2" />
                Voir le certificat
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleViewCertificate}>
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>
          )}

          <p className="text-xs text-gray-500 text-center">
            Votre certificat inclut un QR code pour vérification en ligne
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
