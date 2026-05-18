export const dynamic = 'force-dynamic'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DisciplinesGrid from '@/components/DisciplinesGrid'
import AboutSection from '@/components/AboutSection'
import ScheduleTable from '@/components/ScheduleTable'
import Tarifs, { ALL_DISCIPLINES } from '@/components/Tarifs'
import Partners from '@/components/Partners'
import Actualites from '@/components/Actualites'
import Footer from '@/components/Footer'
import { getPartenaires, getTarifs, getHoraires, getParametres, getActualites, countActualites } from '@/lib/queries'

const DISCIPLINE_ORDER = ['Judo', 'Pilates', 'Cardio-Training']

function transformHoraires(data) {
  if (!data?.length) return null
  return DISCIPLINE_ORDER
    .map(d => data.find(item => item.discipline === d))
    .filter(Boolean)
    .map(item => ({
      discipline: item.discipline,
      isJudo: item.discipline === 'Judo',
      groups: (item.groupes || []).map(g => ({
        label: g.label,
        sub: g.sous_titre || '',
        slots: (g.creneaux || []).map(c => ({
          day: c.jour || '',
          time: c.heure,
          full: c.complet || false,
        })),
      })),
    }))
}

export default async function Home() {
  const [partenaires, tarifs, horaires, parametres, actualites, totalActualites] = await Promise.all([
    getPartenaires().catch(() => []),
    getTarifs().catch(() => []),
    getHoraires().catch(() => []),
    getParametres().catch(() => null),
    getActualites({ limit: 4 }).catch(() => []),
    countActualites().catch(() => 0),
  ])

  const tarifsGroups = tarifs.length > 0
    ? tarifs.map(t => ({
        discipline: t.discipline,
        rows: t.lignes.map(l => ({ label: l.label, price: l.prix, note: l.note })),
      }))
    : ALL_DISCIPLINES

  const schedule = transformHoraires(horaires)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['SportsClub', 'LocalBusiness'],
    name: 'Judo Club de Salm',
    alternateName: 'JC Salm',
    description: 'Club de judo à Senones (Vosges) — Judo, Pilates, Cardio-Training. Ouvert à tous les âges et niveaux depuis 1982. Labellisé France Judo Argent.',
    url: 'https://jcsalm.vercel.app',
    logo: 'https://jcsalm.vercel.app/logo.png',
    image: 'https://jcsalm.vercel.app/hero.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rue du Breuil',
      addressLocality: 'Senones',
      postalCode: '88210',
      addressRegion: 'Grand Est',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.3836,
      longitude: 6.9839,
    },
    email: parametres?.email || 'contact@judoclubsalm.fr',
    sport: 'Judo',
    foundingDate: '1982',
    areaServed: ['Senones', 'Vosges', 'Grand Est'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Monday',    opens: '18:00', closes: '19:15' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday',   opens: '17:15', closes: '19:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '14:15', closes: '20:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday',  opens: '17:30', closes: '20:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Friday',    opens: '17:00', closes: '21:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday',  opens: '09:00', closes: '10:00' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Disciplines',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Judo',            url: 'https://jcsalm.vercel.app/disciplines/judo'            } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pilates',         url: 'https://jcsalm.vercel.app/disciplines/pilates'         } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Cardio-Training', url: 'https://jcsalm.vercel.app/disciplines/cardio-training'  } },
      ],
    },
    sameAs: [
      parametres?.facebook || 'https://www.facebook.com/jcsalm.senones/',
    ],
  }

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <HeroSection photo={parametres?.photo_hero} photoMobile={parametres?.photo_hero_mobile} />
      <DisciplinesGrid photos={{ judo: parametres?.photo_judo, pilates: parametres?.photo_pilates, cardio: parametres?.photo_cardio }} />
      <AboutSection parametres={parametres} photo={parametres?.photo_about} />
      <Actualites posts={actualites} total={totalActualites} facebook={parametres?.facebook} />
      <ScheduleTable schedule={schedule || undefined} />
      <Tarifs groups={tarifsGroups} number="05" />
      <Partners partenaires={partenaires} />
      <Footer parametres={parametres} />
    </main>
  )
}
