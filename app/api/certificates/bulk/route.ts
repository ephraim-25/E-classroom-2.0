import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// POST /api/certificates/bulk - Generate certificates for multiple students (admin only)
export async function POST(request: NextRequest) {
  try {
    const { courseId, studentIds, instructorName, courseName } = await request.json()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Only admin and instructors can bulk generate certificates
    if (!["admin", "instructor"].includes(decoded.userType)) {
      return NextResponse.json({ error: "Accès non autorisé" }, { status: 403 })
    }

    if (!courseId || !studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
      return NextResponse.json({ error: "Données invalides" }, { status: 400 })
    }

    const results = []
    const errors = []

    // Process each student
    for (const studentId of studentIds) {
      try {
        const student = await getStudentById(studentId)
        if (!student) {
          errors.push({ studentId, error: "Étudiant non trouvé" })
          continue
        }

        // Check if student completed the course
        const hasCompleted = await validateCourseCompletion(studentId, courseId)
        if (!hasCompleted) {
          errors.push({ studentId, error: "Cours non terminé" })
          continue
        }

        // Generate certificate
        const certificateId = `EC-${new Date().getFullYear()}-${String(Date.now() + Math.random()).slice(-6)}`
        const certificate = {
          id: certificateId,
          userId: studentId,
          courseId,
          studentName: `${student.firstName} ${student.lastName}`,
          courseName,
          instructorName,
          completionDate: new Date().toISOString(),
          issueDate: new Date().toISOString(),
          status: "issued",
        }

        await saveCertificateToDatabase(certificate)
        results.push(certificate)
      } catch (error) {
        errors.push({ studentId, error: "Erreur lors de la génération" })
      }
    }

    return NextResponse.json({
      success: true,
      generated: results.length,
      certificates: results,
      errors,
      message: `${results.length} certificats générés avec succès`,
    })
  } catch (error) {
    console.error("Bulk certificate generation error:", error)
    return NextResponse.json({ error: "Erreur lors de la génération en lot" }, { status: 500 })
  }
}

async function getStudentById(studentId: string) {
  // Mock student lookup
  return {
    id: studentId,
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
  }
}

async function validateCourseCompletion(userId: string, courseId: string): Promise<boolean> {
  // Mock validation
  return true
}

async function saveCertificateToDatabase(certificate: any) {
  // Mock save
  console.log("Saving certificate:", certificate.id)
}
