import { type NextRequest, NextResponse } from "next/server"

// Mock quiz data - replace with actual database
const mockQuizzes = {
  "1": [
    {
      id: "quiz-1",
      title: "Quiz : Introduction au Marketing Digital",
      description: "Testez vos connaissances sur les bases du marketing digital",
      lessonId: "lesson-1",
      timeLimit: 15, // minutes
      passingScore: 70, // percentage
      attempts: 3,
      questions: [
        {
          id: "q1",
          question: "Qu'est-ce que le marketing digital ?",
          type: "multiple-choice",
          options: [
            "La promotion de produits uniquement sur les réseaux sociaux",
            "L'utilisation de canaux numériques pour promouvoir des produits ou services",
            "La vente en ligne exclusivement",
            "La création de sites web",
          ],
          correctAnswer: 1,
          explanation:
            "Le marketing digital englobe tous les canaux numériques utilisés pour promouvoir des produits ou services.",
          points: 10,
        },
        {
          id: "q2",
          question: "Le SEO signifie Search Engine Optimization.",
          type: "true-false",
          correctAnswer: 0, // 0 = Vrai, 1 = Faux
          explanation:
            "SEO signifie effectivement Search Engine Optimization (Optimisation pour les moteurs de recherche).",
          points: 5,
        },
        {
          id: "q3",
          question: "Citez un avantage principal du marketing digital par rapport au marketing traditionnel.",
          type: "text",
          correctAnswer: "mesurable",
          explanation:
            "Le marketing digital permet une mesure précise des résultats, contrairement au marketing traditionnel.",
          points: 15,
        },
        {
          id: "q4",
          question: "Quels sont les 4 piliers principaux du marketing digital ?",
          type: "multiple-choice",
          options: [
            "SEO, SEM, Email, Print",
            "SEO, SEM, Social Media, Email Marketing",
            "Facebook, Google, YouTube, Instagram",
            "Contenu, Design, Vidéo, Photos",
          ],
          correctAnswer: 1,
          explanation:
            "Les 4 piliers sont : SEO (référencement naturel), SEM (référencement payant), Social Media et Email Marketing.",
          points: 10,
        },
      ],
    },
  ],
}

// GET /api/courses/[id]/quiz - Get quizzes for a course
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id
    const { searchParams } = new URL(request.url)
    const lessonId = searchParams.get("lessonId")

    const courseQuizzes = mockQuizzes[courseId as keyof typeof mockQuizzes] || []

    // Filter by lesson if specified
    const filteredQuizzes = lessonId ? courseQuizzes.filter((quiz) => quiz.lessonId === lessonId) : courseQuizzes

    return NextResponse.json({
      success: true,
      quizzes: filteredQuizzes,
    })
  } catch (error) {
    console.error("Error fetching quizzes:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des quiz" }, { status: 500 })
  }
}

// POST /api/courses/[id]/quiz - Submit quiz answers
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    const decoded = validateSimpleToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const { quizId, answers, timeSpent } = await request.json()

    // Find the quiz
    const courseId = params.id
    const courseQuizzes = mockQuizzes[courseId as keyof typeof mockQuizzes] || []
    const quiz = courseQuizzes.find((q) => q.id === quizId)

    if (!quiz) {
      return NextResponse.json({ error: "Quiz non trouvé" }, { status: 404 })
    }

    let correctAnswers = 0
    let totalPoints = 0
    const results = []

    for (const question of quiz.questions) {
      totalPoints += question.points
      const userAnswer = answers[question.id]
      const isCorrect = userAnswer === question.correctAnswer

      if (isCorrect) {
        correctAnswers += question.points
      }

      results.push({
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        points: isCorrect ? question.points : 0,
      })
    }

    const scorePercentage = Math.round((correctAnswers / totalPoints) * 100)
    const passed = scorePercentage >= quiz.passingScore

    const quizAttempt = {
      id: Date.now().toString(),
      userId: decoded.userId,
      quizId,
      courseId,
      answers,
      score: scorePercentage,
      correctAnswers: results.filter((r) => r.isCorrect).length,
      totalQuestions: quiz.questions.length,
      passed,
      timeSpent,
      completedAt: new Date().toISOString(),
    }

    console.log("[v0] Quiz attempt:", quizAttempt)

    return NextResponse.json({
      success: true,
      message: passed ? "Quiz réussi !" : "Quiz échoué",
      result: {
        score: scorePercentage,
        correctAnswers: results.filter((r) => r.isCorrect).length,
        totalQuestions: quiz.questions.length,
        passed,
        passingScore: quiz.passingScore,
        results,
      },
    })
  } catch (error) {
    console.error("Error submitting quiz:", error)
    return NextResponse.json({ error: "Erreur lors de la soumission du quiz" }, { status: 500 })
  }
}

function validateSimpleToken(token: string) {
  try {
    const decoded = Buffer.from(token, "base64").toString()
    const [userId, userType, timestamp] = decoded.split(":")

    const tokenAge = Date.now() - Number.parseInt(timestamp)
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return null
    }

    return { userId, userType }
  } catch {
    return null
  }
}
