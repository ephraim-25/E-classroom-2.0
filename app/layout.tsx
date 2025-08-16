import type { Metadata } from "next"
import type React from "react"
import { AuthProvider } from "@/contexts/auth-context"
import { LanguageProvider } from "@/contexts/language-context"
import "@/styles/globals.css"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"

export const metadata: Metadata = {
  title: {
    default: "E-Classroom - Plateforme d'éducation en ligne",
    template: "%s | E-Classroom",
  },
  description:
    "Accédez à des milliers de cours, formations et masterclass dispensés par des experts reconnus. Obtenez vos certificats et développez vos compétences à votre rythme.",
  keywords: ["éducation", "formation", "cours en ligne", "e-learning", "certificats", "RDC", "Congo", "Afrique"],
  authors: [{ name: "E-Classroom Team" }],
  creator: "E-Classroom",
  publisher: "E-Classroom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://e-classroom.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      fr: "/fr",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    alternateLocale: ["en_US"],
    url: "/",
    title: "E-Classroom - Plateforme d'éducation en ligne",
    description: "Accédez à des milliers de cours, formations et masterclass dispensés par des experts reconnus.",
    siteName: "E-Classroom",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "E-Classroom - Plateforme d'éducation en ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Classroom - Plateforme d'éducation en ligne",
    description: "Accédez à des milliers de cours, formations et masterclass dispensés par des experts reconnus.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2563eb" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={GeistSans.className}>
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
