import { QuizComponent } from "@/components/courses/quiz-component"

interface QuizPageProps {
  params: {
    id: string
    quizId: string
  }
}

// Mock quiz data - in real app, fetch from API
const mockQuiz = {
  id: "quiz-1",
  title: "Quiz : Introduction au Marketing Digital",
  description: "Testez vos connaissances sur les bases du marketing digital",
  timeLimit: 15,
  passingScore: 70,
  attempts: 3,
  questions: [
    {
      id: "q1",
      question: "Qu'est-ce que le marketing digital ?",
      type: "multiple-choice" as const,
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
      type: "true-false" as const,
      correctAnswer: 0,
      explanation:
        "SEO signifie effectivement Search Engine Optimization (Optimisation pour les moteurs de recherche).",
      points: 5,
    },
    {
      id: "q3",
      question: "Citez un avantage principal du marketing digital par rapport au marketing traditionnel.",
      type: "text" as const,
      correctAnswer: "mesurable",
      explanation:
        "Le marketing digital permet une mesure précise des résultats, contrairement au marketing traditionnel.",
      points: 15,
    },
  ],
}

export default function QuizPage({ params }: QuizPageProps) {
  const handleQuizComplete = (score: number, passed: boolean) => {
    console.log("Quiz completed:", { score, passed })
    // In real app, save to database and redirect
    setTimeout(() => {
      window.location.href = `/courses/${params.id}/learn`
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <QuizComponent quiz={mockQuiz} onComplete={handleQuizComplete} />
      </div>
    </div>
  )
}
