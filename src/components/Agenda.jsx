'use client'

import { useState, useMemo } from 'react'

// ─── Constants ────────────────────────────────────────────────────────────────

const MOIS_FULL = [
  'Janvier','Février','Mars','Avril','Mai','Juin',
  'Juillet','Août','Septembre','Octobre','Novembre','Décembre',
]

const JOURS = ['L','M','M','J','V','S','D']

const CAT = {
  'COMPÉTITION':      { dot: 'bg-[#E21E26]',  text: 'text-[#E21E26]',  border: 'border-[#E21E26]/40'  },
  'STAGE':            { dot: 'bg-amber-400',   text: 'text-amber-400',  border: 'border-amber-400/40'  },
  'PASSAGE DE GRADE': { dot: 'bg-violet-400',  text: 'text-violet-400', border: 'border-violet-400/40' },
  'AUTRE':            { dot: 'bg-zinc-500',    text: 'text-zinc-400',   border: 'border-zinc-700'      },
}

const NIVEAU = {
  F: { label: 'Fédéral',  cls: 'text-sky-400 border-sky-400/30'         },
  L: { label: 'Ligue',    cls: 'text-emerald-400 border-emerald-400/30' },
  D: { label: 'Départ.',  cls: 'text-zinc-500 border-zinc-700'           },
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getCalendarDays(year, month) {
  const first       = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset      = (first.getDay() + 6) % 7
  const days = []
  for (let i = offset; i > 0; i--)          days.push({ date: new Date(year, month, 1 - i),   inMonth: false })
  for (let i = 1; i <= daysInMonth; i++)     days.push({ date: new Date(year, month, i),        inMonth: true  })
  let n = 1
  while (days.length % 7 !== 0)             days.push({ date: new Date(year, month + 1, n++), inMonth: false })
  return days
}

// ─── Event card ───────────────────────────────────────────────────────────────

function EventCard({ event }) {
  const d     = new Date(event.date_debut + 'T00:00:00')
  const cat   = CAT[event.categorie] ?? CAT['AUTRE']
  const niv   = NIVEAU[event.niveau]
  const place = [event.lieu, event.ville].filter(Boolean).join(' · ')

  const Tag    = event.lien_url ? 'a' : 'div'
  const tProps = event.lien_url
    ? { href: event.lien_url, target: '_blank', rel: 'noopener noreferrer' }
    : {}

  return (
    <Tag
      {...tProps}
      className={[
        'group flex gap-3 py-4 border-b border-zinc-800/60',
        'hover:border-zinc-700 transition-colors duration-200',
        event.lien_url ? 'cursor-pointer' : '',
        event.annule   ? 'opacity-40'     : '',
      ].filter(Boolean).join(' ')}
    >
      {/* Date box */}
      <div className="flex-none flex flex-col items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-zinc-800 group-hover:border-zinc-600 transition-colors shrink-0">
        <span className="font-display text-base sm:text-lg leading-none text-zinc-100">
          {String(d.getDate()).padStart(2, '0')}
        </span>
        <span className="text-[7px] sm:text-[8px] tracking-widest uppercase text-zinc-500">
          {MOIS_FULL[d.getMonth()].slice(0, 3)}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col justify-center gap-1.5 min-w-0 flex-1">
        {/* Badges */}
        <div className="flex items-center gap-1 flex-wrap">
          <span className={`text-[8px] tracking-widest uppercase border px-1 py-0.5 whitespace-nowrap ${cat.text} ${cat.border}`}>
            {event.categorie}
          </span>
          {niv && (
            <span className={`text-[8px] tracking-widest uppercase border px-1 py-0.5 whitespace-nowrap ${niv.cls}`}>
              {niv.label}
            </span>
          )}
          {event.annule && (
            <span className="text-[8px] tracking-widest uppercase border px-1 py-0.5 whitespace-nowrap text-red-400 border-red-400/40">
              Annulé
            </span>
          )}
        </div>

        {/* Title */}
        <p className={[
          'text-sm font-medium leading-snug',
          event.annule
            ? 'line-through text-zinc-500'
            : 'text-zinc-200 group-hover:text-white transition-colors',
        ].join(' ')}>
          {event.titre}
        </p>

        {/* Location */}
        {place && (
          <p className="text-xs text-zinc-600 truncate">{place}</p>
        )}
      </div>
    </Tag>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function Agenda({ events = [] }) {
  if (!events.length) return null

  const todayKey = toKey(new Date())

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = events.length ? new Date(events[0].date_debut + 'T00:00:00') : new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })
  const [selectedDay, setSelectedDay] = useState(null)

  const year  = currentMonth.getFullYear()
  const month = currentMonth.getMonth()

  const byDate = useMemo(() => {
    const map = {}
    for (const ev of events) {
      ;(map[ev.date_debut] ??= []).push(ev)
    }
    return map
  }, [events])

  const calDays = useMemo(() => getCalendarDays(year, month), [year, month])

  const panelEvents = useMemo(() => {
    if (selectedDay) return byDate[selectedDay] ?? []
    const pfx = `${year}-${String(month + 1).padStart(2, '0')}`
    return events.filter(e => e.date_debut.startsWith(pfx))
  }, [selectedDay, byDate, events, year, month])

  const monthTotal = useMemo(() => {
    const pfx = `${year}-${String(month + 1).padStart(2, '0')}`
    return events.filter(e => e.date_debut.startsWith(pfx)).length
  }, [events, year, month])

  const prev = () => { setCurrentMonth(new Date(year, month - 1, 1)); setSelectedDay(null) }
  const next = () => { setCurrentMonth(new Date(year, month + 1, 1)); setSelectedDay(null) }
  const toggleDay = (key, has) => {
    if (!has) return
    setSelectedDay(p => p === key ? null : key)
  }

  return (
    <section id="agenda" className="bg-zinc-950 py-14 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/40 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Title */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#E21E26] mb-3">04</p>
            <h2 className="font-display text-5xl lg:text-6xl text-zinc-100 leading-none">AGENDA</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            Calendrier des événements
          </span>
        </div>

        {/* Layout : stacked on mobile, side-by-side on desktop */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

          {/* ── Calendar ── */}
          <div className="w-full lg:w-80 xl:w-[22rem] flex-shrink-0">

            {/* Month nav */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-zinc-800/50">
              <button onClick={prev} aria-label="Mois précédent"
                className="w-9 h-9 flex items-center justify-center text-2xl text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all rounded">
                ‹
              </button>
              <div className="text-center select-none">
                <p className="font-display tracking-[0.15em] uppercase text-zinc-100 text-sm sm:text-base">
                  {MOIS_FULL[month]}
                </p>
                <p className="text-[10px] tracking-widest text-zinc-600">{year}</p>
              </div>
              <button onClick={next} aria-label="Mois suivant"
                className="w-9 h-9 flex items-center justify-center text-2xl text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800 transition-all rounded">
                ›
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {JOURS.map((j, i) => (
                <div key={i} className="flex items-center justify-center h-8">
                  <span className="text-[10px] tracking-widest uppercase text-zinc-700">{j}</span>
                </div>
              ))}
            </div>

            {/* Day grid — cells scale with container width */}
            <div className="grid grid-cols-7">
              {calDays.map(({ date, inMonth }, idx) => {
                const key     = toKey(date)
                const dayEvs  = inMonth ? (byDate[key] ?? []) : []
                const hasEvs  = dayEvs.length > 0
                const isToday = key === todayKey && inMonth
                const isSel   = key === selectedDay
                const cats    = [...new Set(dayEvs.map(e => e.categorie))]

                return (
                  <div
                    key={idx}
                    onClick={() => toggleDay(key, hasEvs)}
                    className={[
                      'relative flex flex-col items-center justify-center py-2 aspect-square',
                      'transition-colors duration-150 select-none',
                      hasEvs   ? 'cursor-pointer'     : 'cursor-default',
                      isSel    ? 'bg-zinc-800'         : hasEvs ? 'hover:bg-zinc-900' : '',
                      !inMonth ? 'pointer-events-none' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    {isToday && (
                      <div className="absolute inset-[2px] ring-1 ring-[#E21E26]/50 pointer-events-none rounded-sm" />
                    )}

                    <span className={[
                      'text-xs sm:text-sm leading-none z-10',
                      !inMonth ? 'text-zinc-800'              :
                      isToday  ? 'text-[#E21E26] font-bold'   :
                      hasEvs   ? 'text-zinc-200 font-medium'  :
                                 'text-zinc-600',
                    ].join(' ')}>
                      {date.getDate()}
                    </span>

                    {cats.length > 0 && (
                      <div className="flex gap-[3px] mt-1">
                        {cats.slice(0, 3).map(cat => (
                          <span key={cat} className={`block w-1 h-1 rounded-full ${CAT[cat]?.dot ?? 'bg-zinc-500'}`} />
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Count + legend */}
            {monthTotal > 0 && (
              <p className="mt-4 pt-4 border-t border-zinc-800/40 text-[10px] tracking-widest uppercase text-zinc-700">
                {monthTotal} événement{monthTotal > 1 ? 's' : ''} ce mois
              </p>
            )}
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {Object.entries(CAT).map(([label, { dot, text }]) => (
                <div key={label} className="flex items-center gap-1.5">
                  <span className={`block w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />
                  <span className={`text-[9px] tracking-wide uppercase opacity-60 ${text}`}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Event panel ── */}
          <div className="w-full lg:flex-1 min-w-0">

            {/* Panel header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-0 border-b border-zinc-800/50">
              <p className="text-xs tracking-widest uppercase text-zinc-500">
                {selectedDay
                  ? (() => {
                      const d = new Date(selectedDay + 'T00:00:00')
                      return `${d.getDate()} ${MOIS_FULL[d.getMonth()]} ${d.getFullYear()}`
                    })()
                  : `${MOIS_FULL[month]} ${year}`}
              </p>
              <div className="flex items-center gap-3">
                {panelEvents.length > 0 && (
                  <span className="text-[9px] tracking-widest uppercase text-zinc-700">
                    {panelEvents.length} événement{panelEvents.length > 1 ? 's' : ''}
                  </span>
                )}
                {selectedDay && (
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-[9px] tracking-widest uppercase text-zinc-600 hover:text-zinc-300 border border-zinc-800 hover:border-zinc-600 px-2 py-1 transition-all"
                  >
                    ← Tout le mois
                  </button>
                )}
              </div>
            </div>

            {/* List */}
            {panelEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <span className="text-4xl text-zinc-800 mb-4 select-none">◌</span>
                <p className="text-[10px] tracking-widest uppercase text-zinc-700">
                  {selectedDay ? 'Aucun événement ce jour' : 'Aucun événement ce mois-ci'}
                </p>
              </div>
            ) : (
              <div className="overflow-y-auto max-h-[420px] lg:max-h-[560px]"
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}>
                {panelEvents.map(ev => (
                  <EventCard key={ev._id ?? `${ev.titre}-${ev.date_debut}`} event={ev} />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
