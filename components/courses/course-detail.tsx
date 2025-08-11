"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Clock,
  Users,
  Star,
  Award,
  Download,
  BookOpen,
  CheckCircle,
  Globe,
  Calendar,
  Share2,
  Heart,
} from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

interface CourseDetailProps {
  courseId: string
}

// Mock course data - in real app, fetch from API
const mockCourseDetail = {
  id: "1",
  title: "Introduction au Marketing Digital",
  description:
    "Apprenez les bases du marketing digital et développez votre présence en ligne avec des stratégies éprouvées. Ce cours complet vous guidera à travers tous les aspects essentiels du marketing numérique moderne.",
  longDescription:
    "Dans ce cours complet, vous découvrirez les fondamentaux du marketing digital qui transformeront votre approche de la promotion en ligne. Nous couvrirons les réseaux sociaux, le SEO, la publicité payante, l'email marketing, et bien plus encore. Chaque module est conçu pour vous donner des compétences pratiques que vous pourrez appliquer immédiatement.",
  instructor: {
    name: "Marie Dubois",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Experte en marketing digital avec plus de 10 ans d'expérience. Ancienne directrice marketing chez plusieurs startups tech.",
    rating: 4.9,
    studentsCount: 15420,
    coursesCount: 8,
  },
  category: "Marketing",
  subcategory: "Digital Marketing",
  duration: "8h 30min",
  studentsCount: 1247,
  rating: 4.8,
  reviewsCount: 156,
  price: 79,
  originalPrice: 129,
  isFree: false,
  level: "Débutant",
  thumbnail: "/placeholder.svg?height=400&width=600",
  tags: ["Marketing", "Digital", "Réseaux sociaux", "SEO", "Publicité"],
  language: "Français",
  lastUpdated: "2024-01-15",
  certificateIncluded: true,
  requirements: [
    "Aucune expérience préalable requise",
    "Accès à un ordinateur et à internet",
    "Motivation pour apprendre et pratiquer",
  ],
  whatYouWillLearn: [
    "Créer une stratégie de marketing digital complète",
    "Optimiser votre présence sur les réseaux sociaux",
    "Comprendre et appliquer les bases du SEO",
    "Créer des campagnes publicitaires efficaces",
    "Analyser et mesurer vos performances marketing",
    "Développer une identité de marque forte en ligne",
  ],
  curriculum: [
    {
      title: "Introduction au Marketing Digital",
      duration: "45min",
      lessons: [
        { title: "Qu'est-ce que le marketing digital ?", duration: "12min", isPreview: true },
        { title: "Les différents canaux digitaux", duration: "15min", isPreview: false },
        { title: "Définir vos objectifs marketing", duration: "18min", isPreview: false },
      ],
    },
    {
      title: "Stratégie de Contenu",
      duration: "2h 15min",
      lessons: [
        { title: "Créer un calendrier éditorial", duration: "25min", isPreview: false },
        { title: "Types de contenu efficaces", duration: "30min", isPreview: false },
        { title: "Storytelling pour les marques", duration: "35min", isPreview: false },
        { title: "Outils de création de contenu", duration: "45min", isPreview: false },
      ],
    },
    {
      title: "Réseaux Sociaux",
      duration: "2h 30min",
      lessons: [
        { title: "Choisir les bonnes plateformes", duration: "20min", isPreview: false },
        { title: "Optimiser vos profils sociaux", duration: "25min", isPreview: false },
        { title: "Engagement et communauté", duration: "40min", isPreview: false },
        { title: "Publicité sur les réseaux sociaux", duration: "45min", isPreview: false },
        { title: "Mesurer vos performances sociales", duration: "20min", isPreview: false },
      ],
    },
    {
      title: "SEO et Référencement",
      duration: "1h 45min",
      lessons: [
        { title: "Bases du référencement naturel", duration: "30min", isPreview: false },
        { title: "Recherche de mots-clés", duration: "25min", isPreview: false },
        { title: "Optimisation on-page", duration: "35min", isPreview: false },
        { title: "Link building et autorité", duration: "15min", isPreview: false },
      ],
    },
    {
      title: "Publicité Payante",
      duration: "1h 15min",
      lessons: [
        { title: "Google Ads pour débutants", duration: "35min", isPreview: false },
        { title: "Facebook et Instagram Ads", duration: "25min", isPreview: false },
        { title: "Optimiser vos campagnes", duration: "15min", isPreview: false },
      ],
    },
  ],
  reviews: [
    {
      id: "1",
      user: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-10",
      comment:
        "Excellent cours ! Marie explique très clairement et les exemples pratiques sont très utiles. Je recommande vivement.",
    },
    {
      id: "2",
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      date: "2024-01-08",
      comment:
        "Très bon contenu, bien structuré. J'aurais aimé plus d'exercices pratiques mais dans l'ensemble très satisfaisant.",
    },
    {
      id: "3",
      user: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-05",
      comment: "Formation complète et accessible. Perfect pour débuter dans le marketing digital.",
    },
  ],
}

