const PARTNERS = [
  { name: 'Partenaire A' },
  { name: 'Partenaire B' },
  { name: 'Partenaire C' },
  { name: 'Partenaire D' },
]

export default function Partners() {
  return (
    <section className="bg-zinc-950 py-20 px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-club-red mb-3">05</p>
            <h2 className="font-display text-4xl lg:text-5xl text-zinc-100 leading-none">PARTENAIRES</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            Merci à eux
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="bg-zinc-950 flex items-center justify-center py-10 px-6"
            >
              <div className="w-28 h-12 bg-zinc-800/60 border border-zinc-700/40 flex items-center justify-center">
                <span className="text-xs tracking-widest uppercase text-zinc-600">Logo</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
