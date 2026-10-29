'use client'

import PageHero, { H } from '@/components/ui/PageHero'
import StackedDeck, { type DeckCardData } from '@/components/deck/StackedDeck'
import ClosingStrip from '@/components/deck/ClosingStrip'

// Research section — Brand Audit + Research, per the 2026-07-15 dev brief.
// Prices from PRICING-CANON v2.1.

const CARDS: DeckCardData[] = [
  {
    id: 'brand-audit',
    num: '01',
    title: 'Audit',
    para: 'Your brand, examined across the five dimensions that decide whether it works — each scored out of 20. One number tells you where you stand: your Brand Health Score out of 100.',
    lists: [
      ['Brand Health Score /100', "What's broken, in order", 'The route forward'],
      ['$1,500', '10–14 days', 'Fee credits toward any program'],
    ],
    note: "Or you just want the score — that's a legitimate reason too.",
    cta: { label: 'Explore the Audit', href: '/research/brand-audit' },
    img: { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand work by Thinchronize' },
  },
  {
    id: 'research',
    num: '02',
    title: 'Research',
    para: "The study. Your customers in their own words, your competitors' customers, your category — the documented reality of where your brand actually stands, and the one insight your next move should be built on.",
    lists: [
      ['Brand Reality Report', 'Insight Hypothesis', 'Works pre-launch too'],
      ['From $2,200', '2–3 weeks', 'Carries into any program'],
    ],
    note: 'Two depths: Standard ($2,200) and Field ($3,700 — real sit-down interviews and a full touchpoint audit).',
    cta: { label: 'Explore Research', href: '/research/research' },
    img: { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand research by Thinchronize" },
  },
]

export default function ResearchClient() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      <PageHero
        title="RESEARCH"
        lines={[
          <>Know <H>where you stand</H> before you</>,
          'spend on a solution.',
        ]}
        bottomLabel="Explore research"
        bottomHref="#research-list"
      />

      <section id="research-list" style={{ backgroundColor: '#FFFFFF' }}>
        <StackedDeck cards={CARDS} label="Know First" />
      </section>

      <ClosingStrip
        statement="The Audit grades. Research understands. Both credit forward."
        links={[
          { lead: 'Not sure which you need?', label: 'Try the Diagnostic', href: '/diagnostic', primary: true },
          { lead: 'Ready to build?', label: 'See the Programs', href: '/programs' },
        ]}
      />

    </div>
  )
}
