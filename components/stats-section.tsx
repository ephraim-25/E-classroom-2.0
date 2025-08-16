import { TrendingUp, Users, Award, Globe } from "@/components/icons"

const stats = [
  {
    icon: Users,
    value: "10,000+",
    label: "Étudiants actifs",
    description: "Apprenants de tous horizons",
  },
  {
    icon: Award,
    value: "500+",
    label: "Cours disponibles",
    description: "Dans tous les domaines",
  },
  {
    icon: TrendingUp,
    value: "98%",
    label: "Taux de satisfaction",
    description: "Étudiants satisfaits",
  },
  {
    icon: Globe,
    value: "25+",
    label: "Pays couverts",
    description: "Présence internationale",
  },
]

export function StatsSection() {
  return (
    <section className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-900">E-Classroom en chiffres</h2>
          <p className="text-xl text-gray-600">La confiance de milliers d'apprenants à travers le monde</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-blue-900">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-800">{stat.label}</div>
                  <div className="text-sm text-gray-600">{stat.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
