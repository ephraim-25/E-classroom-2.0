import { type NextRequest, NextResponse } from "next/server"

// Mock transactions database
const mockTransactions = [
  {
    id: "CARD-1705123456789-abc123",
    courseId: "1",
    courseName: "Introduction au Marketing Digital",
    userId: "1",
    amount: 79,
    paymentMethod: "card",
    status: "completed",
    timestamp: "2024-01-20T10:30:00.000Z",
    providerTransactionId: "CARD_1705123456789",
  },
  {
    id: "MPESA-1705123456790-def456",
    courseId: "2",
    courseName: "Développement Web avec React",
    userId: "1",
    amount: 99,
    paymentMethod: "mpesa",
    status: "completed",
    timestamp: "2024-01-19T14:20:00.000Z",
    providerTransactionId: "MPESA_1705123456790",
  },
  {
    id: "AIRTEL-1705123456791-ghi789",
    courseId: "3",
    courseName: "Design Graphique",
    userId: "1",
    amount: 89,
    paymentMethod: "airtel",
    status: "pending",
    timestamp: "2024-01-20T16:45:00.000Z",
    providerTransactionId: "AIRTEL_1705123456791",
  },
]

// GET /api/payments/transactions - Get user's transaction history
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Token d'authentification requis" }, { status: 401 })
    }

    if (!token.startsWith("token_")) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 })
    }

    const [, tokenUserId, userType] = token.split("_")

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")

    // Filter transactions by user
    let userTransactions = mockTransactions.filter((t) => t.userId === tokenUserId)

    // Filter by status if provided
    if (status && status !== "all") {
      userTransactions = userTransactions.filter((t) => t.status === status)
    }

    // Sort by timestamp (newest first)
    userTransactions.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedTransactions = userTransactions.slice(startIndex, endIndex)

    return NextResponse.json({
      transactions: paginatedTransactions,
      pagination: {
        page,
        limit,
        total: userTransactions.length,
        totalPages: Math.ceil(userTransactions.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
