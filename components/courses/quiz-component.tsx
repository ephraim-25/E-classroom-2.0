"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { CheckCircle, XCircle, Clock, Award, RotateCcw } from "lucide-react"

interface QuizQuestion {
  id: string
  type: "single" | "multiple" | "true-false"
  question: string
  options: string[]
  correctAnswers: number[]
  explanation: string
  points: number
}

interface QuizProps {
  quizId: string
  courseId: string
  lessonId: string
  onComplete: (score: number, passed: boolean) => void
}

const mockQuizData = {
  id: "quiz-1",
  title: "Quiz : Introduction au Marketing Digital",
  description: "Testez vos connaissances sur les bases du marketing digital",
  timeLimit: 600, // 10 minutes in seconds
  passingScore: 70,
  questions: [
    {
      id: "q1",
      type: "single" as const,
      question: "Qu'est-ce que le marketing digital ?",
      options: [
        "La vente de produits numériques uniquement",
        "L'ensemble des techniques marketing utilisant les canaux digitaux",
        "La création de sites web",
        "La gestion des réseaux sociaux uniquement",
      ],
      correctAnswers: [1],
      explanation:
        "Le marketing digital englobe toutes les techniques marketing qui utilisent les canaux et supports numériques.",
      points: 10,
    },
    {
      id: "q2",
      type: "multiple" as const,
      question: "Quels sont les principaux canaux du marketing digital ? (Plusieurs réponses possibles)",
      options: ["SEO/SEA", "Réseaux sociaux", "Email marketing", "Radio traditionnelle", "Content marketing"],
      correctAnswers: [0, 1, 2, 4],
      explanation:
        "Les principaux canaux digitaux incluent le SEO/SEA, les réseaux sociaux, l'email marketing et le content marketing. La radio traditionnelle n'est pas un canal digital.",
      points: 15,
    },
    {
      id: "q3",
      type: "true-false" as const,
      question: "Le SEO (Search Engine Optimization) est une technique payante.",
      options: ["Vrai", "Faux"],
      correctAnswers: [1],
      explanation:
        "Faux. Le SEO est une technique gratuite qui vise à optimiser le référencement naturel d'un site web dans les moteurs de recherche.",
      points: 10,
    },
    {
      id: "q4",
      type: "single" as const,
      question: "Que signifie KPI dans le contexte du marketing digital ?",
      options: [
        "Key Performance Indicator",
        "Keep Performance Improved",
        "Knowledge Performance Index",
        "Key Product Information",
      ],
      correctAnswers: [0],
      explanation:
        "KPI signifie Key Performance Indicator (Indicateur Clé de Performance), utilisé pour mesurer l'efficacité des actions marketing.",
      points: 10,
    },
    {
      id: "q5",
      type: "multiple" as const,
      question: "Quels sont les avantages du marketing digital par rapport au marketing traditionnel ?",
      options: [
        "Coût généralement plus faible",
        "Ciblage plus précis",
        "Mesure des résultats en temps réel",
        "Portée géographique limitée",
        "Interaction avec les clients",
      ],
      correctAnswers: [0, 1, 2, 4],
      explanation:
        "Le marketing digital offre un coût plus faible, un ciblage précis, une mesure en temps réel et l'interaction client. La portée géographique est au contraire élargie.",
      points: 15,
    },
  ],
}

