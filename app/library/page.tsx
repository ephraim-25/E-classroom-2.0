import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LibraryCatalog } from "@/components/library/library-catalog"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="py-8">
        <LibraryCatalog />
      </main>
      <Footer />
    </div>
  )
}

export const metadata = {
  title: "Bibliothèque - E-Classroom",
  description:
    "Découvrez et achetez des livres écrits par nos formateurs experts. Une collection unique de ressources éducatives pour approfondir vos connaissances.",
  keywords: "livres, bibliothèque, formation, éducation, RDC, Congo, apprentissage, formateurs",
}
