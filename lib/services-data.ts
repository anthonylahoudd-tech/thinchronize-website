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
  { id: 1, label: "I'm building a brand from scratch", keywords: ['scratch', 'new', 'startup', 'launch', 'first', 'beginning', 'build', 'create'] },
  { id: 2, label: "I'm not sure what's wrong — I need a read", keywords: ['diagnose', 'audit', 'score', 'health', 'research', 'evidence', 'not sure', 'unsure', 'read', 'where do we stand', 'stuck', 'wrong', 'assessment', 'reality'] },
  { id: 3, label: "I need print materials or digital assets", keywords: ['print', 'materials', 'brochure', 'digital', 'social', 'assets', 'collateral', 'folder', 'deck'] },
  { id: 4, label: "I need animation, motion, or video content", keywords: ['animation', 'motion', 'video', 'reel', 'content', 'moving', 'animate', 'film'] },
  { id: 5, label: "Our brand is built. We need ongoing guidance.", keywords: ['guidance', 'maintain', 'ongoing', 'advisory', 'retainer', 'monthly', 'guardianship', 'after'] },
]

// ─── BRANDING services ────────────────────────────────────────────────────────

export const BRANDING_SERVICES: Service[] = [
  {
    id: 'brand-engagement',
    name: 'Brand Engagement',
    shortName: 'Brand',
    tagline: 'Strategy and identity from the same brain.',
    description: 'Everything the brand needs, built by one team: the strategic foundation and the visual system created together, from diagnosis to launch. No handoffs between a strategy team and a creative team. Runs as one of two tracks — Launch for a new brand, or Rebuild for an existing one — same phases, same point of view, start to finish.',
    deliverables: ['Two tracks — Launch (new brand) or Rebuild (existing brand)', 'Brand diagnosis (Audit or Research credits in)', 'Brand foundation (mission, vision, values, positioning, personality)', 'Visual identity system (logo, colour, typography, iconography)', 'Brand standards & guidelines', 'Launch activation strategy'],
    diagnosticAnswers: [0, 1],
    projectIds: ['don-bosco', 'latelier', 'tryo', 'cafe-bdooz', 'whatsub'],
    orbitAngle: 0,
    orbitRadius: 440,
    orbitSpeed: 0.004,
  },
  {
    id: 'brand-audit',
    name: 'Brand Audit',
    shortName: 'Audit',
    tagline: 'A diagnosis before you spend on a solution.',
    description: 'A diagnostic-only engagement. We assess your current brand across five dimensions and deliver the Brand Health Report — a Brand Health Score out of 100, specific findings, and a recommended path forward. No creative work. Just the truth, and where to point it next.',
    deliverables: ['Brand Health Report (the deliverable)', 'Brand Health Score /100 across 5 dimensions', 'Strategic clarity & equity assessment', 'Visual coherence audit', 'Market positioning & communication review', 'Findings + recommended routing (Engagement or Research)'],
    diagnosticAnswers: [2],
    projectIds: [],
    orbitAngle: 0.7,
    orbitRadius: 420,
    orbitSpeed: 0.0038,
  },
  {
    id: 'research',
    name: 'Research',
    shortName: 'Research',
    tagline: 'Evidence before opinion.',
    description: 'A standalone study of where your brand actually stands today — its point A. We gather the evidence (audience, market, category, competitors, and your own materials) and turn it into a clear read of reality plus the single insight that should drive what comes next. Sold at three depths, from a focused standard study to full-field interviews to partner-led research.',
    deliverables: ['Brand Reality Report (the current-state read)', 'Insight Hypothesis (the one idea that should drive the work)', 'Evidence base — audience, market, category, competitor signals', 'Depth options: Standard · Field · Partner', 'Routes directly into an Engagement (credits in)'],
    diagnosticAnswers: [2],
    projectIds: [],
    orbitAngle: 1.4,
    orbitRadius: 460,
    orbitSpeed: 0.0042,
  },
  {
    id: 'brand-guardianship',
    name: 'Brand Guardianship',
    shortName: 'Guardianship',
    tagline: 'After the brand is built.',
    description: 'A brand without someone watching it drifts. Guardianship is Thinchronize\'s ongoing monthly retainer — for brands that are built and need to stay that way. Two tiers: Brand Control for advisory and governance, or Marketing Management for that plus content design and partner-run channels under thinc. direction.',
    deliverables: ['T1 · Brand Control — advisory & governance', 'T2 · Marketing Management — T1 + content design + partner-run channels', 'Monthly strategy session', 'Async brand review (24hr response)', 'Quarterly brand audit & health monitoring', 'Strategic guidance on all brand decisions'],
    diagnosticAnswers: [5],
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
    diagnosticAnswers: [3],
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
    diagnosticAnswers: [3],
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
    diagnosticAnswers: [4],
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
    diagnosticAnswers: [4],
    projectIds: [],
    orbitAngle: 4.19,
    orbitRadius: 520,
    orbitSpeed: 0.0028,
  },
]

// ─── PRODUCTION families (compact grid on the services page) ──────────────────
// Presentation layer for the six-family execution grid. The routable
// PRODUCTION_SERVICES above stay intact so the diagnostic keeps working.

export interface ProductionFamily {
  id: string
  name: string
  intent: string
  items: string[]
}

export const PRODUCTION_FAMILIES: ProductionFamily[] = [
  {
    id: 'social-digital',
    name: 'Social / Digital',
    intent: 'The brand, working every day across feeds and screens.',
    items: ['Social templates & content systems', 'Digital advertising creatives', 'Email & newsletter design', 'Pitch & investor decks'],
  },
  {
    id: 'print-editorial',
    name: 'Print & Editorial',
    intent: 'Every physical touchpoint as a brand moment.',
    items: ['Collateral & stationery', 'Brochures & catalogues', 'Editorial layout & booklets', 'Signage & environmental'],
  },
  {
    id: 'brand-extension',
    name: 'Brand Extension',
    intent: 'The system stretched into new applications, on-brand.',
    items: ['Merch & apparel', 'Event & space branding', 'Templates & toolkits', 'Campaign systems'],
  },
  {
    id: 'packaging',
    name: 'Packaging',
    intent: 'The first moment a customer physically meets the product.',
    items: ['Structural & graphic packaging', 'Label systems', 'Unboxing & inserts', 'Retail-ready artwork'],
  },
  {
    id: 'motion-animation',
    name: 'Motion / Animation',
    intent: 'The brand in motion, with strategic intent — not decoration.',
    items: ['Brand motion system', 'Logo animation & idents', 'Explainer videos', 'Social motion (feed, stories, reels)'],
  },
  {
    id: 'web-ui',
    name: 'Web / UI',
    intent: 'Built for screens, built for the brand.',
    items: ['Website design (IA to final UI)', 'UI/UX for products & platforms', 'Landing pages', 'Design systems'],
  },
]

export const PRODUCTION_PARTNER_NOTE =
  'Photography, video, brand film, and web development are directed by thinc. and produced by vetted partners.'

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
