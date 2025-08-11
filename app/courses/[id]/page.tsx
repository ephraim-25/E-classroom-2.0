import { CourseDetail } from "@/components/courses/course-detail"

interface CourseDetailPageProps {
  params: {
    id: string
  }
}

export default function CourseDetailPage({ params }: CourseDetailPageProps) {
  return <CourseDetail courseId={params.id} />
}
