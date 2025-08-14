"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, BookOpen, ShoppingCart, Heart, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface BookDetailProps {
  bookId: string
}

interface Book {
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
  language: string
  pages: number
  publishedDate: string
  coverImage: string
  format: string[]
  tableOfContents: string[]
  preview: string
  bestseller?: boolean
  featured?: boolean
}

const mockBook: Book = {
  id: "1",
  title: "L'Art de l'Entrepreneuriat en Afrique",
  author: "Dr. Marie Kabila",
  authorAvatar: "/placeholder.svg?height=80&width=80",
  authorBio:
    "Dr. Marie Kabila est une entrepreneure et consultante en développement économique avec plus de 15 ans d'expérience en Afrique. Elle a fondé plusieurs entreprises prospères et accompagne aujourd'hui de nombreux entrepreneurs africains.",
  description:
    "Un guide complet pour réussir en tant qu'entrepreneur en Afrique, avec des stratégies adaptées au contexte local.",
  fullDescription:
    "Ce livre révolutionnaire explore les défis uniques et les opportunités extraordinaires de l'entrepreneuriat en Afrique. Dr. Marie Kabila partage son expertise approfondie et ses expériences personnelles pour guider les entrepreneurs africains vers le succès. À travers des études de cas réels, des stratégies pratiques et des conseils d'experts, ce livre devient un compagnon indispensable pour quiconque souhaite créer et développer une entreprise prospère sur le continent africain.",
  price: 25,
  originalPrice: 35,
  rating: 4.8,
  reviewCount: 124,
  category: "Entrepreneuriat",
  language: "Français",
  pages: 320,
  publishedDate: "2024-01-15",
  coverImage: "/placeholder.svg?height=400&width=300",
  format: ["PDF", "EPUB"],
  tableOfContents: [
    "Introduction : L'Afrique, terre d'opportunités",
    "Chapitre 1 : Comprendre l'écosystème entrepreneurial africain",
    "Chapitre 2 : Identifier les opportunités de marché",
    "Chapitre 3 : Financement et ressources disponibles",
    "Chapitre 4 : Construire une équipe solide",
    "Chapitre 5 : Marketing et communication adaptés",
    "Chapitre 6 : Défis réglementaires et solutions",
    "Chapitre 7 : Expansion et croissance durable",
    "Chapitre 8 : Études de cas de succès",
    "Conclusion : Votre parcours entrepreneurial commence maintenant",
  ],
  preview:
    "L'Afrique représente aujourd'hui l'une des régions les plus dynamiques au monde en termes d'entrepreneuriat. Avec une population jeune, des marchés en croissance rapide et une adoption technologique accélérée, le continent offre des opportunités sans précédent pour les entrepreneurs visionnaires...",
  bestseller: true,
  featured: true,
}

export function BookDetail({ bookId }: BookDetailProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBook(mockBook)
      setIsLoading(false)
    }, 1000)
  }, [bookId])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement du livre...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Livre non trouvé</h2>
          <p className="text-gray-600 mb-4">Le livre que vous recherchez n'existe pas.</p>
          <Link href="/library">
            <Button>Retour à la bibliothèque</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Book Cover and Purchase */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <Image
                    src={book.coverImage || "/placeholder.svg"}
                    alt={book.title}
                    width={300}
                    height={400}
                    className="w-full rounded-lg shadow-lg"
                  />
                  {book.bestseller && (
                    <Badge className="absolute top-2 left-2 bg-orange-500 hover:bg-orange-600">Bestseller</Badge>
                  )}
                  {book.featured && (
                    <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">Recommandé</Badge>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-3xl font-bold text-blue-600">${book.price}</span>
                      {book.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">${book.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Acheter maintenant
                  </Button>

                  <div className="flex flex-wrap gap-2">
                    {book.format.map((format) => (
                      <Badge key={format} variant="secondary">
                        {format}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Pages:</span>
                      <span>{book.pages}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Langue:</span>
                      <span>{book.language}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Publié:</span>
                      <span>{new Date(book.publishedDate).toLocaleDateString("fr-FR")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Catégorie:</span>
                      <span>{book.category}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{book.title}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-medium ml-1">{book.rating}</span>
                    <span className="text-gray-600 ml-2">({book.reviewCount} avis)</span>
                  </div>
                  <Badge variant="outline">{book.category}</Badge>
                </div>
                <p className="text-xl text-gray-600">{book.description}</p>
              </div>

              {/* Author */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={book.authorAvatar || "/placeholder.svg"} alt={book.author} />
                      <AvatarFallback>
                        {book.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{book.author}</h3>
                      <p className="text-gray-600">{book.authorBio}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs */}
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="contents">Table des matières</TabsTrigger>
                  <TabsTrigger value="preview">Aperçu</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">{book.fullDescription}</p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contents" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <ul className="space-y-3">
                        {book.tableOfContents.map((chapter, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <span className="text-blue-600 font-medium min-w-[2rem]">{index + 1}.</span>
                            <span className="text-gray-700">{chapter}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="preview" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <p className="text-gray-700 leading-relaxed mb-4">{book.preview}</p>
                      <p className="text-sm text-gray-500 italic">
                        Ceci est un aperçu du livre. Achetez le livre complet pour continuer la lecture.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
