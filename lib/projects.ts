// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectSection {
  headline: string
  body: string
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
  brief: ProjectSection
  diagnosis: ProjectSection
  built: ProjectSection
  result: ProjectSection
  details: ProjectDetails
  // kept for diagnostic tool
  diagnosticAnswers: number[]
  keywords: string[]
  services: string[]
  year: string
  market: string
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
    coverImage: '/images/work/whatsub/Whatsub-Sign.jpg',
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
      { src: '/images/work/whatsub/Whatsub-Image-19.jpg' },
      { src: '/images/work/whatsub/mural.jpg' },
      { src: '/images/work/whatsub/packaging.jpg' },
      { src: '/images/work/whatsub/poster-1.jpg' },
      { src: '/images/work/whatsub/poster-2.jpg' },
      { src: '/images/work/whatsub/logo-final.jpg' },
    ],
    brief: {
      headline: 'Build a fast-casual sandwich brand from the ground up.',
      body: 'Whatsub needed more than a logo — they needed an identity that could compete in a crowded F&B market and give a new concept a reason to exist beyond the product. A new sub sandwich brand launching in Washington D.C. needed a full visual identity — from logo to packaging to food truck wrap — that could own the street.',
    },
    diagnosis: {
      headline: 'No story, no differentiation, no reason to choose.',
      body: 'The fast casual space in D.C. was dominated by clean, corporate visual systems. The gap was character. Whatsub had a strong product but zero brand infrastructure. Without a clear position, price becomes the only conversation — and that\'s a race to the bottom.',
    },
    built: {
      headline: 'A full brand identity built around the submarine metaphor.',
      body: 'A custom scripted logotype with an illustrated submarine sandwich mascot. A bold yellow-to-orange-to-red color system. Full rollout across logo suite, menu design, packaging (bags, boxes, cups, stickers), food truck wrap, restaurant mural, and outdoor advertising. Every touchpoint designed to feel deliberate and ownable.',
    },
    result: {
      headline: 'A brand ready to open, grow, and be remembered.',
      body: 'Whatsub launched in early 2025 with a complete brand system that was immediately recognizable at street level. The identity translated across every touchpoint — from the 20-foot truck wrap to the condiment packet — with no dilution. A brand platform that gives the team a foundation for every decision that follows.',
    },
    details: {
      type: 'Brand Identity',
      category: 'F&B',
      year: '2025',
      scope: 'Full Brand System',
    },
    diagnosticAnswers: [0, 2, 3],
    keywords: ['brand identity', 'logo', 'packaging', 'menu design', 'environmental', 'food truck', 'fast casual', 'washington dc'],
    services: ['Brand Identity', 'Print Design', 'Environmental Design', 'Packaging'],
    year: '2025',
    market: 'Washington D.C., USA',
  },
  {
    id: 'latelier',
    title: "L'atelier NGO",
    tagline: 'An NGO brand that works for funders and communities at once.',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    coverImage: '/images/work/latelier/Latelier-Image-3.jpeg',
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
    coverImage: '/images/work/cafe-bdooz/Cover-Bdooz.png',
    images: [
      { src: '/images/work/cafe-bdooz/Image-1-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-2-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-3-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-4-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-5-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-6-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-7-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-8-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-9-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-10-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-11-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-12-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-13-Bdooz.png' },
      { src: '/images/work/cafe-bdooz/Image-14-Bdooz.png' },
    ],
    brief: {
      headline: 'A Lebanese café with a strong neighbourhood personality needed an identity that made people feel something before they ordered.',
      body: 'The space had warmth, the product was strong, and the name had character — but nothing was connecting them visually. The brand was invisible where it mattered most: before someone walked through the door.',
    },
    diagnosis: {
      headline: 'The café existed. The brand didn\'t.',
      body: 'In a neighbourhood F&B market, personality is infrastructure. Without it, a café becomes interchangeable — just another option on a crowded street. Cafe BDOOZ had a real identity in the room but nothing that carried it outside the four walls.',
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
    coverImage: '/images/work/don-bosco.jpg',
    brief: {
      headline: 'They came asking for a logo refresh. That wasn\'t the problem.',
      body: 'Don Bosco School had evolved — new facilities, an expanded vision, a changed student body — but the brand was still communicating 1990. The real ask wasn\'t modernisation. It was alignment between what the school had become and how it was presenting itself to the world.',
    },
    diagnosis: {
      headline: 'The visual system wasn\'t the problem. The identity was.',
      body: 'The school had a strong reputation and a clear educational philosophy — but nothing in the brand reflected it. Parents, students, and faculty experienced a gap between the institution\'s ambition and how it showed up visually. A logo refresh would have papered over the real issue.',
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
    coverImage: '/images/work/tryo.png',
    brief: {
      headline: 'A startup at launch with a product and no brand.',
      body: 'The founders could describe the product in detail but couldn\'t articulate what made it matter to someone who didn\'t already know them. They weren\'t missing a logo — they were missing a point of view.',
    },
    diagnosis: {
      headline: 'First-brand syndrome: a product without a position.',
      body: 'Early-stage companies often mistake product confidence for brand clarity. Tryo knew what it did. It didn\'t know why that mattered to the market — and neither did the market. Without that, every conversation started from zero.',
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
    coverImage: '/images/work/nft-motivated.jpg',
    brief: {
      headline: 'A US-based NFT platform needing motion content that matched their brand energy.',
      body: 'Motion was being treated as decoration — content to fill feeds — not as strategic communication. The animations were moving. They weren\'t saying anything. The platform needed a motion direction that reflected the brand\'s character, not just its colour palette.',
    },
    diagnosis: {
      headline: 'Moving ≠ communicating.',
      body: 'In the NFT space, visual noise is everywhere. Every platform animates. Most animate badly — fast, random, and disconnected from what the brand is actually saying. NFT Motivated had energy but no direction. The motion was working against their brand, not for it.',
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
    coverImage: '/images/work/equisoft.jpg',
    brief: {
      headline: 'A financial software company in Canada needing brand motion across their communications.',
      body: 'Equisoft\'s motion was working against their product. The visuals weren\'t communicating the sophistication the software actually had. They needed a motion system — not animations — that would make the product look as intelligent as it is.',
    },
    diagnosis: {
      headline: 'Enterprise brands animate badly in one of two directions.',
      body: 'Too stiff, or overcompensating with playfulness. Equisoft was stuck between the two. The timing was inconsistent, the easing arbitrary, and the visual language disconnected from the product\'s precision. Motion was being produced piece by piece, with no system holding it together.',
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
    coverImage: '/images/work/societe-jabra.jpg',
    brief: {
      headline: 'A company needing client-facing print materials that actually represented them.',
      body: 'Functional but disconnected. The collateral looked like it came from a different brand than the one the client thought they were building. Print was being treated as an afterthought — not a brand touchpoint.',
    },
    diagnosis: {
      headline: 'The collateral was undoing the brand work.',
      body: 'Every meeting where a client received Societe Jabra\'s materials was a moment where the brand story broke down. The visual language was inconsistent with the core identity. What should have been a trust-builder was creating confusion instead.',
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
      type: 'Print Design',
      category: 'Corporate',
      year: '2023',
      scope: 'Collateral System',
    },
    diagnosticAnswers: [4],
    keywords: ['print', 'collateral', 'materials', 'folder', 'corporate', 'represent', 'brochure', 'flyer'],
    services: ['Print Design', 'Brand Extension', 'Collateral System'],
    year: '2023',
    market: 'Lebanon',
  },
  {
    id: 'conundrum',
    title: 'Conundrum',
    tagline: 'An editorial system built for content that needs to be read.',
    subtitle: 'Booklet + Brochure',
    category: 'Brand Strategy',
    coverImage: '/images/work/conundrum.jpg',
    brief: {
      headline: 'Complex content that needed to be organised into a physical format people would actually read.',
      body: 'The challenge wasn\'t design — it was hierarchy. Too much information with no clear order of importance. Readers were getting lost before they reached what mattered. The document needed to be restructured before it could be designed.',
    },
    diagnosis: {
      headline: 'Information without hierarchy is just noise.',
      body: 'Conundrum\'s content had real value — but it was buried under layers of equal-weight information. Every section was presented as if it were the most important. The result: nothing stood out, nothing landed, and the document got filed instead of read.',
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
    services: ['Editorial Design', 'Print Design', 'Content Hierarchy'],
    year: '2023',
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
