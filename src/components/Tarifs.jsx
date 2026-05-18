export const JUDO_ROWS = [
  { label: 'Éveil Judo',                          price: '154 €' },
  { label: 'Mini-Poussins · Poussins',             price: '172 €' },
  { label: 'Benjamins · Minimes',                  price: '190 €' },
  { label: 'Cadets · Juniors · Seniors · Vétérans', price: '244 €', note: 'Accès Cardio & Pilates inclus' },
]

export const PILATES_ROWS = [
  { label: '1 séance / semaine', price: '172 €' },
  { label: '2 séances / semaine', price: '244 €' },
]

export const CARDIO_ROWS = [
  { label: 'Cours collectif', price: '172 €' },
]

export const ALL_DISCIPLINES = [
  { discipline: 'Judo',            rows: JUDO_ROWS    },
  { discipline: 'Pilates',         rows: PILATES_ROWS },
  { discipline: 'Cardio-Training', rows: CARDIO_ROWS  },
]

const REDUCTIONS = [
  { label: 'Étudiant',                     value: '− 10 %' },
  { label: 'Famille (dès 3 inscriptions)', value: '− 10 %' },
]

const PAIEMENTS = ['Chèque', 'Espèces', 'Bon CAF', "Pass'Sport", 'ZAP']

function Rows({ rows }) {
  return (
    <div>
      {rows.map((row) => (
        <div key={row.label} className="py-4 border-b border-zinc-800/50 last:border-0">
          <div className="flex items-center justify-between gap-6">
            <p className="text-sm text-zinc-300">{row.label}</p>
            <span className="text-sm tabular-nums font-medium text-zinc-100 shrink-0">{row.price}</span>
          </div>
          {row.note && (
            <p className="text-xs text-club-red mt-1">{row.note}</p>
          )}
        </div>
      ))}
    </div>
  )
}

export default function Tarifs({ rows, discipline = null, groups = null, number = null }) {
  return (
    <section id="tarifs" className="bg-zinc-950 py-14 md:py-24 px-6 lg:px-8 border-t border-zinc-800/40">
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
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-800/40">
            {groups.map((g) => (
              <div key={g.discipline} className="md:px-10 first:pl-0 last:pr-0">
                <p className="text-xs tracking-widest uppercase text-club-red mb-6 pt-10 md:pt-0">{g.discipline}</p>
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

        {/* Réductions + Moyens de paiement */}
        <div className="mt-12 pt-8 border-t border-zinc-800/40 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-zinc-600 mb-4">Réductions</p>
            <div className="flex flex-col gap-3">
              {REDUCTIONS.map((r) => (
                <div key={r.label} className="flex items-center justify-between gap-6">
                  <p className="text-sm text-zinc-400">{r.label}</p>
                  <span className="text-sm tabular-nums text-zinc-300 shrink-0">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-zinc-600 mb-4">Moyens de paiement</p>
            <div className="flex flex-wrap gap-2">
              {PAIEMENTS.map((p) => (
                <span key={p} className="text-xs tracking-widest uppercase text-zinc-400 border border-zinc-800 px-3 py-1.5">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
