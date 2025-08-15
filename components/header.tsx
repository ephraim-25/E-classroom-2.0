"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"
import Link from "next/link"
import { LanguageSelector } from "@/components/ui/language-selector"
import { useLanguage } from "@/contexts/language-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">E-Classroom</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.courses")}
            </Link>
            <Link href="/library" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.library")}
            </Link>
            <a href="#formations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.formations")}
            </a>
            <a href="#masterclass" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.masterclass")}
            </a>
            <a href="#partners" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.partners")}
            </a>
          </nav>

          {/* Desktop Auth Buttons & Language Selector */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link href="/auth/login">
              <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                {t("nav.login")}
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">{t("nav.register")}</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/courses" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.courses")}
              </Link>
              <Link href="/library" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.library")}
              </Link>
              <a href="#formations" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.formations")}
              </a>
              <a href="#masterclass" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.masterclass")}
              </a>
              <a href="#partners" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.partners")}
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Langue:</span>
                  <LanguageSelector />
                </div>
                <Link href="/auth/login">
                  <Button variant="ghost" className="text-blue-600 hover:text-blue-700 justify-start w-full">
                    {t("nav.login")}
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white justify-start w-full">
                    {t("nav.register")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
