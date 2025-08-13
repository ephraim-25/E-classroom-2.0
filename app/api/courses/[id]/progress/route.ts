import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock progress data
const mockProgress = [
  {
    userId: "1",
    courseId: "1",
    lessonId: "lesson-1",
    completedAt: "2024-01-15T10:30:00.000Z",
    watchTime: 720, // seconds
  },
  {
    userId: "1",
    courseId: "1",
    lessonId: "lesson-2",
    completedAt: "2024-01-15T11:00:00.000Z",
    watchTime: 945, // seconds
  },
]

// POST /api/courses/[id]/progress - Update lesson progress
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id
    const { lessonId, completed, watchTime } = await request.json()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Update progress
    const existingProgress = mockProgress.find(
      (p) => p.userId === decoded.userId && p.courseId === courseId && p.lessonId === lessonId,
    )

    if (existingProgress) {
      existingProgress.watchTime = watchTime
      if (completed && !existingProgress.completedAt) {
        existingProgress.completedAt = new Date().toISOString()
      }
    } else {
      mockProgress.push({
        userId: decoded.userId,
        courseId,
        lessonId,
        completedAt: completed ? new Date().toISOString() : null,
        watchTime: watchTime || 0,
      })
    }

    // Calculate overall course progress
    const userProgress = mockProgress.filter((p) => p.userId === decoded.userId && p.courseId === courseId)
    const completedLessons = userProgress.filter((p) => p.completedAt).length
    const totalLessons = 15 // In real app, get from course data
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

    return NextResponse.json({
      progress: progressPercentage,
      completedLessons,
      totalLessons,
      message: completed ? "Leçon marquée comme terminée !" : "Progression sauvegardée",
    })
  } catch (error) {
    console.error("Error updating progress:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// GET /api/courses/[id]/progress - Get course progress
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

    // Get user progress for this course
    const userProgress = mockProgress.filter((p) => p.userId === decoded.userId && p.courseId === courseId)

    const completedLessons = userProgress.filter((p) => p.completedAt).length
    const totalLessons = 15 // In real app, get from course data
    const progressPercentage = Math.round((completedLessons / totalLessons) * 100)

    return NextResponse.json({
      progress: progressPercentage,
      completedLessons,
      totalLessons,
      lessonProgress: userProgress,
    })
  } catch (error) {
    console.error("Error fetching progress:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
