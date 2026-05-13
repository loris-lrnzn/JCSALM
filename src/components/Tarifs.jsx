const JUDO_ROWS = [{ label: 'Enfant', price: null }, { label: 'Adulte', price: null }, { label: 'Famille', price: null }]
const COLLECTIF = [{ label: 'Cours collectif', price: null }]

export const ALL_DISCIPLINES = [
  { discipline: 'Judo',            rows: JUDO_ROWS },
  { discipline: 'Pilates',         rows: COLLECTIF },
  { discipline: 'Cardio-Training', rows: COLLECTIF },
]

function Rows({ rows, light }) {
  return (
    <div>
      {rows.map((row) => (
        <div
          key={row.label}
          className={`flex items-center justify-between gap-6 py-4 border-b last:border-0 ${light ? 'border-zinc-200' : 'border-zinc-800/50'}`}
        >
          <p className={`text-sm ${light ? 'text-zinc-700' : 'text-zinc-300'}`}>{row.label}</p>
          {row.price != null ? (
            <span className={`text-sm tabular-nums font-medium shrink-0 ${light ? 'text-zinc-900' : 'text-zinc-100'}`}>
              {row.price}
            </span>
          ) : (
            <span className={`text-xs tracking-widest uppercase shrink-0 ${light ? 'text-zinc-400' : 'text-zinc-700'}`}>
              À définir
            </span>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Tarifs({ rows, discipline = null, groups = null, number = null }) {
  return (
    <section id="tarifs" className="bg-zinc-950 py-24 px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            {number && <p className="text-xs tracking-widest uppercase text-club-red mb-3">{number}</p>}
            <h2 className="font-display text-4xl lg:text-5xl text-zinc-100 leading-none">TARIFS</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            Saison 2025 – 2026
          </span>
        </div>

        {groups ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {groups.map((g) => (
              <div key={g.discipline}>
                <p className="text-xs tracking-widest uppercase text-club-red mb-6">{g.discipline}</p>
                <Rows rows={g.rows} />
              </div>
            ))}
          </div>
        ) : (
          <>
            {discipline && (
              <p className="text-xs tracking-widest uppercase text-club-red mb-8">{discipline}</p>
            )}
            <Rows rows={rows ?? JUDO_ROWS} />
          </>
        )}

        <p className="text-xs text-zinc-400 mt-10">
          Les tarifs seront communiqués prochainement. Contactez-nous pour toute information.
        </p>

      </div>
    </section>
  )
}
