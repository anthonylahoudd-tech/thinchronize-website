import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Brand Extension: Production',
  description: 'Sub-brand and campaign identities, icon sets, template kits, guideline updates, and activation kits, built inside your brand system. From $650. Thinchronize production.',
  alternates: { canonical: '/production/brand-extension' },
  openGraph: { url: 'https://thinchronize.com/production/brand-extension', title: 'Brand Extension — Thinchronize' },
}

// Prices: PRICING-CANON v2.1 Section B, Brand Extension.

const data: SignatureDetailData = {
  marqueeTitle: 'EXTENSION',
  heroSub: 'Brand extension, open to everyone. Sub-brands, campaign identities, icon sets, kits, and guideline updates: the system stretched into new territory without losing itself.',
  heroMedia: { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand extension by Thinchronize" },

  about: {
    statement: "The test of a system is territory it wasn't drawn for.",
    body: [
      "Every brand eventually needs something the Brandbook never anticipated: a campaign with its own energy, an event, a sub-brand, a merch line. Extension is designing that new territory from the system's own logic, so it lands fresh and still reads as you.",
      'Seen alone, it works. Seen next to the mother brand, it belongs. We build to pass both tests, and we hand back the rules so your team can keep it consistent after we leave.',
    ],
    builtForLead: 'Brand Extension is built for you if:',
    builtForIf: [
      'A campaign needs its own identity without breaking yours',
      'Sub-brands and events keep spawning off-system',
      'The Brandbook is aging and applications have outgrown it',
      "Templates and kits could free your team's week",
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
        title: 'Fresh without drift',
        body: "New campaigns and sub-brands designed from the system's logic, so novelty never costs recognition.",
      },
      {
        title: 'The system stays current',
        body: 'Guideline updates and new rules keep the Brandbook alive as the brand meets formats it was never drawn for.',
      },
      {
        title: 'Your team, equipped',
        body: 'Template kits and activation kits turn one design investment into months of consistent output.',
      },
    ],
    img: { src: '/images/work/hof/HOF-Image-3.png', alt: 'House of Fashion — brand extension by Thinchronize' },
  },

  galleryLabel: '( Selected Work → )',
  gallery: [
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — work by Thinchronize" },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — work by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — work by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — work by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — work by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — work by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — work by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — work by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: "What's Inside",
    statement: 'Fixed prices from our canon. Two revision rounds on everything.',
    phases: [
      {
        title: 'Marks and lockups',
        body: 'The smaller stretches: adaptations, icons, and event visuals built inside the system.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Merch item design, $150 per item',
          'Logo lockup adaptation, $650',
          'Event or booth key visual, $800',
          'Icon set, 6 to 12 icons, $1,000',
        ],
      },
      {
        title: 'Identities',
        body: 'A campaign or sub-brand with its own presence, unmistakably part of the family.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Sub-brand or event identity, $2,500',
          'Campaign identity, $3,500',
        ],
      },
      {
        title: 'Kits and guidelines',
        body: 'The tools that keep the system alive in daily hands: templates, updated rules, activation kits.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Brand template kit, $1,500',
          'Brand guideline update, $1,500',
          'Brand activation kit, $2,500',
        ],
      },
      {
        title: 'How it runs',
        body: "We start from your Brandbook and existing applications, extend from the system's own logic, two rounds, then hand over the files and the rules.",
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
        company: 'Brand manager, F&B group',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the extension work changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Events director',
        quote: 'Placeholder testimonial. The event identity had its own energy and still read as us. Guests knew whose room they were in.',
      },
      {
        name: 'Dummy Client',
        company: 'Founder, retail brand',
        quote: 'Placeholder testimonial. The template kit turned our two-person team into a content operation that never goes off-brand.',
      },
    ],
  },

  glance: {
    titleLines: ['Extension at', 'a glance'],
    inquireLabel: 'Request a quote',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'Campaigns that break the brand to feel fresh',
          'Sub-brands multiplying without rules',
          'A Brandbook that stopped covering real life',
          'A small team producing high volume',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Open to everyone, no gate',
          'Brands with a system worth protecting',
          'Teams that produce in-house and need kits',
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
          'From $650, campaign identity $3,500',
          'Two revision rounds included',
          'Member and Alumni rates apply',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'Campaigns that belong',
      body: 'Every new push lands fresh and still banks recognition for the mother brand, instead of spending it.',
    },
    {
      title: 'A Brandbook that stays alive',
      body: 'Updated rules and kits mean the system covers real life, so your team stops improvising around it.',
    },
    {
      title: 'Months of output, one investment',
      body: 'A template kit built once powers a season of consistent work from your own people.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to stretch', 'the system?'],
    label: 'Start with Extension',
    href: '/contact',
  },
}

export default function BrandExtensionPage() {
  return <SignatureDetail data={data} />
}
