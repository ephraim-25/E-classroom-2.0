"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Star, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface BookType {
  id: string
  title: string
  author: string
  authorAvatar: string
  description: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  category: string
  pages: number
  language: string
  publishedDate: string
  coverImage: string
  format: string[]
  bestseller?: boolean
  featured?: boolean
}

const mockBooks: BookType[] = [
  {
    id: "1",
    title: "Entrepreneuriat Digital en Afrique",
    author: "Dr. Marie Kabila",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description:
      "Un guide complet pour réussir dans l'économie numérique africaine. Découvrez les stratégies, outils et opportunités uniques du continent.",
    price: 25000,
    originalPrice: 35000,
    rating: 4.8,
    reviewCount: 127,
    category: "Entrepreneuriat",
    pages: 320,
    language: "Français",
    publishedDate: "2024-01-15",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF", "EPUB"],
    bestseller: true,
    featured: true,
  },
  {
    id: "2",
    title: "Leadership Transformationnel",
    author: "Prof. Jean-Claude Mbuyi",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description:
      "Les principes du leadership moderne adaptés au contexte africain. Développez votre potentiel de leader authentique.",
    price: 20000,
    rating: 4.6,
    reviewCount: 89,
    category: "Leadership",
    pages: 280,
    language: "Français",
    publishedDate: "2024-02-10",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF", "EPUB", "Audio"],
    featured: true,
  },
  {
    id: "3",
    title: "Marketing Digital pour PME",
    author: "Sarah Mukendi",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description: "Stratégies pratiques de marketing digital adaptées aux petites et moyennes entreprises africaines.",
    price: 18000,
    originalPrice: 25000,
    rating: 4.7,
    reviewCount: 156,
    category: "Marketing",
    pages: 250,
    language: "Français",
    publishedDate: "2024-01-28",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF"],
    bestseller: true,
  },
  {
    id: "4",
    title: "Gestion Financière Personnelle",
    author: "Emmanuel Tshisekedi",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description:
      "Maîtrisez vos finances personnelles et construisez votre patrimoine avec des stratégies adaptées au contexte local.",
    price: 15000,
    rating: 4.5,
    reviewCount: 203,
    category: "Finance",
    pages: 200,
    language: "Français",
    publishedDate: "2024-03-05",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF", "EPUB"],
  },
]

const categories = [
  "Tous",
  "Entrepreneuriat",
  "Leadership",
  "Marketing",
  "Finance",
  "Technologie",
  "Développement Personnel",
]

export function LibraryCatalog() {
  const [books, setBooks] = useState(mockBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [sortBy, setSortBy] = useState("featured")
  const [isLoading, setIsLoading] = useState(false)

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || book.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
      case "featured":
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CD", {
      style: "currency",
      currency: "CDF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Bibliothèque E-Classroom</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez une collection unique de livres écrits par nos formateurs experts. Approfondissez vos connaissances
          avec des ressources de qualité adaptées au contexte africain.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Rechercher un livre, auteur ou sujet..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Mis en avant</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          {sortedBooks.length} livre{sortedBooks.length > 1 ? "s" : ""} trouvé{sortedBooks.length > 1 ? "s" : ""}
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedBooks.map((book) => (
          <Card key={book.id} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
            <CardHeader className="p-0">
              <div className="relative">
                <Image
                  src={book.coverImage || "/placeholder.svg"}
                  alt={book.title}
                  width={200}
                  height={300}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                {book.bestseller && (
                  <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                )}
                {book.featured && (
                  <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">Recommandé</Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="mb-2">
                <Badge variant="secondary" className="text-xs">
                  {book.category}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <Image
                  src={book.authorAvatar || "/placeholder.svg"}
                  alt={book.author}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-sm text-gray-600">{book.author}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium ml-1">{book.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({book.reviewCount})</span>
                <span className="text-sm text-gray-500">• {book.pages} pages</span>
              </div>
              <div className="flex items-center gap-2 mb-3">
                {book.format.map((format) => (
                  <Badge key={format} variant="outline" className="text-xs">
                    {format}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="w-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-blue-600">{formatPrice(book.price)}</span>
                    {book.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{formatPrice(book.originalPrice)}</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/library/${book.id}`} className="flex-1">
                    <Button variant="outline" className="w-full bg-transparent">
                      <User className="w-4 h-4 mr-2" />
                      Détails
                    </Button>
                  </Link>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Acheter
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedBooks.length === 0 && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun livre trouvé</h3>
          <p className="text-gray-600">
            Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
          </p>
        </div>
      )}
    </div>
  )
}
