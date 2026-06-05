// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectSection {
  headline:     string
  body:         string
  deliverables?: string[]   // "What we did" bullet list per phase
}

export interface ProjectDetails {
  type: string
  category: string
  year: string
  scope: string
}

export interface ProjectImage {
  src: string
  portrait?: boolean
}

export interface Project {
  id: string
  title: string
  tagline: string
  subtitle: string           // used by Work.tsx homepage cards
  category: string
  coverImage: string
  images?: ProjectImage[]
  readingImages?: ProjectImage[]  // curated subset for reading view (falls back to images.slice(0,10))
  brief: ProjectSection
  diagnosis: ProjectSection
  idea: ProjectSection
  built: ProjectSection
  result: ProjectSection
  details: ProjectDetails
  // kept for diagnostic tool
  diagnosticAnswers: number[]
  keywords: string[]
  services: string[]
  year: string
  market: string
  heroLines?: string[]   // optional manual line-breaks for cover headline
  location?: string      // shown in hero marquee banner (e.g. "Washington, D.C.")
}

// ─── Diagnostic answer labels ─────────────────────────────────────────────────

export const DIAGNOSTIC_ANSWERS = [
  { id: 0, label: "It doesn't look like what we've built", keywords: ['mismatch', 'outdated', 'old', 'refresh', 'logo', 'visual', 'look'] },
  { id: 1, label: "I need it to move — video, animation, content", keywords: ['animation', 'motion', 'video', 'reel', 'content', 'moving', 'animate'] },
  { id: 2, label: "We've rebranded before and something still feels off", keywords: ['rebrand', 'rebranding', 'changed', 'still', 'off', 'wrong', 'feels', 'tried'] },
  { id: 3, label: "I'm building a brand from scratch", keywords: ['startup', 'new', 'launch', 'scratch', 'beginning', 'start', 'first', 'build'] },
  { id: 4, label: "I need materials that actually represent us", keywords: ['print', 'brochure', 'collateral', 'materials', 'folder', 'booklet', 'flyer'] },
]

