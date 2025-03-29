import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "MyWorkIn - Portal de Oportunidades Laborales",
  description: "Encuentra prácticas y trabajos actualizados diariamente",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'