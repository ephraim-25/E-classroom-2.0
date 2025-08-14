import { BookDetail } from "@/components/library/book-detail"

interface BookPageProps {
  params: {
    id: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <BookDetail bookId={params.id} />
    </div>
  )
}

export const metadata = {
  title: "Détail du livre - E-Classroom",
  description: "Découvrez les détails de ce livre et achetez-le pour enrichir vos connaissances.",
}
