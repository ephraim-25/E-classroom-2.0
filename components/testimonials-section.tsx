import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "@/components/icons"

const testimonials = [
  {
    name: "Marie Dubois",
    role: "Étudiante en Marketing",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "E-Classroom a transformé ma façon d'apprendre. Les cours sont de qualité exceptionnelle et les certificats m'ont aidée à décrocher mon stage.",
    rating: 5,
  },
  {
    name: "Jean-Paul Kamau",
    role: "Entrepreneur",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Grâce aux masterclass d'entrepreneuriat, j'ai pu lancer ma startup avec succès. Le contenu est pratique et directement applicable.",
    rating: 5,
  },
  {
    name: "Fatima Al-Rashid",
    role: "Développeuse Web",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "La flexibilité de pouvoir apprendre hors ligne est parfaite pour mon emploi du temps chargé. Les formations techniques sont excellentes.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">Ce que disent nos étudiants</h2>
          <p className="text-xl text-gray-600">Des milliers d'apprenants nous font confiance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-blue-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="w-8 h-8 text-blue-200 absolute -top-2 -left-2" />
                  <p className="text-gray-700 italic pl-6">{testimonial.content}</p>
                </div>

                <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-blue-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
