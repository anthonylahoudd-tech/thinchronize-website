import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Brand Audit: Your Brand Health Score /100',
  description: 'Your brand examined across five dimensions, each scored out of 20. The Brand Health Report: your score out of 100, what to fix in order, and the route forward. $1,500, 10 to 14 days, fee credits toward any program.',
  alternates: { canonical: '/research/brand-audit' },
  openGraph: { url: 'https://thinchronize.com/research/brand-audit', title: 'Brand Audit — Thinchronize' },
}

// Copy sources: SOP-29, services-explained.md §3, PRICING-CANON v2.1.

const data: SignatureDetailData = {
  marqueeTitle: 'AUDIT',
  heroSub: 'The Brand Audit is the checkup. Your brand examined across the five dimensions that decide whether it works, each scored out of 20. One number tells you where you stand: your Brand Health Score out of 100.',
  heroMedia: { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand work by Thinchronize' },

  about: {
    statement: "You wouldn't treat before a diagnosis. Don't rebrand before one either.",
    body: [
      'We examine the brand the way a doctor runs a checkup: strategy clarity, identity system strength, voice consistency, market positioning, and execution quality. Each dimension scored out of 20, on evidence: your materials, your channels, your competitors, and what customers actually say.',
      "It ends in the Brand Health Report: your score out of 100, what's strong, what's broken in order of what to fix first, and the route forward. The audit never fixes anything. It diagnoses and points, and the fee credits toward whatever comes next.",
    ],
    builtForLead: 'The Audit is built for you if:',
    builtForIf: [
      'Something is off with the brand and nobody can name it',
      "You're about to spend on brand work and want to know what actually needs fixing",
      "The team can't agree on how the brand is doing",
      'You just want the truth in a number, and that counts too',
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why start', 'with the Audit'],
    items: [
      {
        title: 'Spend on the right problem',
        body: "The report ranks what's broken in order, so the budget goes to what moves the score, not to what was loudest in the meeting.",
      },
      {
        title: 'One picture the whole team shares',
        body: 'A score out of 100 ends the internal debate. Everyone argues from the same number and the same findings.',
      },
      {
        title: 'A baseline you can re-measure',
        body: 'The same instrument Guardianship re-checks every quarter. Score it once and brand health becomes a trend, not an opinion.',
      },
    ],
    img: { src: '/images/work/hof/HOF-Image-2.png', alt: 'House of Fashion — brand work by Thinchronize' },
  },

  galleryLabel: '( Audit Clients → )',
  gallery: [
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — brand by Thinchronize' },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — brand by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — brand by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — brand by Thinchronize' },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — brand by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand by Thinchronize" },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: 'Audit Process',
    statement: 'Ten to fourteen days, three steps, one honest number.',
    phases: [
      {
        title: 'Evidence',
        body: 'Desk audit of your materials, online presence, a competitive scan, customer conversations, and review mining. The checkup runs on evidence, not impressions.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Materials and channel audit',
          'Competitive scan',
          'Customer conversations and review mining',
        ],
      },
      {
        title: 'Five dimensions, scored',
        body: 'Strategy clarity. Identity system strength. Voice consistency. Market positioning. Execution quality. Each examined and scored out of 20.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Five dimension scores, out of 20 each',
          'Brand Health Score out of 100',
        ],
      },
      {
        title: 'The Brand Health Report',
        body: 'The score, the findings, what to do next in order, and the recommended route: build, fix the strategy, or simply know where you stand.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'The Brand Health Report',
          'Fix list, in priority order',
          'Recommended routing, fee credited forward',
        ],
      },
      {
        title: 'The grade, or the depth?',
        body: 'The Audit grades. Research understands. If you need the documented reality underneath the score, they can be bought together, and both fees credit toward any program.',
        deliverablesLead: 'Where it leads:',
        deliverables: [
          'Research (the study underneath the grade)',
          'Any program (the fee credits in)',
          'Guardianship (a passed audit qualifies you directly)',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'Owner, F&B brand',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the score changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Managing partner, firm',
        quote: 'Placeholder testimonial. We were about to redesign the logo. The report showed the logo scored fine and the messaging was the leak. It saved the budget.',
      },
      {
        name: 'Dummy Client',
        company: 'NGO director',
        quote: 'Placeholder testimonial. One number ended a year of internal debate about the brand. Now we re-measure it every quarter.',
      },
    ],
  },

  glance: {
    titleLines: ['The Audit at', 'a glance'],
    inquireLabel: 'Book the Audit',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A rebrand decision waiting on evidence',
          'Internal disagreement about the brand',
          'A brand inherited by new leadership',
          'Preparing for growth, funding, or a new market',
          'Curiosity with a budget: knowing the score is a legitimate reason',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Any existing brand, any size',
          'Access to your materials and channels',
          'A short intake conversation, the rest is on us',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Founder-led, always',
          'Scored by Anthony, CSO',
          'Craft dimensions checked by Wassim, COO',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          '10 to 14 days',
          'Full payment on signing',
        ],
      },
      {
        label: 'Investment',
        items: [
          '$1,500 in Lebanon, Gulf and US scoped to market',
          'The fee credits toward any program after it',
          'There is no premium audit. This is the audit.',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'Misdirected spend, prevented',
      body: "Knowing exactly what's broken before commissioning work is the cheapest money a brand budget ever spends.",
    },
    {
      title: 'The argument ends',
      body: 'One number and one report replace months of internal opinion about how the brand is doing.',
    },
    {
      title: 'Every fee works twice',
      body: 'The audit credits into whatever it routes you to, so the diagnosis effectively comes free when you act on it.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to know', 'your score?'],
    label: 'Book the Audit',
    href: '/contact',
  },
}

export default function BrandAuditPage() {
  return <SignatureDetail data={data} />
}
