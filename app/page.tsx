import About          from '@/components/sections/About'
import MindfulDesignReveal from '@/components/sections/MindfulDesignReveal'
import Manifesto      from '@/components/sections/Manifesto'
import Work           from '@/components/sections/Work'
import Services       from '@/components/sections/Services'
import AddOns         from '@/components/sections/AddOns'
import AlumniProgram  from '@/components/sections/AlumniProgram'
import Journal        from '@/components/sections/Journal'
import Contact        from '@/components/sections/Contact'
import Marquee        from '@/components/ui/Marquee'
import { getFeaturedCaseStudies, getJournalPosts } from '@/lib/sanity/queries'

export default async function HomePage() {
  const [caseStudies, journalPosts] = await Promise.all([
    getFeaturedCaseStudies(),
    getJournalPosts(),
  ])

  return (
    <>
      <About />

      <MindfulDesignReveal />
      <Marquee dark />
      <Manifesto />
      <Work caseStudies={caseStudies} />
      <Services />
      <AddOns />
      <AlumniProgram />
      <Marquee dark={false} />
      <Journal posts={journalPosts.slice(0, 4)} />
      <Contact />
    </>
  )
}
