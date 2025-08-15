import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookDetail } from "@/components/library/book-detail"

interface BookPageProps {
  params: {
    id: string
  }
}

export default function BookPage({ params }: BookPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <BookDetail bookId={params.id} />
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Livre - E-Classroom",
  description: "Détails du livre et informations sur l'auteur. Achetez et téléchargez instantanément.",
}
