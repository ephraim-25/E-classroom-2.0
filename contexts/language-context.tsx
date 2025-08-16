"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Traductions
const translations = {
  fr: {
    // Navigation
    "nav.home": "Accueil",
    "nav.courses": "Cours",
    "nav.library": "Bibliothèque",
    "nav.forum": "Forum",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.dashboard": "Tableau de bord",
    "nav.logout": "Déconnexion",

    // Hero Section
    "hero.title": "Apprenez sans limites avec E-Classroom",
    "hero.subtitle":
      "Accédez à des milliers de cours, formations et masterclass dispensés par des experts reconnus. Obtenez vos certificats et développez vos compétences à votre rythme.",
    "hero.cta": "Commencer maintenant",
    "hero.watch_demo": "Voir la démo",
    "hero.success_rate": "Taux de réussite",

    // Features
    "features.courses.title": "Cours",
    "features.courses.description": "Accédez à une vaste bibliothèque de cours dans tous les domaines",
    "features.formations.title": "Formations",
    "features.formations.description": "Formations complètes avec accompagnement personnalisé",
    "features.masterclass.title": "Masterclass",
    "features.masterclass.description": "Apprenez directement auprès d'experts reconnus",
    "features.mobile.title": "Mobile & Hors ligne",
    "features.mobile.description": "Apprenez partout, même sans connexion internet",
    "features.certificates.title": "Certificats Vérifiables",
    "features.certificates.description": "Obtenez des certificats reconnus avec QR code de vérification",
    "features.payment.title": "Paiement Flexible",
    "features.payment.description": "Payez avec Mobile Money, cartes bancaires ou PayPal",

    // Stats
    "stats.students": "Étudiants actifs",
    "stats.courses": "Cours disponibles",
    "stats.satisfaction": "Taux de satisfaction",
    "stats.countries": "Pays couverts",

    // Auth
    "auth.login.title": "Connexion à E-Classroom",
    "auth.login.subtitle": "Connectez-vous pour accéder à vos cours",
    "auth.register.title": "Créer un compte E-Classroom",
    "auth.register.subtitle": "Rejoignez notre communauté d'apprenants",
    "auth.email": "Adresse e-mail",
    "auth.phone": "Numéro de téléphone",
    "auth.password": "Mot de passe",
    "auth.confirm_password": "Confirmer le mot de passe",
    "auth.full_name": "Nom complet",
    "auth.user_type": "Type d'utilisateur",
    "auth.student": "Étudiant",
    "auth.instructor": "Formateur",
    "auth.admin": "Administrateur",
    "auth.login_button": "Se connecter",
    "auth.register_button": "S'inscrire",
    "auth.forgot_password": "Mot de passe oublié ?",
    "auth.no_account": "Pas de compte ?",
    "auth.have_account": "Déjà un compte ?",

    // Dashboard
    "dashboard.welcome": "Bienvenue",
    "dashboard.overview": "Aperçu",
    "dashboard.my_courses": "Mes cours",
    "dashboard.progress": "Progression",
    "dashboard.certificates": "Certificats",
    "dashboard.settings": "Paramètres",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.edit": "Modifier",
    "common.delete": "Supprimer",
    "common.view": "Voir",
    "common.download": "Télécharger",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.all": "Tous",
    "common.price": "Prix",
    "common.free": "Gratuit",
    "common.duration": "Durée",
    "common.level": "Niveau",
    "common.beginner": "Débutant",
    "common.intermediate": "Intermédiaire",
    "common.advanced": "Avancé",
  },
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.courses": "Courses",
    "nav.library": "Library",
    "nav.forum": "Forum",
    "nav.about": "About",
    "nav.contact": "Contact",
    "nav.login": "Login",
    "nav.register": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Logout",

    // Hero Section
    "hero.title": "Learn without limits with E-Classroom",
    "hero.subtitle":
      "Access thousands of courses, training programs and masterclasses taught by recognized experts. Get your certificates and develop your skills at your own pace.",
    "hero.cta": "Get Started",
    "hero.watch_demo": "Watch Demo",
    "hero.success_rate": "Success Rate",

    // Features
    "features.courses.title": "Courses",
    "features.courses.description": "Access a vast library of courses in all fields",
    "features.formations.title": "Training Programs",
    "features.formations.description": "Complete training programs with personalized support",
    "features.masterclass.title": "Masterclass",
    "features.masterclass.description": "Learn directly from recognized experts",
    "features.mobile.title": "Mobile & Offline",
    "features.mobile.description": "Learn anywhere, even without internet connection",
    "features.certificates.title": "Verifiable Certificates",
    "features.certificates.description": "Get recognized certificates with QR code verification",
    "features.payment.title": "Flexible Payment",
    "features.payment.description": "Pay with Mobile Money, bank cards or PayPal",

    // Stats
    "stats.students": "Active Students",
    "stats.courses": "Available Courses",
    "stats.satisfaction": "Satisfaction Rate",
    "stats.countries": "Countries Covered",

    // Auth
    "auth.login.title": "Login to E-Classroom",
    "auth.login.subtitle": "Sign in to access your courses",
    "auth.register.title": "Create E-Classroom Account",
    "auth.register.subtitle": "Join our learning community",
    "auth.email": "Email Address",
    "auth.phone": "Phone Number",
    "auth.password": "Password",
    "auth.confirm_password": "Confirm Password",
    "auth.full_name": "Full Name",
    "auth.user_type": "User Type",
    "auth.student": "Student",
    "auth.instructor": "Instructor",
    "auth.admin": "Administrator",
    "auth.login_button": "Sign In",
    "auth.register_button": "Sign Up",
    "auth.forgot_password": "Forgot Password?",
    "auth.no_account": "No account?",
    "auth.have_account": "Already have an account?",

    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Overview",
    "dashboard.my_courses": "My Courses",
    "dashboard.progress": "Progress",
    "dashboard.certificates": "Certificates",
    "dashboard.settings": "Settings",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.edit": "Edit",
    "common.delete": "Delete",
    "common.view": "View",
    "common.download": "Download",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",
    "common.price": "Price",
    "common.free": "Free",
    "common.duration": "Duration",
    "common.level": "Level",
    "common.beginner": "Beginner",
    "common.intermediate": "Intermediate",
    "common.advanced": "Advanced",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  useEffect(() => {
    const savedLanguage = localStorage.getItem("e-classroom-language") as Language
    if (savedLanguage && (savedLanguage === "fr" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("e-classroom-language", lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
