import { type NextRequest, NextResponse } from "next/server"

// Mock courses database - replace with actual database
const mockCourses = [
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
    isPublished: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
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
    isPublished: true,
    createdAt: "2024-01-01T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
  },
  // Add more courses...
]

// GET /api/courses - Get all courses with filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const level = searchParams.get("level")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy") || "popular"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "12")

    let filteredCourses = mockCourses.filter((course) => course.isPublished)

    // Apply filters
    if (category && category !== "all") {
      filteredCourses = filteredCourses.filter((course) => course.category === category)
    }

    if (level && level !== "all") {
      filteredCourses = filteredCourses.filter((course) => course.level === level)
    }

    if (search) {
      const searchLower = search.toLowerCase()
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(searchLower) ||
          course.description.toLowerCase().includes(searchLower) ||
          course.instructor.toLowerCase().includes(searchLower) ||
          course.tags.some((tag) => tag.toLowerCase().includes(searchLower)),
      )
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        filteredCourses.sort((a, b) => b.studentsCount - a.studentsCount)
        break
      case "rating":
        filteredCourses.sort((a, b) => b.rating - a.rating)
        break
      case "price-low":
        filteredCourses.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filteredCourses.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filteredCourses.sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
        break
    }

    // Apply pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCourses = filteredCourses.slice(startIndex, endIndex)

    return NextResponse.json({
      courses: paginatedCourses,
      pagination: {
        page,
        limit,
        total: filteredCourses.length,
        totalPages: Math.ceil(filteredCourses.length / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching courses:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// POST /api/courses - Create new course (instructor only)
export async function POST(request: NextRequest) {
  try {
    const courseData = await request.json()

    // In real app, verify instructor authentication and authorization
    // const token = request.headers.get("authorization")?.replace("Bearer ", "")
    // const user = await verifyToken(token)
    // if (user.userType !== "instructor") return unauthorized

    const newCourse = {
      id: (mockCourses.length + 1).toString(),
      ...courseData,
      studentsCount: 0,
      rating: 0,
      reviewsCount: 0,
      isPublished: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    mockCourses.push(newCourse)

    return NextResponse.json({ course: newCourse }, { status: 201 })
  } catch (error) {
    console.error("Error creating course:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
