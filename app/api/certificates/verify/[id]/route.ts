import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const certificateId = params.id

    // Mock verification - in real app, check database
    const isValid = certificateId.startsWith("cert_")

    if (!isValid) {
      return NextResponse.json({
        isValid: false,
        message: "Certificate not found",
      })
    }

    // Mock certificate data
    const certificate = {
      id: certificateId,
      studentName: "Jean Dupont",
      courseName: "Introduction au Marketing Digital",
      instructorName: "Marie Dubois",
      completionDate: "2024-01-15",
      issueDate: "2024-01-15",
      institution: "E-Classroom",
    }

    return NextResponse.json({
      isValid: true,
      certificate,
    })
  } catch (error) {
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
