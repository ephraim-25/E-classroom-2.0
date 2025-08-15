"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "fr" | "en" | "sw" | "ln"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionaries
const translations = {
  fr: {
    // Navigation
    "nav.courses": "Cours",
    "nav.library": "Bibliothèque",
    "nav.formations": "Formations",
    "nav.masterclass": "Masterclass",
    "nav.partners": "Partenaires",
    "nav.login": "Connexion",
    "nav.register": "S'inscrire",
    "nav.dashboard": "Tableau de bord",
    "nav.logout": "Déconnexion",

    // Common
    "common.loading": "Chargement...",
    "common.error": "Erreur",
    "common.success": "Succès",
    "common.cancel": "Annuler",
    "common.save": "Enregistrer",
    "common.delete": "Supprimer",
    "common.edit": "Modifier",
    "common.view": "Voir",
    "common.back": "Retour",
    "common.next": "Suivant",
    "common.previous": "Précédent",
    "common.search": "Rechercher",
    "common.filter": "Filtrer",
    "common.all": "Tous",
    "common.free": "Gratuit",
    "common.price": "Prix",
    "common.duration": "Durée",
    "common.level": "Niveau",
    "common.beginner": "Débutant",
    "common.intermediate": "Intermédiaire",
    "common.advanced": "Avancé",

    // Hero Section
    "hero.title": "Transformez votre avenir avec l'éducation en ligne",
    "hero.subtitle":
      "Accédez à des cours de qualité, obtenez des certificats vérifiables et développez vos compétences avec les meilleurs formateurs d'Afrique.",
    "hero.cta.courses": "Explorer les cours",
    "hero.cta.register": "Commencer gratuitement",

    // Features
    "features.title": "Tout ce dont vous avez besoin pour apprendre",
    "features.subtitle": "Une plateforme complète qui s'adapte à tous les styles d'apprentissage et tous les niveaux",

    // Footer
    "footer.description":
      "La plateforme d'éducation en ligne qui transforme votre apprentissage avec des cours de qualité et des certificats vérifiables.",
    "footer.quickLinks": "Liens rapides",
    "footer.support": "Support",
    "footer.contact": "Contact",
    "footer.about": "À propos",
    "footer.faq": "FAQ & Support",
    "footer.contactUs": "Nous contacter",
    "footer.privacy": "Politique de confidentialité",
    "footer.terms": "Conditions d'utilisation",
    "footer.rights": "Tous droits réservés. Plateforme d'éducation en ligne de nouvelle génération.",

    // Course related
    "course.students": "étudiants",
    "course.lessons": "leçons",
    "course.hours": "heures",
    "course.certificate": "Certificat inclus",
    "course.enroll": "S'inscrire",
    "course.buy": "Acheter maintenant",
    "course.continue": "Continuer le cours",
    "course.completed": "Terminé",
    "course.inProgress": "En cours",

    // Payment
    "payment.method": "Méthode de paiement",
    "payment.card": "Carte bancaire",
    "payment.total": "Total",
    "payment.processing": "Traitement en cours...",
    "payment.success": "Paiement réussi !",
    "payment.failed": "Paiement échoué",

    // Dashboard
    "dashboard.welcome": "Bienvenue",
    "dashboard.overview": "Aperçu",
    "dashboard.courses": "Mes cours",
    "dashboard.progress": "Progression",
    "dashboard.certificates": "Certificats",
    "dashboard.settings": "Paramètres",
  },
  en: {
    // Navigation
    "nav.courses": "Courses",
    "nav.library": "Library",
    "nav.formations": "Training",
    "nav.masterclass": "Masterclass",
    "nav.partners": "Partners",
    "nav.login": "Login",
    "nav.register": "Sign Up",
    "nav.dashboard": "Dashboard",
    "nav.logout": "Logout",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.save": "Save",
    "common.delete": "Delete",
    "common.edit": "Edit",
    "common.view": "View",
    "common.back": "Back",
    "common.next": "Next",
    "common.previous": "Previous",
    "common.search": "Search",
    "common.filter": "Filter",
    "common.all": "All",
    "common.free": "Free",
    "common.price": "Price",
    "common.duration": "Duration",
    "common.level": "Level",
    "common.beginner": "Beginner",
    "common.intermediate": "Intermediate",
    "common.advanced": "Advanced",

    // Hero Section
    "hero.title": "Transform your future with online education",
    "hero.subtitle":
      "Access quality courses, get verifiable certificates and develop your skills with the best trainers in Africa.",
    "hero.cta.courses": "Explore courses",
    "hero.cta.register": "Start for free",

    // Features
    "features.title": "Everything you need to learn",
    "features.subtitle": "A complete platform that adapts to all learning styles and levels",

    // Footer
    "footer.description":
      "The online education platform that transforms your learning with quality courses and verifiable certificates.",
    "footer.quickLinks": "Quick Links",
    "footer.support": "Support",
    "footer.contact": "Contact",
    "footer.about": "About",
    "footer.faq": "FAQ & Support",
    "footer.contactUs": "Contact us",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms of Service",
    "footer.rights": "All rights reserved. Next-generation online education platform.",

    // Course related
    "course.students": "students",
    "course.lessons": "lessons",
    "course.hours": "hours",
    "course.certificate": "Certificate included",
    "course.enroll": "Enroll",
    "course.buy": "Buy now",
    "course.continue": "Continue course",
    "course.completed": "Completed",
    "course.inProgress": "In progress",

    // Payment
    "payment.method": "Payment method",
    "payment.card": "Credit card",
    "payment.total": "Total",
    "payment.processing": "Processing...",
    "payment.success": "Payment successful!",
    "payment.failed": "Payment failed",

    // Dashboard
    "dashboard.welcome": "Welcome",
    "dashboard.overview": "Overview",
    "dashboard.courses": "My courses",
    "dashboard.progress": "Progress",
    "dashboard.certificates": "Certificates",
    "dashboard.settings": "Settings",
  },
  sw: {
    // Navigation
    "nav.courses": "Masomo",
    "nav.library": "Maktaba",
    "nav.formations": "Mafunzo",
    "nav.masterclass": "Darasa Kuu",
    "nav.partners": "Washirika",
    "nav.login": "Ingia",
    "nav.register": "Jisajili",
    "nav.dashboard": "Dashibodi",
    "nav.logout": "Toka",

    // Common
    "common.loading": "Inapakia...",
    "common.error": "Kosa",
    "common.success": "Mafanikio",
    "common.cancel": "Ghairi",
    "common.save": "Hifadhi",
    "common.delete": "Futa",
    "common.edit": "Hariri",
    "common.view": "Ona",
    "common.back": "Rudi",
    "common.next": "Ifuatayo",
    "common.previous": "Iliyotangulia",
    "common.search": "Tafuta",
    "common.filter": "Chuja",
    "common.all": "Yote",
    "common.free": "Bure",
    "common.price": "Bei",
    "common.duration": "Muda",
    "common.level": "Kiwango",
    "common.beginner": "Mwanzo",
    "common.intermediate": "Kati",
    "common.advanced": "Juu",

    // Hero Section
    "hero.title": "Badilisha mustakabali wako kwa elimu ya mtandaoni",
    "hero.subtitle":
      "Pata masomo ya ubora, pokea vyeti vinavyoweza kuthibitishwa na ukuze ujuzi wako na wakufunzi bora wa Afrika.",
    "hero.cta.courses": "Chunguza masomo",
    "hero.cta.register": "Anza bure",

    // Features
    "features.title": "Kila kitu unachohitaji kujifunza",
    "features.subtitle": "Jukwaa kamili linalojirekebisha kwa mitindo yote ya kujifunza na viwango vyote",

    // Footer
    "footer.description":
      "Jukwaa la elimu ya mtandaoni linaloubadilisha ujifunzaji wako kwa masomo ya ubora na vyeti vinavyoweza kuthibitishwa.",
    "footer.quickLinks": "Viungo vya Haraka",
    "footer.support": "Msaada",
    "footer.contact": "Mawasiliano",
    "footer.about": "Kuhusu",
    "footer.faq": "Maswali & Msaada",
    "footer.contactUs": "Wasiliana nasi",
    "footer.privacy": "Sera ya Faragha",
    "footer.terms": "Masharti ya Matumizi",
    "footer.rights": "Haki zote zimehifadhiwa. Jukwaa la elimu ya mtandaoni la kizazi kipya.",

    // Course related
    "course.students": "wanafunzi",
    "course.lessons": "masomo",
    "course.hours": "masaa",
    "course.certificate": "Cheti limejumuishwa",
    "course.enroll": "Jisajili",
    "course.buy": "Nunua sasa",
    "course.continue": "Endelea na darasa",
    "course.completed": "Imekamilika",
    "course.inProgress": "Inaendelea",

    // Payment
    "payment.method": "Njia ya malipo",
    "payment.card": "Kadi ya benki",
    "payment.total": "Jumla",
    "payment.processing": "Inachakatwa...",
    "payment.success": "Malipo yamefanikiwa!",
    "payment.failed": "Malipo yameshindwa",

    // Dashboard
    "dashboard.welcome": "Karibu",
    "dashboard.overview": "Muhtasari",
    "dashboard.courses": "Masomo yangu",
    "dashboard.progress": "Maendeleo",
    "dashboard.certificates": "Vyeti",
    "dashboard.settings": "Mipangilio",
  },
  ln: {
    // Navigation
    "nav.courses": "Mateya",
    "nav.library": "Bibliothèque",
    "nav.formations": "Mateya",
    "nav.masterclass": "Kelasi ya Monene",
    "nav.partners": "Baninga",
    "nav.login": "Kokota",
    "nav.register": "Komikoma",
    "nav.dashboard": "Tableau ya Mosala",
    "nav.logout": "Kobima",

    // Common
    "common.loading": "Ezali kozonga...",
    "common.error": "Libunga",
    "common.success": "Elongi",
    "common.cancel": "Kotika",
    "common.save": "Kobomba",
    "common.delete": "Kolongola",
    "common.edit": "Kobongola",
    "common.view": "Kotala",
    "common.back": "Kozonga",
    "common.next": "Oyo ekolanda",
    "common.previous": "Oyo eleki",
    "common.search": "Koluka",
    "common.filter": "Kopona",
    "common.all": "Nyonso",
    "common.free": "Ya ofele",
    "common.price": "Ntalo",
    "common.duration": "Ntango",
    "common.level": "Nivo",
    "common.beginner": "Mobandi",
    "common.intermediate": "Ya kati",
    "common.advanced": "Ya likolo",

    // Hero Section
    "hero.title": "Bobongola mikolo na yo na mateya ya internet",
    "hero.subtitle":
      "Zwa mateya ya malamu, zwa ba certificats oyo ekoki kotalama mpe kolendisa mayele na yo na ba formateurs ya malamu ya Afrika.",
    "hero.cta.courses": "Kotala mateya",
    "hero.cta.register": "Kobanda ya ofele",

    // Features
    "features.title": "Nyonso oyo osengeli mpo na koyekola",
    "features.subtitle": "Plateforme mobimba oyo ekokani na ba styles nyonso ya koyekola mpe ba niveaux nyonso",

    // Footer
    "footer.description":
      "Plateforme ya mateya ya internet oyo ebongolaka boyekoli na yo na mateya ya malamu mpe ba certificats oyo ekoki kotalama.",
    "footer.quickLinks": "Ba liens ya nokinoki",
    "footer.support": "Lisungi",
    "footer.contact": "Contact",
    "footer.about": "Na tina na",
    "footer.faq": "Mituna & Lisungi",
    "footer.contactUs": "Kosolola na biso",
    "footer.privacy": "Politique ya kobomba",
    "footer.terms": "Mibeko ya kosalela",
    "footer.rights": "Makoki nyonso ebombami. Plateforme ya mateya ya internet ya ekeke ya sika.",

    // Course related
    "course.students": "bayekoli",
    "course.lessons": "mateya",
    "course.hours": "bangonga",
    "course.certificate": "Certificat ezali",
    "course.enroll": "Komikoma",
    "course.buy": "Kosomba sikawa",
    "course.continue": "Kokoba kelasi",
    "course.completed": "Esilisi",
    "course.inProgress": "Ezali kokende",

    // Payment
    "payment.method": "Lolenge ya kofuta",
    "payment.card": "Karte ya banque",
    "payment.total": "Mobimba",
    "payment.processing": "Ezali kosalema...",
    "payment.success": "Kofuta elongi!",
    "payment.failed": "Kofuta ekweyi",

    // Dashboard
    "dashboard.welcome": "Boyei malamu",
    "dashboard.overview": "Vue d'ensemble",
    "dashboard.courses": "Mateya na ngai",
    "dashboard.progress": "Bokoli",
    "dashboard.certificates": "Ba certificats",
    "dashboard.settings": "Ba paramètres",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("fr")

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("e-classroom-language") as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language to localStorage when changed
  useEffect(() => {
    localStorage.setItem("e-classroom-language", language)
    // Update HTML lang attribute
    document.documentElement.lang = language === "sw" ? "sw" : language === "ln" ? "ln" : language
  }, [language])

  const t = (key: string, params?: Record<string, string>): string => {
    let translation = translations[language][key as keyof (typeof translations)[typeof language]] || key

    // Replace parameters in translation
    if (params) {
      Object.entries(params).forEach(([param, value]) => {
        translation = translation.replace(`{{${param}}}`, value)
      })
    }

    return translation
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
