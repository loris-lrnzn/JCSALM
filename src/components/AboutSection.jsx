import Image from 'next/image'

const STATS = [
  { value: '+200', label: 'Licenciés'      },
  { value: '—',   label: 'Ceinture Noire' },
  { value: '1982Bon', label: 'Fondation'     },
]

const COACHES = [
  { name: 'Adrien Valence',    role: 'Judo · Cardio-Training', initial: 'AV' },
  { name: 'Alice Grosdidier',  role: 'Pilates',                initial: 'AG' },
]

const TIMELINE = [
  { year: '1982', label: 'Fondation du club à Senones'  },
  { year: '2017', label: 'Lancement du Cardio-Training' },
  { year: '2022', label: 'Ouverture des cours Pilates'  },
  { year: '2024', label: 'Label France Judo Argent'     },
]

export default function AboutSection() {
  return (
    <section className="bg-zinc-950 py-16 px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        {/* Ligne intro */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-club-red mb-3">02</p>
            <h2 className="font-display text-5xl lg:text-6xl text-zinc-100 leading-none">LE CLUB</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">Depuis 1968</span>
        </div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">

          {/* Image */}
          <div className="relative lg:col-span-1 overflow-hidden" style={{ height: '260px' }}>
            <Image src="/dojo.png" alt="Le dojo de Senones" fill className="object-cover" />
            <div className="absolute inset-0 bg-zinc-950/30" />
          </div>

          {/* Texte + adresse */}
          <div className="lg:col-span-1 flex flex-col justify-between">
            <p className="text-sm text-zinc-400 leading-relaxed">
              Club associatif implanté à Senones, le Judo Club de Salm réunit depuis plus
              de cinquante ans des pratiquants de tous âges et de tous niveaux. Du premier
              cours d'éveil judo jusqu'à la compétition régionale, chacun y trouve sa place
              sur le tatami.
            </p>
            <div className="mt-6 pt-6 border-t border-zinc-800">
              <p className="text-xs tracking-widest uppercase text-zinc-600 mb-1">Adresse</p>
              <p className="text-sm text-zinc-400">Dojo de Senones, Rue du Breuil</p>
              <p className="text-sm text-zinc-500">88210 Senones</p>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-1 grid grid-cols-3 lg:grid-cols-1 gap-6 lg:gap-0 lg:divide-y lg:divide-zinc-800/50">
            {STATS.map((s) => (
              <div key={s.label} className="py-4 flex items-baseline gap-3">
                <span className="font-display text-4xl text-zinc-100 tabular-nums">{s.value}</span>
                <span className="text-xs tracking-widest uppercase text-zinc-600">{s.label}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Encadrement */}
        <div className="mb-12 pt-10 border-t border-zinc-800/40">
          <p className="text-xs tracking-widest uppercase text-zinc-600 mb-6">Encadrement</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COACHES.map((c) => (
              <div key={c.name} className="flex items-center gap-4">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800/60 flex items-center justify-center shrink-0">
                  <span className="font-display text-xs text-zinc-500">{c.initial}</span>
                </div>
                <p className="text-sm text-zinc-300">{c.name}</p>
                <p className="text-xs tracking-widest uppercase text-zinc-600 ml-auto">{c.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline pleine largeur */}
        <div className="pt-10 border-t border-zinc-800/40">
          <p className="text-xs tracking-widest uppercase text-zinc-600 mb-8">Histoire</p>
          <div className="relative">
            <div className="absolute top-[5px] left-0 right-0 h-px bg-zinc-800 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {TIMELINE.map((t, i) => (
                <div key={t.label} className="relative">
                  <div className={`hidden md:block w-2.5 h-2.5 mb-6 ${i === 0 ? 'bg-club-red' : 'bg-zinc-700'}`} />
                  <p className="font-display text-2xl text-zinc-100 mb-1">{t.year}</p>
                  <p className="text-xs text-zinc-500 leading-relaxed">{t.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
