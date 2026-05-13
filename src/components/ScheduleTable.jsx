const SCHEDULE = [
  {
    discipline: 'Judo',
    isJudo: true,
    groups: [
      {
        label: 'Éveil Judo',
        sub: 'nés en 2020 · 21 · 22',
        slots: [
          { day: 'Mercredi', time: '16h00 – 17h00' },
        ],
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
    ],
  },
  {
    discipline: 'Pilates',
    isJudo: false,
    groups: [
      {
        label: 'Mardi',
        sub: '',
        slots: [
          { day: '', time: '17h15 – 18h15', full: true },
          { day: '', time: '18h30 – 19h30' },
        ],
      },
      {
        label: 'Jeudi',
        sub: '',
        slots: [
          { day: '', time: '17h30 – 18h30' },
          { day: '', time: '19h00 – 20h00' },
        ],
      },
      {
        label: 'Samedi',
        sub: '',
        slots: [
          { day: '', time: '9h00 – 10h00' },
        ],
      },
    ],
  },
  {
    discipline: 'Cardio-Training',
    isJudo: false,
    groups: [
      {
        label: 'Lundi',
        sub: '',
        slots: [
          { day: '', time: '18h00 – 19h15', full: true },
        ],
      },
    ],
  },
]

function SectionHeader({ title, isJudo }) {
  return (
    <div className={`pb-3 mb-1 border-b-2 ${isJudo ? 'border-club-red' : 'border-zinc-700'}`}>
      <h3 className="font-display text-3xl text-zinc-100">{title}</h3>
    </div>
  )
}

export default function ScheduleTable() {
  return (
    <section id="horaires" className="bg-zinc-950 py-24 px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-club-red mb-3">03</p>
            <h2 className="font-display text-5xl lg:text-6xl text-zinc-100 leading-none">HORAIRES</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            Saison 2025 – 2026
          </span>
        </div>

        <div className="space-y-14">
          {/* Judo pleine largeur */}
          {SCHEDULE.filter(s => s.isJudo).map((section) => (
            <div key={section.discipline}>
              <SectionHeader title={section.discipline.toUpperCase()} isJudo={section.isJudo} />

              <div>
                {section.groups.map((group) => (
                  <div
                    key={group.label}
                    className="flex items-start justify-between gap-6 py-4 border-b border-zinc-800/50"
                  >
                    {/* Label */}
                    <div>
                      <p className="text-sm text-zinc-200">{group.label}</p>
                      {group.sub && (
                        <p className="text-xs text-zinc-600 mt-0.5">{group.sub}</p>
                      )}
                    </div>

                    {/* Créneaux */}
                    <div className="shrink-0 space-y-1.5">
                      {group.slots.map((slot, i) => (
                        <div key={i} className="flex items-center gap-3 justify-end">
                          {slot.day && (
                            <span className="text-xs tracking-wide uppercase text-zinc-500 w-20 text-right">
                              {slot.day}
                            </span>
                          )}
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
          ))}

          {/* Pilates + Cardio côte à côte */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {SCHEDULE.filter(s => !s.isJudo).map((section) => (
              <div key={section.discipline}>
                <SectionHeader title={section.discipline.toUpperCase()} isJudo={false} />
                <div>
                  {section.groups.map((group) => (
                    <div
                      key={group.label}
                      className="flex items-start justify-between gap-6 py-4 border-b border-zinc-800/50"
                    >
                      <div>
                        <p className="text-sm text-zinc-200">{group.label}</p>
                        {group.sub && (
                          <p className="text-xs text-zinc-600 mt-0.5">{group.sub}</p>
                        )}
                      </div>
                      <div className="shrink-0 space-y-1.5">
                        {group.slots.map((slot, i) => (
                          <div key={i} className="flex items-center gap-3 justify-end">
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
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
