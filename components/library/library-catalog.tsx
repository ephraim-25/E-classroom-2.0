"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Star, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Book {
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
  language: string
  pages: number
  publishedDate: string
  coverImage: string
  format: string[]
  bestseller?: boolean
  featured?: boolean
}

const mockBooks: Book[] = [
  {
    id: "1",
    title: "L'Art de l'Entrepreneuriat en Afrique",
    author: "Dr. Marie Kabila",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description:
      "Un guide complet pour réussir en tant qu'entrepreneur en Afrique, avec des stratégies adaptées au contexte local.",
    price: 25,
    originalPrice: 35,
    rating: 4.8,
    reviewCount: 124,
    category: "Entrepreneuriat",
    language: "Français",
    pages: 320,
    publishedDate: "2024-01-15",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF", "EPUB"],
    bestseller: true,
    featured: true,
  },
  {
    id: "2",
    title: "Leadership Digital : Guide Pratique",
    author: "Jean-Claude Mwamba",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description: "Comment diriger efficacement dans l'ère numérique avec des outils et stratégies modernes.",
    price: 20,
    rating: 4.6,
    reviewCount: 89,
    category: "Leadership",
    language: "Français",
    pages: 280,
    publishedDate: "2024-02-10",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF", "EPUB", "AUDIOBOOK"],
    featured: true,
  },
  {
    id: "3",
    title: "Fintech et Innovation en RDC",
    author: "Sarah Mukendi",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description: "L'avenir des services financiers numériques en République Démocratique du Congo.",
    price: 30,
    rating: 4.7,
    reviewCount: 67,
    category: "Technologie",
    language: "Français",
    pages: 250,
    publishedDate: "2024-01-20",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF"],
    bestseller: true,
  },
  {
    id: "4",
    title: "Marketing Digital pour PME Africaines",
    author: "Patrick Nsimba",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    description: "Stratégies de marketing digital adaptées aux petites et moyennes entreprises africaines.",
    price: 18,
    originalPrice: 25,
    rating: 4.5,
    reviewCount: 156,
    category: "Marketing",
    language: "Français",
    pages: 200,
    publishedDate: "2024-03-05",
    coverImage: "/placeholder.svg?height=300&width=200",
    format: ["PDF", "EPUB"],
  },
]

const categories = ["Tous", "Entrepreneuriat", "Leadership", "Technologie", "Marketing", "Finance", "Éducation"]
const languages = ["Tous", "Français", "Anglais", "Lingala", "Swahili"]
const formats = ["Tous", "PDF", "EPUB", "AUDIOBOOK"]

export function LibraryCatalog() {
  const [books, setBooks] = useState<Book[]>(mockBooks)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tous")
  const [selectedLanguage, setSelectedLanguage] = useState("Tous")
  const [selectedFormat, setSelectedFormat] = useState("Tous")
  const [sortBy, setSortBy] = useState("featured")

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "Tous" || book.category === selectedCategory
    const matchesLanguage = selectedLanguage === "Tous" || book.language === selectedLanguage
    const matchesFormat = selectedFormat === "Tous" || book.format.includes(selectedFormat)

    return matchesSearch && matchesCategory && matchesLanguage && matchesFormat
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
      case "popular":
        return b.reviewCount - a.reviewCount
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Bibliothèque E-Classroom</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre collection exclusive de livres écrits par nos formateurs experts. Enrichissez vos
              connaissances avec des ouvrages de qualité sur l'entrepreneuriat, le leadership, la technologie et bien
              plus encore.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Rechercher un livre, auteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger>
                <SelectValue placeholder="Langue" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Mis en avant</SelectItem>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="popular">Plus populaires</SelectItem>
                <SelectItem value="rating">Mieux notés</SelectItem>
                <SelectItem value="price-low">Prix croissant</SelectItem>
                <SelectItem value="price-high">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            {sortedBooks.length} livre{sortedBooks.length > 1 ? "s" : ""} trouvé{sortedBooks.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-lg transition-shadow duration-300">
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
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                  )}
                  {book.featured && (
                    <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">Recommandé</Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Image
                    src={book.authorAvatar || "/placeholder.svg"}
                    alt={book.author}
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{book.author}</span>
                </div>

                <CardTitle className="text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {book.title}
                </CardTitle>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{book.description}</p>

                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium ml-1">{book.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({book.reviewCount})</span>
                  <Badge variant="outline" className="text-xs">
                    {book.category}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{book.pages} pages</span>
                  <span>{book.language}</span>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {book.format.map((format) => (
                    <Badge key={format} variant="secondary" className="text-xs">
                      {format}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-0">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">${book.price}</span>
                      {book.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">${book.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <Link href={`/library/${book.id}`} className="w-full">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      <BookOpen className="w-4 h-4 mr-2" />
                      Voir les détails
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {sortedBooks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun livre trouvé</h3>
            <p className="text-gray-600">Essayez de modifier vos critères de recherche ou de filtrage.</p>
          </div>
        )}
      </div>
    </div>
  )
}
