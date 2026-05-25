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

export const SERVICES: Service[] = [
  {
    id: 'brand-engagement',
    name: 'Brand Engagement',
    shortName: 'Brand',
    tagline: 'Strategy before anything else.',
    description: 'Our flagship. The complete brand build — strategy and identity built from the same brain. Starts with a diagnosis, not a brief. Available as Brand Clarity (strategy only), Brand Refresh (visual identity only), or Full Engagement (all 10 phases).',
    deliverables: ['Brand Foundation', 'Positioning & Differentiation', 'Visual Identity System', 'Brandbook & Standards', 'Brand Launch Strategy'],
    diagnosticAnswers: [0, 2, 3],
    projectIds: ['don-bosco', 'latelier', 'tryo', 'whatsub'],
    orbitAngle: 0,
    orbitRadius: 440,
    orbitSpeed: 0.004,
  },
  {
    id: 'print-design',
    name: 'Print Design',
    shortName: 'Print',
    tagline: 'Every touchpoint is a brand moment.',
    description: 'Collateral, packaging, and print materials built on your brand system. Nothing disconnected from the identity. Nothing designed without a reason.',
    deliverables: ['Business cards & stationery', 'Brochures & booklets', 'Menus', 'Packaging', 'Signage & environmental'],
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
    description: 'Social assets, presentations, digital ads, and website UI — all extending the visual system with the same precision as the core identity. No filler content.',
    deliverables: ['Social content sets', 'Presentation decks', 'Digital ad creatives', 'Email newsletters', 'Website UI design'],
    diagnosticAnswers: [2],
    projectIds: ['nft-motivated'],
    orbitAngle: 2.09,
    orbitRadius: 400,
    orbitSpeed: 0.005,
  },
  {
    id: 'animation-motion',
    name: 'Animation & Motion',
    shortName: 'Motion',
    tagline: 'The brand, in time.',
    description: 'Logo animations, brand idents, social motion, and explainer videos — designed with the same strategic rigor as the identity itself. Motion that communicates, not just moves.',
    deliverables: ['Logo animations', 'Brand idents', 'Social motion sets', 'Animated presentations', 'Explainer videos'],
    diagnosticAnswers: [1],
    projectIds: ['nft-motivated', 'equisoft'],
    orbitAngle: 3.14,
    orbitRadius: 470,
    orbitSpeed: 0.0035,
  },
  {
    id: 'photography-video',
    name: 'Photography & Video',
    shortName: 'Photo/Film',
    tagline: 'Your brand, made real.',
    description: 'Art direction and production through vetted partners. Brand photography, product photography, and brand films — all directed against the brand strategy.',
    deliverables: ['Brand photography', 'Product photography', 'Short brand films', 'Full brand videos'],
    diagnosticAnswers: [1],
    projectIds: [],
    orbitAngle: 4.19,
    orbitRadius: 520,
    orbitSpeed: 0.0028,
  },
  {
    id: 'brand-guardianship',
    name: 'Brand Guardianship',
    shortName: 'Guardianship',
    tagline: 'After the brand is built.',
    description: 'Monthly strategic advisory for brands that are already built. Direction notes, compliance reviews, async access, and quarterly brand pulse checks. Not a production subscription.',
    deliverables: ['Monthly Direction Note', 'Monthly 60-min session', 'Async WhatsApp access', 'Brand compliance reviews', 'Quarterly Brand Pulse'],
    diagnosticAnswers: [4],
    projectIds: [],
    orbitAngle: 5.24,
    orbitRadius: 420,
    orbitSpeed: 0.0045,
  },
]

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
