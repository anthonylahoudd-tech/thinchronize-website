'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { SERVICES } from '@/lib/services-data'
import PageHero from '@/components/ui/PageHero'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Static content maps ──────────────────────────────────────────────────────

const FOMO: Record<string, string> = {
  'brand-engagement':
    "Most brands don't lose ground overnight. They drift. When your brand no longer reflects what you've built, the gap between perception and reality is costing you. Potential clients judge capability by presentation, and misalignment between who you are and how you look loses you deals before the conversation starts. Every month without clarity is a month your competitors are winning business that should be yours.",
  'print-design':
    "In a world saturated with digital noise, physical materials have become the highest-trust touchpoint left. But generic, templated print signals the opposite of what you need it to. When what you hand someone looks assembled rather than designed, they mentally discount your price point before you've said a word. The quality of what they hold is a proxy for the quality of what you deliver.",
  'digital-design':
    "Decision-makers form a lasting opinion of your brand within 19 seconds of landing on your website. If your digital presence doesn't communicate authority in that window, you're not just losing visitors; you're losing deals that never became conversations. Digital isn't where you exist. It's where you're evaluated.",
  'animation-motion':
    "Static content generates a fraction of the engagement motion does, and more importantly, motion communicates personality, energy, and confidence in ways static design simply cannot. If your brand has no kinetic identity, it's sitting still while everything around it moves. The gap in perception grows every day you wait.",
  'photography-video':
    "Stock photography is the clearest signal that a brand hasn't invested in itself, and decision-makers notice. Real photography communicates authenticity and specificity: it says you take your brand seriously enough to show the real thing. If your visuals look like everyone else's, your pricing will be questioned before your capabilities are.",
  'brand-guardianship':
    "Brands don't usually fail suddenly. They drift. Inconsistencies accumulate, team members interpret guidelines loosely, markets shift. Without someone holding the standard, even the strongest brand slowly loses coherence. And once a brand loses coherence, rebuilding trust costs more than maintaining it would have.",
}

