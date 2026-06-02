export interface Service {
  id: string
  name: string
  shortName: string
  tagline: string
  description: string
  deliverables: string[]
  diagnosticAnswers: number[]
  projectIds: string[]
  orbitAngle: number
  orbitRadius: number
  orbitSpeed: number
}

export const DIAGNOSTIC_ANSWERS_SERVICES = [
  { id: 0, label: "My brand doesn't reflect what we've actually built", keywords: ['mismatch', 'outdated', 'refresh', 'identity', 'visual', 'look', 'reflect', 'built'] },
  { id: 1, label: "I need animation, motion, or video content", keywords: ['animation', 'motion', 'video', 'reel', 'content', 'moving', 'animate', 'film'] },
  { id: 2, label: "I need print materials or digital assets", keywords: ['print', 'materials', 'brochure', 'digital', 'social', 'assets', 'collateral', 'folder', 'deck'] },
  { id: 3, label: "I'm building a brand from scratch", keywords: ['scratch', 'new', 'startup', 'launch', 'first', 'beginning', 'build', 'create'] },
  { id: 4, label: "Our brand is built. We need ongoing guidance.", keywords: ['guidance', 'maintain', 'ongoing', 'advisory', 'retainer', 'monthly', 'guardianship', 'after'] },
]

// ─── BRANDING services ────────────────────────────────────────────────────────

export const BRANDING_SERVICES: Service[] = [
  {
    id: 'brand-engagement',
    name: 'Full Brand Engagement',
    shortName: 'Brand',
    tagline: 'Strategy and identity from the same brain.',
    description: 'For brands that need everything: the strategic foundation and the visual system built together, from diagnosis to delivery. No handoffs between a strategy team and a creative team. One process, one point of view, start to finish.',
    deliverables: ['Brand audit & diagnosis', 'Brand foundation (mission, vision, values, positioning, personality)', 'Visual identity system (logo, colour, typography, iconography)', 'Brand standards & guidelines', 'Launch activation strategy'],
    diagnosticAnswers: [0, 2, 3],
    projectIds: ['don-bosco', 'latelier', 'tryo', 'cafe-bdooz', 'whatsub'],
    orbitAngle: 0,
    orbitRadius: 440,
    orbitSpeed: 0.004,
  },
  {
    id: 'brand-audit',
    name: 'Brand Audit',
    shortName: 'Audit',
    tagline: 'Find out what\'s actually wrong before spending money on a solution.',
    description: 'A diagnostic-only engagement. We assess your current brand across four dimensions — strategic clarity, visual coherence, market positioning, and communication effectiveness — and deliver a written diagnosis with specific findings and a recommended path forward. No creative work. Just the truth.',
    deliverables: ['Brand equity assessment', 'Visual identity audit', 'Competitor and market positioning review', 'Communication effectiveness analysis', 'Written diagnosis report with recommended next steps'],
    diagnosticAnswers: [0],
    projectIds: [],
    orbitAngle: 0.7,
    orbitRadius: 420,
    orbitSpeed: 0.0038,
  },
  {
    id: 'brand-clarity',
    name: 'Brand Clarity',
    shortName: 'Clarity',
    tagline: 'Strategy only. The foundation before the visual work begins.',
    description: 'For brands that already have a visual identity but are missing the strategic layer beneath it. We build the brand foundation — positioning, audience, personality, messaging — without touching the visuals. The result is a strategy document that can brief any designer, agency, or internal team.',
    deliverables: ['Discovery workshop', 'Competitor and market analysis', 'Brand foundation document', 'Positioning statement', 'Audience definition', 'Brand personality & messaging framework'],
    diagnosticAnswers: [0, 3],
    projectIds: [],
    orbitAngle: 1.4,
    orbitRadius: 460,
    orbitSpeed: 0.0042,
  },
  {
    id: 'brand-refresh',
    name: 'Brand Refresh',
    shortName: 'Refresh',
    tagline: 'Visual identity only. Built on a strategy that already exists.',
    description: 'For brands with a clear strategic foundation that need their visual system updated, elevated, or rebuilt. We don\'t touch the strategy — we build from it. The result is a visual identity that\'s coherent, contemporary, and consistent across every application.',
    deliverables: ['Logo and mark system', 'Colour palette', 'Typography system', 'Iconography direction', 'Brand guidelines', 'File delivery (all formats)'],
    diagnosticAnswers: [0, 2],
    projectIds: [],
    orbitAngle: 2.1,
    orbitRadius: 430,
    orbitSpeed: 0.0036,
  },
  {
    id: 'brand-guardianship',
    name: 'Brand Guardianship',
    shortName: 'Guardianship',
    tagline: 'After the brand is built.',
    description: 'A brand without someone watching it drifts. Guardianship is Thinchronize\'s ongoing advisory service — for brands that are built and need to stay that way. Monthly strategy session, async brand review, quarterly audit. Not a production subscription. Strategic oversight.',
    deliverables: ['Monthly 60-min strategy session', 'Async brand review (24hr response)', 'Quarterly brand audit', 'Brand health monitoring', 'Strategic guidance on all brand decisions'],
    diagnosticAnswers: [4],
    projectIds: [],
    orbitAngle: 5.24,
    orbitRadius: 420,
    orbitSpeed: 0.0045,
  },
]