export function CourseDetail({ courseId }: CourseDetailProps) {
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const course = mockCourseDetail // In real app, fetch by courseId

  const handleEnroll = () => {
    if (course.isFree) {
      setIsEnrolled(true)
      // Redirect to course player
    } else {
      window.location.href = `/checkout?courseId=${courseId}`
    }
  }

  const totalDuration = course.curriculum.reduce((total, section) => {
    const sectionMinutes = Number.parseInt(section.duration.replace(/[^\d]/g, ""))
    return total + sectionMinutes
  }, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <div className="space-y-6">
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Link href="/courses" className="hover:text-blue-600">
                    Cours
                  </Link>
                  <span>/</span>
                  <span>{course.category}</span>
                  <span>/</span>
                  <span className="text-blue-600">{course.title}</span>
                </div>

                {/* Title and Description */}
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{course.category}</Badge>
                    <Badge variant="outline">{course.level}</Badge>
                    {course.certificateIncluded && (
                      <Badge variant="outline" className="text-green-600 border-green-200">
                        <Award className="w-3 h-3 mr-1" />
                        Certificat
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl lg:text-4xl font-bold text-blue-900">{course.title}</h1>
                  <p className="text-xl text-gray-600">{course.description}</p>
                </div>

                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{course.rating}</span>
                    <span>({course.reviewsCount} avis)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsCount.toLocaleString()} étudiants</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span>{course.language}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Mis à jour le {new Date(course.lastUpdated).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>

                {/* Instructor */}
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                  <img
                    src={course.instructor.avatar || "/placeholder.svg"}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900">{course.instructor.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{course.instructor.bio}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⭐ {course.instructor.rating}</span>
                      <span>{course.instructor.studentsCount.toLocaleString()} étudiants</span>
                      <span>{course.instructor.coursesCount} cours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Course Content Tabs */}
            <div className="bg-white rounded-lg shadow-sm border">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 bg-gray-50 rounded-t-lg">
                  <TabsTrigger value="overview">Aperçu</TabsTrigger>
                  <TabsTrigger value="curriculum">Programme</TabsTrigger>
                  <TabsTrigger value="instructor">Formateur</TabsTrigger>
                  <TabsTrigger value="reviews">Avis</TabsTrigger>
                </TabsList>

                <div className="p-8">
                  <TabsContent value="overview" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">À propos de ce cours</h3>
                      <p className="text-gray-700 leading-relaxed">{course.longDescription}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">Ce que vous apprendrez</h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">Prérequis</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="curriculum" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">Contenu du cours</h3>
                      <p className="text-gray-600 mb-6">
                        {course.curriculum.length} sections • {totalDuration} minutes de contenu vidéo
                      </p>
                    </div>

                    <div className="space-y-4">
                      {course.curriculum.map((section, sectionIndex) => (
                        <Card key={sectionIndex} className="border-blue-100">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-lg text-blue-900">{section.title}</CardTitle>
                              <span className="text-sm text-gray-600">{section.duration}</span>
                            </div>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="space-y-2">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <div
                                  key={lessonIndex}
                                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg"
                                >
                                  <div className="flex items-center space-x-3">
                                    <Play className="w-4 h-4 text-blue-600" />
                                    <span className="text-gray-700">{lesson.title}</span>
                                    {lesson.isPreview && (
                                      <Badge variant="outline" className="text-xs">
                                        Aperçu
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-sm text-gray-500">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="instructor" className="space-y-6">
                    <div className="flex items-start space-x-6">
                      <img
                        src={course.instructor.avatar || "/placeholder.svg"}
                        alt={course.instructor.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-blue-900 mb-2">{course.instructor.name}</h3>
                        <p className="text-gray-700 mb-4">{course.instructor.bio}</p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold text-blue-900">{course.instructor.rating}</div>
                            <div className="text-sm text-gray-600">Note moyenne</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-900">
                              {course.instructor.studentsCount.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">Étudiants</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-blue-900">{course.instructor.coursesCount}</div>
                            <div className="text-sm text-gray-600">Cours</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews" className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900 mb-4">Avis des étudiants</h3>
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="text-4xl font-bold text-blue-900">{course.rating}</div>
                        <div>
                          <div className="flex items-center space-x-1 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(course.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-600">{course.reviewsCount} avis</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {course.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar || "/placeholder.svg"}
                              alt={review.user}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-blue-900">{review.user}</h4>
                                <div className="flex items-center space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {new Date(review.date).toLocaleDateString("fr-FR")}
                                </span>
                              </div>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Preview Card */}
            <Card className="sticky top-8 border-blue-100 shadow-lg">
              <div className="relative">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Button
                  size="lg"
                  className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 hover:bg-white text-blue-600 hover:text-blue-700"
                >
                  <Play className="w-6 h-6 ml-1" />
                </Button>
              </div>

              <CardContent className="p-6 space-y-4">
                {/* Price */}
                <div className="text-center">
                  {course.isFree ? (
                    <div className="text-3xl font-bold text-green-600">Gratuit</div>
                  ) : (
                    <div className="space-y-1">
                      <div className="text-3xl font-bold text-blue-900">${course.price}</div>
                      {course.originalPrice && (
                        <div className="text-lg text-gray-400 line-through">${course.originalPrice}</div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  {isEnrolled ? (
                    <Link href={`/courses/${courseId}/learn`}>
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                        Continuer le cours
                      </Button>
                    </Link>
                  ) : (
                    <Button onClick={handleEnroll} className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                      {course.isFree ? "S'inscrire gratuitement" : "Acheter maintenant"}
                    </Button>
                  )}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsFavorited(!isFavorited)}
                      className="flex-1 bg-transparent"
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                      Favoris
                    </Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      <Share2 className="w-4 h-4 mr-2" />
                      Partager
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Course Includes */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-blue-900">Ce cours inclut :</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span>{course.duration} de vidéo à la demande</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Download className="w-4 h-4 text-blue-600" />
                      <span>Ressources téléchargeables</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-blue-600" />
                      <span>Accès à vie</span>
                    </div>
                    {course.certificateIncluded && (
                      <div className="flex items-center space-x-2">
                        <Award className="w-4 h-4 text-blue-600" />
                        <span>Certificat de fin de formation</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
