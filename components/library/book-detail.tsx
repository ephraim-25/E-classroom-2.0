"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Download, ShoppingCart, Calendar, Globe, FileText, User, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BookDetailProps {
  bookId: string
}

interface BookType {
  id: string
  title: string
  author: string
  authorAvatar: string
  authorBio: string
  description: string
  fullDescription: string
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
  tableOfContents: string[]
  preview?: string
}

const mockBook: BookType = {
  id: "1",
  title: "Entrepreneuriat Digital en Afrique",
  author: "Dr. Marie Kabila",
  authorAvatar: "/placeholder.svg?height=80&width=80",
  authorBio:
    "Dr. Marie Kabila est une experte reconnue en entrepreneuriat digital avec plus de 15 ans d'expérience. Elle a accompagné plus de 500 entrepreneurs africains dans leur transformation digitale.",
  description: "Un guide complet pour réussir dans l'économie numérique africaine.",
  fullDescription:
    "Ce livre révolutionnaire explore les opportunités uniques de l'économie numérique en Afrique. À travers des études de cas concrets, des stratégies éprouvées et des conseils pratiques, découvrez comment bâtir un empire digital sur le continent africain. L'auteure partage son expertise acquise en accompagnant des centaines d'entrepreneurs vers le succès.",
  price: 25000,
  originalPrice: 35000,
  rating: 4.8,
  reviewCount: 127,
  category: "Entrepreneuriat",
  pages: 320,
  language: "Français",
  publishedDate: "2024-01-15",
  coverImage: "/placeholder.svg?height=400&width=300",
  format: ["PDF", "EPUB"],
  bestseller: true,
  featured: true,
  tableOfContents: [
    "Introduction : L'Afrique, continent digital",
    "Chapitre 1 : Comprendre l'écosystème numérique africain",
    "Chapitre 2 : Identifier les opportunités de marché",
    "Chapitre 3 : Construire son business model digital",
    "Chapitre 4 : Financement et investissement",
    "Chapitre 5 : Marketing digital adapté au contexte africain",
    "Chapitre 6 : Gestion d'équipe à distance",
    "Chapitre 7 : Expansion régionale et internationale",
    "Conclusion : Votre feuille de route vers le succès",
  ],
  preview: "Découvrez les 3 premiers chapitres gratuitement",
}

export function BookDetail({ bookId }: BookDetailProps) {
  const [book, setBook] = useState<BookType | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("description")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBook(mockBook)
      setIsLoading(false)
    }, 1000)
  }, [bookId])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-CD", {
      style: "currency",
      currency: "CDF",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-gray-200 h-96 rounded-lg"></div>
            </div>
            <div className="lg:col-span-2">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-12">
        <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Livre non trouvé</h2>
        <p className="text-gray-600 mb-6">Le livre que vous recherchez n'existe pas ou a été supprimé.</p>
        <Link href="/library">
          <Button>Retour à la bibliothèque</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600">
              Accueil
            </Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/library" className="hover:text-blue-600">
              Bibliothèque
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900">{book.title}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover and Purchase */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="w-full rounded-lg shadow-md"
                  />
                  {book.bestseller && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                  )}
                  {book.featured && (
                    <Badge className="absolute top-3 right-3 bg-blue-600 hover:bg-blue-700">Recommandé</Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{formatPrice(book.price)}</div>
                      {book.originalPrice && (
                        <div className="text-sm text-gray-500 line-through">{formatPrice(book.originalPrice)}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Acheter maintenant
                    </Button>
                    {book.preview && (
                      <Button variant="outline" className="w-full bg-transparent">
                        <Download className="w-4 h-4 mr-2" />
                        {book.preview}
                      </Button>
                    )}
                  </div>

                  <div className="border-t pt-4 space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>{book.pages} pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <span>{book.language}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Publié le {formatDate(book.publishedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Download className="w-4 h-4 text-gray-400" />
                      <div className="flex gap-1">
                        {book.format.map((format) => (
                          <Badge key={format} variant="outline" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{book.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{book.rating}</span>
                  <span className="text-gray-500">({book.reviewCount} avis)</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
              <p className="text-lg text-gray-600">{book.description}</p>
            </div>

            {/* Author */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={book.authorAvatar || "/placeholder.svg"} alt={book.author} />
                    <AvatarFallback>
                      <User className="w-8 h-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{book.author}</h3>
                    <p className="text-gray-600 text-sm">{book.authorBio}</p>
                    <Link href={`/instructors/${book.author.toLowerCase().replace(/\s+/g, "-")}`}>
                      <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                        Voir le profil
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="contents">Table des matières</TabsTrigger>
                <TabsTrigger value="reviews">Avis ({book.reviewCount})</TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-gray-700 leading-relaxed">{book.fullDescription}</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contents" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <ol className="space-y-2">
                      {book.tableOfContents.map((chapter, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <span className="text-blue-600 font-medium min-w-[2rem]">{index + 1}.</span>
                          <span className="text-gray-700">{chapter}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun avis pour le moment</h3>
                      <p className="text-gray-600">Soyez le premier à laisser un avis sur ce livre.</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
