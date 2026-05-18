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

  return (
    <main>
      <Navbar />
      <HeroSection photo={parametres?.photo_hero} />
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
