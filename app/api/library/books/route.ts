import { type NextRequest, NextResponse } from "next/server"

interface Book {
  id: string
  title: string
  author: string
  authorId: string
  authorAvatar: string
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
  status: "published" | "draft" | "pending"
  createdAt: string
  updatedAt: string
}

// Mock data - In production, this would come from a database
const mockBooks: Book[] = [
  {
    id: "1",
    title: "L'Art de l'Entrepreneuriat en Afrique",
    author: "Dr. Marie Kabila",
    authorId: "user_123",
    authorAvatar: "/placeholder.svg?height=80&width=80",
    description:
      "Un guide complet pour réussir en tant qu'entrepreneur en Afrique, avec des stratégies adaptées au contexte local.",
    fullDescription:
      "Ce livre révolutionnaire explore les défis uniques et les opportunités extraordinaires de l'entrepreneuriat en Afrique...",
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
      // ... more chapters
    ],
    preview:
      "L'Afrique représente aujourd'hui l'une des régions les plus dynamiques au monde en termes d'entrepreneuriat...",
    bestseller: true,
    featured: true,
    status: "published",
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  // ... more books
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search") || ""
    const category = searchParams.get("category") || "all"
    const language = searchParams.get("language") || "all"
    const format = searchParams.get("format") || "all"
    const sortBy = searchParams.get("sortBy") || "featured"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    // Filter books
    const filteredBooks = mockBooks.filter((book) => {
      const matchesSearch =
        search === "" ||
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase())

      const matchesCategory = category === "all" || book.category.toLowerCase() === category.toLowerCase()
      const matchesLanguage = language === "all" || book.language.toLowerCase() === language.toLowerCase()
      const matchesFormat = format === "all" || book.format.some((f) => f.toLowerCase() === format.toLowerCase())

      return matchesSearch && matchesCategory && matchesLanguage && matchesFormat && book.status === "published"
    })

    // Sort books
    filteredBooks.sort((a, b) => {
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

    // Paginate
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedBooks = filteredBooks.slice(startIndex, endIndex)

    return NextResponse.json({
      books: paginatedBooks,
      pagination: {
        page,
        limit,
        total: filteredBooks.length,
        totalPages: Math.ceil(filteredBooks.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching books:", error)
    return NextResponse.json({ error: "Erreur lors de la récupération des livres" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would typically require authentication
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "description", "price", "category", "language", "pages", "format"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Le champ ${field} est requis` }, { status: 400 })
      }
    }

    // Create new book (mock implementation)
    const newBook: Book = {
      id: `book_${Date.now()}`,
      ...body,
      authorId: "current_user_id", // Would come from authentication
      rating: 0,
      reviewCount: 0,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    // In production, save to database
    mockBooks.push(newBook)

    return NextResponse.json(
      {
        message: "Livre créé avec succès",
        book: newBook,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "Erreur lors de la création du livre" }, { status: 500 })
  }
}
