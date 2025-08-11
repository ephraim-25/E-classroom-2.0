import { CoursePlayer } from "@/components/courses/course-player"

interface CoursePlayerPageProps {
  params: {
    id: string
  }
  searchParams: {
    lesson?: string
  }
}

export default function CoursePlayerPage({ params, searchParams }: CoursePlayerPageProps) {
  return <CoursePlayer courseId={params.id} currentLessonId={searchParams.lesson} />
}
