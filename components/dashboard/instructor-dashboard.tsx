"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Trash2,
  BarChart3,
  MessageCircle,
  Star,
  Upload,
} from "lucide-react"

export function InstructorDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false)
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnail: null,
  })

  if (!user) return null

  const myCourses = [
    {
      id: "1",
      title: "Introduction au Marketing Digital",
      students: 156,
      revenue: 2340,
      rating: 4.8,
      reviews: 23,
      status: "published",
      createdDate: "2024-01-01",
      lastUpdated: "2024-01-15",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      level: "Débutant",
      price: 79,
      totalLessons: 12,
      totalDuration: "8h 30min",
      enrollmentTrend: "+12%",
    },
    {
      id: "2",
      title: "Stratégies de Contenu Avancées",
      students: 89,
      revenue: 1780,
      rating: 4.9,
      reviews: 15,
      status: "published",
      createdDate: "2023-12-15",
      lastUpdated: "2024-01-10",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      level: "Avancé",
      price: 99,
      totalLessons: 15,
      totalDuration: "10h 45min",
      enrollmentTrend: "+8%",
    },
    {
      id: "3",
      title: "SEO pour Débutants",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      status: "draft",
      createdDate: "2024-01-20",
      lastUpdated: "2024-01-20",
      thumbnail: "/placeholder.svg?height=120&width=200",
      category: "Marketing",
      level: "Débutant",
      price: 69,
      totalLessons: 8,
      totalDuration: "5h 20min",
      enrollmentTrend: "N/A",
    },
  ]

  const recentStudents = [
    {
      id: "1",
      name: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Introduction au Marketing Digital",
      enrolledDate: "2024-01-18",
      progress: 45,
      lastActive: "2024-01-20",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Stratégies de Contenu Avancées",
      enrolledDate: "2024-01-17",
      progress: 78,
      lastActive: "2024-01-19",
    },
    {
      id: "3",
      name: "Ahmed Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      course: "Introduction au Marketing Digital",
      enrolledDate: "2024-01-16",
      progress: 92,
      lastActive: "2024-01-20",
    },
  ]

  const recentReviews = [
    {
      id: "1",
      student: "Marie Dubois",
      course: "Introduction au Marketing Digital",
      rating: 5,
      comment: "Excellent cours ! Très bien expliqué et pratique.",
      date: "2024-01-19",
    },
    {
      id: "2",
      student: "Paul Martin",
      course: "Stratégies de Contenu Avancées",
      rating: 4,
      comment: "Bon contenu, j'aurais aimé plus d'exemples concrets.",
      date: "2024-01-18",
    },
  ]

  const monthlyStats = {
    totalRevenue: 4120,
    totalStudents: 245,
    averageRating: 4.85,
    totalCourses: 3,
    newEnrollments: 28,
    completionRate: 78,
    revenueGrowth: "+15%",
    studentGrowth: "+22%",
  }

  const handleCreateCourse = () => {
    console.log("Creating course:", newCourse)
    setIsCreateCourseOpen(false)
    setNewCourse({
      title: "",
      description: "",
      category: "",
      level: "",
      price: "",
      thumbnail: null,
    })
  }

  const handleDeleteCourse = (courseId: string) => {
    console.log("Deleting course:", courseId)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Espace Formateur - {user.firstName}</h1>
              <p className="text-gray-600">Gérez vos cours et suivez vos performances</p>
            </div>
            <div className="flex space-x-3">
              <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau cours
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau cours</DialogTitle>
                    <DialogDescription>Remplissez les informations de base pour votre nouveau cours</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Titre du cours</label>
                      <Input
                        placeholder="Ex: Introduction au Marketing Digital"
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Description</label>
                      <Textarea
                        placeholder="Décrivez votre cours..."
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Catégorie</label>
                        <Select
                          value={newCourse.category}
                          onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="technology">Technologie</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Niveau</label>
                        <Select
                          value={newCourse.level}
                          onValueChange={(value) => setNewCourse({ ...newCourse, level: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un niveau" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="beginner">Débutant</SelectItem>
                            <SelectItem value="intermediate">Intermédiaire</SelectItem>
                            <SelectItem value="advanced">Avancé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Prix ($)</label>
                      <Input
                        type="number"
                        placeholder="79"
                        value={newCourse.price}
                        onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Image de couverture</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Cliquez pour télécharger une image</p>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => setIsCreateCourseOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleCreateCourse} className="bg-blue-600 hover:bg-blue-700">
                        Créer le cours
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Button onClick={logout} variant="outline">
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-blue-100">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="courses">Mes Cours</TabsTrigger>
            <TabsTrigger value="students">Étudiants</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
            <TabsTrigger value="reviews">Avis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{monthlyStats.totalCourses}</p>
                      <p className="text-sm text-gray-600">Cours publiés</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{monthlyStats.totalStudents}</p>
                      <p className="text-sm text-gray-600">Étudiants totaux</p>
                      <p className="text-xs text-green-600">{monthlyStats.studentGrowth} ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">${monthlyStats.totalRevenue}</p>
                      <p className="text-sm text-gray-600">Revenus totaux</p>
                      <p className="text-xs text-green-600">{monthlyStats.revenueGrowth} ce mois</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{monthlyStats.averageRating}</p>
                      <p className="text-sm text-gray-600">Note moyenne</p>
                      <p className="text-xs text-gray-500">{monthlyStats.completionRate}% de complétion</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Nouveaux étudiants</CardTitle>
                  <CardDescription>{monthlyStats.newEnrollments} nouvelles inscriptions ce mois</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center space-x-4">
                      <img
                        src={student.avatar || "/placeholder.svg"}
                        alt={student.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-blue-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.course}</p>
                        <p className="text-xs text-gray-500">
                          Inscrit le {new Date(student.enrolledDate).toLocaleDateString("fr-FR")} • {student.progress}%
                          terminé
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Avis récents</CardTitle>
                  <CardDescription>Derniers commentaires de vos étudiants</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-blue-900">{review.student}</h4>
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
                      </div>
                      <p className="text-sm text-gray-600">{review.course}</p>
                      <p className="text-sm text-gray-700">"{review.comment}"</p>
                      <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString("fr-FR")}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Mes Cours ({myCourses.length})</CardTitle>
                <CardDescription>Gérez et suivez vos cours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <img
                        src={course.thumbnail || "/placeholder.svg"}
                        alt={course.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-blue-900">{course.title}</h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                              <span>{course.category}</span>
                              <span>{course.level}</span>
                              <span>{course.totalLessons} leçons</span>
                              <span>{course.totalDuration}</span>
                            </div>
                          </div>
                          <Badge
                            className={
                              course.status === "published"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                            }
                          >
                            {course.status === "published" ? "Publié" : "Brouillon"}
                          </Badge>
                        </div>
                        <div className="flex space-x-6 text-sm text-gray-600 mb-3">
                          <span>
                            {course.students} étudiants ({course.enrollmentTrend})
                          </span>
                          <span>${course.revenue} revenus</span>
                          <span>
                            ⭐ {course.rating} ({course.reviews} avis)
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                          <Button size="sm" variant="outline">
                            <BarChart3 className="w-4 h-4 mr-1" />
                            Analyses
                          </Button>
                          {course.status === "draft" && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteCourse(course.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Supprimer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="students" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Mes Étudiants ({monthlyStats.totalStudents})</CardTitle>
                <CardDescription>Suivez la progression de vos étudiants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentStudents.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <img
                        src={student.avatar || "/placeholder.svg"}
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-blue-900">{student.name}</h3>
                        <p className="text-sm text-gray-600">{student.course}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>Inscrit le {new Date(student.enrolledDate).toLocaleDateString("fr-FR")}</span>
                          <span>Dernière activité: {new Date(student.lastActive).toLocaleDateString("fr-FR")}</span>
                        </div>
                        <div className="mt-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progression</span>
                            <span>{student.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Contacter
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          Profil
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Revenus mensuels</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900 mb-2">${monthlyStats.totalRevenue}</div>
                  <p className="text-green-600 text-sm">{monthlyStats.revenueGrowth} par rapport au mois dernier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Nouvelles inscriptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-900 mb-2">{monthlyStats.newEnrollments}</div>
                  <p className="text-green-600 text-sm">{monthlyStats.studentGrowth} par rapport au mois dernier</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Performance des cours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myCourses
                    .filter((course) => course.status === "published")
                    .map((course) => (
                      <div key={course.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h3 className="font-semibold text-blue-900">{course.title}</h3>
                          <p className="text-sm text-gray-600">
                            {course.students} étudiants • ${course.revenue} revenus • ⭐ {course.rating}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{course.enrollmentTrend}</p>
                          <p className="text-xs text-gray-500">Croissance</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Tous les avis</CardTitle>
                <CardDescription>Note moyenne: {monthlyStats.averageRating}/5</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-blue-900">{review.student}</h4>
                          <p className="text-sm text-gray-600">{review.course}</p>
                        </div>
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
                      </div>
                      <p className="text-gray-700 mb-2">"{review.comment}"</p>
                      <p className="text-xs text-gray-500">{new Date(review.date).toLocaleDateString("fr-FR")}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