const DELIVERABLES: Record<string, { name: string; desc: string }[]> = {
  'brand-engagement': [
    { name: 'Brand Audit',           desc: "A full diagnostic of your current brand equity: what's resonating, what's eroding, and what's invisible from the inside." },
    { name: 'Brand Foundation',      desc: "Mission, vision, values, positioning, and personality: the strategic core everything else must hold up against." },
    { name: 'Visual Identity System',desc: "Logo, color palette, typography, photography direction, and iconography: a complete visual language built to last and scale." },
    { name: 'Brand Standards',       desc: "The rulebook that keeps your brand consistent across every team, every touchpoint, every market." },
    { name: 'Launch Activation',     desc: "Internal rollout and external debut strategy so the new brand lands with the impact it deserves." },
  ],
  'print-design': [
    { name: 'Brand Collateral',       desc: "Business cards, letterheads, and stationery: the physical extensions of your identity that clients hold after the meeting." },
    { name: 'Brochures & Catalogues', desc: "Multi-page formats that take prospects through your offering with the same clarity and authority as a pitch." },
    { name: 'Packaging Design',       desc: "Structural and graphic design for physical product packaging, the first moment a customer physically meets your product." },
    { name: 'Signage & Environmental',desc: "Wayfinding, office branding, and event signage: the spaces that communicate who you are before anyone speaks." },
    { name: 'Campaign Materials',     desc: "Posters, banners, and point-of-sale materials designed to perform in physical spaces and leave a lasting impression." },
  ],
  'digital-design': [
    { name: 'Website Design',      desc: "From information architecture to final UI, designed to convert and communicate, not just look good." },
    { name: 'Social Media Design', desc: "Templates and content systems that keep your digital presence consistent without needing a designer every time." },
    { name: 'UI/UX Design',        desc: "Interface design for digital products, apps, and platforms, built around how users actually think and move." },
    { name: 'Digital Advertising', desc: "Ad creatives, landing pages, and campaign assets designed to perform against measurable objectives." },
    { name: 'Presentation Design', desc: "Pitch decks and investor presentations, because how you present is part of what you're pitching." },
  ],
  'animation-motion': [
    { name: 'Brand Motion System',    desc: "Motion principles, transitions, and animations that give your brand a consistent kinetic identity across all digital touchpoints." },
    { name: 'Logo Animation',         desc: "Animated logo variants for digital use: intros, outros, loading states, and social formats." },
    { name: 'Explainer Videos',       desc: "Scripted, animated, and voiced content that communicates complex ideas in 60–90 seconds with precision and brand clarity." },
    { name: 'Social Motion Content',  desc: "Short-form animated assets optimized for feed, stories, and reels, designed to stop the scroll and hold attention." },
    { name: 'Presentation Motion',    desc: "Animated slide templates and transitions that elevate the delivery of your most important presentations." },
  ],
  'photography-video': [
    { name: 'Brand Photography',  desc: "Directed sessions that build a library of on-brand images: people, spaces, products, and atmosphere." },
    { name: 'Product Photography',desc: "Commercial photography optimized for digital and print, built to communicate quality and desirability." },
    { name: 'Brand Film',         desc: "Short-form films (60–180 seconds) that communicate who you are, why you exist, and why it matters." },
    { name: 'Documentary Content',desc: "Behind-the-scenes and process content that builds trust by showing how you actually work." },
    { name: 'Campaign Content',   desc: "Photography and video assets produced specifically for launches, campaigns, or seasonal moments." },
  ],
  'brand-guardianship': [
    { name: 'Monthly Strategy Session',desc: "A structured 60-minute session each month to address brand decisions, review materials, and assess market signals." },
    { name: 'Async Brand Review',      desc: "Priority access to brand feedback on any asset, campaign, or communication. Response within 24 business hours." },
    { name: 'Quarterly Brand Audit',   desc: "A formal review of brand consistency, positioning, and competitive landscape every quarter." },
    { name: 'Brand Health Monitoring', desc: "Ongoing tracking of how your brand is being used, interpreted, and perceived, inside and out." },
    { name: 'Strategic Guidance',      desc: "Access to Thinchronize's full strategic framework whenever a major brand decision needs a thinking partner." },
  ],
}

const KPIS: Record<string, { metric: string; name: string; desc: string }[]> = {
  'brand-engagement': [
    { metric: '↑ 40%',   name: 'BRAND RECOGNITION', desc: 'Consistent identity and messaging increase recognition across all touchpoints' },
    { metric: '3×',      name: 'LEAD QUALITY',       desc: 'Clearer positioning attracts the right clients, filtering out the wrong ones' },
    { metric: 'Faster',  name: 'DECISION SPEED',     desc: 'A brand that matches your capability removes hesitation from buying decisions' },
    { metric: 'Aligned', name: 'TEAM COHESION',      desc: 'Every person communicates the brand consistently, from pitch to delivery' },
  ],
  'print-design': [
    { metric: '↑ Trust', name: 'FIRST IMPRESSION',  desc: 'Physical materials create a lasting premium halo, before a word is spoken' },
    { metric: 'Higher',  name: 'PRICE PERCEPTION',  desc: 'Elevated print supports higher price points and reduces price sensitivity' },
    { metric: 'Longer',  name: 'MATERIAL LIFESPAN', desc: 'Designed print gets kept, shared, and referenced, not binned' },
    { metric: 'Consistent', name: 'BRAND CONTINUITY', desc: 'Print aligned with digital creates a seamless experience across every interaction' },
  ],
  'digital-design': [
    { metric: '19s',      name: 'JUDGMENT WINDOW', desc: 'The time a decision-maker takes to form a lasting opinion of your digital presence' },
    { metric: '↑ 3×',    name: 'CONVERSION RATE', desc: 'Strategic UI/UX decisions turn visitors into leads and leads into clients' },
    { metric: 'Lower',   name: 'PRODUCTION COST', desc: 'A design system reduces per-asset creation time for all future content needs' },
    { metric: 'Cohesive',name: 'CROSS-PLATFORM',  desc: 'Consistent digital presence signals capability before any conversation begins' },
  ],
  'animation-motion': [
    { metric: '3×',     name: 'ENGAGEMENT',        desc: 'Motion content drives significantly higher interaction and retention than static' },
    { metric: '95%',    name: 'MESSAGE RETENTION', desc: 'Animated explainers increase how much audiences remember versus text alone' },
    { metric: '↓ Skip', name: 'SCROLL BEHAVIOR',   desc: 'Motion stops the scroll, the first battle in every digital environment' },
    { metric: 'Ownable',name: 'BRAND PERSONALITY', desc: 'Motion communicates tone and energy in ways static design cannot' },
  ],
  'photography-video': [
    { metric: 'Real',     name: 'AUTHENTICITY SCORE', desc: 'Original imagery increases brand trust and perceived authenticity significantly' },
    { metric: '↑ Sales',  name: 'CONVERSION LIFT',    desc: 'Custom product photography increases conversion in both digital and physical retail' },
    { metric: 'Distinct', name: 'VISUAL OWNERSHIP',   desc: 'Custom imagery differentiates your brand from every competitor using the same stock library' },
    { metric: 'Evergreen',name: 'CONTENT LONGEVITY',  desc: 'A curated library reduces ongoing content costs and keeps materials current' },
  ],
  'brand-guardianship': [
    { metric: 'Zero',   name: 'BRAND DRIFT',      desc: 'Regular oversight prevents the inconsistencies that compound into credibility damage' },
    { metric: '24h',    name: 'RESPONSE TIME',    desc: 'Brand decisions never blocked. Async access means fast answers when it matters.' },
    { metric: '↓ Cost', name: 'ERROR PREVENTION', desc: 'Catching misalignments before they go public prevents expensive corrections' },
    { metric: '↑ Equity', name: 'LONG-TERM VALUE', desc: 'Actively maintained brands compound their value. Unmaintained ones erode.' },
  ],
}

