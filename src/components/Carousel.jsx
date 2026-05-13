'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const DEFAULT_SLIDES = [
  { src: '/judo.png',   alt: 'Compétition', caption: 'Compétition par équipes — nos seniors en action.' },
  { src: '/hero.png',   alt: 'Cours enfants', caption: 'Cours enfants — l\'éveil au judo sur le tatami de Senones.' },
  { src: '/cardio.png', alt: 'Cardio-Training', caption: 'Séance de Cardio-Training — battle ropes sur le tatami.' },
]

export default function Carousel({ slides = DEFAULT_SLIDES }) {
  const SLIDES = slides
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setCurrent((c) => (c + 1) % SLIDES.length)

  return (
    <section className="py-24 px-6 lg:px-8 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 mb-12">
          <h2 className="font-display text-4xl lg:text-5xl text-zinc-100">GALERIE</h2>
          {SLIDES.length > 0 && (
            <span className="text-xs tracking-widest uppercase text-zinc-700">
              {current + 1} / {SLIDES.length}
            </span>
          )}
        </div>

        {SLIDES.length === 0 ? (
          /* Placeholder — à remplacer par les vraies photos */
          <div className="bg-zinc-800/40 border border-dashed border-zinc-700 flex flex-col items-center justify-center gap-3" style={{ height: '420px' }}>
            <p className="text-xs tracking-widest uppercase text-zinc-600">
              Photos à venir
            </p>
            <p className="text-xs text-zinc-700">
              Ajouter les photos dans <code className="text-zinc-600">Carousel.jsx</code>
            </p>
          </div>
        ) : (
          <div className="relative aspect-[4/3] md:aspect-[16/9]">
            {/* Image */}
            <div className="relative w-full h-full overflow-hidden bg-zinc-900">
              <Image
                src={SLIDES[current].src}
                alt={SLIDES[current].alt}
                fill
                className="object-contain transition-opacity duration-500"
              />
            </div>

            {/* Caption */}
            {SLIDES[current].caption && (
              <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-zinc-950/80 backdrop-blur-sm">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {SLIDES[current].caption}
                </p>
              </div>
            )}

            {/* Contrôles */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-950 transition-colors duration-200"
              aria-label="Photo précédente"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-950/80 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-zinc-950 transition-colors duration-200"
              aria-label="Photo suivante"
            >
              <ChevronRight size={18} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-1.5 h-1.5 transition-colors duration-200 ${
                    i === current ? 'bg-zinc-100' : 'bg-zinc-600'
                  }`}
                  aria-label={`Aller à la photo ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
