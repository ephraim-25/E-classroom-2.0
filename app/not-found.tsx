import { Button } from "@/components/ui/button"
import { Search, Home } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl font-bold text-blue-600 mb-4">404</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h1>

        <p className="text-gray-600 mb-8">Désolé, la page que vous recherchez n'existe pas ou a été déplacée.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Retour à l'accueil
            </Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/courses" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              Voir les cours
            </Link>
          </Button>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Pages populaires :</p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/courses" className="text-sm text-blue-600 hover:underline">
              Cours
            </Link>
            <Link href="/library" className="text-sm text-blue-600 hover:underline">
              Bibliothèque
            </Link>
            <Link href="/forum" className="text-sm text-blue-600 hover:underline">
              Forum
            </Link>
            <Link href="/about" className="text-sm text-blue-600 hover:underline">
              À propos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
