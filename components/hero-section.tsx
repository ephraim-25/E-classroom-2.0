"use client"

import { Button } from "@/components/ui/button"
import { Play, Star, Users, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-blue-900 leading-tight">{t("hero.title")}</h1>
              <p className="text-xl text-gray-600 leading-relaxed">{t("hero.subtitle")}</p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{t("stats.students")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{t("stats.courses")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">{t("stats.satisfaction")}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                {t("hero.cta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 bg-transparent"
              >
                <Play className="w-4 h-4 mr-2" />
                {t("hero.watch_demo")}
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-blue-100 rounded-2xl p-8 lg:p-12">
              <img
                src="/placeholder.svg?height=400&width=500"
                alt="E-Classroom Platform"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-gray-700">En direct</span>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">98%</div>
                <div className="text-xs text-gray-600">{t("hero.success_rate")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