export function QuizComponent({ quizId, courseId, lessonId, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number[]>>({})
  const [timeLeft, setTimeLeft] = useState(mockQuizData.timeLimit)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)
  const [isStarted, setIsStarted] = useState(false)

  const quiz = mockQuizData
  const totalQuestions = quiz.questions.length
  const progress = ((currentQuestion + 1) / totalQuestions) * 100

  // Timer effect
  useEffect(() => {
    if (isStarted && !isCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isStarted, isCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: string, answerIndex: number, isMultiple = false) => {
    setAnswers((prev) => {
      if (isMultiple) {
        const currentAnswers = prev[questionId] || []
        const newAnswers = currentAnswers.includes(answerIndex)
          ? currentAnswers.filter((a) => a !== answerIndex)
          : [...currentAnswers, answerIndex]
        return { ...prev, [questionId]: newAnswers }
      } else {
        return { ...prev, [questionId]: [answerIndex] }
      }
    })
  }

  const calculateScore = () => {
    let totalPoints = 0
    let earnedPoints = 0

    quiz.questions.forEach((question) => {
      totalPoints += question.points
      const userAnswers = answers[question.id] || []
      const correctAnswers = question.correctAnswers

      // Check if answers match exactly
      if (
        userAnswers.length === correctAnswers.length &&
        userAnswers.every((answer) => correctAnswers.includes(answer))
      ) {
        earnedPoints += question.points
      }
    })

    return Math.round((earnedPoints / totalPoints) * 100)
  }

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setIsCompleted(true)
    setShowResults(true)

    const passed = finalScore >= quiz.passingScore
    onComplete(finalScore, passed)
  }

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setTimeLeft(quiz.timeLimit)
    setIsCompleted(false)
    setShowResults(false)
    setScore(0)
    setIsStarted(false)
  }

  const currentQ = quiz.questions[currentQuestion]

  if (!isStarted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-blue-900">{quiz.title}</CardTitle>
          <p className="text-gray-600">{quiz.description}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-900">{totalQuestions}</div>
              <div className="text-sm text-gray-600">Questions</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-900">{formatTime(quiz.timeLimit)}</div>
              <div className="text-sm text-gray-600">Temps limite</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-900">{quiz.passingScore}%</div>
              <div className="text-sm text-gray-600">Score minimum</div>
            </div>
          </div>
          <div className="text-center">
            <Button onClick={() => setIsStarted(true)} className="bg-blue-600 hover:bg-blue-700 px-8 py-3">
              Commencer le quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (showResults) {
    const passed = score >= quiz.passingScore
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mb-4">
            {passed ? (
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            ) : (
              <XCircle className="w-16 h-16 text-red-600 mx-auto" />
            )}
          </div>
          <CardTitle className="text-2xl text-blue-900">{passed ? "Félicitations !" : "Quiz non réussi"}</CardTitle>
          <p className="text-gray-600">
            {passed
              ? "Vous avez réussi le quiz avec succès !"
              : "Vous pouvez reprendre le quiz pour améliorer votre score."}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">{score}%</div>
            <Badge className={passed ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}>
              {passed ? "Réussi" : "Échec"}
            </Badge>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-blue-900">Résultats détaillés :</h3>
            {quiz.questions.map((question, index) => {
              const userAnswers = answers[question.id] || []
              const isCorrect =
                userAnswers.length === question.correctAnswers.length &&
                userAnswers.every((answer) => question.correctAnswers.includes(answer))

              return (
                <div key={question.id} className="p-4 border rounded-lg">
                  <div className="flex items-start space-x-3">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-blue-900 mb-2">Question {index + 1}</h4>
                      <p className="text-sm text-gray-700 mb-2">{question.question}</p>
                      <p className="text-xs text-gray-600">{question.explanation}</p>
                    </div>
                    <div className="text-sm font-medium">{isCorrect ? `+${question.points}` : "0"} pts</div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center space-x-4">
            {passed && (
              <Button className="bg-green-600 hover:bg-green-700">
                <Award className="w-4 h-4 mr-2" />
                Continuer le cours
              </Button>
            )}
            <Button onClick={handleRetakeQuiz} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reprendre le quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-900">{formatTime(timeLeft)}</span>
          </div>
          <Badge variant="outline">
            Question {currentQuestion + 1} sur {totalQuestions}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-4">{currentQ.question}</h3>

          {currentQ.type === "single" || currentQ.type === "true-false" ? (
            <RadioGroup
              value={answers[currentQ.id]?.[0]?.toString() || ""}
              onValueChange={(value) => handleAnswerChange(currentQ.id, Number.parseInt(value))}
            >
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <div className="space-y-2">
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={`option-${index}`}
                    checked={answers[currentQ.id]?.includes(index) || false}
                    onCheckedChange={() => handleAnswerChange(currentQ.id, index, true)}
                  />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            onClick={() => setCurrentQuestion(currentQuestion - 1)}
            disabled={currentQuestion === 0}
            variant="outline"
          >
            Précédent
          </Button>

          {currentQuestion === totalQuestions - 1 ? (
            <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
              Terminer le quiz
            </Button>
          ) : (
            <Button
              onClick={() => setCurrentQuestion(currentQuestion + 1)}
              disabled={!answers[currentQ.id] || answers[currentQ.id].length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Suivant
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