// ─── PRODUCTION services ──────────────────────────────────────────────────────

export const PRODUCTION_SERVICES: Service[] = [
  {
    id: 'print-editorial',
    name: 'Print & Editorial',
    shortName: 'Print',
    tagline: 'Every physical touchpoint is a brand moment.',
    description: 'Collateral, packaging, and editorial materials built on the brand system. Nothing disconnected from the identity. Every grid decision, type choice, and colour proportion traces back to the brand — not to a template or a designer\'s preference.',
    deliverables: ['Brand collateral (cards, letterheads, stationery)', 'Brochures & catalogues', 'Packaging design', 'Signage & environmental', 'Campaign materials', 'Editorial layout & booklets'],
    diagnosticAnswers: [2],
    projectIds: ['societe-jabra', 'conundrum', 'whatsub'],
    orbitAngle: 1.05,
    orbitRadius: 500,
    orbitSpeed: 0.003,
  },
  {
    id: 'digital-design',
    name: 'Digital Design',
    shortName: 'Digital',
    tagline: 'Built for screens. Built for the brand.',
    description: 'Social assets, presentations, digital ads, and website UI — all extending the visual system with the same precision as the core identity. No filler content. No disconnected one-offs.',
    deliverables: ['Website design (IA to final UI)', 'Social media templates & content systems', 'UI/UX design', 'Digital advertising creatives', 'Pitch decks & investor presentations'],
    diagnosticAnswers: [2],
    projectIds: ['nft-motivated'],
    orbitAngle: 2.09,
    orbitRadius: 400,
    orbitSpeed: 0.005,
  },
  {
    id: 'animation-editing',
    name: 'Animation & Editing',
    shortName: 'Motion',
    tagline: 'The brand, in motion.',
    description: 'Motion content designed with strategic intent — not decorative animation. Logo animations, brand idents, social motion, and explainer videos. Every frame built from a defined motion voice, not from a trend or a template.',
    deliverables: ['Brand motion system & principles', 'Logo animation', 'Explainer videos (60–90 seconds)', 'Social motion content (feed, stories, reels)', 'Presentation motion', 'Video editing & post-production'],
    diagnosticAnswers: [1],
    projectIds: ['nft-motivated', 'equisoft'],
    orbitAngle: 3.14,
    orbitRadius: 470,
    orbitSpeed: 0.0035,
  },
  {
    id: 'photography-videography',
    name: 'Photography & Videography',
    shortName: 'Photo/Film',
    tagline: 'Your brand, made real.',
    description: 'Art direction and production through vetted partners. Brand photography, product photography, and brand films — all directed against the brand strategy. Not stock. Not generic. Your brand, shot.',
    deliverables: ['Brand photography direction & production', 'Product photography', 'Brand film (60–180 seconds)', 'Documentary & process content', 'Campaign photography & video'],
    diagnosticAnswers: [1],
    projectIds: [],
    orbitAngle: 4.19,
    orbitRadius: 520,
    orbitSpeed: 0.0028,
  },
]

// ─── Combined export (for any code that imports SERVICES) ─────────────────────

export const SERVICES: Service[] = [...BRANDING_SERVICES, ...PRODUCTION_SERVICES]

export function getServicesByAnswer(answerId: number): Service[] {
  return SERVICES.filter(s => s.diagnosticAnswers.includes(answerId))
}

export function getServicesByKeywords(input: string): Service[] {
  const words = input.toLowerCase().split(/\s+/)
  const scored = SERVICES.map(service => {
    const answer = DIAGNOSTIC_ANSWERS_SERVICES.find(a =>
      a.keywords.some(k => words.some(w => k.includes(w) || w.includes(k)))
    )
    const score = answer ? (service.diagnosticAnswers.includes(answer.id) ? 1 : 0) : 0
    const directScore = words.reduce((acc, word) =>
      acc + (service.name.toLowerCase().includes(word) || service.description.toLowerCase().includes(word) ? 1 : 0), 0)
    return { service, score: score + directScore }
  })
  return scored.filter(s => s.score > 0).sort((a, b) => b.score - a.score).map(s => s.service)
}
