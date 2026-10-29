import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Print & Editorial Design: Production',
  description: 'Brochures, company profiles, annual reports, menus, decks, and stationery. Built on the brand, print-ready, supervised to press. Fixed prices from $250. Thinchronize production.',
  alternates: { canonical: '/production/print-editorial' },
  openGraph: { url: 'https://thinchronize.com/production/print-editorial', title: 'Print & Editorial — Thinchronize' },
}

// Prices: PRICING-CANON v2.1 Section B, Print & Editorial.

const data: SignatureDetailData = {
  marqueeTitle: 'PRINT',
  heroSub: 'Print and editorial design, open to everyone. From a one-pager to the annual report: built on the brand, print-ready, and supervised to press.',
  heroMedia: { src: '/images/work/whatsub/Whatsub-Image-10.jpg', alt: 'Whatsub — print and editorial by Thinchronize' },

  about: {
    statement: 'Print forgives nothing.',
    body: [
      'A shifted margin, a wrong colour profile, a cheap paper choice: print mistakes are permanent and public. Everything we design leaves print-ready, and when we supervise production, what comes off the press is what you approved.',
      'From flyers to company profiles to the annual reports NGOs live on, every grid, type, and colour decision traces back to your brand system, not to a template.',
    ],
    builtForLead: 'Print & Editorial is built for you if:',
    builtForIf: [
      'The company profile no longer matches the company',
      'An annual report deadline is coming and it has to land',
      'Menus, decks, and stationery each look like a different business',
      'Printers keep shipping something other than what you approved',
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
        title: 'Editorial, not decoration',
        body: 'Documents built to be read: hierarchy, pacing, and grids that carry long content without losing the reader.',
      },
      {
        title: 'Print-ready means print-ready',
        body: 'Bleeds, profiles, and finishes handled from the start, with press supervision available so approval and delivery match.',
      },
      {
        title: 'NGO-fluent',
        body: 'Annual reports and donor-facing materials are a staple here: content-heavy, deadline-bound, and accountable to funders.',
      },
    ],
    img: { src: '/images/work/whatsub/Whatsub-Image-12.jpg', alt: 'Whatsub — editorial design by Thinchronize' },
  },

  galleryLabel: '( Selected Work → )',
  gallery: [
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — work by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — work by Thinchronize' },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — work by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — work by Thinchronize" },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — work by Thinchronize' },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — work by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — work by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — work by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: "What's Inside",
    statement: 'Fixed prices from our canon. Two revision rounds on everything.',
    phases: [
      {
        title: 'Marketing pieces',
        body: 'The everyday print surface, from a flyer to out-of-home.',
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Print-ready adaptation, $250',
          'Rollup or banner, $250',
          'Billboard and OOH adaptation, $300',
          'Flyer or one-pager, $350',
          'Poster, $450',
        ],
      },
      {
        title: 'Editorial and corporate',
        body: "The documents that represent the business when you're not in the room.",
        deliverablesLead: 'Priced from the list:',
        deliverables: [
          'Stationery set (card, letterhead, envelope), $500',
          'Brochure, 4 to 8 pages, $1,300',
          'Menu design, $1,600',
          'Pitch deck or presentation, $2,200',
          'Brochure, 12 to 24 pages, $2,500',
          'Company profile, $2,500',
          'Annual report, 20 to 40 pages, from $3,500',
        ],
      },
      {
        title: 'Press and supervision',
        body: 'We prepare the final artwork for the printer and can stand over the run, so what ships matches what you approved.',
        deliverablesLead: 'Included where scoped:',
        deliverables: [
          'Print-ready file preparation',
          'Printer coordination and supervision',
          'Paper and finish direction',
        ],
      },
      {
        title: 'How it runs',
        body: 'Brief it, we confirm format, page count, and a fixed price, design on your system, two rounds, then print-ready files or a supervised run.',
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
        company: 'NGO program manager',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what proper print changed.',
      },
      {
        name: 'Dummy Client',
        company: 'Restaurant owner',
        quote: 'Placeholder testimonial. The menu redesign paid for itself. Guests notice, and the print run came back exactly as approved.',
      },
      {
        name: 'Dummy Client',
        company: 'Operations director',
        quote: 'Placeholder testimonial. Our company profile finally matches the company. It closes rooms we used to have to talk our way through.',
      },
    ],
  },

  glance: {
    titleLines: ['Print at', 'a glance'],
    inquireLabel: 'Request a quote',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A dated company profile costing credibility',
          'Annual report season with no design capacity',
          'Inconsistent collateral across branches',
          'Print vendors delivering surprises',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Open to everyone, no gate',
          'NGOs with donor reporting cycles',
          'Businesses that still win work on paper',
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
          'Per piece, scoped at briefing',
          'Under $500 upfront, above it 50/50',
        ],
      },
      {
        label: 'Investment',
        items: [
          'From $250, annual reports from $3,500',
          'Two revision rounds included',
          'Member and Alumni rates apply',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'Paper that closes',
      body: 'Profiles, decks, and reports that carry the pitch when nobody from the team is in the room.',
    },
    {
      title: 'No more press surprises',
      body: 'Supervised production means the approved file and the delivered box match.',
    },
    {
      title: 'One look across every branch',
      body: 'Collateral built on the system, so every location hands over the same brand.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to put it', 'on paper,', 'properly?'],
    label: 'Start with Print',
    href: '/contact',
  },
}

export default function PrintEditorialPage() {
  return <SignatureDetail data={data} />
}
