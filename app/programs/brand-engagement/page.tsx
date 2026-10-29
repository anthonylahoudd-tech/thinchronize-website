import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Brand Engagement: The Full Build',
  description: 'The flagship. Research, strategy, identity, Brandbook, launch, and team activation, delivered by one team as one system. Two tracks, Launch and Rebuild. $11,200, 10 to 18 weeks. Thinchronize.',
  alternates: { canonical: '/programs/brand-engagement' },
  openGraph: { url: 'https://thinchronize.com/programs/brand-engagement', title: 'Brand Engagement — Thinchronize' },
}

// Copy sources: SOP-26 (service spec), services-explained.md §4, PRICING-CANON v2.1.

const data: SignatureDetailData = {
  marqueeTitle: 'ENGAGEMENT',
  heroSub: "The Brand Engagement is our flagship, the complete build. Research, strategy, identity, Brandbook, launch, and team activation, delivered by one team as one system. For the brand that doesn't exist yet, or the one that no longer fits what you've become.",
  heroMedia: { src: '/images/work/don-bosco/Don-Bosco-1.jpeg', alt: 'Don Bosco — full brand engagement by Thinchronize' },

  about: {
    statement: 'One team builds everything, so everything says one thing.',
    body: [
      "Change is inevitable. Evolution is designed. The Engagement is where we design it end to end: research documents where you actually stand, and that is point A. Strategy defines where you're going, and that is point B. Then the identity, the Brandbook, the launch, and the internal activation close the gap, deliberately.",
      'No handoffs between a strategy shop and a design shop, no translation loss. The people who define the position are the people who design its expression, from the first interview to the day your team starts living it.',
    ],
    builtForLead: 'The Engagement is built for you if:',
    builtForIf: [
      "You're building something new and want the brand right from day one",
      'The business evolved and the brand stayed behind',
      'Teams, decks, and vendors each tell a different story',
      'The market sees you differently than you see yourselves',
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why start', 'with Engagement'],
    items: [
      {
        title: 'Everything, built to agree',
        body: 'Strategy, identity, and messaging come from one brain, so what you say, how you look, and what you ship finally move together.',
      },
      {
        title: 'Evidence before expression',
        body: 'Research is a component of the program, not a courtesy. The brand is built on where you actually stand, not on a moodboard.',
      },
      {
        title: 'A brand your team can run',
        body: 'It ends with the Brandbook, a launch, and internal activation, so the system lives in daily use instead of in a folder.',
      },
    ],
    img: { src: '/images/work/whatsub/Whatsub-Image-13.jpg', alt: 'Whatsub — brand build by Thinchronize' },
  },

  galleryLabel: '( Engagement Clients → )',
  gallery: [
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — brand by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — brand by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — brand by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand by Thinchronize" },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — brand by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand by Thinchronize' },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — brand by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: 'Engagement Process',
    statement: 'Our work together unfolds across four movements, from evidence to adoption.',
    phases: [
      {
        title: 'Research',
        body: 'The study. Customers, competitors, category, and your own materials, documented as point A. Already did our Research in the last 12 months? The component comes off the price, because you never pay for the same understanding twice.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Stakeholder and customer conversations',
          'Competitive scan and category read',
          'Brand Reality Report',
          'Insight Hypothesis',
        ],
      },
      {
        title: 'Strategy',
        body: 'The full strategic foundation: positioning, audience, personality, perception, and messaging, worked through with you and pressure-tested against the evidence.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Brand Foundation Document',
          'Audience definition and positioning statement',
          'Personality, story, and We Are / We Are Not',
          'Messaging Framework',
        ],
      },
      {
        title: 'Expression',
        body: 'The strategy made visible: logo and mark system, colour, typography, iconography, and the Brandbook that keeps it consistent everywhere.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Full visual identity system',
          'Brand applications',
          'The Brandbook',
        ],
      },
      {
        title: 'Adoption',
        body: 'Launch outside, activation inside. The new brand lands with intent, and the people carrying it daily know exactly how.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Launch activation strategy',
          'Internal team activation session',
          'Complete system handover',
        ],
      },
      {
        title: 'What comes after',
        body: 'Every Engagement ends with a Guardianship conversation, because a brand nobody guards, drifts. And the Engagement alone crosses the Alumni threshold: 25 to 30% off all production, permanently.',
        deliverablesLead: 'Where it leads:',
        deliverables: [
          'Brand Guardianship (monthly direction, quarterly score)',
          'Alumni status (permanent production rate, earned in one step)',
          'Production on a verified brand, where every piece compounds',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'Founder, hospitality group',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the full build changed for the business.',
      },
      {
        name: 'Dummy Client',
        company: 'NGO director',
        quote: 'Placeholder testimonial. One team carried us from research to launch. Nothing was lost in translation because there was no translation.',
      },
      {
        name: 'Dummy Client',
        company: 'SaaS co-founder',
        quote: 'Placeholder testimonial. We rebranded once, properly. Two years later the system still fits, and our team still uses the Brandbook weekly.',
      },
    ],
  },

  glance: {
    titleLines: ['Engagement at', 'a glance'],
    inquireLabel: 'Inquire about the Engagement',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A brand that no longer fits what the business became',
          'Launching with no brand at all',
          'Growth stalling on an unclear story',
          'Complexity compounding across products and markets',
          'A rebrand overdue, and everyone knows it',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Two tracks, one program: Launch for new brands, Rebuild for existing ones',
          'Founder time at kickoff, workshops, and approvals',
          'Serious about the full build, not a facelift',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Founder-led, always',
          'Strategy and creative direction by Anthony, CSO and CCO',
          'Craft and delivery bar held by Wassim, COO',
          'One team, first interview to launch',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          '10 to 18 weeks, not compressible',
          '40% on signing, 30% on strategy approval, 30% on delivery',
        ],
      },
      {
        label: 'Investment',
        items: [
          '$11,200 in Lebanon, Gulf and US scoped to market',
          'About 5% under buying Clarity and Identity apart',
          'Audit fees and thinc. Research credit in',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'Growth stops leaking',
      body: 'Sales, marketing, and product finally pull one direction, so effort compounds instead of cancelling out.',
    },
    {
      title: 'Decisions speed up',
      body: 'A documented brand answers questions before they become meetings, from hiring pages to campaign briefs.',
    },
    {
      title: 'Production pays back more',
      body: 'Everything made after launch starts from a verified system, so every piece lands further and costs less to brief.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to build', 'the brand', 'that fits?'],
    label: 'Start with the Engagement',
    href: '/contact',
  },
}

export default function BrandEngagementPage() {
  return <SignatureDetail data={data} />
}
