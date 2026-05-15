import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity'


export default function DisciplinesGrid({ photos = {} }) {
  const photoMap = {
    judo:   photos.judo?.asset   ? urlFor(photos.judo.asset).width(800).url()   : '/judo.png',
    pilates: photos.pilates?.asset ? urlFor(photos.pilates.asset).width(800).url() : '/pilates.png',
    cardio: photos.cardio?.asset  ? urlFor(photos.cardio.asset).width(800).url()  : '/cardio.png',
  }

  const DISCIPLINES = [
    {
      index: '01',
      name: 'Judo',
      slug: 'judo',
      description:
        "Art martial japonais fondé sur les principes de la souplesse et de l'efficacité. Techniques de projection, de contrôle au sol et de respect du partenaire.",
      days: 'Mercredi · Vendredi',
      photo: photoMap.judo,
    },
    {
      index: '02',
      name: 'Pilates',
      slug: 'pilates',
      description:
        'Renforcement musculaire profond axé sur la posture, la respiration et la souplesse. Idéal en pratique autonome ou en complément du judo.',
      days: 'Mardi · Jeudi · Samedi',
      photo: photoMap.pilates,
    },
    {
      index: '03',
      name: 'Cardio-Training',
      slug: 'cardio-training',
      description:
        'Mise en condition physique générale. Endurance, tonicité et travail cardiovasculaire pour tous les niveaux.',
      days: 'Lundi',
      photo: photoMap.cardio,
    },
  ]

  return (
    <section id="disciplines" className="bg-zinc-950 py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs tracking-widest uppercase text-club-red mb-3">01</p>
            <h2 className="font-display text-5xl lg:text-6xl text-zinc-100 leading-none">
              NOS DISCIPLINES
            </h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            3 activités
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DISCIPLINES.map((d) => (
            <Link
              key={d.name}
              href={`/disciplines/${d.slug}`}
              className="group flex flex-col gap-6 cursor-pointer h-full"
            >
              {/* Image avec hover */}
              <div
                className="relative w-full overflow-hidden"
                style={{ height: '260px' }}
              >
                <Image
                  src={d.photo}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Overlay au hover */}
                <div className="absolute inset-0 bg-zinc-950 opacity-0 group-hover:opacity-30 transition-opacity duration-500" />

                {/* Flèche toujours visible */}
                <div className="absolute bottom-4 right-4 w-9 h-9 bg-zinc-100 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-zinc-950 text-sm font-bold">→</span>
                </div>
              </div>

              {/* Texte */}
              <div className="flex flex-col flex-1 gap-3">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-4xl text-zinc-100 leading-none group-hover:text-white transition-colors duration-200">
                    {d.name.toUpperCase()}
                  </h3>
                  <span className="text-xs text-zinc-700 tracking-widest">{d.index}</span>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-200 flex-1">
                  {d.description}
                </p>
                <p className="text-xs tracking-widest uppercase text-zinc-600 pt-1 group-hover:text-zinc-500 transition-colors duration-200 mt-auto">
                  {d.days}
                </p>
              </div>

            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