const CHALLENGES: Record<string, string[]> = {
  'brand-engagement': [
    "Our brand looks outdated but we're afraid of losing what makes us recognizable",
    "Different teams represent us completely differently",
    "We've grown but the brand still looks like an early-stage startup",
    "Prospects perceive us as something we're not",
    "We're entering a new market and the current brand doesn't translate",
  ],
  'print-design': [
    "We're using materials that no longer reflect where we are",
    "Our print looks completely disconnected from our digital presence",
    "We're entering a market where physical presence matters",
    "Our packaging doesn't communicate the quality of the product inside",
    "Every campaign we run uses a different visual language",
  ],
  'digital-design': [
    "Our website doesn't reflect where the company actually is today",
    "Our digital presence is inconsistent across platforms",
    "We have no design system. Every new piece starts from scratch.",
    "Our digital assets undermine the credibility of our physical brand",
    "We need materials that convert, not just impress",
  ],
  'animation-motion': [
    "Our social content gets no engagement",
    "We have complex ideas that are hard to explain quickly",
    "Our brand feels static and dated in digital environments",
    "We have a brand but no idea how it should move or behave",
    "We need content that stands out in a crowded feed",
  ],
  'photography-video': [
    "We're using stock photos, and it shows",
    "Our product looks much better in person than it does in photos",
    "We have no visual content that shows our team, culture, or process",
    "Every campaign looks slightly different because we have no consistent library",
    "We need content that tells a story, not just shows a product",
  ],
  'brand-guardianship': [
    "Our brand standards exist but nobody follows them",
    "Every new hire interprets the brand differently",
    "We make brand decisions without confidence and often regret them",
    "We completed a rebrand but have no plan for maintaining it",
    "Our brand is inconsistent across our markets and channels",
  ],
}

const ALUMNI_ELIGIBLE = new Set(['print-design', 'digital-design', 'animation-motion', 'photography-video'])

// ─── New diagnostic data ──────────────────────────────────────────────────────

const questions = [
  'What does your brand need?',
  'Where is your brand stuck?',
  'What are you building toward?',
  'What problem needs solving first?',
]

