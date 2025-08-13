import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Mock replies data
const mockReplies = [
  {
    id: "1",
    topicId: "1",
    content: "Excellente question Marie ! Pour répondre à tes questions...",
    author: "Jean Dupont",
    authorId: "2",
    createdAt: "2024-01-15T11:15:00Z",
    updatedAt: "2024-01-15T11:15:00Z",
    likes: 8,
    dislikes: 0,
    isInstructor: false,
    parentReplyId: null,
  },
  {
    id: "2",
    topicId: "1",
    content: "Je rejoins Jean sur l'importance de la régularité !",
    author: "Sophie Martin",
    authorId: "3",
    createdAt: "2024-01-15T14:30:00Z",
    updatedAt: "2024-01-15T14:30:00Z",
    likes: 12,
    dislikes: 1,
    isInstructor: true,
    parentReplyId: null,
  },
]

// GET /api/forum/topics/[id]/replies - Get replies for a topic
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const topicId = params.id
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "20")

    // Filter replies by topic
    const topicReplies = mockReplies.filter((reply) => reply.topicId === topicId)

    // Sort by creation date
    topicReplies.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedReplies = topicReplies.slice(startIndex, endIndex)

    return NextResponse.json({
      replies: paginatedReplies,
      pagination: {
        page,
        limit,
        total: topicReplies.length,
        totalPages: Math.ceil(topicReplies.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching topic replies:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// POST /api/forum/topics/[id]/replies - Create new reply
export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const topicId = params.id
    const { content, parentReplyId } = await request.json()
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
    if (!content) {
      return NextResponse.json({ error: "Contenu requis" }, { status: 400 })
    }

    // Create new reply
    const newReply = {
      id: `reply_${Date.now()}`,
      topicId,
      content,
      authorId: decoded.userId,
      author: "Utilisateur", // In real app, get from user data
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
      isInstructor: decoded.userType === "instructor",
      parentReplyId: parentReplyId || null,
    }

    // Save to database (mock)
    console.log("Creating new reply:", newReply)

    // Update topic reply count (mock)
    console.log(`Incrementing reply count for topic ${topicId}`)

    return NextResponse.json({
      success: true,
      reply: newReply,
      message: "Réponse ajoutée avec succès",
    })
  } catch (error) {
    console.error("Error creating reply:", error)
    return NextResponse.json({ error: "Erreur lors de la création de la réponse" }, { status: 500 })
  }
}
