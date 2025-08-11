"use client"

import { useState, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Clock, Users, Star, BookOpen } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  instructorAvatar: string
  category: string
  subcategory: string
  duration: string
  studentsCount: number
  rating: number
  reviewsCount: number
  price: number
  originalPrice?: number
  isFree: boolean
  level: "Débutant" | "Intermédiaire" | "Avancé"
  thumbnail: string
  tags: string[]
  language: string
  lastUpdated: string
  certificateIncluded: boolean
}

const categories = [
  { id: "all", name: "Toutes les catégories" },
  { id: "education", name: "Éducation scolaire" },
  { id: "university", name: "Université" },
  { id: "entrepreneurship", name: "Entrepreneuriat" },
  { id: "technology", name: "Technologie" },
  { id: "business", name: "Business" },
  { id: "design", name: "Design" },
  { id: "marketing", name: "Marketing" },
  { id: "languages", name: "Langues" },
]

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction au Marketing Digital",
    description:
      "Apprenez les bases du marketing digital et développez votre présence en ligne avec des stratégies éprouvées.",
    instructor: "Marie Dubois",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    category: "marketing",
    subcategory: "Digital Marketing",
    duration: "8h 30min",
    studentsCount: 1247,
    rating: 4.8,
    reviewsCount: 156,
    price: 79,
    originalPrice: 129,
    isFree: false,
    level: "Débutant",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Marketing", "Digital", "Réseaux sociaux", "SEO"],
    language: "Français",
    lastUpdated: "2024-01-15",
    certificateIncluded: true,
  },
  {
    id: "2",
    title: "Développement Web avec React",
    description: "Maîtrisez React.js et créez des applications web modernes et performantes.",
    instructor: "Jean-Paul Kamau",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    category: "technology",
    subcategory: "Web Development",
    duration: "12h 45min",
    studentsCount: 892,
    rating: 4.9,
    reviewsCount: 203,
    price: 0,
    isFree: true,
    level: "Intermédiaire",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["React", "JavaScript", "Frontend", "Web"],
    language: "Français",
    lastUpdated: "2024-01-20",
    certificateIncluded: true,
  },
  {
    id: "3",
    title: "Entrepreneuriat et Innovation",
    description: "Découvrez comment créer et développer votre startup avec succès.",
    instructor: "Fatima Al-Rashid",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    category: "entrepreneurship",
    subcategory: "Startup",
    duration: "6h 15min",
    studentsCount: 634,
    rating: 4.7,
    reviewsCount: 89,
    price: 99,
    originalPrice: 149,
    isFree: false,
    level: "Débutant",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Entrepreneuriat", "Startup", "Innovation", "Business Plan"],
    language: "Français",
    lastUpdated: "2024-01-10",
    certificateIncluded: true,
  },
  {
    id: "4",
    title: "Mathématiques Avancées",
    description: "Perfectionnez vos compétences en mathématiques pour l'université et les concours.",
    instructor: "Dr. Ahmed Hassan",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    category: "university",
    subcategory: "Mathematics",
    duration: "15h 20min",
    studentsCount: 456,
    rating: 4.6,
    reviewsCount: 67,
    price: 59,
    isFree: false,
    level: "Avancé",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Mathématiques", "Algèbre", "Calcul", "Université"],
    language: "Français",
    lastUpdated: "2024-01-05",
    certificateIncluded: true,
  },
  {
    id: "5",
    title: "Design Graphique Professionnel",
    description: "Créez des designs impressionnants avec Photoshop, Illustrator et les principes du design.",
    instructor: "Sophie Martin",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    category: "design",
    subcategory: "Graphic Design",
    duration: "10h 30min",
    studentsCount: 723,
    rating: 4.8,
    reviewsCount: 134,
    price: 89,
    originalPrice: 139,
    isFree: false,
    level: "Intermédiaire",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Design", "Photoshop", "Illustrator", "Créativité"],
    language: "Français",
    lastUpdated: "2024-01-18",
    certificateIncluded: true,
  },
  {
    id: "6",
    title: "Anglais des Affaires",
    description: "Améliorez votre anglais professionnel pour réussir dans le monde des affaires international.",
    instructor: "Michael Johnson",
    instructorAvatar: "/placeholder.svg?height=40&width=40",
    category: "languages",
    subcategory: "Business English",
    duration: "9h 45min",
    studentsCount: 1156,
    rating: 4.7,
    reviewsCount: 198,
    price: 69,
    isFree: false,
    level: "Intermédiaire",
    thumbnail: "/placeholder.svg?height=200&width=300",
    tags: ["Anglais", "Business", "Communication", "Professionnel"],
    language: "Français",
    lastUpdated: "2024-01-12",
    certificateIncluded: true,
  },
]