const diagnosticOptions: { num: string; text: string; services: string[]; isOther?: boolean }[] = [
  { num: '01', text: "My brand no longer reflects what we've built",  services: ['brand-engagement'] },
  { num: '02', text: "I'm building a brand from scratch",             services: ['brand-engagement'] },
  { num: '03', text: "I need print or digital design assets",         services: ['print-design', 'digital-design'] },
  { num: '04', text: "I need animation, motion or video content",     services: ['animation-motion', 'photography-video'] },
  { num: '05', text: "My brand is solid — I need ongoing guidance",   services: ['brand-guardianship'] },
  { num: '06', text: "Other — describe what you need",                services: [], isOther: true },
]

const keywordMap: Record<string, string[]> = {
  'brand-engagement':   ['logo', 'identity', 'rebrand', 'brand', 'strategy', 'positioning', 'direction', 'confused', 'stuck', 'start', 'refresh', 'new brand', 'foundation', 'visual identity', 'who we are'],
  'print-design':       ['print', 'brochure', 'flyer', 'poster', 'business card', 'menu', 'catalog', 'packaging', 'leaflet', 'stationery'],
  'digital-design':     ['website', 'digital', 'social', 'banner', 'online', 'web', 'instagram', 'ui', 'app', 'email', 'facebook', 'linkedin'],
  'animation-motion':   ['animation', 'motion', 'animated', 'explainer', 'reel', 'gif', 'moving', 'intro', 'transition'],
  'photography-video':  ['photo', 'photography', 'shoot', 'film', 'video', 'commercial', 'campaign', 'content', 'footage', 'production'],
  'brand-guardianship': ['guidance', 'ongoing', 'retainer', 'monthly', 'support', 'maintain', 'consistency', 'advise', 'advisory', 'check', 'review'],
}

function matchFromText(input: string): string[] {
  const lower = input.toLowerCase()
  const scores: Record<string, number> = {}
  for (const [serviceId, keywords] of Object.entries(keywordMap)) {
    scores[serviceId] = keywords.filter(k => lower.includes(k)).length
  }
  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const top = best[0]
  if (!top || top[1] === 0) return ['brand-engagement']
  return [top[0]]
}

// ─── Service accordion item ───────────────────────────────────────────────────

