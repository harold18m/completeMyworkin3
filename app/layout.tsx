import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'MyWorkIn - Portal de Prácticas',
  description: 'Encuentra las mejores prácticas profesionales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={poppins.variable}>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/pestana_logo/MyWorkIn (Simbolo).png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/pestana_logo/MyWorkIn (Simbolo).png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/pestana_logo/MyWorkIn (Simbolo).png" />
      </head>
      <body className="font-poppins">
        {children}
      </body>
    </html>
  )
}



import './globals.css'