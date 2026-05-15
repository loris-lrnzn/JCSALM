import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Carousel from '@/components/Carousel'
import Tarifs, { CARDIO_ROWS } from '@/components/Tarifs'
import { getGalerie, getTarifs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Cardio-Training — Judo Club de Salm',
  description: 'Séances de Cardio-Training à Senones — endurance, tonicité et condition physique.',
}

const HORAIRES = [
  { day: 'Lundi', slots: [{ time: '18h00 – 19h15', full: true }] },
]

const SLIDES = [
  { src: '/cardio.png', alt: 'Cardio-Training', caption: 'Séance de Cardio-Training — battle ropes sur le tatami de Senones.' },
]

export default async function CardioPage() {
  const [galerie, tarifs] = await Promise.all([
    getGalerie('Cardio-Training').catch(() => []),
    getTarifs().catch(() => []),
  ])
  const slides = galerie.map(g => ({
    src: urlFor(g.photo.asset).width(1400).url(),
    alt: g.photo.alt || '',
    caption: g.photo.legende || '',
  }))
  const tarifsCardio = tarifs.find(t => t.discipline === 'Cardio-Training')
  const cardioRows = tarifsCardio
    ? tarifsCardio.lignes.map(l => ({ label: l.label, price: l.prix, note: l.note }))
    : CARDIO_ROWS
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-zinc-950 px-6 lg:px-8 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-block text-xs tracking-widest uppercase text-zinc-600 hover:text-zinc-400 transition-colors duration-200 mb-8"
          >
            ← Accueil
          </Link>
          <p className="text-xs tracking-widest uppercase text-club-red mb-3">
            Condition physique · Senones
          </p>
          <div className="flex items-end justify-between gap-6">
            <h1
              className="font-display text-zinc-100 leading-none"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
            >
              CARDIO-TRAINING
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-cardio.png"
              alt=""
              width={160}
              height={160}
              className="shrink-0 hidden md:block self-center"
              style={{ filter: 'invert(1)', mixBlendMode: 'screen', transform: 'translateY(-10%)' }}
            />
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 px-6 lg:px-8 border-t border-b border-zinc-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-display text-4xl lg:text-5xl text-zinc-100 mb-8">
              ENDURANCE &<br />TONICITÉ
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Des séances de mise en condition physique générale sur le tatami.
              Battle ropes, travail cardiovasculaire, renforcement musculaire —
              dans un cadre accessible à tous les niveaux.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Le créneau du lundi est actuellement complet. Contactez le responsable
              pour être mis sur liste d'attente.
            </p>
          </div>

          <div className="lg:pt-2">
            <div className="border border-zinc-800 p-8">
              <p className="text-xs tracking-widest uppercase text-zinc-600 mb-6">
                Responsable
              </p>
              <p className="font-display text-3xl text-zinc-100 mb-2">ADRIEN</p>
              <a
                href="tel:+33621719089"
                className="text-sm text-zinc-500 hover:text-club-red transition-colors duration-200"
              >
                06 21 71 90 89
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Carousel */}
      <Carousel slides={slides.length > 0 ? slides : SLIDES} />

      {/* Horaires */}
      <section className="py-24 px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 mb-12">
            <h2 className="font-display text-4xl lg:text-5xl text-zinc-100">HORAIRES</h2>
            <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block">
              Saison 2025 – 2026
            </span>
          </div>

          <div>
            {HORAIRES.map((entry) => (
              <div
                key={entry.day}
                className="flex items-start justify-between gap-6 py-6 border-b border-zinc-800/50"
              >
                <p className="text-sm text-zinc-200">{entry.day}</p>
                <div className="shrink-0 space-y-2">
                  {entry.slots.map((slot) => (
                    <div key={slot.time} className="flex items-center gap-3 justify-end">
                      {slot.full && (
                        <span className="text-xs tracking-widest uppercase text-club-red border border-club-red/40 px-1.5 py-0.5">
                          Complet
                        </span>
                      )}
                      <span className={`text-sm tabular-nums w-28 text-right ${slot.full ? 'text-zinc-500' : 'text-zinc-300'}`}>
                        {slot.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Tarifs discipline="Cardio-Training" rows={cardioRows} />

      <Footer />
    </main>
  )
}
