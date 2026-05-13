import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import DisciplinesGrid from '@/components/DisciplinesGrid'
import AboutSection from '@/components/AboutSection'
import ScheduleTable from '@/components/ScheduleTable'
import Tarifs, { ALL_DISCIPLINES } from '@/components/Tarifs'
import Partners from '@/components/Partners'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <DisciplinesGrid />
      <AboutSection />
      <ScheduleTable />
      <Tarifs groups={ALL_DISCIPLINES} number="04" />
      <Partners />
      <Footer />
    </main>
  )
}