function ServiceAccordionItem({
  service,
  isOpen,
  onToggle,
}: {
  service: (typeof SERVICES)[number]
  isOpen: boolean
  onToggle: () => void
}) {
  const [nameHovered, setNameHovered] = useState(false)
  const deliverables = DELIVERABLES[service.id] ?? []
  const kpis         = KPIS[service.id] ?? []
  const challenges   = CHALLENGES[service.id] ?? []
  const fomo         = FOMO[service.id] ?? ''

  return (
    <div style={{ borderTop: '1px solid #E8E8E8' }}>
      {/* ── Row header ─────────────────────────────────────────────── */}
      <div
        onClick={onToggle}
        onMouseEnter={() => setNameHovered(true)}
        onMouseLeave={() => setNameHovered(false)}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '40px 0',
          cursor:         'pointer',
          gap:            24,
        }}
      >
        <span
          className="svc-name"
          style={{
            fontFamily:  PP,
            fontWeight:  900,
            fontSize:    'clamp(24px, 3vw, 40px)',
            textTransform: 'uppercase',
            color:       nameHovered || isOpen ? RED : '#292929',
            transition:  'color 0.3s',
            lineHeight:  1.1,
          }}
        >
          {service.name}
        </span>

        <span
          className="svc-tagline"
          style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   14,
            color:      '#919191',
            flexShrink: 0,
            maxWidth:   360,
            textAlign:  'justify',
          }}
        >
          {service.tagline}
        </span>

        <span style={{
          fontFamily:  PP,
          fontSize:    28,
          fontWeight:  900,
          color:       nameHovered || isOpen ? '#D0274B' : '#292929',
          flexShrink:  0,
          lineHeight:  1,
          userSelect:  'none',
          transition:  'color 0.3s ease',
        }}>
          {isOpen ? '×' : '+'}
        </span>
      </div>

      {/* ── Accordion body ─────────────────────────────────────────── */}
      <div style={{
        maxHeight:  isOpen ? '2000px' : '0',
        overflow:   'hidden',
        transition: 'max-height 0.5s ease',
      }}>
        <div style={{ paddingBottom: 60 }}>

          {/* A — FOMO */}
          <p style={{
            fontFamily:   PP,
            fontWeight:   800,
            fontSize:     22,
            color:        '#292929',
            lineHeight:   1.6,
            maxWidth:     760,
            marginBottom: 48,
          }}>
            {fomo}
          </p>

          {/* B — OVERVIEW */}
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 16 }}>
            Overview
          </p>
          <p style={{
            fontFamily:   PP,
            fontWeight:   400,
            fontSize:     18,
            color:        '#292929',
            lineHeight:   1.75,
            maxWidth:     680,
            marginBottom: 48,
          }}>
            {service.description}
          </p>

          {/* C — DELIVERABLES */}
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
            What&apos;s Included
          </p>
          <div className="deliverables-grid" style={{ marginBottom: 48 }}>
            {deliverables.map(d => (
              <div key={d.name} style={{
                background:   '#F7F7F7',
                padding:      24,
                borderRadius: 4,
              }}>
                <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#292929' }}>
                  {d.name}
                </p>
                <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191', lineHeight: 1.6, marginTop: 8 }}>
                  {d.desc}
                </p>
              </div>
            ))}
          </div>

          {/* D — IMPACT KPIs */}
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
            Impact
          </p>
          <div className="kpi-grid" style={{ marginBottom: 48 }}>
            {kpis.map((kpi, i) => (
              <div key={i} style={{
                borderRight: i < kpis.length - 1 ? '1px solid #E8E8E8' : 'none',
                paddingLeft:  i === 0 ? 0 : 'clamp(16px, 2vw, 32px)',
                paddingRight: i === kpis.length - 1 ? 0 : 'clamp(16px, 2vw, 32px)',
              }}>
                <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 36, color: RED, lineHeight: 1 }}>
                  {kpi.metric}
                </p>
                <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#292929', marginTop: 8 }}>
                  {kpi.name}
                </p>
                <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191', lineHeight: 1.5, marginTop: 6 }}>
                  {kpi.desc}
                </p>
              </div>
            ))}
          </div>

          {/* E — CHALLENGES */}
          <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191', marginBottom: 24 }}>
            Who This Is For
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
            {challenges.map(c => (
              <span key={c} style={{
                border:       '1px solid #E8E8E8',
                borderRadius: 24,
                padding:      '12px 20px',
                fontFamily:   PP,
                fontWeight:   400,
                fontSize:     14,
                color:        '#292929',
              }}>
                <span style={{ color: RED, marginRight: 8 }}>–</span>{c}
              </span>
            ))}
          </div>

          {/* F — ALUMNI MINI-MENTION */}
          {ALUMNI_ELIGIBLE.has(service.id) && (
            <div style={{
              background:   '#F7F7F7',
              padding:      24,
              borderRadius: 4,
            }}>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#292929' }}>
                Brand Alumni? Your 25–30% discount applies to this service.{' '}
                <button
                  onClick={e => {
                    e.stopPropagation()
                    document.getElementById('alumni-section')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{
                    fontFamily:  PP,
                    fontSize:    13,
                    color:       RED,
                    background:  'none',
                    border:      'none',
                    cursor:      'pointer',
                    padding:     0,
                    textDecoration: 'underline',
                  }}
                >
                  Learn about Alumni Pricing ↓
                </button>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ServicesEditorialClient() {
  const [openServiceIds, setOpenServiceIds] = useState<string[]>([])

  // Typewriter state
  const [displayText, setDisplayText] = useState('')
  const [qIndex, setQIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [typing, setTyping] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [signalShown, setSignalShown] = useState(false)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [otherInput, setOtherInput] = useState('')
  const [otherMatched, setOtherMatched] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Typewriter effect ────────────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) return
    const q = questions[qIndex]
    if (typing) {
      if (charIndex <= q.length) {
        setDisplayText(q.slice(0, charIndex))
        if (charIndex === q.length) {
          if (!signalShown) setSignalShown(true)
          timerRef.current = setTimeout(() => setTyping(false), 2600)
        } else {
          timerRef.current = setTimeout(
            () => setCharIndex(c => c + 1),
            charIndex === 0 ? 500 : 46
          )
        }
      }
    } else {
      if (charIndex > 0) {
        timerRef.current = setTimeout(() => {
          setCharIndex(c => c - 1)
          setDisplayText(q.slice(0, charIndex - 1))
        }, 22)
      } else {
        timerRef.current = setTimeout(() => {
          setQIndex(i => (i + 1) % questions.length)
          setTyping(true)
        }, 400)
      }
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [displayText, charIndex, typing, qIndex, isOpen, signalShown])

  // ── Handlers ────────────────────────────────────────────────────────────────
  function openDropdown() {
    if (isOpen) return
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsOpen(true)
    setDisplayText('What does your brand need?')
  }

  function handleSelect(index: number, option: typeof diagnosticOptions[0]) {
    setSelectedOption(index)
    if (option.isOther) return
    setOpenServiceIds(option.services)
    setTimeout(() => {
      const el = document.getElementById('services-accordion')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 500)
  }

  function handleOtherSubmit() {
    if (!otherInput.trim()) return
    const matched = matchFromText(otherInput)
    setOpenServiceIds(matched)
    setOtherMatched(true)
    setTimeout(() => {
      const el = document.getElementById('services-accordion')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 600)
  }

  function getServiceLabel(id: string): string {
    const map: Record<string, string> = {
      'brand-engagement':  'Brand Engagement',
      'print-design':      'Print Design',
      'digital-design':    'Digital Design',
      'animation-motion':  'Animation & Motion',
      'photography-video': 'Photography & Video',
      'brand-guardianship':'Brand Guardianship',
    }
    return map[id] || 'Brand Engagement'
  }

  const toggleService = (id: string) => {
    setOpenServiceIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      {/* ════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════ */}
      <PageHero
        title="SERVICES"
        subtitle="Every service traces back to one question — does this make the brand stronger?"
      />

            {/* ════════════════════════════════════════════════════════════
          SECTION 2 — SERVICES ACCORDION
      ════════════════════════════════════════════════════════════ */}
      <section id="services-accordion" style={{ backgroundColor: '#FFFFFF', padding: '0 clamp(24px, 6vw, 80px) 40px' }}>

        {/* Section header */}
        <div style={{ paddingTop: 100, paddingBottom: 60 }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191' }}>
            What We Do
          </p>
          <h2 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(48px, 8vw, 72px)',
            textTransform: 'uppercase',
            color:         '#292929',
            lineHeight:    1.0,
            letterSpacing: '-0.02em',
            marginTop:     16,
          }}>
            Services
          </h2>
        </div>

        {/* Accordion list */}
        {SERVICES.map(service => (
          <ServiceAccordionItem
            key={service.id}
            service={service}
            isOpen={openServiceIds.includes(service.id)}
            onToggle={() => toggleService(service.id)}
          />
        ))}
        {/* Final bottom rule */}
        <div style={{ height: 1, background: '#E8E8E8' }} />

      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — ALUMNI PRICING
      ════════════════════════════════════════════════════════════ */}
      <section id="alumni-section" style={{ backgroundColor: '#292929', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div className="alumni-grid">

          {/* Left */}
          <div>
            <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED }}>
              Brand Alumni
            </p>
            <h2 style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(28px, 3.5vw, 40px)',
              textTransform: 'uppercase',
              color:         '#FFFFFF',
              lineHeight:    1.3,
              marginTop:     16,
              maxWidth:      480,
            }}>
              The longer we work together, the less you pay for production.
            </h2>
            <p style={{
              fontFamily:  PP,
              fontWeight:  400,
              fontSize:    18,
              color:       'rgba(255,255,255,0.7)',
              lineHeight:  1.75,
              marginTop:   24,
            }}>
              Brand Alumni is how we reward clients who commit to the craft. Once you qualify, every production project you brief us on (print, digital, motion, photography) comes at a permanent 25–30% discount. Not a promotion. Not a limited offer. A permanent rate that applies for as long as we work together.
            </p>
          </div>

          {/* Right */}
          <div>
            {/* Path A */}
            <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: 32, borderRadius: 4 }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: RED }}>
                Path A
              </p>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8 }}>
                Complete any Brand Engagement
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Completing a full Brand Engagement with Thinchronize earns you Alumni status immediately, regardless of the scope or duration of the project.
              </p>
            </div>

            {/* Path B */}
            <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: 32, borderRadius: 4, marginTop: 16 }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: RED }}>
                Path B
              </p>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8 }}>
                $3,000 in cumulative production spend
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Reach $3,000 in total production billing across any combination of print, digital, motion, or photography work, and Alumni status is yours, permanently.
              </p>
            </div>

            {/* Clarification */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, marginTop: 32 }}>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                Alumni rates apply to: Print Design · Digital Design · Animation & Motion · Photography & Video
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
                Not applicable to: Brand Engagement · Brand Guardianship
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 4 — BOTTOM CTA
      ════════════════════════════════════════════════════════════ */}
      <section style={{
        backgroundColor: '#FFFFFF',
        padding:         'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)',
        borderTop:       '1px solid #E8E8E8',
        textAlign:       'center',
      }}>
        <h2 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(32px, 5vw, 48px)',
          textTransform: 'uppercase',
          color:         '#292929',
          lineHeight:    1.1,
          letterSpacing: '-0.02em',
        }}>
          Still not sure where to start?
        </h2>
        <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#919191', marginTop: 16, lineHeight: 1.5 }}>
          Try the diagnostic. Three answers. One clear direction.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link
            href="/diagnostic"
            style={{
              display:        'inline-block',
              padding:        '18px 48px',
              background:     RED,
              color:          '#FFFFFF',
              fontFamily:     PP,
              fontWeight:     800,
              fontSize:       14,
              letterSpacing:  '0.05em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              borderRadius:   0,
              transition:     'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
            onMouseLeave={e => (e.currentTarget.style.background = RED)}
          >
            Try the Diagnostic →
          </Link>
        </div>
        <div style={{ marginTop: 24 }}>
          <Link
            href="/contact"
            style={{
              fontFamily:     PP,
              fontWeight:     400,
              fontSize:       14,
              color:          RED,
              textDecoration: 'none',
              transition:     'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Or start a conversation →
          </Link>
        </div>
      </section>

      {/* ── Responsive + keyframe styles ──────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Deliverables: 2-col desktop, 1-col mobile */
        .deliverables-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        /* KPI: 4-col desktop */
        .kpi-grid {
          display: flex;
          border-top: 1px solid #E8E8E8;
          padding-top: 32px;
        }
        /* Alumni: 2-col desktop */
        .alumni-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
        }
        /* Service tagline visible on desktop */
        .svc-tagline { display: block; }

        @media (max-width: 767px) {
          .deliverables-grid { grid-template-columns: 1fr; }
          .kpi-grid { flex-wrap: wrap; gap: 32px 0; }
          .kpi-grid > * {
            flex: 0 0 50% !important;
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
            padding-bottom: 24px;
            border-bottom: 1px solid #E8E8E8;
          }
          .alumni-grid { grid-template-columns: 1fr; gap: 48px; }
          .svc-tagline { display: none; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .kpi-grid { flex-wrap: wrap; gap: 32px 0; }
          .kpi-grid > * {
            flex: 0 0 50% !important;
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: clamp(16px, 2vw, 32px) !important;
            padding-bottom: 24px;
            border-bottom: 1px solid #E8E8E8;
          }
          .alumni-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        /* Diagnostic keyframes */
        @keyframes diagnosticBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes diagnosticBounce {
          0%, 100% { transform: translateY(0);   opacity: 0.3; }
          50%       { transform: translateY(5px); opacity: 0.7; }
        }
        @keyframes diagnosticPulse {
          0%, 100% { opacity: 0.22; }
          50%       { opacity: 0.5;  }
        }
        @keyframes diagnosticFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      ` }} />

    </div>
  )
}
