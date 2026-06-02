'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { BRANDING_SERVICES, PRODUCTION_SERVICES } from '@/lib/services-data'
import PageHero, { H } from '@/components/ui/PageHero'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Static content maps ──────────────────────────────────────────────────────

const FOMO: Record<string, string> = {
  'brand-audit':
    "You're about to spend money on a solution you haven't diagnosed yet. That's how rebrands fail.",
  'brand-clarity':
    "Your designers are guessing. Every brief sent without a strategic foundation comes back wrong.",
  'brand-refresh':
    "Your visuals are underselling your capability on every first impression. That's a pricing problem as much as a design one.",
  'brand-engagement':
    "Your brand is losing you deals before the conversation starts. Every month the gap between who you are and how you look stays open, a competitor fills it.",
  'print-editorial':
    "What you hand someone is a proxy for your price point. Generic print discounts your offer before you've quoted.",
  'digital-design':
    "Decision-makers form a lasting opinion in 19 seconds. If your digital presence doesn't communicate authority in that window, the deal is already cooling.",
  'animation-editing':
    "Your brand is sitting still while everything around it moves. Static content doesn't just underperform — it signals you haven't committed.",
  'photography-videography':
    "Stock photography is the clearest signal a brand hasn't invested in itself. Decision-makers notice before they say a word.",
  'brand-guardianship':
    "Brands don't fail suddenly. They drift — until the damage is too expensive to ignore.",
}

