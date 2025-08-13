import { type NextRequest, NextResponse } from "next/server"

// POST /api/certificates/share - Generate shareable links and social media content
export async function POST(request: NextRequest) {
  try {
    const { certificateId, platform } = await request.json()

    if (!certificateId) {
      return NextResponse.json({ error: "ID du certificat requis" }, { status: 400 })
    }

    // Validate certificate exists
    const certificate = await findCertificateById(certificateId)
    if (!certificate) {
      return NextResponse.json({ error: "Certificat non trouvé" }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const certificateUrl = `${baseUrl}/certificates/${certificateId}`
    const verifyUrl = `${baseUrl}/verify/${certificateId}`

    // Generate platform-specific sharing content
    const sharingContent = generateSharingContent(certificate, certificateUrl, platform)

    // Track sharing analytics (mock)
    await trackSharingEvent(certificateId, platform)

    return NextResponse.json({
      success: true,
      certificate,
      urls: {
        certificate: certificateUrl,
        verify: verifyUrl,
        share: sharingContent.url,
      },
      content: sharingContent,
    })
  } catch (error) {
    console.error("Certificate sharing error:", error)
    return NextResponse.json({ error: "Erreur lors du partage" }, { status: 500 })
  }
}

function generateSharingContent(certificate: any, certificateUrl: string, platform?: string) {
  const baseText = `🎓 J'ai terminé avec succès le cours "${certificate.courseName}" sur E-Classroom ! Fier d'avoir acquis de nouvelles compétences.`

  const content = {
    text: baseText,
    url: certificateUrl,
    hashtags: ["EClassroom", "Formation", "Apprentissage", "Certificat"],
  }

  switch (platform) {
    case "linkedin":
      return {
        ...content,
        text: `${baseText}\n\n#Formation #DéveloppementProfessionnel #Apprentissage #EClassroom`,
        url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certificateUrl)}`,
      }

    case "twitter":
      return {
        ...content,
        text: `${baseText} ${content.hashtags.map((tag) => `#${tag}`).join(" ")}`,
        url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(content.text)}&url=${encodeURIComponent(certificateUrl)}`,
      }

    case "facebook":
      return {
        ...content,
        url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(certificateUrl)}`,
      }

    default:
      return content
  }
}

async function findCertificateById(certificateId: string) {
  // Mock certificate lookup
  return {
    id: certificateId,
    studentName: "Jean Dupont",
    courseName: "Introduction au Marketing Digital",
    instructorName: "Marie Dubois",
    status: "issued",
  }
}

async function trackSharingEvent(certificateId: string, platform?: string) {
  // Mock analytics tracking
  console.log(`Certificate ${certificateId} shared on ${platform || "unknown platform"}`)
}
