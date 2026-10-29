import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Social & Digital Design: Production',
  description: 'Posts, stories, carousels, campaign key visuals, and monthly 12-post design systems, built inside your identity. Fixed prices from $100, two revision rounds always. Thinchronize production.',
  alternates: { canonical: '/production/social-digital' },
  openGraph: { url: 'https://thinchronize.com/production/social-digital', title: 'Social / Digital — Thinchronize' },
}

// Prices: PRICING-CANON v2.1 Section B, Social / Digital.

const data: SignatureDetailData = {
  marqueeTitle: 'SOCIAL',
  heroSub: 'Social and digital design, open to everyone. Posts, stories, carousels, key visuals, and monthly design systems, built inside your identity so the feed reads as one brand.',
  heroMedia: { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — social content by Thinchronize' },

  about: {
    statement: 'The feed is the brand, most days.',
    body: [
      'For most of your audience, the feed is where the brand lives. Social and digital design keeps that daily surface coherent: every post, story, and campaign visual built inside your identity, not beside it.',
      'Fixed prices, two revision rounds always included, and one quality bar. Order a single piece, or put the month on a system: twelve posts designed as one, so the grid stops looking like five different vendors.',
    ],
    builtForLead: 'Social / Digital is built for you if:',
    builtForIf: [
      'The grid looks like five different brands had a meeting',
      'Campaigns need key visuals that actually carry the idea',
      "Content is eating the team's week, and the quality shows it",
      'You want a monthly system, not one-off favors',
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
        title: 'Built inside the identity',
        body: 'Every piece starts from your system: colour, type, and voice. The daily output compounds the brand instead of diluting it.',
      },
      {
        title: 'Fixed prices, no surprises',
        body: 'A published price list, two revision rounds included, extras billed only when agreed. You know the number before we start.',
      },
      {
        title: 'Systems, not one-offs',
        body: 'The monthly 12-post design system turns content from a weekly scramble into a machine your team just feeds.',
      },
    ],
    img: { src: '/images/work/cafe-bdooz/Image-1-Bdooz.jpg', alt: 'Café Bdooz — social system by Thinchronize' },
  },

  galleryLabel: '( Selected Work → )',
  gallery: [
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — work by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — work by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — work by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — work by Thinchronize" },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — work by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — work by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — work by Thinchronize' },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — work by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: "What's Inside",
    statement: 'Fixed prices from our canon. Two revision rounds on everything.',
    phases: [
      {
        title: 'Everyday content',
        body: 'The daily pieces, priced per unit and built on your system.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Story design, $100',
          'Adaptation from approved key visual, $120',
          'Static social post, $150',
          '3-post set, $400',
          'Carousel of 5 to 7 slides, $450',
        ],
      },
      {
        title: 'Campaigns and kits',
        body: 'The bigger swings: the visual a campaign hangs on, and the kits that keep profiles and email on-brand.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Social profile kit (covers, avatars, highlights), $250',
          'Email template design, $400',
          'Campaign key visual, $700',
        ],
      },
      {
        title: 'The monthly system',
        body: 'Twelve posts designed as one system each month, so the grid reads as a brand and the team stops reinventing every post.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Monthly 12-post design system, $1,500 per month',
          'Consistent grid, formats, and templates',
          'Two revision rounds, always',
        ],
      },
      {
        title: 'How it runs',
        body: 'Brief it, we confirm scope and a fixed price from the list, design inside your system, two rounds, delivery in every format the channel needs.',
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
        company: 'Café owner, Beirut',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what consistent content changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Marketing lead, retail',
        quote: 'Placeholder testimonial. The monthly system gave us back two days a week. The grid finally looks like one brand.',
      },
      {
        name: 'Dummy Client',
        company: 'Founder, D2C brand',
        quote: 'Placeholder testimonial. Fixed prices meant content became a line item we could actually plan around.',
      },
    ],
  },

  glance: {
    titleLines: ['Social at', 'a glance'],
    inquireLabel: 'Request a quote',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'An inconsistent grid undoing the brand work',
          'Campaigns without a carrying visual',
          'An in-house team drowning in content volume',
          'Ad creative that ignores the identity',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Open to everyone, no audit, no retainer',
          'Best on a verified brand, where every piece compounds',
          'Monthly systems for brands that publish weekly',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Designed in-house, one quality bar',
          'Direction by Anthony, craft check by Wassim',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          'Per piece, scoped at briefing',
          'Under $500 upfront, above it 50/50',
        ],
      },
      {
        label: 'Investment',
        items: [
          'From $100 per piece, systems from $1,500 per month',
          'Two revision rounds included',
          'Member and Alumni rates apply',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'The feed starts compounding',
      body: 'Every post pulls the same direction, so daily content builds recognition instead of resetting it.',
    },
    {
      title: 'Content stops eating the week',
      body: 'A system and templates mean your team feeds the machine instead of redesigning it post by post.',
    },
    {
      title: 'A budget you can plan',
      body: 'Fixed prices per piece and per month make content a line item, not a negotiation.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to make', 'the feed', 'one brand?'],
    label: 'Start with Social',
    href: '/contact',
  },
}

export default function SocialDigitalPage() {
  return <SignatureDetail data={data} />
}