const DELIVERABLES: Record<string, { name: string; desc: string }[]> = {
  'brand-audit': [
    { name: 'Brand Equity Assessment',    desc: "A structured evaluation of how your brand is currently perceived — internally, externally, and relative to competitors." },
    { name: 'Visual Identity Audit',      desc: "A detailed review of your existing visual system: coherence, consistency, and whether it matches the brand's strategic intent." },
    { name: 'Market Positioning Review',  desc: "Where your brand sits relative to the competition — and whether that position is intentional or accidental." },
    { name: 'Communication Audit',        desc: "How effectively your current messaging communicates what you actually do and who you're for." },
    { name: 'Written Diagnosis Report',   desc: "A clear, specific document: what's working, what isn't, and the recommended path forward. No vague recommendations." },
  ],
  'brand-clarity': [
    { name: 'Discovery Workshop',         desc: "A structured session to surface what the brand is, who it's for, and what it needs to say — in writing, not just in instinct." },
    { name: 'Competitor Analysis',        desc: "A clear picture of where your brand stands in the market and what space is available to occupy with conviction." },
    { name: 'Brand Foundation Document',  desc: "Mission, vision, values, positioning, and personality — the strategic core that every creative decision must hold up against." },
    { name: 'Positioning Statement',      desc: "A single, clear articulation of who you are, who you're for, and why it matters. The sentence your team aligns around." },
    { name: 'Messaging Framework',        desc: "How to talk about the brand at every level — from the elevator pitch to the full brand story." },
  ],
  'brand-refresh': [
    { name: 'Logo & Mark System',         desc: "Primary mark, secondary marks, and usage rules — built to work across every format and context." },
    { name: 'Colour Palette',             desc: "A defined colour system with primary, secondary, and functional colours, including digital and print specifications." },
    { name: 'Typography System',          desc: "Typeface selection and a clear hierarchy for headlines, body copy, captions, and functional text." },
    { name: 'Iconography Direction',      desc: "Visual guidance on icon style and usage so every piece of content feels like it belongs to the same system." },
    { name: 'Brand Guidelines',           desc: "The complete rulebook: how the visual identity is used, protected, and extended across every touchpoint." },
    { name: 'File Delivery',              desc: "Every format your team and suppliers will need — print, digital, vector, and raster, all organised and labelled." },
  ],
  'brand-engagement': [
    { name: 'Brand Audit',           desc: "A full diagnostic of your current brand equity: what's resonating, what's eroding, and what's invisible from the inside." },
    { name: 'Brand Foundation',      desc: "Mission, vision, values, positioning, and personality: the strategic core everything else must hold up against." },
    { name: 'Visual Identity System',desc: "Logo, color palette, typography, photography direction, and iconography: a complete visual language built to last and scale." },
    { name: 'Brand Standards',       desc: "The rulebook that keeps your brand consistent across every team, every touchpoint, every market." },
    { name: 'Launch Activation',     desc: "Internal rollout and external debut strategy so the new brand lands with the impact it deserves." },
  ],
  'print-editorial': [
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
  'animation-editing': [
    { name: 'Brand Motion System',    desc: "Motion principles, transitions, and animations that give your brand a consistent kinetic identity across all digital touchpoints." },
    { name: 'Logo Animation',         desc: "Animated logo variants for digital use: intros, outros, loading states, and social formats." },
    { name: 'Explainer Videos',       desc: "Scripted, animated, and voiced content that communicates complex ideas in 60–90 seconds with precision and brand clarity." },
    { name: 'Social Motion Content',  desc: "Short-form animated assets optimized for feed, stories, and reels, designed to stop the scroll and hold attention." },
    { name: 'Presentation Motion',    desc: "Animated slide templates and transitions that elevate the delivery of your most important presentations." },
  ],
  'photography-videography': [
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
  'brand-audit': [
    { metric: 'Clarity',  name: 'DIAGNOSIS FIRST',   desc: 'A written audit removes assumptions and gives the team a shared, accurate picture of the brand' },
    { metric: '↓ Risk',   name: 'SPEND PROTECTION',  desc: 'Knowing exactly what\'s wrong before commissioning work prevents expensive misdirection' },
    { metric: 'Fast',     name: 'TURNAROUND',         desc: 'A brand audit is typically complete within 5–7 working days of engagement' },
    { metric: 'Honest',   name: 'EXTERNAL VIEW',      desc: 'An outside perspective surfaces what internal teams have stopped seeing' },
  ],
  'brand-clarity': [
    { metric: 'Locked',   name: 'STRATEGIC CORE',     desc: 'A written foundation that every designer, agency, and team member can brief against' },
    { metric: '↑ Speed',  name: 'CREATIVE VELOCITY',  desc: 'Teams with clear strategy produce better work faster — fewer rounds, less ambiguity' },
    { metric: 'Aligned',  name: 'TEAM COHESION',      desc: 'Everyone in the organisation understands what the brand is and why it matters' },
    { metric: 'Portable', name: 'AGENCY-READY',        desc: 'The foundation document can brief any creative partner, anywhere, without losing integrity' },
  ],
  'brand-refresh': [
    { metric: 'Current',  name: 'VISUAL ACCURACY',    desc: 'A visual system that reflects where the business actually is — not where it was three years ago' },
    { metric: 'Scalable', name: 'SYSTEM THINKING',    desc: 'Every element built to extend across applications without needing a designer every time' },
    { metric: 'Coherent', name: 'CROSS-FORMAT',       desc: 'The same brand, working correctly on a business card, a billboard, and a social feed' },
    { metric: '↑ Trust',  name: 'FIRST IMPRESSION',   desc: 'An accurate visual identity closes the gap between capability and perception' },
  ],
  'brand-engagement': [
    { metric: '↑ 40%',   name: 'BRAND RECOGNITION', desc: 'Consistent identity and messaging increase recognition across all touchpoints' },
    { metric: '3×',      name: 'LEAD QUALITY',       desc: 'Clearer positioning attracts the right clients, filtering out the wrong ones' },
    { metric: 'Faster',  name: 'DECISION SPEED',     desc: 'A brand that matches your capability removes hesitation from buying decisions' },
    { metric: 'Aligned', name: 'TEAM COHESION',      desc: 'Every person communicates the brand consistently, from pitch to delivery' },
  ],
  'print-editorial': [
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
  'animation-editing': [
    { metric: '3×',     name: 'ENGAGEMENT',        desc: 'Motion content drives significantly higher interaction and retention than static' },
    { metric: '95%',    name: 'MESSAGE RETENTION', desc: 'Animated explainers increase how much audiences remember versus text alone' },
    { metric: '↓ Skip', name: 'SCROLL BEHAVIOR',   desc: 'Motion stops the scroll, the first battle in every digital environment' },
    { metric: 'Ownable',name: 'BRAND PERSONALITY', desc: 'Motion communicates tone and energy in ways static design cannot' },
  ],
  'photography-videography': [
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
  'brand-audit': [
    "We know something is wrong with the brand but can't put our finger on it",
    "We're about to invest in a rebrand and want to know exactly what needs fixing",
    "Different people in the company describe the brand completely differently",
    "We've had brand work done before but it never quite landed",
    "Our competitors are winning business we should be winning",
  ],
  'brand-clarity': [
    "Our designers keep asking questions we can't answer",
    "Every agency we brief comes back with something different",
    "We have a visual identity but no strategic story behind it",
    "We're entering a new market and need to articulate what we stand for",
    "Our team can't explain what makes us different from the competition",
  ],
  'brand-refresh': [
    "Our brand looks like it was built in a different era",
    "We've grown significantly but the visual identity hasn't kept up",
    "Our strategy is clear but our visuals don't communicate it",
    "We're embarrassed to send people to our website or share our materials",
    "We know what we want to say — we just don't look like it",
  ],
  'brand-engagement': [
    "Our brand looks outdated but we're afraid of losing what makes us recognizable",
    "Different teams represent us completely differently",
    "We've grown but the brand still looks like an early-stage startup",
    "Prospects perceive us as something we're not",
    "We're entering a new market and the current brand doesn't translate",
  ],
  'print-editorial': [
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
  'animation-editing': [
    "Our social content gets no engagement",
    "We have complex ideas that are hard to explain quickly",
    "Our brand feels static and dated in digital environments",
    "We have a brand but no idea how it should move or behave",
    "We need content that stands out in a crowded feed",
  ],
  'photography-videography': [
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

const ALUMNI_ELIGIBLE = new Set(['print-editorial', 'digital-design', 'animation-editing', 'photography-videography'])

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
  { num: '03', text: "I need print or digital design assets",         services: ['print-editorial', 'digital-design'] },
  { num: '04', text: "I need animation, motion or video content",     services: ['animation-editing', 'photography-videography'] },
  { num: '05', text: "My brand is solid — I need ongoing guidance",   services: ['brand-guardianship'] },
  { num: '06', text: "Other — describe what you need",                services: [], isOther: true },
]

const keywordMap: Record<string, string[]> = {
  'brand-engagement':       ['logo', 'identity', 'rebrand', 'brand', 'strategy', 'positioning', 'direction', 'confused', 'stuck', 'start', 'refresh', 'new brand', 'foundation', 'visual identity', 'who we are'],
  'print-editorial':        ['print', 'brochure', 'flyer', 'poster', 'business card', 'menu', 'catalog', 'packaging', 'leaflet', 'stationery', 'editorial'],
  'digital-design':         ['website', 'digital', 'social', 'banner', 'online', 'web', 'instagram', 'ui', 'app', 'email', 'facebook', 'linkedin'],
  'animation-editing':      ['animation', 'motion', 'animated', 'explainer', 'reel', 'gif', 'moving', 'intro', 'transition', 'editing'],
  'photography-videography':['photo', 'photography', 'shoot', 'film', 'video', 'commercial', 'campaign', 'content', 'footage', 'production'],
  'brand-guardianship':     ['guidance', 'ongoing', 'retainer', 'monthly', 'support', 'maintain', 'consistency', 'advise', 'advisory', 'check', 'review'],
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
  service: (typeof BRANDING_SERVICES)[number] | (typeof PRODUCTION_SERVICES)[number]
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
            fontWeight:  400,
            fontSize:    'clamp(23px, 2.5vw, 33px)',
            textTransform: 'none',
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
            flex:       1,
            textAlign:  'right',
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
            fontWeight:   400,
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
            color:        '#919191',
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
      'brand-engagement':       'Full Brand Engagement',
      'brand-audit':            'Brand Audit',
      'brand-clarity':          'Brand Clarity',
      'brand-refresh':          'Brand Refresh',
      'brand-guardianship':     'Brand Guardianship',
      'print-editorial':        'Print & Editorial',
      'digital-design':         'Digital Design',
      'animation-editing':      'Animation & Editing',
      'photography-videography':'Photography & Videography',
    }
    return map[id] || 'Full Brand Engagement'
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
        lines={[
          'Every service traces back to one question —',
          <>does this make the <H>brand stronger</H>?</>,
        ]}
        bottomLabel="View all services"
        bottomHref="#services-accordion"
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

        {/* ── BRANDING section ── */}
        <div style={{ borderLeft: '3px solid #D0274B', paddingLeft: 20, marginBottom: 40, marginTop: 8 }}>
          <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D0274B', margin: 0 }}>
            Branding
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', margin: '6px 0 0' }}>
            Strategy and identity. The thinking before the making.
          </p>
        </div>
        {BRANDING_SERVICES.map(service => (
          <ServiceAccordionItem
            key={service.id}
            service={service}
            isOpen={openServiceIds.includes(service.id)}
            onToggle={() => toggleService(service.id)}
          />
        ))}

        {/* ── PRODUCTION section ── */}
        <div style={{ borderLeft: '3px solid #D0274B', paddingLeft: 20, marginBottom: 40, marginTop: 80 }}>
          <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D0274B', margin: 0 }}>
            Production
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', margin: '6px 0 0' }}>
            Execution built on the brand. Every touchpoint, every format.
          </p>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: 'rgba(0,0,0,0.35)', margin: '10px 0 0', fontStyle: 'italic' }}>
            Brand Alumni pricing applies to all production services.
          </p>
        </div>
        {PRODUCTION_SERVICES.map(service => (
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
                Complete a Full Brand Engagement
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Completing a Full Brand Engagement with Thinchronize earns you Alumni status immediately, regardless of the scope or duration of the project.
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
                Alumni rates apply to: Print & Editorial · Digital Design · Animation & Editing · Photography & Videography
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
                Not applicable to: Full Brand Engagement · Brand Guardianship
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
