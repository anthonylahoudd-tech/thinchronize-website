import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Motion & Animation: Production',
  description: 'Logo animation, social motion, promos, and 30 to 60 second explainers, storyboarded before frame one. From $400. Thinchronize production.',
  alternates: { canonical: '/production/motion' },
  openGraph: { url: 'https://thinchronize.com/production/motion', title: 'Motion / Animation — Thinchronize' },
}

// Prices: PRICING-CANON v2.1 Section B, Motion / Animation.

const data: SignatureDetailData = {
  marqueeTitle: 'MOTION',
  heroSub: 'Motion and animation, open to everyone. Idents, social motion, promos, and explainers: every frame from a defined motion voice, storyboarded before animation begins.',
  heroMedia: { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — motion work by Thinchronize' },

  about: {
    statement: "Motion is the brand's body language.",
    body: [
      'How the logo enters, how a post moves, how an explainer breathes: motion carries character the way a voice does. We treat it as brand direction, not decoration, so a six-second ident and a sixty-second explainer feel like the same personality.',
      'Nothing animates without an approved storyboard. Motion is too expensive to improvise, so the idea is agreed on paper before a single frame is rendered.',
    ],
    builtForLead: 'Motion is built for you if:',
    builtForIf: [
      'The feed is static while competitors move',
      'The product needs explaining in under a minute',
      'The logo just sits there in every video',
      'Motion exists, but every clip feels like a different brand',
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why produce', 'with thinc.'],
    items: [
      {
        title: 'Storyboard before spend',
        body: 'The idea is approved on paper first, so the animation budget executes a decision instead of searching for one.',
      },
      {
        title: 'One motion voice',
        body: 'A defined vocabulary of movement keeps every clip, from ident to explainer, unmistakably yours.',
      },
      {
        title: 'Made for the channel',
        body: 'Delivered in every ratio and codec the platforms need. Ready to run, not ready to re-edit.',
      },
    ],
    img: { src: '/images/work/don-bosco/Don-Bosco-1.jpeg', alt: 'Don Bosco — brand motion by Thinchronize' },
  },

  galleryLabel: '( Selected Work → )',
  gallery: [
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — work by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — work by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — work by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — work by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — work by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — work by Thinchronize" },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — work by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — work by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: "What's Inside",
    statement: 'Fixed prices from our canon. Two revision rounds on everything.',
    phases: [
      {
        title: 'Social motion',
        body: 'The moving pieces that keep the feed alive, built on your system.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Animated social post, $400',
          '10 to 15 second motion piece, $1,000',
          'Video edit from supplied footage, $1,000',
        ],
      },
      {
        title: 'Brand motion',
        body: 'How the brand itself moves: idents, logo animation, and the promo formats campaigns hang on.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Simple logo animation, $1,050',
          'Advanced logo animation, $2,200',
          '30 second promo or brand motion, $2,500',
        ],
      },
      {
        title: 'Explainers',
        body: 'The product or the idea, made watchable: 30 to 60 seconds a prospect actually finishes.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Explainer animation, 30 to 60 seconds, $5,000',
          'Script beats and storyboard included',
          'Storyboard approved before frame one',
        ],
      },
      {
        title: 'How it runs',
        body: 'Concept and storyboard first, approved on paper. Then animation in the brand\'s motion voice, two rounds, and delivery in every ratio the channels need.',
        deliverablesLead: 'Good to know:',
        deliverables: [
          'Lebanon prices, Gulf and US scoped to market',
          'Complexity and rush cost more, never less',
          'Guardianship members and Alumni get their rates',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'Founder, tech startup',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what motion changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Marketing lead, services',
        quote: 'Placeholder testimonial. The explainer replaced our ten-minute pitch. Prospects arrive at the call already understanding the product.',
      },
      {
        name: 'Dummy Client',
        company: 'Brand manager',
        quote: 'Placeholder testimonial. Storyboard-first meant every revision happened on paper, where it cost minutes instead of render days.',
      },
    ],
  },

  glance: {
    titleLines: ['Motion at', 'a glance'],
    inquireLabel: 'Request a quote',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A static feed in a moving category',
          'A product too complex for a paragraph',
          'Video content with no brand character',
          'Animation budgets burned on unplanned renders',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Open to everyone, no gate',
          'Best on a brand with a defined identity to move',
          'Launches, campaigns, and product explainers',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Designed and animated in-house, one quality bar',
          'Direction by Anthony, craft check by Wassim',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          'Scoped per piece at briefing, storyboard first',
          'Under $500 upfront, above it 50/50',
        ],
      },
      {
        label: 'Investment',
        items: [
          'From $400, explainers $5,000',
          'Two revision rounds included',
          'Member and Alumni rates apply',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'The scroll stops',
      body: 'Moving content earns attention the static feed was losing, and it earns it in your character, not a template\'s.',
    },
    {
      title: 'Complex made watchable',
      body: 'An explainer turns a ten-minute pitch into sixty seconds a prospect actually finishes.',
    },
    {
      title: 'No wasted renders',
      body: 'Storyboard-first means revisions happen on paper, where they cost minutes instead of days.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to put', 'the brand', 'in motion?'],
    label: 'Start with Motion',
    href: '/contact',
  },
}

export default function MotionPage() {
  return <SignatureDetail data={data} />
}
