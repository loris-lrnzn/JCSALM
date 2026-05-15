import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Carousel from '@/components/Carousel'
import Tarifs, { PILATES_ROWS } from '@/components/Tarifs'
import { getGalerie, getTarifs } from '@/lib/queries'
import { urlFor } from '@/lib/sanity'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Pilates — Judo Club de Salm',
  description: 'Cours de Pilates à Senones — renforcement musculaire, posture et souplesse.',
}

const HORAIRES = [
  { day: 'Mardi',  slots: [{ time: '17h15 – 18h15', full: true }, { time: '18h30 – 19h30' }] },
  { day: 'Jeudi',  slots: [{ time: '17h30 – 18h30' }, { time: '19h00 – 20h00' }] },
  { day: 'Samedi', slots: [{ time: '9h00 – 10h00'  }] },
]

const SLIDES = [
  { src: '/pilates.png', alt: 'Cours de Pilates', caption: 'Cours de Pilates sur le tatami — renforcement et souplesse.' },
]

export default async function PilatesPage() {
  const [galerie, tarifs] = await Promise.all([
    getGalerie('Pilates').catch(() => []),
    getTarifs().catch(() => []),
  ])
  const slides = galerie.map(g => ({
    src: urlFor(g.photo.asset).width(1400).url(),
    alt: g.photo.alt || '',
    caption: g.photo.legende || '',
  }))
  const tarifsPilates = tarifs.find(t => t.discipline === 'Pilates')
  const pilatesRows = tarifsPilates
    ? tarifsPilates.lignes.map(l => ({ label: l.label, price: l.prix, note: l.note }))
    : PILATES_ROWS
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
            Bien-être · Senones
          </p>
          <div className="flex items-end justify-between gap-6">
            <h1
              className="font-display text-zinc-100 leading-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 10rem)' }}
            >
              PILATES
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-pilates.png"
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
              CORPS &<br />ÉQUILIBRE
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Développée par Joseph Pilates au début du XX° siècle, cette méthode
              vise le renforcement des muscles profonds, le réalignement postural
              et une meilleure conscience corporelle.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Les séances se déroulent sur le tatami du Judo Club de Salm.
              Accessibles à tous, sans condition physique particulière.
            </p>
          </div>

          <div className="lg:pt-2">
            <div className="border border-zinc-800 p-8">
              <p className="text-xs tracking-widest uppercase text-zinc-600 mb-6">
                Responsable
              </p>
              <p className="font-display text-3xl text-zinc-100 mb-2">ALICE</p>
              <a
                href="tel:+33629351864"
                className="text-sm text-zinc-500 hover:text-club-red transition-colors duration-200"
              >
                06 29 35 18 64
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

      <Tarifs discipline="Pilates" rows={pilatesRows} />

      <Footer />
    </main>
  )
}
