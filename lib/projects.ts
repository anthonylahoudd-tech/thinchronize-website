export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  coverImage: string
  images?: string[]        // optional gallery: [0]=section3, [1]=section5
  diagnosticAnswers: number[]
  keywords: string[]
  brief: string
  diagnosis: string
  built: string
  result: string
  services: string[]
  year: string
  market: string
}

export const DIAGNOSTIC_ANSWERS = [
  { id: 0, label: "It doesn't look like what we've built", keywords: ['mismatch', 'outdated', 'old', 'refresh', 'logo', 'visual', 'look'] },
  { id: 1, label: "I need it to move — video, animation, content", keywords: ['animation', 'motion', 'video', 'reel', 'content', 'moving', 'animate'] },
  { id: 2, label: "We've rebranded before and something still feels off", keywords: ['rebrand', 'rebranding', 'changed', 'still', 'off', 'wrong', 'feels', 'tried'] },
  { id: 3, label: "I'm building a brand from scratch", keywords: ['startup', 'new', 'launch', 'scratch', 'beginning', 'start', 'first', 'build'] },
  { id: 4, label: "I need materials that actually represent us", keywords: ['print', 'brochure', 'collateral', 'materials', 'folder', 'booklet', 'flyer'] },
]

export const PROJECTS: Project[] = [
  {
    id: 'whatsub',
    title: 'Whatsub',
    subtitle: 'Brand Identity & Visual System',
    category: 'Brand Identity',
    coverImage: '/images/work/whatsub/Whatsub-Sign.jpg',
    diagnosticAnswers: [0, 2, 3],
    keywords: ['brand identity', 'logo', 'packaging', 'menu design', 'environmental', 'food truck', 'fast casual', 'washington dc'],
    brief: "A new sub sandwich brand launching in Washington D.C. needed a full visual identity — from logo to packaging to food truck wrap — that could compete in a saturated fast casual market and own the street.",
    diagnosis: "The fast casual space in D.C. was dominated by clean, corporate visual systems. The gap was character. Whatsub needed to feel handcrafted, bold, and street-ready — a brand that could live on a truck wrap, a takeaway bag, and a menu with equal conviction.",
    built: "A custom scripted logotype with an illustrated submarine sandwich mascot. A bold yellow-to-orange-to-red color system. Full rollout across logo suite, menu design, packaging (bags, boxes, cups, stickers), food truck wrap, restaurant mural, and outdoor advertising.",
    result: "Whatsub launched in early 2025 with a complete brand system that was immediately recognizable at street level. The identity translated across every touchpoint — from the 20-foot truck wrap to the condiment packet — with no dilution.",
    services: ['Brand Identity', 'Print Design', 'Environmental Design', 'Packaging'],
    year: '2025',
    market: 'Washington D.C., USA'
  },
  {
    id: 'latelier',
    title: "L'atelier NGO",
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    coverImage: '/images/work/latelier/Latelier-Image-3.jpeg',
    images: [
      '/images/work/latelier/Latelier-Image-2.jpeg',
      '/images/work/latelier/Latelier-Image-1.jpeg',
    ],
    diagnosticAnswers: [0, 3],
    keywords: ['ngo', 'nonprofit', 'new brand', 'identity', 'credibility', 'mission', 'scratch', 'build', 'first'],
    brief: "A mission-driven organization with clarity on what they stood for — and no visual language to prove it.",
    diagnosis: "Two audiences, one brand. Donors and partners needed to see credibility. Beneficiaries needed to feel warmth. They were getting neither — not because the work was poor, but because no one had defined what the brand needed to do before designing it.",
    built: "A brand built on the mission statement itself. Restraint for credibility. Warmth for humanity. Both in the same system, without splitting.",
    result: "A brand that opens doors with funders and builds trust with the people they serve.",
    services: ['Brand Foundation', 'Visual Identity System', 'Communication Direction'],
    year: '2023',
    market: 'Lebanon'
  },
  {
    id: 'cafe-bdooz',
    title: 'Cafe BDOOZ',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    coverImage: '/images/work/cafe-bdooz/Cover-Bdooz.png',
    images: [
      '/images/work/cafe-bdooz/Image-2-Bdooz.png',
      '/images/work/cafe-bdooz/Image-5-Bdooz.png',
    ],
    diagnosticAnswers: [0, 3],
    keywords: ['cafe', 'coffee', 'restaurant', 'brand identity', 'logo', 'lebanon', 'neighbourhood', 'warmth', 'character', 'hospitality'],
    brief: "A Lebanese café with a strong neighbourhood personality needed an identity that would make people feel something before they ordered.",
    diagnosis: "The space had warmth, the product was strong, and the name had character — but nothing was connecting them visually. The brand was invisible where it mattered most: before someone walked through the door.",
    built: "An identity built around warmth and return. Typographic personality that feels handcrafted without being hand-drawn. A colour palette that communicates comfort and confidence. A system that works on a cup, a sign, and a social feed without losing its soul.",
    result: "A brand that makes the café feel like a place people already know — before they've ever been.",
    services: ['Brand Foundation', 'Visual Identity System', 'Brand Standards'],
    year: '2025',
    market: 'Lebanon'
  },
  {
    id: 'don-bosco',
    title: 'Don Bosco School',
    subtitle: 'Rebranding',
    category: 'Brand Identity',
    coverImage: '/images/work/don-bosco.jpg',
    diagnosticAnswers: [0, 2],
    keywords: ['rebranding', 'identity', 'outdated', 'mismatch', 'logo', 'school', 'education', 'heritage', 'refresh', 'old'],
    brief: "They came asking for a logo refresh.",
    diagnosis: "The visual system wasn't the problem. The school had evolved — new facilities, expanded vision, a changed student body — but the brand was still communicating 1990. The real ask wasn't modernization. It was alignment.",
    built: "Brand foundation first. Then a visual identity that carries the school's dual mandate: tradition and forward motion. The mark holds both. The system extends from signage to stationery without losing its center.",
    result: "A brand that finally matched the institution it had become.",
    services: ['Brand Foundation', 'Visual Identity System', 'Brand Standards'],
    year: '2023',
    market: 'Lebanon'
  },
  {
    id: 'tryo',
    title: 'Tryo',
    subtitle: 'Brand Identity',
    category: 'Brand Identity',
    coverImage: '/images/work/tryo.png',
    diagnosticAnswers: [0, 3],
    keywords: ['startup', 'new', 'launch', 'scratch', 'beginning', 'first brand', 'build', 'identity', 'product'],
    brief: "A startup at launch with a product and no brand.",
    diagnosis: "First-brand syndrome. The founders could describe the product in detail but couldn't articulate what made it matter to someone who didn't already know them. They weren't missing a logo — they were missing a point of view.",
    built: "Started at Phase 0. What is this actually? Who is it for? Why does it matter now? Once those answers existed, the visual identity followed. Not the other way around.",
    result: "A brand that explains itself in three seconds — because the clarity came before the design did.",
    services: ['Brand Foundation', 'Positioning', 'Visual Identity System'],
    year: '2023',
    market: 'Lebanon'
  },
  {
    id: 'nft-motivated',
    title: 'NFT Motivated',
    subtitle: 'Motion Graphics',
    category: 'Motion',
    coverImage: '/images/work/nft-motivated.jpg',
    diagnosticAnswers: [1],
    keywords: ['animation', 'motion', 'video', 'reel', 'content', 'moving', 'animate', 'nft', 'usa', 'international'],
    brief: "A US-based NFT platform needing motion content that matched their brand energy.",
    diagnosis: "Motion was being treated as decoration — content to fill feeds — not as strategic communication. The animations were moving. They weren't saying anything.",
    built: "A motion direction before a single frame was animated. What does this brand feel like in time? What does the pacing communicate? Every frame was built from those answers outward.",
    result: "Motion content that reads as brand, not just content.",
    services: ['Motion Direction', 'Animation System', 'Brand Motion'],
    year: '2023',
    market: 'United States'
  },
  {
    id: 'equisoft',
    title: 'Equisoft',
    subtitle: 'Motion Graphics',
    category: 'Motion',
    coverImage: '/images/work/equisoft.jpg',
    diagnosticAnswers: [1],
    keywords: ['animation', 'motion', 'video', 'corporate', 'fintech', 'b2b', 'enterprise', 'content', 'animate', 'canada'],
    brief: "A financial software company in Canada needing brand motion across their communications.",
    diagnosis: "Enterprise brands animate badly in one of two directions: too stiff, or overcompensating with playfulness. Equisoft's motion was working against their product. The visuals weren't communicating the sophistication the software actually had.",
    built: "A motion system — not just animations. Consistent timing, consistent easing, consistent visual language. So every piece of motion, regardless of context, reads as the same brand.",
    result: "Motion that makes the product look as intelligent as it is.",
    services: ['Motion Direction', 'Animation System', 'Brand Motion'],
    year: '2023',
    market: 'Canada'
  },
  {
    id: 'societe-jabra',
    title: 'Societe Jabra',
    subtitle: 'Print Collateral',
    category: 'Packaging',
    coverImage: '/images/work/societe-jabra.jpg',
    diagnosticAnswers: [4],
    keywords: ['print', 'collateral', 'materials', 'folder', 'corporate', 'represent', 'brochure', 'flyer'],
    brief: "A company needing client-facing print materials.",
    diagnosis: "Functional but disconnected. The collateral looked like it came from a different brand than the one the client thought they were building. Print was being treated as an afterthought, not a brand touchpoint.",
    built: "Collateral that extended the visual system with the same precision as the core identity. Every decision — grid, type, colour proportion — traced back to the brand, not to a designer's preference.",
    result: "Materials that work as hard as a first impression should.",
    services: ['Print Design', 'Brand Extension', 'Collateral System'],
    year: '2023',
    market: 'Lebanon'
  },
  {
    id: 'conundrum',
    title: 'Conundrum',
    subtitle: 'Booklet + Brochure',
    category: 'Brand Strategy',
    coverImage: '/images/work/conundrum.jpg',
    diagnosticAnswers: [4],
    keywords: ['print', 'brochure', 'booklet', 'editorial', 'materials', 'content', 'represent', 'folder'],
    brief: "Complex content that needed to be organized into a physical format.",
    diagnosis: "The challenge wasn't design — it was hierarchy. Too much information with no clear order of importance. Readers were getting lost before they reached what mattered.",
    built: "An editorial system. Content mapped, weighted, and sequenced before any layout decision was made. Then a visual system that guided the reader's eye without announcing itself.",
    result: "A document that gets read instead of filed.",
    services: ['Editorial Design', 'Print Design', 'Content Hierarchy'],
    year: '2023',
    market: 'Lebanon'
  },
]

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
