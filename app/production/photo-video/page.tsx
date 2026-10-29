import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Photography & Videography: Production',
  description: 'Brand shoots, product, food, and brand film. Directed by Thinchronize, produced with vetted partners: one team, one invoice, one quality bar.',
  alternates: { canonical: '/production/photo-video' },
  openGraph: { url: 'https://thinchronize.com/production/photo-video', title: 'Photography & Video — Thinchronize' },
}

// Rules: PRICING-CANON v2.1 Section C, partner production.

const data: SignatureDetailData = {
  marqueeTitle: 'PHOTO & FILM',
  heroSub: 'Photography and film, directed by thinc., produced with vetted partners. Brand shoots, product, food, and brand film: one team, one invoice, our quality bar.',
  heroMedia: { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — photography direction by Thinchronize' },

  about: {
    statement: 'Not stock. Not generic. Your brand, shot.',
    body: [
      "We never hand your brand to a camera and hope. Art direction, shot lists, and references come first, built from your strategy. Then a vetted partner we've worked with operates the production.",
      'We direct on set, curate the selects, and deliver the final material as one team on one invoice. The photography ends up looking like your brand, not like the photographer\'s portfolio.',
    ],
    builtForLead: 'Photo & Film is built for you if:',
    builtForIf: [
      'The website still runs on stock photos',
      'Product shots undersell the product',
      "A brand film is due and you don't want to manage three vendors",
      'Shoots keep happening without direction, and it shows',
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
        title: 'Direction before cameras',
        body: 'Art direction and shot lists are built from the strategy before any partner is briefed, so the shoot executes a plan.',
      },
      {
        title: 'Vetted partners, one door',
        body: 'We match the job to crews whose work clears our bar. You deal with us, they answer to us.',
      },
      {
        title: 'Transparent pricing',
        body: 'Partner quote plus 25% thinc. direction, on one invoice. No fixed prices unless the scope is fixed, and no surprises either.',
      },
    ],
    img: { src: '/images/work/yves-morel/Yves-Morel-4.jpeg', alt: 'Yves Morel — photography direction by Thinchronize' },
  },

  galleryLabel: '( Selected Work → )',
  gallery: [
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — work by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — work by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — work by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — work by Thinchronize' },
    { src: '/images/work/lebneniyet/Lebneniyet-1.jpeg', alt: 'Lebneniyet — work by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — work by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — work by Thinchronize' },
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — work by Thinchronize" },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: "What's Inside",
    statement: 'Quoted per shoot: partner scope plus our direction, on one invoice.',
    phases: [
      {
        title: 'Photography',
        body: 'Brand, product, and food shoots, directed against the strategy and shot by crews that clear our bar.',
        deliverablesLead: 'How it prices:',
        deliverables: [
          'Brand photography direction and production',
          'Product and food photography',
          'Partner quote plus 25% direction fee',
        ],
      },
      {
        title: 'Film',
        body: 'Video production and brand film: the story defined by us, the cameras run by vetted partners, the result unmistakably yours.',
        deliverablesLead: 'How it prices:',
        deliverables: [
          'Video production and brand film',
          'Creative direction hours on film projects',
          'Partner quote plus 25%, plus creative direction',
        ],
      },
      {
        title: 'On set and after',
        body: 'thinc. directs the shoot, curates the selects, and delivers the final material, so what reaches your channels passed our bar twice.',
        deliverablesLead: 'Always included:',
        deliverables: [
          'Art direction, always in-house',
          'thinc. on set, directing',
          'Select curation and final delivery',
        ],
      },
      {
        title: 'How it runs',
        body: 'We define, design, and direct. The partner operates. You get one point of contact and one invoice, from brief to delivery.',
        deliverablesLead: 'Good to know:',
        deliverables: [
          'One invoice, one point of contact',
          'No fixed prices unless the scope is fixed',
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
        company: 'F&B founder',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the directed shoot changed.',
      },
      {
        name: 'Dummy Client',
        company: 'E-commerce owner',
        quote: 'Placeholder testimonial. The product finally photographs at its price point. Conversion followed.',
      },
      {
        name: 'Dummy Client',
        company: 'Communications director',
        quote: 'Placeholder testimonial. One brief, one invoice, one team. The brand film shipped without us managing a single vendor.',
      },
    ],
  },

  glance: {
    titleLines: ['Photo & Film', 'at a glance'],
    inquireLabel: 'Request a quote',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A brand living on stock imagery',
          'Products photographed below their price point',
          'A film project with too many vendors',
          'Shoots happening without art direction',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Open to everyone, no gate',
          'Best on a brand with a defined visual language',
          'One relationship, one invoice preferred',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Art direction always in-house',
          'Vetted partner crews operate',
          'thinc. on set, directing',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          'Scoped per shoot',
          'Quoted from partner scope plus direction fee',
        ],
      },
      {
        label: 'Investment',
        items: [
          'Partner quote plus 25% direction fee',
          'Brand film adds creative direction hours',
          'One invoice, no markup surprises',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'The stock look disappears',
      body: 'Every image is unmistakably yours, shot to the strategy instead of borrowed from a library.',
    },
    {
      title: 'One door, not five',
      body: 'Photographer, crew, retouch, delivery: we run it, you approve it, one invoice closes it.',
    },
    {
      title: 'Assets that keep working',
      body: "Directed shoots produce a library the whole year's content can draw from, not one campaign's leftovers.",
    },
  ],

  finalCta: {
    titleLines: ['Ready to shoot', 'the real thing?'],
    label: 'Start with Photo & Film',
    href: '/contact',
  },
}

export default function PhotoVideoPage() {
  return <SignatureDetail data={data} />
}
