import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Brand Guardianship: The Retainer',
  description: 'Monthly brand direction from the people who built it: Direction Note, working session, 48-hour approval desk, Decision Log, and a quarterly Brand Health Score. $1,200 per month, founding rate. Thinchronize.',
  alternates: { canonical: '/programs/brand-guardianship' },
  openGraph: { url: 'https://thinchronize.com/programs/brand-guardianship', title: 'Brand Guardianship — Thinchronize' },
}

// Copy sources: SOP-30, guardianship-product-logic-2026-07-09.md, services-explained.md §5, PRICING-CANON v2.1.

const data: SignatureDetailData = {
  marqueeTitle: 'GUARDIANSHIP',
  heroSub: 'Brand Guardianship is the retainer that keeps a built brand true. Monthly direction from the people who know it best, an approval desk before anything goes public, and a quarterly score that tells you if the brand is getting stronger.',
  heroMedia: { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand guardianship by Thinchronize' },

  about: {
    statement: "Brands don't fail suddenly. They drift.",
    body: [
      "Nothing breaks in month one. That's what makes drift dangerous: it's never urgent, only expensive. A new hire improvises a deck, a vendor stretches the logo, a promo goes out off-voice, and two years later you're paying for a rebrand instead of a retainer.",
      'Guardianship makes holding the line someone\'s job, ours. A Direction Note and a working session every month, a desk that reviews anything before it goes public with a verdict in 48 hours, a Decision Log so every brand call is recorded and reasoned, and your Brand Health Score re-measured every quarter.',
    ],
    builtForLead: 'Guardianship is built for you if:',
    builtForIf: [
      'The Brandbook is in a folder and the drift has already started',
      'Your team makes brand decisions weekly, and improvises them',
      'The agency running your marketing grades its own homework',
      "A senior brand director costs $2,500 a month, and still wouldn't know your brand",
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why keep', 'a guardian'],
    items: [
      {
        title: 'Every brand decision, made properly',
        body: "Naming, partnerships, promos, a hire's first designs. Send it to the desk before it goes public and get a verdict within 48 hours.",
      },
      {
        title: 'Quality control on all brand spend',
        body: 'Everything you spend across vendors gets checked for coherence, so the marketing money buys one brand, not fragments.',
      },
      {
        title: 'Health you can measure',
        body: "The same five-dimension score as the Audit, re-checked from the quarter's real evidence. You watch brand health move as a number, not a feeling.",
      },
    ],
    img: { src: '/images/work/yves-morel/Yves-Morel-3.jpeg', alt: 'Yves Morel — brand direction by Thinchronize' },
  },

  galleryLabel: '( Guardianship Clients → )',
  gallery: [
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — brand by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — brand by Thinchronize' },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — brand by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — brand by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — brand by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand by Thinchronize" },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: 'The Rhythm',
    statement: 'Guardianship runs on a rhythm: monthly, quarterly, yearly.',
    phases: [
      {
        title: 'Every month',
        body: "A Direction Note at the start: this month's focus, what we observed, what's coming. A 60 to 90 minute working session. The approval desk with 48-hour verdicts. Direct access in between.",
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Monthly Direction Note',
          'Working session, 60 to 90 minutes',
          'Approval desk, verdicts within 48 hours',
          'Brand Decision Log, kept current',
        ],
      },
      {
        title: 'Every quarter',
        body: "Your Brand Health Score re-measured from the quarter's real evidence: the log, the reviews, the work you shipped. The trend becomes visible early, while it's still cheap to correct.",
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Quarterly Brand Health re-score',
          'Findings and corrections, in priority order',
        ],
      },
      {
        title: 'Every year',
        body: "At month twelve, a full re-examination and the next year's brand agenda: what evolves next, decided together. Renewal stops being a question and becomes a plan.",
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Full month-12 re-examination',
          "Next year's brand agenda",
        ],
      },
      {
        title: 'What it deliberately excludes',
        body: "We define, design, and direct. We never post, schedule, buy ads, or run channels, because a guardian who profits from volume can't referee it. Execution runs through vetted partners under our direction, and members get a preferred production rate.",
        deliverablesLead: 'Where it leads:',
        deliverables: [
          'Member production rate while active',
          'Marketing Management exists for one-relationship clients, ask us',
          'Alumni status at $10,000 cumulative spend, permanent',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'Founder, retail chain',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what having a guardian changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Marketing lead, NGO',
        quote: 'Placeholder testimonial. The 48-hour desk means nothing goes public unchecked anymore. Our donors see one brand, every time.',
      },
      {
        name: 'Dummy Client',
        company: 'CEO, services firm',
        quote: 'Placeholder testimonial. The quarterly score turned brand from a debate into a number the board actually tracks.',
      },
    ],
  },

  glance: {
    titleLines: ['Guardianship at', 'a glance'],
    inquireLabel: 'Inquire about Guardianship',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A fresh brand system entering untrained daily hands',
          'An external agency producing volume with no referee',
          'Multiple locations or markets multiplying drift',
          'Brand decisions landing weekly with no one to call',
          'Donor or investor visibility that punishes missteps',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          "Active brands we've built, or verified through the Brand Audit",
          'A team publishing regularly, or marketing running',
          'Public-facing work routed through the desk, the guarding covers what we see',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'The two people who built your brand',
          'Direction by Anthony, craft bar by Wassim',
          'Direct access between sessions',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          'Three-month minimum, month to month after',
          'Monthly, first payment on signing',
        ],
      },
      {
        label: 'Investment',
        items: [
          '$1,200 per month in Lebanon, founding rate',
          'Gulf and US scoped to market',
          'Member production rate while active',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: "The rebrand you don't buy",
      body: 'Drift caught monthly costs a session. Drift caught in year three costs a rebrand, plus the equity you lost on the way.',
    },
    {
      title: 'Marketing spend stops leaking',
      body: 'Every piece from every vendor gets held to one standard, so the budget builds a single brand instead of feeding fragments.',
    },
    {
      title: 'One number for the board',
      body: 'The quarterly Brand Health Score turns brand from a feeling into a trend you can report, defend, and act on.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to stop', 'the drift?'],
    label: 'Start Guardianship',
    href: '/contact',
  },
}

export default function BrandGuardianshipPage() {
  return <SignatureDetail data={data} />
}
