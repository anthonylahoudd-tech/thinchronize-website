import Hero                  from '@/components/sections/Hero'
import MindfulDesignReveal  from '@/components/sections/MindfulDesignReveal'
import About                from '@/components/sections/About'
import Manifesto       from '@/components/sections/Manifesto'
import Work            from '@/components/sections/Work'
import Services        from '@/components/sections/Services'
import AddOns          from '@/components/sections/AddOns'
import AlumniProgram   from '@/components/sections/AlumniProgram'
import Journal         from '@/components/sections/Journal'
import Contact         from '@/components/sections/Contact'
import Marquee         from '@/components/ui/Marquee'
import { getFeaturedCaseStudies, getJournalPosts } from '@/lib/sanity/queries'

export default async function HomePage() {
  const [caseStudies, journalPosts] = await Promise.all([
    getFeaturedCaseStudies(),
    getJournalPosts(),
  ])

  return (
    <>
      <Hero />

      {/* ── "LIVE FROM BEIRUT!" strip ──────────────────────────────── */}
      <div style={{
        width:            '100%',
        background:       'rgba(255,255,255,0.06)',
        backdropFilter:   'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderTop:        '1px solid rgba(255,255,255,0.1)',
        borderBottom:     '1px solid rgba(255,255,255,0.1)',
        padding:          '20px 80px',
        display:          'flex',
        alignItems:       'center',
        gap:              '48px',
        overflow:         'hidden',
      }}>
        {Array(8).fill('LIVE FROM BEIRUT!').map((text: string, i: number) => (
          <span key={i} style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    900,
            fontSize:      '18px',
            color:         '#D0274B',
            letterSpacing: '0.28em',
            whiteSpace:    'nowrap',
            flexShrink:    0,
          }}>
            {text}
            {i < 7 && <span style={{ color: 'rgba(255,255,255,0.25)', margin: '0 24px' }}>·</span>}
          </span>
        ))}
      </div>

      <MindfulDesignReveal />
      <Marquee dark />
      <About />
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
