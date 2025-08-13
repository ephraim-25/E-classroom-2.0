import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock enrollments database
const mockEnrollments = [
  {
    id: "1",
    userId: "1",
    courseId: "1",
    enrolledAt: "2024-01-15T10:00:00.000Z",
    progress: 25,
    completedLessons: ["lesson-1", "lesson-2"],
    isCompleted: false,
    certificateId: null,
  },
]

// POST /api/courses/[id]/enroll - Enroll in course
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Check if already enrolled
    const existingEnrollment = mockEnrollments.find(
      (enrollment) => enrollment.userId === decoded.userId && enrollment.courseId === courseId,
    )

    if (existingEnrollment) {
      return NextResponse.json({ error: "Déjà inscrit à ce cours" }, { status: 409 })
    }

    // Create new enrollment
    const newEnrollment = {
      id: (mockEnrollments.length + 1).toString(),
      userId: decoded.userId,
      courseId,
      enrolledAt: new Date().toISOString(),
      progress: 0,
      completedLessons: [],
      isCompleted: false,
      certificateId: null,
    }

    mockEnrollments.push(newEnrollment)

    return NextResponse.json(
      {
        enrollment: newEnrollment,
        message: "Inscription réussie !",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error enrolling in course:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// GET /api/courses/[id]/enroll - Check enrollment status
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ isEnrolled: false })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Check enrollment
    const enrollment = mockEnrollments.find(
      (enrollment) => enrollment.userId === decoded.userId && enrollment.courseId === courseId,
    )

    return NextResponse.json({
      isEnrolled: !!enrollment,
      enrollment: enrollment || null,
    })
  } catch (error) {
    console.error("Error checking enrollment:", error)
    return NextResponse.json({ isEnrolled: false })
  }
}
