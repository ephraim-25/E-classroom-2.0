"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Download, Play } from "lucide-react"

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get("courseId")

  // Mock course data
  const course = {
    id: courseId,
    title: "Introduction au Marketing Digital",
    instructor: "Marie Dubois",
  }

  useEffect(() => {
    // In real app, update user's enrolled courses
    console.log("Course purchased:", courseId)
  }, [courseId])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Paiement réussi !</CardTitle>
            <CardDescription>Votre inscription au cours a été confirmée</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600">Par {course.instructor}</p>
            </div>

            <div className="space-y-3">
              <Button onClick={() => router.push(`/courses/${courseId}/learn`)} className="w-full" size="lg">
                <Play className="w-4 h-4 mr-2" />
                Commencer le cours
              </Button>

              <Button variant="outline" onClick={() => router.push("/dashboard/student")} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Aller au tableau de bord
              </Button>
            </div>

            <div className="text-sm text-gray-600">
              <p>Un email de confirmation a été envoyé à votre adresse.</p>
              <p className="mt-1">Vous pouvez maintenant accéder à votre cours à tout moment.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
