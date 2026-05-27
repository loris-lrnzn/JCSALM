import Image from 'next/image'

const DEFAULTS = {
  adresse: 'Dojo de Senones, Rue du Breuil',
  codePostal: '88210 Senones',
  email: 'contact@judoclubsalm.fr',
  facebook: 'https://www.facebook.com/jcsalm.senones/',
}

export default function Footer({ parametres = null }) {
  const adresse   = parametres?.adresse  || DEFAULTS.adresse
  const email     = parametres?.email    || DEFAULTS.email
  const facebook  = parametres?.facebook || DEFAULTS.facebook

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <Image src="/logo.png" alt="SALM Judo Club" width={52} height={52} className="mb-5 object-contain" />
          <p className="font-display text-3xl text-zinc-100 leading-tight">
            JUDO CLUB<br />DE SALM
          </p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-600 mb-4">Nous trouver</p>
          <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-line">{adresse}</p>
        </div>
        <div>
          <p className="text-xs tracking-widest uppercase text-zinc-600 mb-4">Contact</p>
          <a
            href={`mailto:${email}`}
            className="text-zinc-400 text-sm hover:text-club-red transition-colors duration-200 block mb-3"
          >
            {email}
          </a>
          {facebook && (
            <a
              href={facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-400 text-sm hover:text-club-red transition-colors duration-200"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
          )}
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 border-t border-zinc-800 flex justify-between items-center">
        <span className="text-zinc-700 text-xs tracking-widest uppercase">
          © {new Date().getFullYear()} Judo Club de Salm
        </span>
        <span className="text-zinc-700 text-xs tracking-widest uppercase">
          Senones · Vosges
        </span>
      </div>
    </footer>
  )
}
