import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const BASE_URL = 'https://jcsalm.vercel.app'

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Judo Club de Salm — Senones, Vosges',
    template: '%s — Judo Club de Salm',
  },
  description: 'Club de judo à Senones (Vosges) — Judo, Pilates, Cardio-Training. Ouvert à tous les âges et niveaux. Labellisé France Judo Argent.',
  keywords: ['judo', 'pilates', 'cardio-training', 'Senones', 'Vosges', 'club sportif', 'arts martiaux'],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: BASE_URL,
    siteName: 'Judo Club de Salm',
    title: 'Judo Club de Salm — Senones, Vosges',
    description: 'Club de judo à Senones (Vosges) — Judo, Pilates, Cardio-Training. Ouvert à tous les âges et niveaux.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Judo Club de Salm' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Judo Club de Salm — Senones, Vosges',
    description: 'Club de judo à Senones (Vosges) — Judo, Pilates, Cardio-Training.',
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${bebas.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body className="bg-zinc-950 text-zinc-200 font-body antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
