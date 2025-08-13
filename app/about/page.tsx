import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, Target, Heart, Globe } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "À propos | E-Classroom - Plateforme d'éducation en ligne en RDC",
  description:
    "Découvrez E-Classroom, la première plateforme d'éducation en ligne en République Démocratique du Congo. Formation pour étudiants, entrepreneurs et professionnels.",
  keywords:
    "éducation RDC, formation en ligne Congo, e-learning Kinshasa, cours en ligne RDC, formation professionnelle Congo",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Notre <span className="text-blue-600">Mission</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            E-Classroom révolutionne l'éducation en République Démocratique du Congo en rendant l'apprentissage de
            qualité accessible à tous, partout et à tout moment.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/courses">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="mr-2 h-5 w-5" />
                Découvrir nos cours
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Vision</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Créer un écosystème éducatif numérique qui transforme la RDC en hub d'innovation et de compétences pour
              l'Afrique.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Accessibilité</h3>
                <p className="text-gray-600">
                  Rendre l'éducation de qualité accessible à tous les Congolais, quel que soit leur lieu de résidence ou
                  leur situation économique.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Communauté</h3>
                <p className="text-gray-600">
                  Créer une communauté d'apprenants et de formateurs qui s'entraident et partagent leurs connaissances.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-0 shadow-lg">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                <p className="text-gray-600">
                  Maintenir les plus hauts standards de qualité dans nos contenus et notre accompagnement pédagogique.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Notre Histoire</h2>
          </div>

          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="text-lg leading-relaxed mb-6">
              E-Classroom est née d'un constat simple : la RDC regorge de talents exceptionnels, mais l'accès à une
              éducation de qualité reste un défi majeur. Trop de jeunes Congolais voient leurs rêves limités par le
              manque d'opportunités d'apprentissage.
            </p>

            <p className="text-lg leading-relaxed mb-6">
              Fondée en 2024, notre plateforme s'appuie sur les dernières technologies pour démocratiser l'accès à
              l'éducation. Nous collaborons avec des experts locaux et internationaux pour proposer des formations
              adaptées aux réalités et aux besoins du marché congolais.
            </p>

            <p className="text-lg leading-relaxed">
              Aujourd'hui, E-Classroom accompagne des milliers d'étudiants, entrepreneurs et professionnels dans leur
              parcours d'apprentissage, contribuant ainsi au développement économique et social de la RDC.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nos Valeurs</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Passion</h3>
              <p className="text-gray-600">
                Nous sommes passionnés par l'éducation et le développement du potentiel humain.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-gray-600">
                Nous adoptons les meilleures pratiques technologiques pour améliorer l'apprentissage.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Inclusion</h3>
              <p className="text-gray-600">Nous croyons que chacun mérite l'accès à une éducation de qualité.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Rejoignez la Révolution Éducative</h2>
          <p className="text-xl mb-8 opacity-90">
            Que vous soyez étudiant, entrepreneur ou professionnel, E-Classroom a les ressources pour vous faire
            progresser.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary">
                Créer un compte gratuit
              </Button>
            </Link>
            <Link href="/courses">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Explorer les cours
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
