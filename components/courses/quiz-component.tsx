"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Award } from "lucide-react"

interface QuizQuestion {
  id: string
  question: string
  type: "multiple-choice" | "true-false" | "text"
  options?: string[]
  correctAnswer: string | number
  explanation: string
  points: number
}

interface Quiz {
  id: string
  title: string
  description: string
  questions: QuizQuestion[]
  timeLimit: number // in minutes
  passingScore: number // percentage
  attempts: number
}

interface QuizComponentProps {
  quiz: Quiz
  onComplete: (score: number, passed: boolean) => void
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [showResults, setShowResults] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60) // Convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)

  const currentQuestion = quiz.questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmitQuiz()
    }
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answer: string | number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correct = 0
    let totalPoints = 0

    quiz.questions.forEach((question) => {
      totalPoints += question.points
      const userAnswer = answers[question.id]

      if (question.type === "multiple-choice" || question.type === "true-false") {
        if (userAnswer === question.correctAnswer) {
          correct += question.points
        }
      } else if (question.type === "text") {
        // Simple text comparison (in real app, use more sophisticated matching)
        if (userAnswer?.toString().toLowerCase().trim() === question.correctAnswer.toString().toLowerCase().trim()) {
          correct += question.points
        }
      }
    })

    const percentage = Math.round((correct / totalPoints) * 100)
    const correctCount = quiz.questions.filter((q) => {
      const userAnswer = answers[q.id]
      return userAnswer === q.correctAnswer
    }).length

    setScore(percentage)
    setCorrectAnswers(correctCount)
    return { percentage, correctCount }
  }

  const handleSubmitQuiz = () => {
    const { percentage } = calculateScore()
    const passed = percentage >= quiz.passingScore

    setIsSubmitted(true)
    setShowResults(true)
    onComplete(percentage, passed)
  }

  if (showResults) {
    const passed = score >= quiz.passingScore

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
              passed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {passed ? <Award className="w-8 h-8 text-green-600" /> : <XCircle className="w-8 h-8 text-red-600" />}
          </div>
          <CardTitle className={`text-2xl ${passed ? "text-green-600" : "text-red-600"}`}>
            {passed ? "Félicitations !" : "Échec au quiz"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-900">{score}%</div>
            <p className="text-gray-600">
              {correctAnswers} sur {quiz.questions.length} questions correctes
            </p>
            <p className="text-sm text-gray-500">Score minimum requis: {quiz.passingScore}%</p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-blue-900">Résultats détaillés</h3>
            {quiz.questions.map((question, index) => {
              const userAnswer = answers[question.id]
              const isCorrect = userAnswer === question.correctAnswer

              return (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isCorrect ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </p>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">
                          Votre réponse:{" "}
                          <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                            {question.type === "multiple-choice" && question.options
                              ? question.options[userAnswer as number]
                              : userAnswer?.toString() || "Pas de réponse"}
                          </span>
                        </p>
                        {!isCorrect && (
                          <p className="text-gray-600">
                            Bonne réponse:{" "}
                            <span className="text-green-600">
                              {question.type === "multiple-choice" && question.options
                                ? question.options[question.correctAnswer as number]
                                : question.correctAnswer.toString()}
                            </span>
                          </p>
                        )}
                        <p className="text-gray-500 italic">{question.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-center space-x-4">
            {!passed && quiz.attempts > 1 && (
              <Button onClick={() => window.location.reload()} variant="outline" className="border-blue-200">
                Réessayer
              </Button>
            )}
            <Button onClick={() => window.history.back()} className="bg-blue-600 hover:bg-blue-700">
              Continuer le cours
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Quiz Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-900">{quiz.title}</CardTitle>
              <p className="text-gray-600 mt-1">{quiz.description}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <Clock className="w-4 h-4" />
                <span>Temps restant: {formatTime(timeLeft)}</span>
              </div>
              <Badge variant="outline" className="text-blue-600 border-blue-200">
                Question {currentQuestionIndex + 1} sur {quiz.questions.length}
              </Badge>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
        </CardHeader>
      </Card>

      {/* Question Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Question {currentQuestionIndex + 1}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-gray-900">{currentQuestion.question}</p>

          <div className="space-y-3">
            {currentQuestion.type === "multiple-choice" && currentQuestion.options && (
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      answers[currentQuestion.id] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion.id] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion.id] === index && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "true-false" && (
              <div className="space-y-2">
                {["Vrai", "Faux"].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
                      answers[currentQuestion.id] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          answers[currentQuestion.id] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion.id] === index && (
                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {currentQuestion.type === "text" && (
              <input
                type="text"
                placeholder="Tapez votre réponse..."
                value={answers[currentQuestion.id]?.toString() || ""}
                onChange={(e) => handleAnswerSelect(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            )}
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="bg-transparent"
            >
              Précédent
            </Button>

            <div className="text-sm text-gray-500">
              {currentQuestion.points} point{currentQuestion.points > 1 ? "s" : ""}
            </div>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmitQuiz}
                disabled={!answers[currentQuestion.id]}
                className="bg-green-600 hover:bg-green-700"
              >
                Terminer le quiz
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                disabled={!answers[currentQuestion.id]}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Suivant
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
