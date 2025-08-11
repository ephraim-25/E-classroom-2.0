"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Shield } from "lucide-react"

export default function VerifyPage() {
  const params = useParams()
  const certificateId = params.id as string

  // Mock verification - in real app, verify against database
  const verification = {
    isValid: true,
    certificate: {
      id: certificateId,
      studentName: "Jean Dupont",
      courseName: "Introduction au Marketing Digital",
      instructorName: "Marie Dubois",
      completionDate: "2024-01-15",
      issueDate: "2024-01-15",
      institution: "E-Classroom",
    },
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Vérification de Certificat</h1>
          <p className="text-gray-600 mt-2">Vérifiez l'authenticité d'un certificat E-Classroom</p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {verification.isValid ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-8 h-8 text-red-600" />
                </div>
              )}
            </div>
            <CardTitle className={verification.isValid ? "text-green-600" : "text-red-600"}>
              {verification.isValid ? "Certificat Valide" : "Certificat Non Valide"}
            </CardTitle>
            <CardDescription>
              {verification.isValid
                ? "Ce certificat a été vérifié et est authentique"
                : "Ce certificat n'a pas pu être vérifié"}
            </CardDescription>
          </CardHeader>

          {verification.isValid && (
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Étudiant</span>
                  <span className="font-semibold">{verification.certificate.studentName}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Cours</span>
                  <span className="font-semibold">{verification.certificate.courseName}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Formateur</span>
                  <span className="font-semibold">{verification.certificate.instructorName}</span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Date de fin</span>
                  <span className="font-semibold">
                    {new Date(verification.certificate.completionDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-gray-600">Date d'émission</span>
                  <span className="font-semibold">
                    {new Date(verification.certificate.issueDate).toLocaleDateString("fr-FR")}
                  </span>
                </div>

                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-gray-600">Institution</span>
                  <Badge variant="secondary">{verification.certificate.institution}</Badge>
                </div>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-green-900">Certificat authentique</p>
                    <p className="text-green-700 mt-1">
                      Ce certificat a été émis par E-Classroom et peut être considéré comme valide.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500">ID du certificat: {verification.certificate.id}</div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}
