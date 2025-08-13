import { type NextRequest, NextResponse } from "next/server"

// Mock course data - replace with actual database
const mockCourseDetail = {
  id: "1",
  title: "Introduction au Marketing Digital",
  description:
    "Apprenez les bases du marketing digital et développez votre présence en ligne avec des stratégies éprouvées.",
  longDescription:
    "Dans ce cours complet, vous découvrirez les fondamentaux du marketing digital qui transformeront votre approche de la promotion en ligne. Nous couvrirons les réseaux sociaux, le SEO, la publicité payante, l'email marketing, et bien plus encore.",
  instructor: {
    name: "Marie Dubois",
    avatar: "/placeholder.svg?height=80&width=80",
    bio: "Experte en marketing digital avec plus de 10 ans d'expérience.",
    rating: 4.9,
    studentsCount: 15420,
    coursesCount: 8,
  },
  category: "Marketing",
  subcategory: "Digital Marketing",
  duration: "8h 30min",
  studentsCount: 1247,
  rating: 4.8,
  reviewsCount: 156,
  price: 79,
  originalPrice: 129,
  isFree: false,
  level: "Débutant",
  thumbnail: "/placeholder.svg?height=400&width=600",
  tags: ["Marketing", "Digital", "Réseaux sociaux", "SEO", "Publicité"],
  language: "Français",
  lastUpdated: "2024-01-15",
  certificateIncluded: true,
  requirements: [
    "Aucune expérience préalable requise",
    "Accès à un ordinateur et à internet",
    "Motivation pour apprendre et pratiquer",
  ],
  whatYouWillLearn: [
    "Créer une stratégie de marketing digital complète",
    "Optimiser votre présence sur les réseaux sociaux",
    "Comprendre et appliquer les bases du SEO",
    "Créer des campagnes publicitaires efficaces",
    "Analyser et mesurer vos performances marketing",
    "Développer une identité de marque forte en ligne",
  ],
  curriculum: [
    {
      title: "Introduction au Marketing Digital",
      duration: "45min",
      lessons: [
        {
          id: "lesson-1",
          title: "Qu'est-ce que le marketing digital ?",
          duration: "12min",
          isPreview: true,
          videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          videoType: "youtube",
        },
        {
          id: "lesson-2",
          title: "Les différents canaux digitaux",
          duration: "15min",
          isPreview: false,
          videoUrl: "https://vimeo.com/123456789",
          videoType: "vimeo",
        },
      ],
    },
  ],
  reviews: [
    {
      id: "1",
      user: "Jean Dupont",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      date: "2024-01-10",
      comment: "Excellent cours ! Marie explique très clairement et les exemples pratiques sont très utiles.",
    },
  ],
}

// GET /api/courses/[id] - Get course details
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id

    // In real app, fetch from database
    if (courseId === "1") {
      return NextResponse.json({ course: mockCourseDetail })
    }

    return NextResponse.json({ error: "Cours non trouvé" }, { status: 404 })
  } catch (error) {
    console.error("Error fetching course:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// PUT /api/courses/[id] - Update course (instructor only)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id
    const updateData = await request.json()

    // In real app, verify instructor owns this course
    // const token = request.headers.get("authorization")?.replace("Bearer ", "")
    // const user = await verifyToken(token)
    // const course = await getCourse(courseId)
    // if (course.instructorId !== user.id) return unauthorized

    // Update course in database
    const updatedCourse = {
      ...mockCourseDetail,
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ course: updatedCourse })
  } catch (error) {
    console.error("Error updating course:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}

// DELETE /api/courses/[id] - Delete course (instructor only)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const courseId = params.id

    // In real app, verify instructor owns this course
    // const token = request.headers.get("authorization")?.replace("Bearer ", "")
    // const user = await verifyToken(token)
    // const course = await getCourse(courseId)
    // if (course.instructorId !== user.id) return unauthorized

    // Delete course from database
    console.log("Deleting course:", courseId)

    return NextResponse.json({ message: "Cours supprimé avec succès" })
  } catch (error) {
    console.error("Error deleting course:", error)
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 })
  }
}
