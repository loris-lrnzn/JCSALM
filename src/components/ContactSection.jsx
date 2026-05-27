'use client'

import dynamic from 'next/dynamic'

const DojoMap = dynamic(() => import('./DojoMap'), { ssr: false, loading: () => <div className="absolute inset-0 bg-zinc-900" /> })

const DEFAULTS = {
  adresse:   'Dojo de Senones\nRue du Breuil\n88210 Senones',
  email:     'contact@judoclubsalm.fr',
  telephone: null,
  facebook:  'https://www.facebook.com/jcsalm.senones/',
}

const MAPS_LINK =
  'https://www.google.com/maps/place/Judo+Club+de+Salm/@48.3941178,6.9746977,294m/data=!3m1!1e3!4m12!1m5!3m4!2zNDjCsDIzJzM5LjAiTiA2wrA1OCczMi42IkU!8m2!3d48.39416!4d6.97572!3m5!1s0x4793f11e27ccd959:0x9a1d4c90e078b5be!8m2!3d48.3940575!4d6.9758548!16s%2Fg%2F11z7fk3vqg?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D'

export default function ContactSection({ parametres = null }) {
  const adresse   = parametres?.adresse   || DEFAULTS.adresse
  const email     = parametres?.email     || DEFAULTS.email
  const telephone = parametres?.telephone || DEFAULTS.telephone
  const facebook  = parametres?.facebook  || DEFAULTS.facebook

  return (
    <section id="contact" className="bg-zinc-900 py-14 md:py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-800/40">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-10 md:mb-14">
          <div>
            <p className="text-xs tracking-widest uppercase text-[#E21E26] mb-3">08</p>
            <h2 className="font-display text-5xl lg:text-6xl text-zinc-100 leading-none">CONTACT</h2>
          </div>
          <span className="text-xs tracking-widest uppercase text-zinc-700 hidden sm:block pb-1">
            Nous rejoindre
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Infos ── */}
          <div className="flex flex-col gap-0 divide-y divide-zinc-800/60">

            {/* Adresse */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5 py-6 hover:bg-zinc-800/30 -mx-4 px-4 transition-colors duration-200"
            >
              <span className="mt-0.5 flex-none w-8 h-8 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 transition-colors text-zinc-500 group-hover:text-zinc-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                  <circle cx="12" cy="9" r="2.5"/>
                </svg>
              </span>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-zinc-600 mb-1">Adresse</p>
                <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line group-hover:text-zinc-100 transition-colors">
                  {adresse}
                </p>
                <span className="inline-block mt-2 text-[10px] tracking-widest uppercase text-zinc-600 group-hover:text-[#E21E26] transition-colors">
                  Voir sur Maps →
                </span>
              </div>
            </a>

            {/* Email */}
            <a
              href={`mailto:${email}`}
              className="group flex items-start gap-5 py-6 hover:bg-zinc-800/30 -mx-4 px-4 transition-colors duration-200"
            >
              <span className="mt-0.5 flex-none w-8 h-8 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 transition-colors text-zinc-500 group-hover:text-zinc-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m2 7 10 7 10-7"/>
                </svg>
              </span>
              <div>
                <p className="text-[10px] tracking-widest uppercase text-zinc-600 mb-1">Email</p>
                <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{email}</p>
              </div>
            </a>

            {/* Téléphone — si disponible */}
            {telephone && (
              <a
                href={`tel:${telephone.replace(/\s/g, '')}`}
                className="group flex items-start gap-5 py-6 hover:bg-zinc-800/30 -mx-4 px-4 transition-colors duration-200"
              >
                <span className="mt-0.5 flex-none w-8 h-8 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 transition-colors text-zinc-500 group-hover:text-zinc-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-zinc-600 mb-1">Téléphone</p>
                  <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{telephone}</p>
                </div>
              </a>
            )}

            {/* Facebook */}
            {facebook && (
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-5 py-6 hover:bg-zinc-800/30 -mx-4 px-4 transition-colors duration-200"
              >
                <span className="mt-0.5 flex-none w-8 h-8 flex items-center justify-center border border-zinc-800 group-hover:border-zinc-600 transition-colors text-zinc-500 group-hover:text-zinc-300">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span>
                <div>
                  <p className="text-[10px] tracking-widest uppercase text-zinc-600 mb-1">Facebook</p>
                  <p className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">Judo Club de Salm · Senones</p>
                  <span className="inline-block mt-2 text-[10px] tracking-widest uppercase text-zinc-600 group-hover:text-[#E21E26] transition-colors">
                    Voir la page →
                  </span>
                </div>
              </a>
            )}
          </div>

          {/* ── Carte Leaflet ── */}
          <div className="w-full aspect-[4/3] lg:aspect-auto lg:h-full min-h-72 relative border border-zinc-800 overflow-hidden">
            {/* Filtre dark sur les tuiles OSM */}
            <div className="absolute inset-0 [&_.leaflet-tile]:grayscale [&_.leaflet-tile]:[filter:grayscale(1)_invert(1)_hue-rotate(180deg)_brightness(0.75)_contrast(1.1)]">
              <DojoMap />
            </div>

            {/* Badge bas-gauche */}
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 z-[1000] flex items-center gap-2 bg-zinc-950/90 border border-zinc-800 hover:border-zinc-600 px-3 py-2 transition-colors group"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#E21E26] flex-none">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <span className="text-[9px] tracking-widest uppercase text-zinc-400 group-hover:text-zinc-200 transition-colors">
                Ouvrir dans Maps
              </span>
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
