import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

const PLACEHOLDERS = [
  { nom: 'Partenaire A' },
  { nom: 'Partenaire B' },
  { nom: 'Partenaire C' },
  { nom: 'Partenaire D' },
]

export default function Partners({ partenaires = [] }) {
  const items = partenaires.length > 0 ? partenaires : PLACEHOLDERS

  return (
    <section className="bg-zinc-950 py-20 px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-club-red mb-3">06</p>
            <h2 className="font-display text-4xl lg:text-5xl text-zinc-100 leading-none">PARTENAIRES</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            Merci à eux
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {items.map((p) => {
            const inner = p.logo ? (
              <div className="relative w-full h-20">
                <Image
                  src={urlFor(p.logo).width(400).fit('max').format('png').url()}
                  alt={p.nom}
                  fill
                  className="object-contain opacity-80 brightness-110 hover:opacity-100 hover:brightness-125 transition-all duration-300"
                />
              </div>
            ) : (
              <div className="w-28 h-12 bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center">
                <span className="text-xs tracking-widest uppercase text-zinc-600">Logo</span>
              </div>
            )

            return p.url ? (
              <a
                key={p.nom}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center py-8 px-6"
              >
                {inner}
              </a>
            ) : (
              <div key={p.nom} className="flex items-center justify-center py-8 px-6">
                {inner}
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
