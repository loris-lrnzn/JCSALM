import { Bebas_Neue, Inter } from 'next/font/google'
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

export const metadata = {
  title: 'Judo Club de Salm',
  description: 'Club de judo de Senones — Judo, Pilates, Cardio-Training. Ancienne Principauté de Salm, Vosges.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${bebas.variable} ${inter.variable}`}>
      <body className="bg-zinc-950 text-zinc-200 font-body antialiased">
        {children}
      </body>
    </html>
  )
}
