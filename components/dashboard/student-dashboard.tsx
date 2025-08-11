"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  Download,
  Search,
  Filter,
  Calendar,
  Heart,
  CheckCircle,
  BarChart3,
  Target,
} from "lucide-react"
import Link from "next/link"

export function StudentDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  if (!user) return null

  const enrolledCourses = [
    {
      id: "1",
      title: "Introduction au Marketing Digital",
      instructor: "Marie Dubois",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      timeSpent: "8h 30min",
      lastAccessed: "2024-01-20",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      rating: 4.8,
      isFavorite: true,
      nextLesson: "Stratégies de contenu avancées",
      estimatedTimeToComplete: "2h 15min",
      certificateId: "EC-2024-001",
    },
    {
      id: "2",
      title: "Développement Web avec React",
      instructor: "Jean-Paul Kamau",
      progress: 45,
      totalLessons: 20,
      completedLessons: 9,
      timeSpent: "12h 45min",
      lastAccessed: "2024-01-18",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Technologie",
      rating: 4.9,
      isFavorite: false,
      nextLesson: "Hooks avancés",
      estimatedTimeToComplete: "8h 30min",
      certificateId: "EC-2024-002",
    },
  ]

  const completedCourses = [
    {
      id: "3",
      title: "Bases du Marketing",
      instructor: "Sophie Martin",
      completedDate: "2024-01-15",
      finalGrade: 92,
      timeSpent: "6h 20min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      rating: 4.7,
      certificateId: "EC-2024-001",
    },
    {
      id: "4",
      title: "HTML & CSS Fondamentaux",
      instructor: "Ahmed Hassan",
      completedDate: "2024-01-10",
      finalGrade: 88,
      timeSpent: "4h 15min",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Technologie",
      rating: 4.6,
      certificateId: "EC-2024-002",
    },
  ]

  const certificates = [
    {
      id: "EC-2024-001",
      courseTitle: "Bases du Marketing",
      instructor: "Sophie Martin",
      issueDate: "2024-01-15",
      verificationCode: "EC-2024-001-VERIFY",
      grade: 92,
      skills: ["Marketing Digital", "Stratégie", "Analyse"],
    },
    {
      id: "EC-2024-002",
      courseTitle: "HTML & CSS Fondamentaux",
      instructor: "Ahmed Hassan",
      issueDate: "2024-01-10",
      verificationCode: "EC-2024-002-VERIFY",
      grade: 88,
      skills: ["HTML", "CSS", "Web Design"],
    },
  ]

  const learningStats = {
    totalTimeSpent: "31h 30min",
    coursesCompleted: 2,
    coursesInProgress: 2,
    averageGrade: 90,
    skillsAcquired: 8,
    streakDays: 15,
    monthlyGoal: 20, // hours
    monthlyProgress: 12, // hours completed this month
  }

  const filteredEnrolledCourses = enrolledCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredCompletedCourses = completedCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Bonjour, {user.firstName} !</h1>
              <p className="text-gray-600">Continuez votre apprentissage</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/courses">
                <Button className="bg-blue-600 hover:bg-blue-700">Parcourir les cours</Button>
              </Link>
              <Button onClick={logout} variant="outline">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-blue-100">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="courses">Mes Cours</TabsTrigger>
            <TabsTrigger value="certificates">Certificats</TabsTrigger>
            <TabsTrigger value="stats">Statistiques</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{learningStats.coursesInProgress}</p>
                      <p className="text-sm text-gray-600">Cours en cours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{learningStats.totalTimeSpent}</p>
                      <p className="text-sm text-gray-600">Temps d'étude</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{learningStats.coursesCompleted}</p>
                      <p className="text-sm text-gray-600">Certificats</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{learningStats.averageGrade}%</p>
                      <p className="text-sm text-gray-600">Note moyenne</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Goal */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Objectif mensuel</span>
                </CardTitle>
                <CardDescription>
                  {learningStats.monthlyProgress}h / {learningStats.monthlyGoal}h ce mois-ci
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={(learningStats.monthlyProgress / learningStats.monthlyGoal) * 100} className="h-3" />
                <p className="text-sm text-gray-600 mt-2">
                  Plus que {learningStats.monthlyGoal - learningStats.monthlyProgress}h pour atteindre votre objectif !
                </p>
              </CardContent>
            </Card>

            {/* Continue Learning */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Continuer l'apprentissage</CardTitle>
                <CardDescription>Reprenez là où vous vous êtes arrêté</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {enrolledCourses.slice(0, 2).map((course) => (
                  <div key={course.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-24 h-16 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-semibold text-blue-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">Par {course.instructor}</p>
                        <p className="text-sm text-gray-500">Prochaine leçon: {course.nextLesson}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {course.completedLessons}/{course.totalLessons} leçons
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Link href={`/courses/${course.id}/learn`}>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          <Play className="w-4 h-4 mr-1" />
                          Continuer
                        </Button>
                      </Link>
                      <p className="text-xs text-gray-500 text-center">{course.estimatedTimeToComplete} restant</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher dans mes cours..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>

            {/* Enrolled Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Cours en cours ({enrolledCourses.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredEnrolledCourses.map((course) => (
                  <div key={course.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-32 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-blue-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">Par {course.instructor}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>{course.category}</span>
                            <span>⭐ {course.rating}</span>
                            <span>Dernière fois: {new Date(course.lastAccessed).toLocaleDateString("fr-FR")}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Heart className={`w-4 h-4 ${course.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>
                            {course.completedLessons}/{course.totalLessons} leçons • {course.timeSpent}
                          </span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/courses/${course.id}/learn`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Play className="w-4 h-4 mr-1" />
                            Continuer
                          </Button>
                        </Link>
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm" variant="outline">
                            Détails
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Completed Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Cours terminés ({completedCourses.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {filteredCompletedCourses.map((course) => (
                  <div key={course.id} className="flex space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.title}
                      className="w-32 h-20 object-cover rounded"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-blue-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">Par {course.instructor}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>{course.category}</span>
                            <span>⭐ {course.rating}</span>
                            <span>Terminé le {new Date(course.completedDate).toLocaleDateString("fr-FR")}</span>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Terminé
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>Note finale: {course.finalGrade}%</span>
                        <span>Temps total: {course.timeSpent}</span>
                        <span>Certificat: {course.certificateId}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/certificates/${course.certificateId}`}>
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4 mr-1" />
                            Certificat
                          </Button>
                        </Link>
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm" variant="outline">
                            Revoir
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Mes Certificats ({certificates.length})</CardTitle>
                <CardDescription>Tous vos certificats avec codes de vérification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {certificates.map((cert) => (
                  <div key={cert.id} className="border rounded-lg p-6 hover:bg-gray-50">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-blue-900">{cert.courseTitle}</h3>
                        <p className="text-gray-600">Par {cert.instructor}</p>
                        <p className="text-sm text-gray-500">
                          Émis le {new Date(cert.issueDate).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{cert.grade}%</div>
                        <p className="text-sm text-gray-500">Note finale</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700">Code de vérification:</p>
                        <p className="text-sm font-mono bg-gray-100 p-2 rounded">{cert.verificationCode}</p>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-gray-700">Compétences acquises:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {cert.skills.map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-blue-600 border-blue-200">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-3 border-t">
                        <Link href={`/certificates/${cert.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            <Download className="w-4 h-4 mr-1" />
                            Télécharger PDF
                          </Button>
                        </Link>
                        <Link href={`/verify/${cert.verificationCode}`}>
                          <Button size="sm" variant="outline">
                            Vérifier en ligne
                          </Button>
                        </Link>
                        <Button size="sm" variant="outline">
                          Partager sur LinkedIn
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Progression d'apprentissage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cours terminés</span>
                      <span className="text-sm text-gray-600">{learningStats.coursesCompleted}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Cours en cours</span>
                      <span className="text-sm text-gray-600">{learningStats.coursesInProgress}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Temps total d'étude</span>
                      <span className="text-sm text-gray-600">{learningStats.totalTimeSpent}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Note moyenne</span>
                      <span className="text-sm text-gray-600">{learningStats.averageGrade}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Compétences acquises</span>
                      <span className="text-sm text-gray-600">{learningStats.skillsAcquired}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Learning Streak */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900 flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Régularité d'apprentissage</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-900 mb-2">{learningStats.streakDays}</div>
                    <p className="text-gray-600">jours consécutifs</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Objectif mensuel</span>
                      <span>
                        {learningStats.monthlyProgress}h / {learningStats.monthlyGoal}h
                      </span>
                    </div>
                    <Progress
                      value={(learningStats.monthlyProgress / learningStats.monthlyGoal) * 100}
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Categories Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Progression par catégorie</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Marketing</span>
                      <span>2 cours • 75% de progression moyenne</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Technologie</span>
                      <span>2 cours • 67% de progression moyenne</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
