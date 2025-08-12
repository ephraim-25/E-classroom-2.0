"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Users,
  BookOpen,
  DollarSign,
  Shield,
  TrendingUp,
  AlertTriangle,
  Search,
  MoreHorizontal,
  Eye,
  Ban,
  CheckCircle,
  XCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function AdminDashboard() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")

  if (!user) return null

  const systemStats = {
    totalUsers: 10247,
    totalCourses: 523,
    totalRevenue: 125340,
    activeInstructors: 89,
    pendingApprovals: 12,
    reportedContent: 3,
    monthlyGrowth: {
      users: "+12%",
      courses: "+8%",
      revenue: "+15%",
      instructors: "+5%",
    },
  }

  const users = [
    {
      id: "1",
      name: "Jean Dupont",
      email: "jean.dupont@email.com",
      type: "student",
      status: "active",
      joinDate: "2024-01-15",
      lastActive: "2024-01-20",
      coursesEnrolled: 3,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "2",
      name: "Marie Dubois",
      email: "marie.dubois@email.com",
      type: "instructor",
      status: "active",
      joinDate: "2023-12-01",
      lastActive: "2024-01-20",
      coursesCreated: 5,
      totalStudents: 1247,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: "3",
      name: "Paul Martin",
      email: "paul.martin@email.com",
      type: "student",
      status: "suspended",
      joinDate: "2024-01-10",
      lastActive: "2024-01-18",
      coursesEnrolled: 1,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const courses = [
    {
      id: "1",
      title: "Introduction au Marketing Digital",
      instructor: "Marie Dubois",
      status: "published",
      students: 156,
      revenue: 2340,
      rating: 4.8,
      createdDate: "2024-01-01",
      category: "Marketing",
      reports: 0,
    },
    {
      id: "2",
      title: "Développement Web Avancé",
      instructor: "Jean-Paul Kamau",
      status: "pending",
      students: 0,
      revenue: 0,
      rating: 0,
      createdDate: "2024-01-18",
      category: "Technologie",
      reports: 0,
    },
    {
      id: "3",
      title: "Cours Suspect",
      instructor: "Utilisateur Suspect",
      status: "reported",
      students: 23,
      revenue: 460,
      rating: 2.1,
      createdDate: "2024-01-10",
      category: "Business",
      reports: 3,
    },
  ]

  const payments = [
    {
      id: "1",
      student: "Jean Dupont",
      course: "Introduction au Marketing Digital",
      amount: 79,
      method: "M-Pesa",
      status: "completed",
      date: "2024-01-20",
      transactionId: "MP-2024-001",
    },
    {
      id: "2",
      student: "Sarah Johnson",
      course: "Développement Web avec React",
      amount: 99,
      method: "Carte bancaire",
      status: "completed",
      date: "2024-01-19",
      transactionId: "CB-2024-002",
    },
    {
      id: "3",
      student: "Ahmed Hassan",
      course: "Design Graphique",
      amount: 89,
      method: "Airtel Money",
      status: "pending",
      date: "2024-01-20",
      transactionId: "AM-2024-003",
    },
  ]

  const certificates = [
    {
      id: "EC-2024-001",
      student: "Jean Dupont",
      course: "Bases du Marketing",
      instructor: "Sophie Martin",
      issueDate: "2024-01-15",
      verificationCode: "EC-2024-001-VERIFY",
      status: "valid",
    },
    {
      id: "EC-2024-002",
      student: "Marie Johnson",
      course: "HTML & CSS Fondamentaux",
      instructor: "Ahmed Hassan",
      issueDate: "2024-01-10",
      verificationCode: "EC-2024-002-VERIFY",
      status: "valid",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      type: "user_registration",
      message: "Nouvel utilisateur inscrit",
      user: "Jean Dupont",
      timestamp: "2024-01-20T10:30:00Z",
    },
    {
      id: "2",
      type: "course_submission",
      message: "Nouveau cours soumis pour approbation",
      user: "Marie Dubois",
      timestamp: "2024-01-20T09:15:00Z",
    },
    {
      id: "3",
      type: "payment_processed",
      message: "Paiement traité avec succès",
      user: "Sarah Johnson",
      timestamp: "2024-01-20T08:45:00Z",
    },
    {
      id: "4",
      type: "content_reported",
      message: "Contenu signalé par un utilisateur",
      user: "Système",
      timestamp: "2024-01-19T16:20:00Z",
    },
  ]

  const handleUserAction = (userId: string, action: string) => {
    console.log(`Action ${action} on user ${userId}`)
  }

  const handleCourseAction = (courseId: string, action: string) => {
    console.log(`Action ${action} on course ${courseId}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-blue-900">Panneau d'Administration - {user.firstName}</h1>
              <p className="text-gray-600">Gérez la plateforme E-Classroom</p>
            </div>
            <Button onClick={logout} variant="outline">
              Déconnexion
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-blue-100">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
            <TabsTrigger value="courses">Cours</TabsTrigger>
            <TabsTrigger value="payments">Paiements</TabsTrigger>
            <TabsTrigger value="certificates">Certificats</TabsTrigger>
            <TabsTrigger value="reports">Rapports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Stats Cards */}
            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Users className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{systemStats.totalUsers.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Utilisateurs</p>
                      <p className="text-xs text-green-600">{systemStats.monthlyGrowth.users}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{systemStats.totalCourses}</p>
                      <p className="text-sm text-gray-600">Cours</p>
                      <p className="text-xs text-green-600">{systemStats.monthlyGrowth.courses}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">${systemStats.totalRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Revenus</p>
                      <p className="text-xs text-green-600">{systemStats.monthlyGrowth.revenue}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{systemStats.activeInstructors}</p>
                      <p className="text-sm text-gray-600">Formateurs</p>
                      <p className="text-xs text-green-600">{systemStats.monthlyGrowth.instructors}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-orange-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{systemStats.pendingApprovals}</p>
                      <p className="text-sm text-gray-600">En attente</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">{systemStats.reportedContent}</p>
                      <p className="text-sm text-gray-600">Signalements</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Activité Récente</CardTitle>
                <CardDescription>Dernières actions sur la plateforme</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activity.type === "content_reported"
                          ? "bg-red-600"
                          : activity.type === "payment_processed"
                            ? "bg-green-600"
                            : activity.type === "course_submission"
                              ? "bg-yellow-600"
                              : "bg-blue-600"
                      }`}
                    ></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-600">
                        {activity.user} • {new Date(activity.timestamp).toLocaleString("fr-FR")}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher des utilisateurs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Type d'utilisateur" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="student">Étudiants</SelectItem>
                  <SelectItem value="instructor">Formateurs</SelectItem>
                  <SelectItem value="admin">Administrateurs</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="suspended">Suspendu</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Gestion des Utilisateurs</CardTitle>
                <CardDescription>{systemStats.totalUsers.toLocaleString()} utilisateurs au total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-blue-900">{user.name}</h3>
                          <Badge
                            className={
                              user.type === "instructor"
                                ? "bg-purple-100 text-purple-800 hover:bg-purple-200"
                                : user.type === "admin"
                                  ? "bg-red-100 text-red-800 hover:bg-red-200"
                                  : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }
                          >
                            {user.type === "instructor" ? "Formateur" : user.type === "admin" ? "Admin" : "Étudiant"}
                          </Badge>
                          <Badge
                            className={
                              user.status === "active"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {user.status === "active" ? "Actif" : "Suspendu"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-xs text-gray-500">
                          Inscrit le {new Date(user.joinDate).toLocaleDateString("fr-FR")} • Dernière activité:{" "}
                          {new Date(user.lastActive).toLocaleDateString("fr-FR")}
                        </p>
                        {user.type === "student" && (
                          <p className="text-xs text-blue-600">{user.coursesEnrolled} cours inscrits</p>
                        )}
                        {user.type === "instructor" && (
                          <p className="text-xs text-purple-600">
                            {user.coursesCreated} cours créés • {user.totalStudents} étudiants
                          </p>
                        )}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleUserAction(user.id, "view")}>
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le profil
                          </DropdownMenuItem>
                          {user.status === "active" ? (
                            <DropdownMenuItem onClick={() => handleUserAction(user.id, "suspend")}>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspendre
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleUserAction(user.id, "activate")}>
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Réactiver
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Gestion des Cours</CardTitle>
                <CardDescription>{systemStats.totalCourses} cours au total</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-blue-900">{course.title}</h3>
                          <Badge
                            className={
                              course.status === "published"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : course.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {course.status === "published"
                              ? "Publié"
                              : course.status === "pending"
                                ? "En attente"
                                : "Signalé"}
                          </Badge>
                          {course.reports > 0 && (
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
                              {course.reports} signalement(s)
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          Par {course.instructor} • {course.category}
                        </p>
                        <p className="text-xs text-gray-500">
                          Créé le {new Date(course.createdDate).toLocaleDateString("fr-FR")} •{course.students}{" "}
                          étudiants • ${course.revenue} revenus
                        </p>
                        {course.rating > 0 && <p className="text-xs text-yellow-600">⭐ {course.rating}/5</p>}
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleCourseAction(course.id, "view")}>
                            <Eye className="w-4 h-4 mr-2" />
                            Voir le cours
                          </DropdownMenuItem>
                          {course.status === "pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleCourseAction(course.id, "approve")}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approuver
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleCourseAction(course.id, "reject")}>
                                <XCircle className="w-4 h-4 mr-2" />
                                Rejeter
                              </DropdownMenuItem>
                            </>
                          )}
                          {course.status === "published" && (
                            <DropdownMenuItem onClick={() => handleCourseAction(course.id, "suspend")}>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspendre
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Gestion des Paiements</CardTitle>
                <CardDescription>Historique et suivi des transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-blue-900">${payment.amount}</h3>
                          <Badge
                            className={
                              payment.status === "completed"
                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                : payment.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                  : "bg-red-100 text-red-800 hover:bg-red-200"
                            }
                          >
                            {payment.status === "completed"
                              ? "Complété"
                              : payment.status === "pending"
                                ? "En attente"
                                : "Échoué"}
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{payment.method}</Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {payment.student} • {payment.course}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(payment.date).toLocaleDateString("fr-FR")} • ID: {payment.transactionId}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => console.log("View payment", payment.id)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-blue-900">Gestion des Certificats</CardTitle>
                <CardDescription>Certificats émis et vérifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {certificates.map((certificate) => (
                    <div
                      key={certificate.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-blue-900">{certificate.id}</h3>
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                            {certificate.status === "valid" ? "Valide" : "Invalide"}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {certificate.student} • {certificate.course}
                        </p>
                        <p className="text-xs text-gray-500">
                          Émis le {new Date(certificate.issueDate).toLocaleDateString("fr-FR")} par{" "}
                          {certificate.instructor}
                        </p>
                        <p className="text-xs text-blue-600">Code: {certificate.verificationCode}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(`/verify/${certificate.id}`, "_blank")}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Rapports Financiers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Revenus totaux</span>
                      <span className="font-semibold">${systemStats.totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Revenus ce mois</span>
                      <span className="font-semibold text-green-600">+$18,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Commissions</span>
                      <span className="font-semibold">$12,534</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-900">Statistiques d'Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Taux de complétion</span>
                      <span className="font-semibold">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Satisfaction moyenne</span>
                      <span className="font-semibold">4.6/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Utilisateurs actifs</span>
                      <span className="font-semibold">8,234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
