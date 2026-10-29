import type { Metadata } from 'next'
import SignatureDetail, { type SignatureDetailData } from '@/components/deck/SignatureDetail'

export const metadata: Metadata = {
  title: 'Research: The Brand Reality Report',
  description: "The study: your customers in their own words, your competitors' customers, your category, documented as the Brand Reality Report plus the Insight Hypothesis. Standard $2,200, Field $3,700. Carries into any program.",
  alternates: { canonical: '/research/research' },
  openGraph: { url: 'https://thinchronize.com/research/research', title: 'Research — Thinchronize' },
}

// Copy sources: SOP-32/34, services-explained.md §2, PRICING-CANON v2.1.

const data: SignatureDetailData = {
  marqueeTitle: 'RESEARCH',
  heroSub: "Research is the study. Your customers in their own words, your competitors' customers, your category, documented as the Brand Reality Report, plus the one insight your next move should be built on.",
  heroMedia: { src: '/images/work/tryo.jpg', alt: 'Tryo — brand research by Thinchronize' },

  about: {
    statement: 'Evidence before opinion. Point A before point B.',
    body: [
      "Every brand move worth making, a launch, a repositioning, a new market, hangs on a question guesswork can't answer: what's actually true right now? Research answers it. We study your customers in their own words, your competitors' customers, your category, and the gap between how you see yourselves and how the market sees you.",
      'It ends in the Brand Reality Report, six sections of documented reality, and the Insight Hypothesis: the one underlying truth your next move should be built on. That is point A. Strategy defines point B. The distance between them is the work.',
    ],
    builtForLead: 'Research is built for you if:',
    builtForIf: [
      "You're about to make an expensive move on a hunch",
      'Leadership debates strategy with no evidence to settle it',
      "You honestly don't know how customers see you",
      "You haven't launched yet and want to study the audience before you do",
    ],
  },

  trustedBy: [
    'Don Bosco', "L'Atelier", 'Tryo', 'Café Bdooz', 'Whatsub', 'Société Jabra',
    'Careem', 'Equisoft', 'Karma NGO', 'Lebneniyet', 'Yves Morel', 'House of Fashion',
  ],

  strategicCase: {
    titleLines: ['Why start', 'with Research'],
    items: [
      {
        title: 'Decisions on documented reality',
        body: 'Audience, market, and competitor signal replace opinion. The debate ends because the reality is written down.',
      },
      {
        title: 'One insight, isolated',
        body: 'The Insight Hypothesis states the single truth your next move should build on, separated from the noise of everything else we found.',
      },
      {
        title: 'It carries into everything',
        body: 'Move into any program within 12 months and the research component comes off the price. You never pay for the same understanding twice.',
      },
    ],
    img: { src: '/images/work/whatsub/Whatsub-Image-15.jpg', alt: 'Whatsub — brand research by Thinchronize' },
  },

  galleryLabel: '( Research Clients → )',
  gallery: [
    { src: '/images/work/latelier/Latelier-Image-1.jpeg', alt: "L'Atelier — brand by Thinchronize" },
    { src: '/images/work/karma-ngo/Karma-Coverr.png', alt: 'Karma NGO — brand by Thinchronize' },
    { src: '/images/work/don-bosco/Don-Bosco-10.jpeg', alt: 'Don Bosco — brand by Thinchronize' },
    { src: '/images/work/cafe-bdooz/Cover-Bdooz.jpg', alt: 'Café Bdooz — brand by Thinchronize' },
    { src: '/images/work/whatsub/Whatsub-Image-1.jpg', alt: 'Whatsub — brand by Thinchronize' },
    { src: '/images/work/hof/HOF-Image-1.jpg', alt: 'House of Fashion — brand by Thinchronize' },
    { src: '/images/work/careem/Careem-1.jpeg', alt: 'Careem — brand by Thinchronize' },
    { src: '/images/work/yves-morel/Yves-Morel-1.jpeg', alt: 'Yves Morel — brand by Thinchronize' },
  ],

  deliver: {
    titleLines: ["What we'll", 'deliver'],
    processLabel: 'Research Process',
    statement: 'Two depths, one method: Standard works from what exists, Field goes and asks.',
    phases: [
      {
        title: 'Standard, $2,200',
        body: 'Work from what exists: your materials, online presence, review mining, a scan of three to five competitors, short customer conversations, and our expert read. Two to three weeks.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Desk research and review mining',
          'Competitive scan, 3 to 5 competitors',
          'Short customer conversations',
          'Brand Reality Report and Insight Hypothesis',
        ],
      },
      {
        title: 'Field, $3,700',
        body: 'Everything in Standard plus real fieldwork: sit-down customer interviews, stakeholder interviews, and a full audit of every touchpoint. Three to five weeks.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'Everything in Standard',
          'In-depth customer interviews',
          'Stakeholder interviews',
          'Full touchpoint audit',
        ],
      },
      {
        title: 'The Brand Reality Report',
        body: 'Six sections: how the brand looks from outside, what customers actually say verbatim, the gap between self-image and market view, the competitive landscape, the truth nobody said out loud, and the insight.',
        deliverablesLead: 'Deliverables include:',
        deliverables: [
          'The six-section Brand Reality Report',
          'The Insight Hypothesis',
          'Presented, explained, and handed over',
        ],
      },
      {
        title: 'Pre-launch, or bigger?',
        body: "No brand yet? We study the audience you want, not the brand you don't have. Need scale? Larger studies run with a specialist research partner, scoped on a call.",
        deliverablesLead: 'Where it leads:',
        deliverables: [
          'Any program (the component comes off the price within 12 months)',
          'The Audit (want the grade too? both fees credit forward)',
          'Larger studies with a research partner, scoped on a call',
        ],
      },
    ],
  },

  words: {
    sub: 'Unfiltered feedback about working with thinc.',
    quotes: [
      {
        name: 'Dummy Client',
        company: 'Founder, pre-launch startup',
        quote: 'Placeholder testimonial. Real client quotes are being collected. This card shows the layout: a short, honest line about what the study changed.',
      },
      {
        name: 'Dummy Client',
        company: 'CEO, family business',
        quote: 'Placeholder testimonial. Reading our customers in their own words ended a leadership debate that had run for a year.',
      },
      {
        name: 'Dummy Client',
        company: 'Marketing director',
        quote: 'Placeholder testimonial. The Insight Hypothesis became the brief for everything we made after. One line, constantly used.',
      },
    ],
  },

  glance: {
    titleLines: ['Research at', 'a glance'],
    inquireLabel: 'Commission Research',
    inquireHref: '/contact',
    rows: [
      {
        label: 'Key challenges',
        items: [
          'A launch, raise, or expansion riding on assumptions',
          'A repositioning with no read on the market',
          'Leadership split on who the customer is',
          'A category shifting under you',
          'Pre-launch, and the audience is still a guess',
        ],
      },
      {
        label: 'Ideal clients',
        items: [
          'Anyone about to make a brand move who refuses guesswork',
          'Existing brands and pre-launch founders',
          'Access to a handful of customers, we handle the rest',
        ],
      },
      {
        label: 'Team structure',
        items: [
          'Founder-led, always',
          'Research directed by Anthony, CSO',
          'Documented method, same instrument every time',
        ],
      },
      {
        label: 'Timeframe',
        items: [
          'Standard 2 to 3 weeks, Field 3 to 5 weeks',
          'Full payment on signing',
        ],
      },
      {
        label: 'Investment',
        items: [
          'Standard $2,200, Field $3,700, in Lebanon',
          'Gulf and US scoped to market',
          'Carries into any program within 12 months',
        ],
      },
    ],
  },

  impactItems: [
    {
      title: 'The expensive guess, avoided',
      body: 'One study costs less than one wrong move. The budget bets on documented reality instead of the loudest hunch.',
    },
    {
      title: 'Leadership aligns on facts',
      body: "When the customer's words are on paper, the strategy debate ends and the planning starts.",
    },
    {
      title: 'Paid once, used everywhere',
      body: 'The component comes off any program you take within a year, and the findings brief every campaign after.',
    },
  ],

  finalCta: {
    titleLines: ['Ready to see', 'where you', 'actually stand?'],
    label: 'Commission Research',
    href: '/contact',
  },
}

export default function ResearchDetailPage() {
  return <SignatureDetail data={data} />
}
