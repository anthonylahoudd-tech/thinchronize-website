'use client'

import Link from 'next/link'
import PageHero, { H } from '@/components/ui/PageHero'
import StackedDeck, { type DeckCardData } from '@/components/deck/StackedDeck'
import ClosingStrip from '@/components/deck/ClosingStrip'

// Four public programs — content per website-programs-research-production-dev-brief
// (2026-07-15, approved by Anthony). Prices from PRICING-CANON v2.1.

const CARDS: DeckCardData[] = [
  {
    id: 'brand-clarity',
    num: '01',
    title: 'Clarity',
    para: 'Strategy only — for the business that needs to know exactly who it is before investing in how it looks. Research, positioning, audience, and messaging: the complete strategic foundation, ready to build on.',
    lists: [
      ['Research included (point A)', 'Positioning & audience', 'Messaging framework'],
      ['6–10 weeks', 'From $6,150', 'Leads into Identity or Guardianship'],
    ],
    note: 'Already did our Research? The component comes off the price — you never pay for the same understanding twice.',
    cta: { label: 'Explore Brand Clarity', href: '/programs/brand-clarity' },
    img: { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — brand strategy by Thinchronize' },
  },
  {
    id: 'brand-identity',
    num: '02',
    title: 'Identity',
    para: "A new visual identity built on a strategy that checks out. We verify the strategy first — because putting a new face on a broken foundation is money burned, and we won't sell you that.",
    lists: [
      ['Strategy Verification first', 'Full visual identity system', 'Brandbook'],
      ['4–6 weeks', 'From $5,650', 'Internal team activation session'],
    ],
    note: 'Verification fee ($500–800) credits into the program when the strategy passes — and is waived by a recent thinc. audit.',
    cta: { label: 'Explore the Identity Program', href: '/programs/brand-identity' },
    img: { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — visual identity by Thinchronize' },
  },
  {
    id: 'brand-engagement',
    num: '03',
    title: 'Engagement',
    para: "The flagship. The complete build — research, strategy, identity, Brandbook, launch, and internal activation — in eleven phases. For the brand that doesn't exist yet, or the one that no longer fits what you've become.",
    lists: [
      ['Everything in Clarity + Identity', 'Launch + internal activation', 'Two tracks: Launch / Rebuild'],
      ['10–18 weeks', 'From $11,200', 'Saves ~5% vs the two programs apart'],
    ],
    note: 'Every Engagement ends with a Guardianship conversation — because a brand nobody guards, drifts.',
    cta: { label: 'Explore the Engagement', href: '/programs/brand-engagement' },
    img: { src: '/images/work/don-bosco/Don-Bosco-1.jpeg', alt: 'Don Bosco — full brand engagement by Thinchronize' },
    accent: true,
  },
  {
    id: 'brand-guardianship',
    num: '04',
    title: 'Guardianship',
    para: "We built it — now nobody lets it drift. Monthly direction from the people who know your brand best, an approval desk for anything before it goes public, and a quarterly score that tells you if your brand is getting stronger.",
    lists: [
      ['Monthly direction + session', 'Approval desk (48h verdicts)', 'Brand Decision Log'],
      ['Quarterly Brand Health Score', 'From $1,200/month', 'Member production rate'],
    ],
    note: 'For active brands we’ve built — or verified through the Brand Audit. Three-month minimum, founding rate.',
    cta: { label: 'Explore Guardianship', href: '/programs/brand-guardianship' },
    img: { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand guardianship by Thinchronize' },
  },
]

export default function ProgramsClient() {
  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      <PageHero
        title="PROGRAMS"
        lines={[
          'Purpose-built engagements, refined brand after brand —',
          <>each one solves a <H>specific brand problem</H>.</>,
        ]}
        bottomLabel="Explore all programs"
        bottomHref="#programs-list"
      />

      <section id="programs-list" style={{ backgroundColor: '#FFFFFF' }}>
        <StackedDeck cards={CARDS} label="The Programs" />
      </section>

      <ClosingStrip
        links={[
          { lead: 'Not sure which program?', label: 'Try the Diagnostic', href: '/diagnostic', primary: true },
          { lead: 'Just need things made?', label: 'Production', href: '/production' },
        ]}
      />

    </div>
  )
}
