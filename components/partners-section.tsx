const partners = [
  {
    name: "Université de Kinshasa",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Google for Education",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Microsoft Learn",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Coursera",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "edX",
    logo: "/placeholder.svg?height=60&width=120",
  },
  {
    name: "Udemy Business",
    logo: "/placeholder.svg?height=60&width=120",
  },
]

export function PartnersSection() {
  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">Nos partenaires de confiance</h2>
          <p className="text-xl text-gray-600">
            Nous collaborons avec les meilleures institutions et plateformes éducatives
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
