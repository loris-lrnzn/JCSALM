import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Carousel from '@/components/Carousel'
import Tarifs from '@/components/Tarifs'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Judo — Judo Club de Salm',
  description: "Cours de judo à Senones pour tous les niveaux, de l'éveil au senior.",
}

const NIVEAUX = [
  {
    label: 'Éveil Judo',
    sub: 'nés en 2020 · 21 · 22',
    slots: [{ day: 'Mercredi', time: '16h00 – 17h00' }],
  },
  {
    label: 'Mini-Poussins · Poussins',
    sub: 'nés en 2016 à 2019',
    slots: [
      { day: 'Mercredi', time: '14h15 – 15h45' },
      { day: 'Vendredi', time: '17h00 – 18h00' },
    ],
  },
  {
    label: 'Benjamins · Minimes',
    sub: 'nés en 2012 à 2015',
    slots: [
      { day: 'Mercredi', time: '17h15 – 18h45' },
      { day: 'Vendredi', time: '18h15 – 19h15' },
    ],
  },
  {
    label: 'Cadets · Juniors · Seniors · Vétérans',
    sub: '2011 et plus',
    slots: [
      { day: 'Mercredi', time: '19h00 – 20h30' },
      { day: 'Vendredi', time: '19h30 – 21h00' },
    ],
  },
]

export default function JudoPage() {
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
            Art martial · Senones
          </p>

          {/* Titre + icône sur la même ligne */}
          <div className="flex items-end justify-between gap-6">
            <h1
              className="font-display text-zinc-100 leading-none"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
            >
              JUDO
            </h1>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon-judo.png"
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
              L'ART DE LA<br />SOUPLESSE
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              Fondé par Jigoro Kano en 1882, le judo est un art martial japonais
              dont le principe fondamental est le meilleur emploi de l'énergie.
              Ni force brute, ni résistance — mais technique, équilibre et respect
              du partenaire.
            </p>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Au Judo Club de Salm, nous accueillons les pratiquants de tous âges
              et de tous niveaux, des plus jeunes enfants jusqu'aux vétérans.
              Le club est labellisé <span className="text-zinc-200">France Judo Argent</span>.
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
              <div className="mt-8 pt-8 border-t border-zinc-800">
                <p className="text-xs tracking-widest uppercase text-zinc-600 mb-4">
                  Affilié à
                </p>
                <p className="text-sm text-zinc-400">Fédération Française de Judo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carrousel photos */}
      <Carousel />

      {/* Niveaux & Horaires */}
      <section className="py-24 px-6 lg:px-8 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 mb-12">
            <h2 className="font-display text-4xl lg:text-5xl text-zinc-100">
              NIVEAUX & HORAIRES
            </h2>
            <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block">
              Saison 2025 – 2026
            </span>
          </div>

          <div>
            {NIVEAUX.map((n) => (
              <div
                key={n.label}
                className="flex items-start justify-between gap-6 py-6 border-b border-zinc-800/50"
              >
                <div>
                  <p className="text-sm text-zinc-200 mb-1">{n.label}</p>
                  <p className="text-xs text-zinc-600">{n.sub}</p>
                </div>
                <div className="shrink-0 space-y-2">
                  {n.slots.map((slot) => (
                    <div key={slot.day + slot.time} className="flex items-baseline gap-4 justify-end">
                      <span className="text-xs tracking-wide uppercase text-zinc-500 w-20 text-right">
                        {slot.day}
                      </span>
                      <span className="text-sm text-zinc-300 tabular-nums w-28 text-right">
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

      <Tarifs
        discipline="Judo"
        rows={[
          { label: 'Enfant',  price: null },
          { label: 'Adulte',  price: null },
          { label: 'Famille', price: null },
        ]}
      />

      <Footer />
    </main>
  )
}
