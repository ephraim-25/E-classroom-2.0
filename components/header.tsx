"use client"

import { useState } from "react"
import { Menu, X, BookOpen } from "@/components/icons"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { LanguageSelector } from "@/components/language-selector"

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
            <Link href="/forum" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.forum")}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.about")}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("nav.contact")}
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              {t("auth.login")}
            </Link>
            <Link
              href="/auth/register"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t("auth.register")}
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
              <Link href="/forum" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.forum")}
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.about")}
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium">
                {t("nav.contact")}
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Link href="/auth/login" className="text-gray-700 hover:text-blue-600 font-medium px-2">
                  {t("auth.login")}
                </Link>
                <Link
                  href="/auth/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium mx-2 text-center"
                >
                  {t("auth.register")}
                </Link>
                <div className="px-2">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
