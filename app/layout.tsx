import type React from "react"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-nunito",
})

export const metadata: Metadata = {
  title: "Biosweet | Sucre Bio Premium Algérien",
  description:
    "Le sucre bio qui vit avec la nature. Découvrez notre sucre bio haut de gamme, 100% algérien, produit avec passion et innovation écologique.",
  keywords:
    "sucre bio, sucre algérien, organic sugar, premium sugar, biosweet, sucre premium, sucre naturel, algérie, DZD",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/images/biosweet-logo.png", // Utilisation du logo pour l'icône par défaut
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/biosweet-logo.png", // Utilisation du logo pour l'icône en mode sombre
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/images/biosweet-logo.png", // Utilisation du logo pour l'icône SVG
        type: "image/png", // Changement du type si le logo est un PNG
      },
    ],
    apple: "/images/biosweet-logo.png", // Utilisation du logo pour l'icône Apple
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr-DZ">
      <body className={`${nunito.className} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}