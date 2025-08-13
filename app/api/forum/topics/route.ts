import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock forum data
const mockTopics = [
  {
    id: "1",
    title: "Comment créer une stratégie de contenu efficace ?",
    content: "Bonjour à tous ! Je travaille actuellement sur la création d'une stratégie...",
    author: "Marie Dubois",
    authorId: "1",
    categoryId: "marketing",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T10:30:00Z",
    views: 156,
    replies: 23,
    likes: 15,
    dislikes: 2,
    isPinned: true,
    isLocked: false,
    tags: ["stratégie", "contenu", "marketing"],
    status: "published",
  },
  {
    id: "2",
    title: "Débuter avec React : par où commencer ?",
    content: "Salut ! Je suis complètement débutant en React et je ne sais pas par où commencer...",
    author: "Jean Dupont",
    authorId: "2",
    categoryId: "tech",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-20T09:15:00Z",
    views: 289,
    replies: 45,
    likes: 32,
    dislikes: 3,
    isPinned: false,
    isLocked: false,
    tags: ["react", "débutant", "javascript"],
    status: "published",
  },
]

// GET /api/forum/topics - Get forum topics with filtering and pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sort = searchParams.get("sort") || "recent" // recent, popular, replies

    let filteredTopics = [...mockTopics]

    // Filter by category
    if (category && category !== "all") {
      filteredTopics = filteredTopics.filter((topic) => topic.categoryId === category)
    }

    // Filter by search query
    if (search) {
      const searchLower = search.toLowerCase()
      filteredTopics = filteredTopics.filter(
        (topic) =>
          topic.title.toLowerCase().includes(searchLower) ||
          topic.content.toLowerCase().includes(searchLower) ||
          topic.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Sort topics
    switch (sort) {
      case "popular":
        filteredTopics.sort((a, b) => b.views - a.views)
        break
      case "replies":
        filteredTopics.sort((a, b) => b.replies - a.replies)
        break
      case "likes":
        filteredTopics.sort((a, b) => b.likes - a.likes)
        break
      default: // recent
        filteredTopics.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTopics = filteredTopics.slice(startIndex, endIndex)

    return NextResponse.json({
      topics: paginatedTopics,
      pagination: {
        page,
        limit,
        total: filteredTopics.length,
        totalPages: Math.ceil(filteredTopics.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching forum topics:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// POST /api/forum/topics - Create new forum topic
export async function POST(request: NextRequest) {
  try {
    const { title, content, categoryId, tags } = await request.json()
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key") as {
      userId: string
      userType: string
    }

    // Validate required fields
    if (!title || !content || !categoryId) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // Create new topic
    const newTopic = {
      id: `topic_${Date.now()}`,
      title,
      content,
      authorId: decoded.userId,
      author: "Utilisateur", // In real app, get from user data
      categoryId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
      replies: 0,
      likes: 0,
      dislikes: 0,
      isPinned: false,
      isLocked: false,
      tags: tags || [],
      status: "published",
    }

    // Save to database (mock)
    console.log("Creating new topic:", newTopic)

    return NextResponse.json({
      success: true,
      topic: newTopic,
      message: "Sujet créé avec succès",
    })
  } catch (error) {
    console.error("Error creating forum topic:", error)
    return NextResponse.json({ error: "Erreur lors de la création du sujet" }, { status: 500 })
  }
}
