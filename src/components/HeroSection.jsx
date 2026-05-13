import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden pt-20"
      style={{ height: '75vh', minHeight: '500px' }}
    >
      {/* Photo */}
      <Image
        src="/hero.png"
        alt="Cours de judo — Judo Club de Salm, Senones"
        fill
        className="object-cover object-center"
        style={{ transform: 'scale(1.08)', transformOrigin: 'center' }}
        priority
      />

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(9,9,11,0.8) 0%, rgba(9,9,11,0.1) 30%, rgba(9,9,11,0.6) 65%, rgba(9,9,11,1) 100%)',
        }}
      />

      {/* Contenu */}
      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-10 lg:px-16 lg:pb-12">
        <div className="max-w-7xl mx-auto w-full">

          <p className="text-xs tracking-widest uppercase text-zinc-100 mb-4">
            Senones · Vosges · France
          </p>

          <h1
            className="font-display text-zinc-100 leading-none mb-6"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}
          >
            JUDO CLUB<br />DE SALM
          </h1>

          <div className="flex flex-wrap gap-3">
            <a
              href="#horaires"
              className="px-6 py-2.5 bg-club-red text-white text-xs tracking-widest uppercase font-medium hover:bg-red-800 transition-colors duration-200"
            >
              Voir les horaires
            </a>
            <a
              href="#disciplines"
              className="px-6 py-2.5 border border-zinc-600 text-zinc-300 text-xs tracking-widest uppercase hover:border-zinc-100 hover:text-zinc-100 transition-colors duration-200"
            >
              Nos disciplines
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
