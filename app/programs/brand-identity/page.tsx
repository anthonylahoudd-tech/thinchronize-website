import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Brand Identity Program: Visual Identity, Verified First',
  description: 'A new visual identity built on a strategy that checks out. Verification first, then the full system: logo, colour, typography, Brandbook, and team activation. $5,650, 4 to 6 weeks. Thinchronize.',
  alternates: { canonical: '/programs/brand-identity' },
  openGraph: { url: 'https://thinchronize.com/programs/brand-identity', title: 'Brand Identity Program — Thinchronize' },
}

// Copy sources: SOP-28 (service spec), services-explained.md §4b, PRICING-CANON v2.1.

const data: SignatureDetailData = {
  marqueeTitle: 'IDENTITY',
  heroSub: 'The Brand Identity Program is a new visual identity built on a strategy that checks out. We verify the thinking first, then design the system: logo, colour, typography, and the Brandbook your team runs on.',
  heroMedia: { src: '/images/work/careem/Careem-2.jpeg', alt: 'Careem — visual identity by Thinchronize' },

  about: {
    statement: 'A new face on a broken foundation is money burned.',
    body: [
      "Most rebrands start with design. Ours starts with a check. Strategy Verification is a short paid review of the strategy your identity will stand on. If it passes, the fee credits into the program and we design. If it fails, the fee credits toward fixing the strategy instead, because we won't sell you a beautiful mask.",
      'Then the system gets built as one language: logo and mark system, colour, typography, iconography, and the Brandbook that keeps every application consistent. It closes with a working session so your team can actually run it.',
    ],
    builtForLead: 'The Identity Program is built for you if:',
    builtForIf: [
      'The business has grown and the look still says small',
      'Every application comes out different, and customers notice',
      'You got a rebrand quote elsewhere and nobody asked about your strategy',
      "You're walking into rooms the current identity can't carry",
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why start', 'with Identity'],
    items: [
      {
        title: 'Look the size you actually are',
        body: "The identity catches up with the business, so first impressions carry the weight of what you've built instead of undercutting it.",
      },
      {
        title: 'One system, not one logo',
        body: 'Logo, colour, typography, and iconography built as one language, with the Brandbook that keeps your team and vendors consistent.',
      },
      {
        title: 'Design on a checked foundation',
        body: 'Verification first means the money goes into an identity that expresses the right strategy, built once instead of redone in two years.',
      },
    ],
    img: { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — identity system by Thinchronize' },
  },

  galleryLabel: '( Identity Clients → )',
  gallery: [
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — brand by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand by Thinchronize' },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — brand by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — brand by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand by Thinchronize" },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — brand by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — brand by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: 'Identity Process',
    statement: 'Our work together unfolds across five stages. Each one ends with something you keep.',
    phases: [
      {
        title: 'Strategy Verification',
        body: 'Before any design, we review the strategy the identity will stand on. Pass: the fee credits into the program and we proceed. Fail: the fee credits toward fixing the strategy first. A recent thinc. audit with a strong strategy score waives this gate entirely.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Verification read of your existing strategy',
          'Pass or fix recommendation, in writing',
          'The fee ($500 to $800) credits in when it passes',
        ],
      },
      {
        title: 'Alignment',
        body: 'The strategy translated into design direction: what the visual system must express, agreed with you before anything is drawn.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Design direction, agreed together',
          'Visual territory and references',
          'The brief every design decision is judged against',
        ],
      },
      {
        title: 'The Visual System',
        body: 'The identity itself: logo and mark system, colour, typography, iconography. Presented with the thinking shown, refined with you, finalized.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Logo and mark system',
          'Colour palette',
          'Typography system',
          'Iconography direction',
        ],
      },
      {
        title: 'Brandbook',
        body: "The rulebook that keeps the identity consistent across every team, touchpoint, and market. Files delivered in every format you'll need.",
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'The Brandbook (brand guidelines)',
          'Application examples',
          'File delivery, all formats',
        ],
      },
      {
        title: 'Team Activation',
        body: 'A working session with your team so the system is understood and used, not stored in a folder.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Internal team session',
          'Do and do-not application rules',
          'Handover of the complete system',
        ],
      },
      {
        title: 'Want the strategy done too?',
        body: 'The Identity Program dresses a strategy that already works. If the thinking itself needs building, Brand Clarity does the strategy half, and the full Brand Engagement does both as one build for about 5% less than the halves apart.',
        deliverablesLead: 'Where it leads:',
        deliverables: [
          'Brand Clarity (the strategy half)',
          'Full Brand Engagement (the whole, as one build)',
          'Brand Guardianship (keep it true once it ships)',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'Retail founder, Beirut',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the new identity changed for the business.',
      },
      {
        name: 'Dummy Client',
        company: 'F&B owner',
        quote: 'Placeholder testimonial. The verification caught a positioning problem before we spent on design. The identity we got expresses who we actually are.',
      },
      {
        name: 'Dummy Client',
        company: 'Tech co-founder',
        quote: 'Placeholder testimonial. For the first time our decks, site, and packaging look like one company. The Brandbook made consistency the default.',
      },
    ],
  },

  glance: {
    titleLines: ['Identity at', 'a glance'],
    inquireLabel: 'Inquire about Identity',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'The look no longer matches the size of the business',
          'Applications inconsistent across teams and vendors',
          "A strategy that works, wearing an identity that doesn't",
          'Entering rooms and markets that demand more polish',
          'An audit flagged the identity specifically',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'A strategy that checks out, or the will to fix it first',
          'Decision-maker present at the reviews',
          'A team ready to adopt one system',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Founder-led, always',
          'Creative direction by Anthony, CCO',
          'Craft and delivery bar held by Wassim, COO',
          'One team from verification to handover',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          '4 to 6 weeks after verification',
          '50% on signing, 50% on delivery',
        ],
      },
      {
        label: 'Investment',
        items: [
          '$5,650 in Lebanon, Gulf and US scoped to market',
          'Strategy Verification $500 to $800, credits in when it passes',
          'Waived by a recent thinc. audit with a strong strategy score',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'First impressions stop costing you',
      body: "The brand walks into the room looking the size of the work, so credibility isn't rebuilt at the start of every meeting.",
    },
    {
      title: 'Consistency without policing',
      body: 'The Brandbook makes on-brand the default. Your team and vendors produce work that matches, without you checking every file.',
    },
    {
      title: "The rebrand you never redo",
      body: 'Because the strategy was verified before design, the identity holds as you grow instead of dating in two years.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to look', 'like the business', "you've become?"],
    label: 'Start with Identity',
    href: '/contact',
  },
}

export default function BrandIdentityPage() {
  return <SignatureDetail data={data} />
}
