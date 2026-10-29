import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Packaging Design: Production',
  description: 'Labels, single packs, and full SKU lines. Designed on the brand, engineered for the shelf, dieline-ready and supervised to print. Lines from $5,000. Thinchronize production.',
  alternates: { canonical: '/production/packaging' },
  openGraph: { url: 'https://thinchronize.com/production/packaging', title: 'Packaging — Thinchronize' },
}

// Prices: PRICING-CANON v2.1 Section B, Packaging.

const data: SignatureDetailData = {
  marqueeTitle: 'PACKAGING',
  heroSub: 'Packaging design, open to everyone. Labels, single packs, and full SKU lines: designed on the brand, engineered for the shelf, dieline-ready and supervised to print.',
  heroMedia: { src: '/images/work/cafe-bdooz/Image-7-Bdooz.jpg', alt: 'Café Bdooz — packaging by Thinchronize' },

  about: {
    statement: "Three seconds, at arm's length.",
    body: [
      "That's how packaging is judged: a stranger, a shelf, three seconds. The design has to say what it is, whose it is, and why it's worth more, before the hand moves.",
      'We design the line\'s architecture first, then every SKU inside it, so the shelf reads as one family and SKU number twelve still fits. Everything ships dieline-ready and colour-managed, with print supervision so the shelf matches the screen.',
    ],
    builtForLead: 'Packaging is built for you if:',
    builtForIf: [
      'The product is better than the pack says it is',
      'SKUs multiplied and the shelf stopped reading as one brand',
      "Retail buyers want retail-ready and you're not there yet",
      'Print runs keep coming back wrong',
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
        title: 'Designed as a line',
        body: 'The system comes first, so every SKU belongs to the family and new ones drop in without a redesign.',
      },
      {
        title: 'Engineered, not just styled',
        body: 'Dielines, materials, and print constraints live in the design from day one, so what you approve is what can actually be produced.',
      },
      {
        title: 'Supervised to the shelf',
        body: 'Mockups before production and supervision during it: the pack in your hand matches the one on screen.',
      },
    ],
    img: { src: '/images/work/cafe-bdooz/Image-3-Bdooz.jpg', alt: 'Café Bdooz — packaging line by Thinchronize' },
  },

  galleryLabel: '( Selected Work → )',
  gallery: [
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — work by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — work by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — work by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — work by Thinchronize" },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — work by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — work by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — work by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — work by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: "What's Inside",
    statement: 'Fixed prices from our canon. Two revision rounds on everything.',
    phases: [
      {
        title: 'Single packs and labels',
        body: 'One product, done properly: the label or the pack, designed on the brand and ready for print.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'SKU adaptation, $400 each',
          'Label design, $1,000',
          'Single packaging design, $2,000',
        ],
      },
      {
        title: 'Lines',
        body: 'The family, architected first: a system that holds three SKUs today and twelve next year.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Packaging line, 3 to 5 SKUs, from $5,000',
          'Line architecture and shelf system',
        ],
      },
      {
        title: 'Production',
        body: 'From approval to the shelf: mockups, dieline-ready artwork, and supervision over the run.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Packaging mockups, $600',
          'Print production supervision, $500',
          'Dieline-ready, colour-managed artwork',
        ],
      },
      {
        title: 'How it runs',
        body: 'Structure and scope agreed first: format, dielines, materials, and a fixed price. Then the system, then every SKU, two rounds, and the press.',
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
        company: 'Founder, food brand',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the packaging changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Production manager',
        quote: 'Placeholder testimonial. First run in years that came back matching the approval. The supervision paid for itself on sheet one.',
      },
      {
        name: 'Dummy Client',
        company: 'Owner, FMCG line',
        quote: 'Placeholder testimonial. New SKUs used to mean a new design fight. Now they drop into the system in days.',
      },
    ],
  },

  glance: {
    titleLines: ['Packaging at', 'a glance'],
    inquireLabel: 'Request a quote',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A shelf presence below the product quality',
          'A line that grew without a system',
          'Retail listings that demand retail-ready',
          'Costly reprints from unmanaged production',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Open to everyone, no gate',
          'F&B and FMCG lines, single products, launches',
          'Brands preparing for retail or export',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Designed in-house, one quality bar',
          'Craft and print supervision led by Wassim',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          'Scoped per pack or per line at briefing',
          'Under $500 upfront, above it 50/50',
        ],
      },
      {
        label: 'Investment',
        items: [
          'From $400 per SKU adaptation, lines from $5,000',
          'Two revision rounds included',
          'Member and Alumni rates apply',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'Shelf presence that sells',
      body: 'The pack says what it is, whose it is, and why it costs more, in the three seconds it actually gets.',
    },
    {
      title: 'SKUs that scale',
      body: 'New products join the family in days, because the line was architected as a system from the start.',
    },
    {
      title: 'No more reprint bills',
      body: 'Dieline-ready artwork and supervised runs mean the expensive mistakes never reach the press.',
    },
  ],

  finalCta: {
    titleLines: ['Ready for', 'the shelf?'],
    label: 'Start with Packaging',
    href: '/contact',
  },
}

export default function PackagingPage() {
  return <SignatureDetail data={data} />
}