export function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [sortBy, setSortBy] = useState("popular")
  const [showFilters, setShowFilters] = useState(false)

  const filteredCourses = useMemo(() => {
    let filtered = mockCourses

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory)
    }

    // Filter by level
    if (selectedLevel !== "all") {
      filtered = filtered.filter((course) => course.level === selectedLevel)
    }

    // Sort courses
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.studentsCount - a.studentsCount)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
      default:
        break
    }

    return filtered
  }, [searchQuery, selectedCategory, selectedLevel, sortBy])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold">Catalogue de Cours</h1>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Découvrez plus de {mockCourses.length} cours dans tous les domaines pour développer vos compétences
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher des cours, formateurs, sujets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-lg border-blue-200 focus:border-blue-500"
              />
            </div>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-blue-200">
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-40 border-blue-200">
                  <SelectValue placeholder="Niveau" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous niveaux</SelectItem>
                  <SelectItem value="Débutant">Débutant</SelectItem>
                  <SelectItem value="Intermédiaire">Intermédiaire</SelectItem>
                  <SelectItem value="Avancé">Avancé</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-blue-200">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Plus populaires</SelectItem>
                  <SelectItem value="rating">Mieux notés</SelectItem>
                  <SelectItem value="newest">Plus récents</SelectItem>
                  <SelectItem value="price-low">Prix croissant</SelectItem>
                  <SelectItem value="price-high">Prix décroissant</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-blue-200 bg-transparent"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtres avancés
              </Button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-blue-900">{filteredCourses.length} cours trouvés</h2>
            {searchQuery && <p className="text-gray-600">Résultats pour "{searchQuery}"</p>}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-16">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucun cours trouvé</h3>
            <p className="text-gray-500">
              Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 border-blue-100 overflow-hidden">
        <div className="relative">
          <img
            src={course.thumbnail || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {course.isFree && <Badge className="absolute top-3 left-3 bg-green-600 hover:bg-green-700">Gratuit</Badge>}
          {course.originalPrice && (
            <Badge className="absolute top-3 right-3 bg-red-600 hover:bg-red-700">
              -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        <CardContent className="p-6 space-y-4">
          {/* Category and Level */}
          <div className="flex justify-between items-center">
            <Badge variant="outline" className="text-blue-600 border-blue-200">
              {categories.find((cat) => cat.id === course.category)?.name}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {course.level}
            </Badge>
          </div>

          {/* Title and Description */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 line-clamp-2">
              {course.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
          </div>

          {/* Instructor */}
          <div className="flex items-center space-x-2">
            <img
              src={course.instructorAvatar || "/placeholder.svg"}
              alt={course.instructor}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">{course.instructor}</span>
          </div>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating}</span>
              <span className="text-gray-400">({course.reviewsCount})</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <div className="flex items-center space-x-2">
              {course.isFree ? (
                <span className="text-2xl font-bold text-green-600">Gratuit</span>
              ) : (
                <>
                  <span className="text-2xl font-bold text-blue-900">${course.price}</span>
                  {course.originalPrice && (
                    <span className="text-lg text-gray-400 line-through">${course.originalPrice}</span>
                  )}
                </>
              )}
            </div>
            {course.certificateIncluded && (
              <Badge variant="outline" className="text-xs text-blue-600 border-blue-200">
                Certificat inclus
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