// ─── Projects ─────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    id: 'whatsub',
    title: 'Whatsub',
    tagline: 'A sub sandwich brand built to own the street.',
    subtitle: 'Brand Identity & Visual System',
    category: 'Brand Identity',
    location: 'Washington, D.C.',
    coverImage: '/images/work/whatsub/Whatsub-Image-19.jpg',
    images: [
      { src: '/images/work/whatsub/Whatsub-Image-1.jpg' },
      { src: '/images/work/whatsub/Whatsub-image-2.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-3.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-4.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-5.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-6.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-7.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-8.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-9.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-10.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-11.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-12.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-13.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-14.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-15.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-16.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-17.jpg' },
      { src: '/images/work/whatsub/Whatsub-Image-18.jpg' },
      { src: '/images/work/whatsub/Whatsub-Sign.jpg' },
      { src: '/images/work/whatsub/mural.jpg' },
      { src: '/images/work/whatsub/packaging.jpg' },
      { src: '/images/work/whatsub/poster-1.jpg' },
      { src: '/images/work/whatsub/poster-2.jpg' },
      { src: '/images/work/whatsub/logo-final.jpg' },
    ],
    brief: {
      headline: 'Build a fast-casual sandwich brand from the ground up.',
      body: 'Whatsub needed more than a logo — they needed a complete brand identity that could compete in Lebanon\'s crowded F&B market and give a new concept a clear reason to exist beyond the product itself.',
      deliverables: [
        'Full brand identity system from scratch',
        'F&B market positioning',
        'Competitive landscape review',
        'Brand naming rationale',
      ],
    },
    diagnosis: {
      headline: 'No story. No differentiation. No reason to choose.',
      body: 'The F&B landscape in Lebanon is saturated with imported concepts and generic aesthetics. Whatsub had a strong product but zero brand infrastructure. Without a clear position, price becomes the only conversation — and price is always a race to the bottom.',
      deliverables: [
        'Market & competitor audit',
        'Visual gap analysis',
        'Brand positioning strategy',
        'Core differentiation definition',
      ],
    },
    idea: {
      headline: 'Own the street. Not a sub shop — a street brand.',
      body: 'The submarine metaphor made the name make sense. It grounded the visual language and gave every touchpoint a character that couldn\'t be faked or borrowed. When a brand has a story, the product becomes proof of it — not the other way around. Owning a feeling on the street was worth more than describing the sandwich.',
    },
    built: {
      headline: 'A complete brand built around the submarine metaphor.',
      body: 'We built the full brand system: naming rationale, visual identity, color palette, typography, menu design, packaging language, and in-store communication. Every touchpoint was designed to feel ownable, deliberate, and consistent.',
      deliverables: [
        'Logo & visual identity system',
        'Color palette & typography',
        'Menu design',
        'Packaging system',
        'In-store environmental design',
        'Brand standards guide',
      ],
    },
    result: {
      headline: 'A brand ready to open, grow, and be remembered.',
      body: 'Whatsub launched with a complete visual language and a brand platform that gives the team a foundation to build on — not just for opening day, but for every brand decision that follows.',
      deliverables: [
        'Launch-ready brand system',
        'Consistent across every touchpoint',
        'Team equipped to make brand decisions',
      ],
    },
    details: {
      type: 'Brand Identity',
      category: 'F&B',
      year: '2025',
      scope: 'Full Brand System',
    },
    diagnosticAnswers: [0, 2, 3],
    keywords: ['brand identity', 'logo', 'packaging', 'menu design', 'environmental', 'food truck', 'fast casual', 'washington dc'],
    services: ['Brand Identity', 'Print & Editorial', 'Environmental Design', 'Packaging'],
    year: '2025',
    market: 'Washington D.C., USA',
    heroLines: ['Whatsub. Build a fast-casual', 'sandwich brand from the ground up.', 'Built to own the street.'],
  },
  {
    id: 'hof',
    title: 'House of Flatbreads',
    tagline: 'Introducing the flatbread to Washington D.C. on American terms.',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    location: 'Washington, D.C.',
    coverImage: '/images/work/hof/HOF-Cover.png',
    heroLines: ["HOF. Introducing the flatbread", "to Washington D.C.", "on American terms."],
    images: [
      { src: '/images/work/hof/HOF-Image-1.jpg' },
      { src: '/images/work/hof/HOF-Image-1.png' },
      { src: '/images/work/hof/HOF-Image-2.png' },
      { src: '/images/work/hof/HOF-Image-3.png' },
      { src: '/images/work/hof/HOF-Image-4.png' },
      { src: '/images/work/hof/HOF-Image-5.png' },
      { src: '/images/work/hof/HOF-Image-6.png' },
      { src: '/images/work/hof/HOF-Image-7.png' },
      { src: '/images/work/hof/HOF-Image-8.png' },
      { src: '/images/work/hof/HOF-Image-9.png' },
    ],
    brief: {
      headline: 'A Lebanese flatbread shop in the heart of Washington D.C. with a brand identity crisis.',
      body: 'HOF knew their product was exceptional. The problem was no one in D.C. knew what a flatbread was — or why they should care. Introducing an unfamiliar format in a market that already has a strong relationship with a similar product (pizza) is not a positioning problem. It\'s a cultural translation problem.',
      deliverables: [
        'Brand positioning strategy',
        'Cultural translation framework',
        'Full brand identity system',
        'Naming & tagline',
      ],
    },
    diagnosis: {
      headline: 'You can\'t introduce the unfamiliar without anchoring it to something familiar.',
      body: 'The American consumer has a deep, emotional relationship with pizza. Flatbread, to most, is either an abstraction or a diet substitute. HOF had a product worth loving — but no bridge. Without one, they\'d be explaining what they were for the rest of their existence instead of building loyalty.',
      deliverables: [
        'Market & category audit',
        'Consumer perception mapping',
        'Competitive landscape (pizza + fast casual)',
        'Cultural entry point identification',
      ],
    },
    idea: {
      headline: 'Earn the first visit on familiar terms.',
      body: 'Americans don\'t need to learn what flatbread is — they need to recognise something they already love in a better form. The entire brand was built from that bridge outward: the visual language, the tone, the energy — all anchored in American fast-food nostalgia, then elevated. The brand\'s job wasn\'t to educate. It was to lower the barrier to the first bite, so the product could do the explaining from there.',
    },
    built: {
      headline: 'Pizza Hut American style — a common ground, then a destination.',
      body: 'We leaned into what Americans already love. The visual language, the tone, the energy — all rooted in classic American fast-food nostalgia, but elevated. The flatbread becomes the pizza they grew up with, made better. Once you\'ve earned the first visit on familiar terms, you can take them somewhere new.',
      deliverables: [
        'Brand identity system',
        'Visual language & colour palette',
        'Typography system',
        'Packaging & in-store design',
        'Brand standards guide',
      ],
    },
    result: {
      headline: 'A brand that earns the first visit — and makes them want to explain it to their friends.',
      body: 'HOF launched with a brand that didn\'t ask Washington D.C. to understand flatbread. It asked them to recognise something they already loved — and discover something better. The identity gives the team a platform to grow from, not just open with.',
      deliverables: [
        'Launch-ready brand system',
        'Ownable visual identity',
        'Culturally legible positioning',
      ],
    },
    details: {
      type: 'Brand Identity',
      category: 'F&B',
      year: '2025',
      scope: 'Full Brand System',
    },
    diagnosticAnswers: [0, 3],
    keywords: ['brand identity', 'logo', 'f&b', 'food', 'flatbread', 'pizza', 'washington dc', 'usa', 'american', 'launch', 'new brand', 'packaging'],
    services: ['Brand Foundation', 'Positioning', 'Visual Identity System', 'Packaging'],
    year: '2025',
    market: 'Washington D.C., USA',
  },
  {
    id: 'karma-ngo',
    title: 'Karma NGO',
    tagline: 'A rebrand that finally matched the organisation\'s courage.',
    subtitle: 'Rebranding',
    category: 'Brand Identity',
    location: 'Lebanon',
    coverImage: '/images/work/karma-ngo/Karma-Coverr.png',
    heroLines: ["Karma NGO. A rebrand that finally", "matched the organisation's courage."],
    images: [
      { src: '/images/work/karma-ngo/Karma-Image-1.png' },
      { src: '/images/work/karma-ngo/Karma-Image-3.png' },
      { src: '/images/work/karma-ngo/Karma-Image-4.jpg' },
      { src: '/images/work/karma-ngo/Karma-Image-5.jpg' },
      { src: '/images/work/karma-ngo/Karma-Image-6.jpg' },
      { src: '/images/work/karma-ngo/Karma-Image-7.png' },
      { src: '/images/work/karma-ngo/Karma-Image-8.png' },
      { src: '/images/work/karma-ngo/Karma-Image-9.png' },
      { src: '/images/work/karma-ngo/Karma-Image-10.png' },
      { src: '/images/work/karma-ngo/Karma-Image-11.png' },
      { src: '/images/work/karma-ngo/Karma-Image-12.png' },
      { src: '/images/work/karma-ngo/Karma-Image-13.png' },
      { src: '/images/work/karma-ngo/Karma-Image-15.png' },
    ],
    brief: {
      headline: 'A Lebanese NGO fighting thalassemia with a generic brand that communicated nothing.',
      body: 'Thalassemia Liban organises blood drives, coordinates donors, and delivers actual medical treatment to children living with thalassemia. The work is extraordinary. The brand was invisible. A generic identity that looked like every other health NGO — interchangeable, institutional, forgettable — was undermining the credibility and reach of an organisation doing irreplaceable work.',
      deliverables: [
        'Brand audit & gap analysis',
        'Stakeholder interviews',
        'Brand foundation development',
        'Full rebrand strategy',
      ],
    },
    diagnosis: {
      headline: 'A generic brand is a barrier to trust — and trust is how you get blood donors.',
      body: 'Blood donation requires trust. Not just in the cause, but in the organisation asking. When the brand looks generic, the ask feels generic — and people don\'t give blood to generic. Thalassemia Liban was losing conversations before they started because the brand didn\'t communicate the seriousness, the warmth, or the real human stakes of their work.',
      deliverables: [
        'Donor journey mapping',
        'Trust gap analysis',
        'Visual identity audit',
        'Communication effectiveness review',
      ],
    },
    idea: {
      headline: 'Build around the children. Not the disease.',
      body: 'Every brand decision had to answer one question: does this make someone more likely to show up? Warmth and strength in the same system — credible to the medical community, human to a potential donor, honest to the families who depend on it. When the brand reflects what\'s actually at stake, it stops being a logo and starts being a reason to act.',
    },
    built: {
      headline: 'A brand built around the children — not the disease.',
      body: 'The rebrand centred on life, not illness. Warmth and strength in the same system — for the families who rely on the organisation and the institutions that fund it. A visual identity that makes people want to show up: to donate, to volunteer, to give. Every design decision made to convert a stranger into a donor.',
      deliverables: [
        'Logo & visual identity system',
        'Color palette & typography',
        'Communication templates',
        'Blood drive campaign materials',
        'Brand standards guide',
      ],
    },
    result: {
      headline: 'A brand that makes people want to give.',
      body: 'Thalassemia Liban relaunched with an identity that reflects the gravity and the humanity of their mission. The organisation now has a visual platform that builds trust at first contact — with donors, with the medical community, and with the families they serve.',
      deliverables: [
        'Launch-ready rebrand system',
        'Donor-facing communication materials',
        'Consistent brand across all touchpoints',
      ],
    },
    details: {
      type: 'Brand Identity',
      category: 'NGO / Healthcare',
      year: '2023',
      scope: 'Full Rebranding',
    },
    diagnosticAnswers: [0, 2, 3],
    keywords: ['rebrand', 'ngo', 'healthcare', 'medical', 'lebanon', 'blood', 'donation', 'charity', 'identity', 'kids', 'children', 'refresh'],
    services: ['Brand Foundation', 'Visual Identity System', 'Communication Direction', 'Campaign Materials'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'latelier',
    title: "L'atelier NGO",
    tagline: 'An NGO brand that works for funders and communities at once.',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    location: 'Lebanon',
    coverImage: '/images/work/latelier/Latelier-Image-3.jpeg',
    heroLines: ["L'Atelier. A mission-driven", "organisation with clarity on purpose —", "and no visual language to prove it."],
    images: [
      { src: '/images/work/latelier/Latelier-Image-3.jpeg' },
      { src: '/images/work/latelier/Latelier-Image-2.jpeg' },
      { src: '/images/work/latelier/Latelier-Image-1.jpeg' },
    ],
    brief: {
      headline: 'A mission-driven organisation with clarity on purpose — and no visual language to prove it.',
      body: 'Two audiences, one brand. Donors and partners needed to see credibility. Beneficiaries needed to feel warmth. They were getting neither — not because the work was poor, but because no one had defined what the brand needed to do before designing it.',
    },
    diagnosis: {
      headline: 'The split was invisible but it was costing them every conversation.',
      body: 'NGOs operating in Lebanon face a trust gap on both sides: institutions that fund don\'t feel the rigour, and communities that receive don\'t feel the warmth. The brand was visually absent where it needed to do the most work — in the first impression.',
    },
    idea: {
      headline: 'One system. Two audiences. No split.',
      body: 'The brand couldn\'t afford to speak two different languages — a credible one for funders and a warm one for communities. That approach would have produced neither. The idea was to find the visual language where rigour and humanity weren\'t in opposition. Restraint as the signal of seriousness. Warmth as the proof of the mission. The same mark doing both jobs at once — because that\'s exactly what the organisation had to do every day.',
    },
    built: {
      headline: 'A brand built on the mission statement itself.',
      body: 'Restraint for credibility. Warmth for humanity. Both in the same system, without splitting. We built the brand foundation first — then a visual identity that could carry the organisation\'s dual mandate without contradiction. The mark holds both. The system extends without losing its centre.',
    },
    result: {
      headline: 'A brand that opens doors with funders and builds trust with the people they serve.',
      body: 'A brand that finally matched the organisation it had become. The new identity positioned L\'Atelier credibly with institutional partners while remaining human and accessible to the communities it serves — the same system, doing two jobs at once.',
    },
    details: {
      type: 'Brand Identity',
      category: 'NGO / Non-Profit',
      year: '2023',
      scope: 'Visual Identity System',
    },
    diagnosticAnswers: [0, 3],
    keywords: ['ngo', 'nonprofit', 'new brand', 'identity', 'credibility', 'mission', 'scratch', 'build', 'first'],
    services: ['Brand Foundation', 'Visual Identity System', 'Communication Direction'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'cafe-bdooz',
    title: 'Cafe BDOOZ',
    tagline: 'A neighbourhood café people recognise before they walk in.',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    location: 'Lebanon',
    coverImage: '/images/work/cafe-bdooz/Cover-Bdooz.jpg',
    heroLines: ["Cafe BDOOZ. A neighbourhood café", "people recognise before they walk in."],
    images: [
      { src: '/images/work/cafe-bdooz/Image-1-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-2-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-3-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-4-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-5-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-6-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-7-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-8-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-9-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-10-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-11-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-12-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-13-Bdooz.jpg' },
      { src: '/images/work/cafe-bdooz/Image-14-Bdooz.jpg' },
    ],
    brief: {
      headline: 'A Lebanese café with a strong neighbourhood personality needed an identity that made people feel something before they ordered.',
      body: 'The space had warmth, the product was strong, and the name had character — but nothing was connecting them visually. The brand was invisible where it mattered most: before someone walked through the door.',
    },
    diagnosis: {
      headline: 'The café existed. The brand didn\'t.',
      body: 'In a neighbourhood F&B market, personality is infrastructure. Without it, a café becomes interchangeable — just another option on a crowded street. Cafe BDOOZ had a real identity in the room but nothing that carried it outside the four walls.',
    },
    idea: {
      headline: 'Familiarity before the first visit.',
      body: 'The café already had warmth. The brand\'s job was to carry it outside the four walls — to make someone feel like they already knew the place before they\'d ever been. That meant building around recognition, not novelty. Every visual decision was made to feel like a memory, not an introduction.',
    },
    built: {
      headline: 'An identity built around warmth and return.',
      body: 'Typographic personality that feels handcrafted without being hand-drawn. A colour palette that communicates comfort and confidence. A system that works on a cup, a sign, and a social feed without losing its soul. Every touchpoint designed to make the café feel like a place people already know — before they\'ve ever been.',
    },
    result: {
      headline: 'A brand that makes the café feel familiar before the first visit.',
      body: 'The brand gave Cafe BDOOZ a presence that extended beyond the physical space. Customers recognised the identity before they recognised the place. The visual system continues to grow with the café — holding its character across every new touchpoint.',
    },
    details: {
      type: 'Brand Identity',
      category: 'F&B',
      year: '2025',
      scope: 'Visual Identity System',
    },
    diagnosticAnswers: [0, 3],
    keywords: ['cafe', 'coffee', 'restaurant', 'brand identity', 'logo', 'lebanon', 'neighbourhood', 'warmth', 'character', 'hospitality'],
    services: ['Brand Foundation', 'Visual Identity System', 'Brand Standards'],
    year: '2025',
    market: 'Lebanon',
  },
  {
    id: 'don-bosco',
    title: 'Don Bosco School',
    tagline: 'A school\'s identity realigned with what it had actually become.',
    subtitle: 'Rebranding',
    category: 'Brand Identity',
    location: 'Lebanon',
    coverImage: '/images/work/don-bosco/cover.jpg',
    heroLines: ["Don Bosco. A school's identity", "realigned with what it had actually become."],
    images: [
      { src: '/images/work/don-bosco/image-1.jpg' },
      { src: '/images/work/don-bosco/image-2.jpg' },
      { src: '/images/work/don-bosco/image-3.jpg' },
      { src: '/images/work/don-bosco/image-4.jpg' },
      { src: '/images/work/don-bosco/image-5.jpg' },
      { src: '/images/work/don-bosco/image-6.jpg' },
    ],
    brief: {
      headline: 'They came asking for a logo refresh. That wasn\'t the problem.',
      body: 'Don Bosco School had evolved — new facilities, an expanded vision, a changed student body — but the brand was still communicating 1990. The real ask wasn\'t modernisation. It was alignment between what the school had become and how it was presenting itself to the world.',
    },
    diagnosis: {
      headline: 'The visual system wasn\'t the problem. The identity was.',
      body: 'The school had a strong reputation and a clear educational philosophy — but nothing in the brand reflected it. Parents, students, and faculty experienced a gap between the institution\'s ambition and how it showed up visually. A logo refresh would have papered over the real issue.',
    },
    idea: {
      headline: 'Tradition and forward motion. Both. At once.',
      body: 'The school had already evolved — the brand just hadn\'t caught up. And catching up correctly meant not erasing what came before, but translating it. The dual mandate of heritage and ambition wasn\'t a constraint to navigate around. It was the brief. Once that was clear, every decision followed from it: what to preserve, what to evolve, and what to build from scratch.',
    },
    built: {
      headline: 'Brand foundation first. Visual identity second.',
      body: 'We started at the mission. What does this school actually stand for in 2023? What is its dual mandate — tradition and forward motion? Once those answers existed, the visual identity followed: a mark that holds both, and a system that extends from signage to stationery without losing its centre.',
    },
    result: {
      headline: 'A brand that finally matched the institution it had become.',
      body: 'Don Bosco relaunched with an identity that the entire school community recognised as true. Not a cosmetic update — a real alignment between values and visual language. The system scales across every touchpoint with the same conviction.',
    },
    details: {
      type: 'Brand Identity',
      category: 'Education',
      year: '2023',
      scope: 'Full Rebranding',
    },
    diagnosticAnswers: [0, 2],
    keywords: ['rebranding', 'identity', 'outdated', 'mismatch', 'logo', 'school', 'education', 'heritage', 'refresh', 'old'],
    services: ['Brand Foundation', 'Visual Identity System', 'Brand Standards'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'tryo',
    title: 'Tryo',
    tagline: 'A startup brand that explains itself in three seconds.',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    location: 'Lebanon',
    coverImage: '/images/work/tryo.jpg',
    heroLines: ["Tryo. A startup brand that", "explains itself in three seconds."],
    images: [{ src: '/images/work/tryo.jpg' }],
    brief: {
      headline: 'A startup at launch with a product and no brand.',
      body: 'The founders could describe the product in detail but couldn\'t articulate what made it matter to someone who didn\'t already know them. They weren\'t missing a logo — they were missing a point of view.',
    },
    diagnosis: {
      headline: 'First-brand syndrome: a product without a position.',
      body: 'Early-stage companies often mistake product confidence for brand clarity. Tryo knew what it did. It didn\'t know why that mattered to the market — and neither did the market. Without that, every conversation started from zero.',
    },
    idea: {
      headline: 'Answer the question first. Then design.',
      body: 'What is this, actually — and why does it matter now? Those two questions had to be answered in writing before anything was made. The identity was built outward from the answers, not from a mood board. A brand that can explain itself in three seconds earns the right to ask for the next three minutes.',
    },
    built: {
      headline: 'We started at Phase 0. What is this, actually?',
      body: 'What is this product? Who is it for? Why does it matter now? Once those answers existed in writing, the visual identity followed — not the other way around. The brand was built to explain itself in three seconds.',
    },
    result: {
      headline: 'A brand that explains itself in three seconds.',
      body: 'Tryo launched with the clarity that comes from starting with the right questions. The identity isn\'t just visual — it\'s a positioning platform that the team can use to make every brand decision that follows, consistently and confidently.',
    },
    details: {
      type: 'Brand Identity',
      category: 'Technology',
      year: '2023',
      scope: 'Brand Foundation + Identity',
    },
    diagnosticAnswers: [0, 3],
    keywords: ['startup', 'new', 'launch', 'scratch', 'beginning', 'first brand', 'build', 'identity', 'product'],
    services: ['Brand Foundation', 'Positioning', 'Visual Identity System'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'nft-motivated',
    title: 'NFT Motivated',
    tagline: 'Motion content that communicates the brand, not just the colours.',
    subtitle: 'Motion Graphics',
    category: 'Motion',
    location: 'Washington, D.C.',
    coverImage: '/images/work/nft-motivated.jpg',
    heroLines: ["NFT Motivated. Motion content that", "communicates the brand, not just the colours."],
    images: [{ src: '/images/work/nft-motivated.jpg' }],
    brief: {
      headline: 'A US-based NFT platform needing motion content that matched their brand energy.',
      body: 'Motion was being treated as decoration — content to fill feeds — not as strategic communication. The animations were moving. They weren\'t saying anything. The platform needed a motion direction that reflected the brand\'s character, not just its colour palette.',
    },
    diagnosis: {
      headline: 'Moving ≠ communicating.',
      body: 'In the NFT space, visual noise is everywhere. Every platform animates. Most animate badly — fast, random, and disconnected from what the brand is actually saying. NFT Motivated had energy but no direction. The motion was working against their brand, not for it.',
    },
    idea: {
      headline: 'Motion has to say something before it moves.',
      body: 'Energy without direction is noise. The platform had motion — what it didn\'t have was a point of view on what that motion was communicating. We defined the motion voice first: the pacing, the easing, the rhythm. Every frame that followed was a design decision disguised as an animation decision.',
    },
    built: {
      headline: 'A motion direction before a single frame was animated.',
      body: 'What does this brand feel like in time? What does the pacing communicate? What does the easing say about the product? Every frame was built from those answers outward — not from a template or a trend, but from a defined motion voice.',
    },
    result: {
      headline: 'Motion content that reads as brand, not just content.',
      body: 'The platform now has a consistent motion language that reinforces the brand across every piece of content. Viewers can identify it as NFT Motivated before they see the logo — because the motion itself communicates the identity.',
    },
    details: {
      type: 'Motion Design',
      category: 'Digital / Web3',
      year: '2023',
      scope: 'Motion Direction + Animation',
    },
    diagnosticAnswers: [1],
    keywords: ['animation', 'motion', 'video', 'reel', 'content', 'moving', 'animate', 'nft', 'usa', 'international'],
    services: ['Motion Direction', 'Animation System', 'Brand Motion'],
    year: '2023',
    market: 'United States',
  },
  {
    id: 'equisoft',
    title: 'Equisoft',
    tagline: 'A motion system that makes the product look as intelligent as it is.',
    subtitle: 'Motion Graphics',
    category: 'Motion',
    location: 'Canada',
    coverImage: '/images/work/equisoft.jpg',
    heroLines: ["Equisoft. A motion system that makes", "the product look as intelligent as it is."],
    images: [{ src: '/images/work/equisoft.jpg' }],
    brief: {
      headline: 'A financial software company in Canada needing brand motion across their communications.',
      body: 'Equisoft\'s motion was working against their product. The visuals weren\'t communicating the sophistication the software actually had. They needed a motion system — not animations — that would make the product look as intelligent as it is.',
    },
    diagnosis: {
      headline: 'Enterprise brands animate badly in one of two directions.',
      body: 'Too stiff, or overcompensating with playfulness. Equisoft was stuck between the two. The timing was inconsistent, the easing arbitrary, and the visual language disconnected from the product\'s precision. Motion was being produced piece by piece, with no system holding it together.',
    },
    idea: {
      headline: 'Precision in time.',
      body: 'A motion system — not individual animations. The product\'s intelligence had to be visible in how it moved, not just in what it showed. Defining the principles once meant every subsequent piece of motion, regardless of who made it, read as the same brand. Consistency isn\'t a style choice. It\'s a system decision.',
    },
    built: {
      headline: 'A motion system — not just animations.',
      body: 'Consistent timing. Consistent easing. Consistent visual language. Every motion principle defined before execution. So every piece of motion, regardless of context or team member, reads as the same brand — the same precision, the same intelligence.',
    },
    result: {
      headline: 'Motion that makes the product look as intelligent as it is.',
      body: 'Equisoft now has a motion system that their team can apply independently and consistently. The brand communicates sophistication at every moving moment — in product demos, presentations, and communications — without dilution.',
    },
    details: {
      type: 'Motion Design',
      category: 'Fintech / B2B',
      year: '2023',
      scope: 'Motion System',
    },
    diagnosticAnswers: [1],
    keywords: ['animation', 'motion', 'video', 'corporate', 'fintech', 'b2b', 'enterprise', 'content', 'animate', 'canada'],
    services: ['Motion Direction', 'Animation System', 'Brand Motion'],
    year: '2023',
    market: 'Canada',
  },
  {
    id: 'societe-jabra',
    title: 'Societe Jabra',
    tagline: 'Print collateral that reinforces the brand instead of undermining it.',
    subtitle: 'Print Collateral',
    category: 'Packaging',
    location: 'Lebanon',
    coverImage: '/images/work/societe-jabra.jpg',
    heroLines: ["Societe Jabra. Print collateral that", "reinforces the brand instead of undermining it."],
    images: [{ src: '/images/work/societe-jabra.jpg' }],
    brief: {
      headline: 'A company needing client-facing print materials that actually represented them.',
      body: 'Functional but disconnected. The collateral looked like it came from a different brand than the one the client thought they were building. Print was being treated as an afterthought — not a brand touchpoint.',
    },
    diagnosis: {
      headline: 'The collateral was undoing the brand work.',
      body: 'Every meeting where a client received Societe Jabra\'s materials was a moment where the brand story broke down. The visual language was inconsistent with the core identity. What should have been a trust-builder was creating confusion instead.',
    },
    idea: {
      headline: 'The brand doesn\'t end at the screen.',
      body: 'Every physical piece that leaves the company is a brand moment. The collateral needed to be rebuilt from the identity system outward — same grid logic, same type hierarchy, same colour proportion. Not because it would look good, but because inconsistency at the touchpoint level breaks the trust built everywhere else.',
    },
    built: {
      headline: 'Collateral that extended the visual system with the same precision as the core identity.',
      body: 'Every decision — grid, typography, colour proportion — traced back to the brand, not to a designer\'s preference. The system was built to work independently: any team member, any format, any context. Consistent by design, not by accident.',
    },
    result: {
      headline: 'Materials that work as hard as a first impression should.',
      body: 'Societe Jabra now has a print collateral system that reinforces the brand at every client touchpoint. The materials don\'t just look right — they feel right. They communicate the same precision and seriousness as the rest of the brand.',
    },
    details: {
      type: 'Print & Editorial',
      category: 'Corporate',
      year: '2023',
      scope: 'Collateral System',
    },
    diagnosticAnswers: [4],
    keywords: ['print', 'collateral', 'materials', 'folder', 'corporate', 'represent', 'brochure', 'flyer'],
    services: ['Print & Editorial', 'Brand Extension', 'Collateral System'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'conundrum',
    title: 'Conundrum',
    tagline: 'An editorial system built for content that needs to be read.',
    subtitle: 'Booklet + Brochure',
    category: 'Brand Strategy',
    location: 'Lebanon',
    coverImage: '/images/work/conundrum.jpg',
    heroLines: ["Conundrum. An editorial system", "built for content that needs to be read."],
    images: [{ src: '/images/work/conundrum.jpg' }],
    brief: {
      headline: 'Complex content that needed to be organised into a physical format people would actually read.',
      body: 'The challenge wasn\'t design — it was hierarchy. Too much information with no clear order of importance. Readers were getting lost before they reached what mattered. The document needed to be restructured before it could be designed.',
    },
    diagnosis: {
      headline: 'Information without hierarchy is just noise.',
      body: 'Conundrum\'s content had real value — but it was buried under layers of equal-weight information. Every section was presented as if it were the most important. The result: nothing stood out, nothing landed, and the document got filed instead of read.',
    },
    idea: {
      headline: 'Content first. Design second.',
      body: 'Before any layout decision was made, the content was reordered: what comes first, what supports it, what closes. The design\'s only job was to make that sequence feel inevitable — to guide the reader through without them noticing they were being guided. A document that gets read is more valuable than a document that gets admired.',
    },
    built: {
      headline: 'An editorial system. Content mapped, weighted, and sequenced.',
      body: 'Before any layout decision was made, the content was reorganised: what comes first, what supports it, what closes. Then a visual system that guided the reader\'s eye through that sequence — without announcing itself. The design serves the content, not the other way around.',
    },
    result: {
      headline: 'A document that gets read instead of filed.',
      body: 'The Conundrum booklet now works as a piece of communication, not just a piece of design. The hierarchy is clear, the sequence is intentional, and the reader arrives at the key message without getting lost. A format built to be used, not just admired.',
    },
    details: {
      type: 'Editorial Design',
      category: 'Publishing',
      year: '2023',
      scope: 'Booklet + Brochure',
    },
    diagnosticAnswers: [4],
    keywords: ['print', 'brochure', 'booklet', 'editorial', 'materials', 'content', 'represent', 'folder'],
    services: ['Editorial Design', 'Print & Editorial', 'Content Hierarchy'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'lebneniyet',
    title: 'Lebneniyet',
    tagline: 'A Mediterranean restaurant brand built for a crisis it didn\'t see coming.',
    subtitle: 'Brand Identity & Digital Menu',
    category: 'Brand Identity',
    location: 'Jounieh, Lebanon',
    coverImage: '/images/work/lebneniyet/cover.jpg',
    heroLines: ["Lebneniyet. A Mediterranean brand", "built for a crisis it didn't see coming."],
    images: [
      { src: '/images/work/lebneniyet/image-1.jpg' },
      { src: '/images/work/lebneniyet/image-2.jpg' },
      { src: '/images/work/lebneniyet/image-3.jpg' },
      { src: '/images/work/lebneniyet/image-4.jpg' },
      { src: '/images/work/lebneniyet/image-5.jpg' },
      { src: '/images/work/lebneniyet/image-6.jpg' },
      { src: '/images/work/lebneniyet/image-7.jpg' },
      { src: '/images/work/lebneniyet/image-8.jpg' },
    ],
    brief: {
      headline: 'A new restaurant concept from a proven operator — launched in the middle of two simultaneous crises.',
      body: 'The owner behind Shogun, Fleur de Lys Catering, and several other successful concepts came to us with something new: a Mediterranean restaurant on the coast of Jounieh, rooted in Lebanese heritage. The brief was to build the brand from scratch. What nobody accounted for was that by the time we were delivering, Lebanon was in the middle of a financial collapse and a global pandemic at once.',
      deliverables: [
        'Brand identity from scratch',
        'Brand positioning & naming',
        'Menu system design',
        'Digital contactless menu',
      ],
    },
    diagnosis: {
      headline: 'The brief changed every week. Currency fluctuation meant menus had to change daily. Nobody was touching physical menus.',
      body: 'Two realities collided at once. The economic crisis meant prices were being updated daily — a printed menu was obsolete before it came off the press. COVID meant people wouldn\'t touch shared surfaces at all. A traditional F&B launch would have been dead on arrival. Every assumption we started with had to be rebuilt.',
      deliverables: [
        'Crisis-context brand audit',
        'Physical vs. digital touchpoint mapping',
        'Menu system flexibility analysis',
        'Contactless solution scoping',
      ],
    },
    idea: {
      headline: 'Go back further than the crisis. Root the brand in something older than all of it.',
      body: 'When everything around you is shifting, you build on what doesn\'t move. Lebneniyet sat on the coast of Jounieh — the same coastline the Phoenicians sailed from thousands of years before any economic index existed. The brand was anchored there: in the boats, the sea, the idea of Mediterranean civilisation as something that outlasted every crisis it ever faced. And practically, the digital menu became the brand\'s first real innovation — a QR-based contactless system that solved the price-change problem and the hygiene problem simultaneously.',
    },
    built: {
      headline: 'A brand rooted in Phoenician heritage, built for a contactless world.',
      body: 'The visual identity drew from Phoenician seafaring — the boats, the coast, the deep blue of the Mediterranean. Every design decision was made to feel timeless rather than trendy, because the brand needed to outlast the moment it was born in. In parallel, we built a digital menu system that could be updated in real time, required no physical contact, and was built to reflect the brand\'s premium positioning.',
      deliverables: [
        'Logo & visual identity system',
        'Colour palette & typography',
        'Menu design system (digital + print)',
        'QR-based contactless digital menu',
        'In-restaurant brand touchpoints',
        'Brand standards guide',
      ],
    },
    result: {
      headline: 'A brand built for the worst possible conditions — and built to last beyond them.',
      body: 'Lebneniyet launched with a full visual identity and a contactless menu system that was ahead of the market. The brand didn\'t just survive the crisis — it was designed around it. The Phoenician roots gave it a story that no fluctuating exchange rate could touch.',
      deliverables: [
        'Launch-ready brand system',
        'Digital menu live and updatable in real time',
        'Brand positioned for longevity, not just launch',
      ],
    },
    details: {
      type: 'Brand Identity',
      category: 'F&B / Restaurant',
      year: '2019',
      scope: 'Full Brand System + Digital Menu',
    },
    diagnosticAnswers: [0, 3],
    keywords: ['restaurant', 'mediterranean', 'lebanese', 'brand identity', 'logo', 'menu', 'digital menu', 'contactless', 'qr', 'jounieh', 'coast', 'phoenician', 'heritage', 'f&b'],
    services: ['Brand Foundation', 'Visual Identity System', 'Digital Menu', 'Print & Editorial'],
    year: '2019',
    market: 'Lebanon',
  },
  {
    id: 'careem',
    title: 'Careem',
    tagline: 'Motion and digital content for one of the region\'s most recognised brands.',
    subtitle: 'Digital Design & Motion',
    category: 'Motion',
    location: 'Middle East',
    coverImage: '/images/work/careem/cover.jpg',
    heroLines: ["Careem. Motion and digital content", "for one of the region's most recognised brands."],
    images: [
      { src: '/images/work/careem/image-1.jpg' },
      { src: '/images/work/careem/image-2.jpg' },
      { src: '/images/work/careem/image-3.jpg' },
      { src: '/images/work/careem/image-4.jpg' },
      { src: '/images/work/careem/image-5.jpg' },
      { src: '/images/work/careem/image-6.jpg' },
    ],
    brief: {
      headline: 'Careem needed digital content that moved with the same confidence as the brand itself.',
      body: 'One of the most recognised brands in the Middle East. The ask was clear: website banners, social media assets, animated banners, and a motion video — all produced at the standard a brand of this scale demands. Every deliverable had to feel like Careem, not just carry their logo.',
      deliverables: [
        'Website banner design',
        'Social media post design',
        'Animated banner production',
        'Motion video production',
      ],
    },
    diagnosis: {
      headline: 'At Careem\'s scale, off-brand content doesn\'t just look wrong — it undermines every dollar spent building the brand.',
      body: 'Large brands face a consistent problem: the volume of content required means production quality varies across vendors, teams, and markets. The brief wasn\'t just to produce assets — it was to produce assets that held up to the brand standard at every size, format, and platform. Inconsistency at the execution level is invisible until it compounds.',
      deliverables: [
        'Brand standards review',
        'Asset format audit',
        'Motion direction alignment',
      ],
    },
    idea: {
      headline: 'Execution is a brand decision.',
      body: 'For a brand at Careem\'s recognition level, every asset is a brand impression. The motion video wasn\'t just content — it was a communication of what Careem feels like in time. Every easing, every transition, every frame had to carry the brand\'s energy without overstating it. The banners had to stop the scroll without screaming. Production discipline is the only thing standing between brand equity and its erosion.',
    },
    built: {
      headline: 'Banners, social posts, animated assets, and a motion video — all built to brand standard.',
      body: 'We produced the full suite: static website banners, social media posts across formats, an animated banner series, and a motion video. Every asset was built from the Careem brand system outward — consistent in energy, precise in execution, ready for deployment at scale.',
      deliverables: [
        'Website banner designs (multiple formats)',
        'Social media post series',
        'Animated banner (web/social)',
        'Motion video production',
      ],
    },
    result: {
      headline: 'Content that performs at the level the brand deserves.',
      body: 'The deliverables were deployed across Careem\'s digital platforms. The motion video and animated assets communicated the brand\'s energy consistently — the kind of execution that a brand of that recognition level requires every time it appears in front of an audience.',
      deliverables: [
        'Full asset suite delivered and deployed',
        'Motion video live across platforms',
        'Brand-consistent across every format',
      ],
    },
    details: {
      type: 'Digital Design & Motion',
      category: 'Technology / Ride-sharing',
      year: '2022',
      scope: 'Digital Assets + Motion Video',
    },
    diagnosticAnswers: [1, 4],
    keywords: ['careem', 'banner', 'social media', 'animation', 'motion', 'video', 'digital', 'middle east', 'brand', 'content', 'ads', 'advertising'],
    services: ['Digital Design', 'Animation & Editing', 'Social Media Content'],
    year: '2022',
    market: 'Middle East',
  },
  {
    id: 'yves-morel',
    title: 'Yves Morel',
    tagline: 'From pale pink catalogues to 75,000 followers. Zero to everything.',
    subtitle: 'Full Brand Transformation',
    category: 'Brand Identity',
    location: 'Lebanon',
    coverImage: '/images/work/yves-morel/cover.jpg',
    heroLines: ["Yves Morel. From pale pink catalogues", "to 75,000 followers.", "Zero to everything."],
    images: [
      { src: '/images/work/yves-morel/image-1.jpg' },
      { src: '/images/work/yves-morel/image-2.jpg' },
      { src: '/images/work/yves-morel/image-3.jpg' },
      { src: '/images/work/yves-morel/image-4.jpg' },
      { src: '/images/work/yves-morel/image-5.jpg' },
      { src: '/images/work/yves-morel/image-6.jpg' },
      { src: '/images/work/yves-morel/image-7.jpg' },
      { src: '/images/work/yves-morel/image-8.jpg' },
      { src: '/images/work/yves-morel/image-9.jpg' },
      { src: '/images/work/yves-morel/image-10.jpg' },
    ],
    brief: {
      headline: 'They handed us a pale pink catalogue and said: we need an update.',
      body: 'Yves Morel came in with an outdated visual identity, no digital presence, and printed catalogues that didn\'t begin to communicate the quality of their product range. The ask started as a refresh. Once we got in the room, it became clear this was a full transformation — strategy, identity, photography, print, digital, and everything in between.',
      deliverables: [
        'Brand audit & diagnosis',
        'Full brand strategy',
        'Visual identity development',
        '500+ product photography shoot',
        'Print & digital catalogue',
        'Website design',
        'Social media content system',
      ],
    },
    diagnosis: {
      headline: 'The product was exceptional. Nothing about the brand communicated that.',
      body: 'Pale pink catalogues. No social presence. No digital footprint. The product range was over 500 items, each with real quality — but none of that came through in how the brand presented itself. Competitors with inferior products were winning market share because they looked the part and Yves Morel didn\'t. The gap between the product and its presentation was costing them at every touchpoint.',
      deliverables: [
        'Market & competitor audit',
        'Visual identity audit',
        'Product photography gap analysis',
        'Digital presence audit',
      ],
    },
    idea: {
      headline: 'Every product deserves to be presented at the level it was made.',
      body: 'The identity needed to be rebuilt from the ground up — not refreshed. Strategy first: who is Yves Morel now, what does the brand stand for, who is it for? Then visual identity built from those answers. Then a product shoot of over 500 items, art directed against the new brand. Then a catalogue — print and digital — that made every product look as good as it was. Then a website and a social content system that launched the brand into a market it had been invisible in. Not an update. A transformation.',
    },
    built: {
      headline: 'New strategy. New identity. 500+ products shot. Full catalogue. Website. Social. Everything.',
      body: 'We rebuilt the brand from the ground up: a new strategic foundation, a fully developed visual identity, and then execution at every level. Over 500 products were photographed — art directed against the new brand system — and laid out across a full print and digital catalogue with detailed colour and product specifications. A new website was designed. A social media content system was built. Every touchpoint, every format, treated as a brand moment.',
      deliverables: [
        'Brand strategy & positioning',
        'Logo & visual identity system',
        'Colour palette & typography',
        '500+ product photography (art directed)',
        'Full print catalogue',
        'Full digital catalogue',
        'Website design',
        'Social media content system',
        'Posters & point-of-sale materials',
        'Brand standards guide',
      ],
    },
    result: {
      headline: '75,000 followers in year one. From no social presence to market visibility.',
      body: 'Yves Morel launched the new brand and went from zero social media presence to 75,000 followers in under a year. The catalogue became a commercial tool instead of an afterthought. The website established digital credibility. The product photography made what was already excellent finally look excellent. A brand transformation that proved the product had always deserved better presentation.',
      deliverables: [
        '75,000 social followers in year one',
        'Full brand system live across all touchpoints',
        'Print and digital catalogue in market',
        'Website live with full product range',
      ],
    },
    details: {
      type: 'Brand Identity',
      category: 'Retail / Product',
      year: '2018',
      scope: 'Full Brand Transformation',
    },
    diagnosticAnswers: [0, 1, 2, 4],
    keywords: ['brand transformation', 'rebrand', 'catalogue', 'photography', 'product', 'digital', 'social media', 'website', 'print', 'identity', 'retail', 'lebanon', 'point of sale', 'poster'],
    services: ['Brand Foundation', 'Visual Identity System', 'Photography', 'Print & Editorial', 'Digital Design', 'Social Media'],
    year: '2018',
    market: 'Lebanon',
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function getProjectsByAnswer(answerId: number): Project[] {
  return PROJECTS.filter(p => p.diagnosticAnswers.includes(answerId))
}

export function getProjectsByKeywords(input: string): Project[] {
  const words = input.toLowerCase().split(/\s+/)
  const scored = PROJECTS.map(project => {
    const score = words.reduce((acc, word) => {
      return acc + project.keywords.filter(k => k.includes(word) || word.includes(k)).length
    }, 0)
    return { project, score }
  })
  return scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.project)
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find(p => p.id === slug)
}
