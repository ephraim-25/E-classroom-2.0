import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Award, Smartphone, Download, CreditCard } from "@/components/icons"

const features = [
  {
    id: "courses",
    icon: BookOpen,
    title: "Cours",
    description:
      "Accédez à une vaste bibliothèque de cours dans tous les domaines : éducation scolaire, universitaire, et développement professionnel.",
    items: ["Vidéos HD", "Documents PDF", "Quiz interactifs", "Suivi de progression"],
  },
  {
    id: "formations",
    icon: Users,
    title: "Formations",
    description:
      "Participez à des formations complètes avec accompagnement personnalisé et interaction directe avec les formateurs.",
    items: ["Sessions live", "Mentorat", "Projets pratiques", "Communauté d'apprenants"],
  },
  {
    id: "masterclass",
    icon: Award,
    title: "Masterclass",
    description:
      "Apprenez des meilleurs experts dans leur domaine à travers des masterclass exclusives et des sessions premium.",
    items: ["Experts reconnus", "Contenu exclusif", "Sessions Q&A", "Accès VIP"],
  },
  {
    id: "mobile",
    icon: Smartphone,
    title: "Mobile & Hors ligne",
    description:
      "Apprenez partout, même sans connexion internet grâce à notre application mobile avec téléchargement de contenu.",
    items: ["App mobile", "Mode hors ligne", "Synchronisation", "Notifications"],
  },
  {
    id: "certificates",
    icon: Download,
    title: "Certificats Vérifiables",
    description: "Obtenez des certificats officiels avec QR code pour prouver vos compétences auprès des employeurs.",
    items: ["QR code unique", "Vérification en ligne", "Format PDF", "Partage LinkedIn"],
  },
  {
    id: "payment",
    icon: CreditCard,
    title: "Paiement Flexible",
    description: "Payez facilement avec M-Pesa, Airtel Money, Orange Money ou carte bancaire selon vos préférences.",
    items: ["Mobile Money", "Cartes bancaires", "Paiement sécurisé", "Plans flexibles"],
  },
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">Tout ce dont vous avez besoin pour apprendre</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une plateforme complète qui s'adapte à tous les styles d'apprentissage et tous les niveaux
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.id} className="border-blue-100 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-blue-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                  <ul className="space-y-2">
                    {feature.items.map((item, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
