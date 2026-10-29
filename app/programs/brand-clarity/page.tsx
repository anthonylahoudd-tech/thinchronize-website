import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Brand Clarity: Strategy Only',
  description: 'The strategy program: research, positioning, audience, personality, and the messaging framework your team writes from, documented before a dollar goes to design. $6,150, 6 to 10 weeks. Thinchronize.',
  alternates: { canonical: '/programs/brand-clarity' },
  openGraph: { url: 'https://thinchronize.com/programs/brand-clarity', title: 'Brand Clarity — Thinchronize' },
}

// Copy sources: SOP-27 (service spec, C1–C7 deliverables), services-explained.md,
// PRICING-CANON v2.1. Voice: precise, direct, grounded — point A / point B,
// "we don't design until we understand." No invented claims.

const data: SignatureDetailData = {
  marqueeTitle: 'CLARITY',
  heroSub: 'Brand Clarity is our strategy program for the business that has momentum but no shared story behind it. We define the position, the audience, and the message, so the whole company finally says one thing.',
  heroMedia: { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Brand strategy work by Thinchronize' },

  about: {
    statement: 'Know exactly who you are, before you spend to grow.',
    body: [
      "The name is the method: think, then synchronize. A brand drifts when what you believe, what you say, and what you ship stop moving together. Clarity synchronizes the thinking. Research documents where you actually stand today, and that is your point A. Strategy defines where you are going, and that is point B.",
      "Everything we hand you exists to close the gap between them, in writing: positioning, audience, personality, and the messaging your team will actually use. We don't design until we understand. Clarity is the understanding.",
    ],
    builtForLead: 'Clarity is built for you if:',
    builtForIf: [
      "You've grown, and the way you talk about the business hasn't kept up",
      'Ask five people on your team what you do and you get five answers',
      "Prospects can't quickly tell why you, over the cheaper option",
      "You're about to launch, raise, or expand and everything needs to say one thing",
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why start', 'with Clarity'],
    items: [
      {
        title: 'Give the business one direction',
        body: 'Clarity turns scattered opinions into a single strategy that guides real decisions: what to build, who to hire, where to grow. Not just how the brand looks.',
      },
      {
        title: 'Get the whole company saying one thing',
        body: "Define who you are, who you serve, and why it matters, in language your team can actually use. From the founder's pitch to the person answering the phone.",
      },
      {
        title: 'Make your difference obvious',
        body: 'Turn "what makes you different?" from the question you dread into the first thing a prospect understands about you.',
      },
    ],
    img: { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — brand strategy by Thinchronize' },
  },

  galleryLabel: '( Clarity Clients → )',
  gallery: [
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — brand by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — brand by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand by Thinchronize" },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — brand by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — brand by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — brand by Thinchronize' },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — brand by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: 'Clarity Process',
    statement: 'Our work together unfolds across four strategic stages. Each one closes with a document you keep.',
    phases: [
      {
        title: 'Research',
        body: 'The study. Your customers, your competitors, your category, your own materials. We document where the brand actually stands today: point A, on evidence, not impressions.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Stakeholder and customer conversations',
          'Competitive scan and category read',
          'Insight and SWOT Report',
          'Brand Reality Report (the current state, documented)',
          'Insight Hypothesis (the one truth your next move builds on)',
        ],
      },
      {
        title: 'Foundation and Positioning',
        body: "Why the business exists, what it stands for, and where it wins, then who it's for. The audience defined and prioritized, plus a positioning statement that plants the flag.",
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Brand Foundation Document (purpose, values, position)',
          'Audience definition, in priority order',
          'Positioning statement',
        ],
      },
      {
        title: 'Personality and Perception',
        body: 'How the brand behaves and speaks, plus the honest gap between how you see yourselves and how the market sees you, with the plan to bridge it.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Brand personality and archetype',
          'We Are / We Are Not',
          'Brand story and manifesto',
          'Perception Gap and Bridge Strategy',
        ],
      },
      {
        title: 'Messaging Framework',
        body: 'The final deliverable. What the brand says, to whom, with what proof: the framework your team writes from every day. Your written approval of this document closes the program.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Core messages and proof points',
          'Voice direction',
          'Message architecture, by audience',
          'The complete strategy document set, handed over',
        ],
      },
      {
        title: 'Ready for the visuals?',
        body: "Clarity is the strategy half. When you're ready to dress it, the Brand Identity Program starts with a verification that passes fast for a Clarity graduate, because we built the strategy. Or take the whole build as one Brand Engagement and save about 5% against buying the halves apart.",
        deliverablesLead: 'Where it leads:',
        deliverables: [
          'Brand Identity Program (the visual half)',
          'Full Brand Engagement (the whole, as one build)',
          'Brand Guardianship (Clarity qualifies you directly, no audit needed)',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'F&B founder, Beirut',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the strategy work changed for the business.',
      },
      {
        name: 'Dummy Client',
        company: 'NGO director',
        quote: 'Placeholder testimonial. The reporting language our donors see finally matches who we are, and every proposal now starts from the same foundation.',
      },
      {
        name: 'Dummy Client',
        company: 'SaaS co-founder',
        quote: 'Placeholder testimonial. We walked in with a logo and a hundred opinions. We walked out knowing exactly what to say, to whom, and why it wins.',
      },
      {
        name: 'Dummy Client',
        company: 'Retail owner, Gulf',
        quote: 'Placeholder testimonial. The positioning work paid for itself the first time we briefed an agency and they simply executed it, no discovery weeks.',
      },
    ],
  },

  glance: {
    titleLines: ['Clarity at', 'a glance'],
    inquireLabel: 'Inquire about Clarity',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          "You've grown and the story hasn't kept up",
          'The team explains the business differently in every room',
          'A new market needs a position that travels',
          'You want the strategy locked before you spend to grow',
          'Early stage, and you want the foundation first',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Founder in the room, so strategy is built with you, not near you',
          "Decision-makers who show up to the working sessions",
          'Ready to answer hard questions honestly',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Founder-led, always',
          'Strategy and research directed by Anthony, CSO',
          'Craft and delivery bar held by Wassim, COO',
          'One team from research to messaging, no handoffs',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          '6 to 10 weeks',
          '50% on signing, 50% on messaging framework approval',
        ],
      },
      {
        label: 'Investment',
        items: [
          '$6,150 in Lebanon, Gulf and US scoped to market',
          'A Brand Audit fee credits in',
          'thinc. Research from the last 12 months comes off the price',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'Decisions get faster',
      body: 'A documented strategy answers the positioning questions once. Your team decides against it instead of reopening the debate every quarter.',
    },
    {
      title: 'Your pitch converts sooner',
      body: 'When the whole company tells one story, prospects understand your value faster and the pitch does more of the work for you.',
    },
    {
      title: 'You compete on value, not price',
      body: 'A clear, evidenced position lets you sell on what makes you different, instead of discounting to match the cheaper option.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to know', 'exactly who', 'you are?'],
    label: 'Start with Clarity',
    href: '/contact',
  },
}

export default function BrandClarityPage() {
  return <SignatureDetail data={data} />
}
