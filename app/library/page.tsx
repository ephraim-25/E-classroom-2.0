import { LibraryCatalog } from "@/components/library/library-catalog"

export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <LibraryCatalog />
    </div>
  )
}

export const metadata = {
  title: "Bibliothèque - E-Classroom",
  description:
    "Découvrez notre collection de livres écrits par nos formateurs experts. Achetez et téléchargez des livres sur l'entrepreneuriat, le leadership, la technologie et plus encore.",
}
