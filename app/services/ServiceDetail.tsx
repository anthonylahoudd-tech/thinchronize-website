'use client'

import Link from 'next/link'
import type { Service } from '@/lib/services-data'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Content maps (ported + reconciled to the current offer set) ───────────────

const FOMO: Record<string, string> = {
  'brand-engagement':
    "Your brand is losing you deals before the conversation starts. Every month the gap between who you are and how you look stays open, a competitor fills it.",
  'brand-audit':
    "You're about to spend money on a solution you haven't diagnosed yet. That's how rebrands fail.",
  'research':
    "Opinions are cheap and everywhere. Without evidence, you're rebranding on a hunch — and betting the budget on it.",
  'brand-guardianship':
    "Brands don't fail suddenly. They drift — until the damage is too expensive to ignore.",
}

const DELIVERABLES: Record<string, { name: string; desc: string }[]> = {
  'brand-engagement': [
    { name: 'Two Tracks',            desc: "Launch for a new brand, Rebuild for an existing one — same phases, chosen to fit where you actually are." },
    { name: 'Brand Diagnosis',       desc: "A full read of your current brand equity. If you've taken the Audit or Research first, its fee credits in." },
    { name: 'Brand Foundation',      desc: "Mission, vision, values, positioning, and personality: the strategic core everything else must hold up against." },
    { name: 'Visual Identity System',desc: "Logo, colour, typography, photography direction, and iconography: a complete visual language built to last and scale." },
    { name: 'Brand Standards',       desc: "The rulebook that keeps your brand consistent across every team, every touchpoint, every market." },
    { name: 'Launch Activation',     desc: "Internal rollout and external debut strategy so the new brand lands with the impact it deserves." },
  ],
  'brand-audit': [
    { name: 'Brand Health Report',   desc: "The deliverable: a clear, specific document of what's working, what isn't, and the recommended path forward. No vague recommendations." },
    { name: 'Brand Health Score /100',desc: "A single score across five dimensions — strategic clarity, visual coherence, market positioning, communication, and equity." },
    { name: 'Brand Equity Assessment',desc: "A structured evaluation of how your brand is currently perceived — internally, externally, and relative to competitors." },
    { name: 'Visual Identity Audit', desc: "A detailed review of your existing visual system: coherence, consistency, and whether it matches the brand's strategic intent." },
    { name: 'Positioning Review',    desc: "Where your brand sits relative to the competition — and whether that position is intentional or accidental." },
    { name: 'Recommended Routing',   desc: "A specific next step: build now with an Engagement, or go deeper first with Research." },
  ],
  'research': [
    { name: 'Brand Reality Report',  desc: "The current-state read: where your brand actually stands today, drawn from evidence rather than instinct." },
    { name: 'Insight Hypothesis',    desc: "The one idea that should drive the work — isolated from the noise and stated plainly." },
    { name: 'Evidence Base',         desc: "Audience, market, category, and competitor signals gathered and synthesised, not asserted." },
    { name: 'Three Depths',          desc: "Standard for a focused study, Field for full interviews, Partner for partner-led research. Choose the depth the decision needs." },
    { name: 'Routes Into an Engagement', desc: "The findings hand straight into a build — and the fee credits in when they do." },
  ],
  'brand-guardianship': [
    { name: 'T1 · Brand Control',      desc: "The advisory and governance tier: strategic oversight that keeps the brand from drifting once it's built." },
    { name: 'T2 · Marketing Management',desc: "T1 plus content design and partner-run channels, all directed under thinc. so execution stays on-brand." },
    { name: 'Monthly Strategy Session',desc: "A structured session each month to address brand decisions, review materials, and assess market signals." },
    { name: 'Async Brand Review',      desc: "Priority access to brand feedback on any asset, campaign, or communication. Response within 24 business hours." },
    { name: 'Quarterly Brand Audit',   desc: "A formal review of brand consistency, positioning, and competitive landscape every quarter." },
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
  'brand-audit': [
    { metric: '/100',    name: 'HEALTH SCORE',       desc: 'A single, honest number across five dimensions — so the whole team shares one picture' },
    { metric: '↓ Risk',  name: 'SPEND PROTECTION',   desc: 'Knowing exactly what\'s wrong before commissioning work prevents expensive misdirection' },
    { metric: 'Fast',    name: 'TURNAROUND',         desc: 'The Brand Health Report is typically complete within 5–7 working days of engagement' },
    { metric: 'Honest',  name: 'EXTERNAL VIEW',      desc: 'An outside perspective surfaces what internal teams have stopped seeing' },
  ],
  'research': [
    { metric: 'Point A', name: 'TRUE STARTING LINE', desc: 'An evidenced read of where the brand actually stands before anyone spends' },
    { metric: 'Evidence',name: 'OVER INSTINCT',      desc: 'Decisions grounded in audience, market, and competitor signal — not opinion' },
    { metric: 'Focus',   name: 'ONE INSIGHT',        desc: 'The single idea that should drive the work, isolated from the noise' },
    { metric: 'Credits in', name: 'TOWARD YOUR BUILD', desc: 'The fee comes off any Engagement you commission next' },
  ],
  'brand-guardianship': [
    { metric: 'Zero',    name: 'BRAND DRIFT',        desc: 'Regular oversight prevents the inconsistencies that compound into credibility damage' },
    { metric: '24h',     name: 'RESPONSE TIME',      desc: 'Brand decisions never blocked. Async access means fast answers when it matters.' },
    { metric: '↓ Cost',  name: 'ERROR PREVENTION',   desc: 'Catching misalignments before they go public prevents expensive corrections' },
    { metric: '↑ Equity',name: 'LONG-TERM VALUE',    desc: 'Actively maintained brands compound their value. Unmaintained ones erode.' },
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
  'brand-audit': [
    "We know something is wrong with the brand but can't put our finger on it",
    "We're about to invest in a rebrand and want to know exactly what needs fixing",
    "Different people in the company describe the brand completely differently",
    "We've had brand work done before but it never quite landed",
    "Our competitors are winning business we should be winning",
  ],
  'research': [
    "We keep debating strategy with no evidence to settle it",
    "We're about to invest big and want to know we're right about the market",
    "We don't actually know how our audience sees us",
    "Leadership and the team describe the customer differently",
    "We need a true starting point before any rebuild",
  ],
  'brand-guardianship': [
    "Our brand standards exist but nobody follows them",
    "Every new hire interprets the brand differently",
    "We make brand decisions without confidence and often regret them",
    "We completed a rebrand but have no plan for maintaining it",
    "Our brand is inconsistent across our markets and channels",
  ],
}

// Dark deliverable callout — diagnostics only.
const CALLOUT: Record<string, { title: string; line: string; chip: string }> = {
  'brand-audit': {
    title: 'Brand Health Report',
    line:  'A Brand Health Score out of 100 across five dimensions, specific findings, and where to point them next.',
    chip:  '/100 Health Score',
  },
  'research': {
    title: 'Brand Reality Report + Insight Hypothesis',
    line:  'A clear read of where the brand stands today, plus the single insight that should drive what comes next.',
    chip:  'Standard · Field · Partner',
  },
}

// CTA row — primary action + next-step cross-links (cross-links switch the stage).
const CTA: Record<string, {
  primaryLabel: string
  primaryHref:  string
  note?:        string
  links:        { label: string; to: string }[]
}> = {
  'brand-engagement': {
    primaryLabel: 'Start a conversation',
    primaryHref:  '/contact',
    note:         'Diagnosis credits in — an Audit or Research fee comes off your Engagement.',
    links: [{ label: 'Consider Guardianship after launch', to: 'brand-guardianship' }],
  },
  'brand-audit': {
    primaryLabel: 'Book the audit',
    primaryHref:  '/contact',
    note:         'The fee credits toward any program you take next.',
    links: [
      { label: 'Ready to build? Brand Engagement', to: 'brand-engagement' },
      { label: 'Want more depth? Research',         to: 'research' },
    ],
  },
  'research': {
    primaryLabel: 'Commission research',
    primaryHref:  '/contact',
    note:         'Routes directly into an Engagement — the fee credits in.',
    links: [
      { label: 'Just need a scored read? Brand Audit', to: 'brand-audit' },
      { label: 'Ready to build? Brand Engagement',     to: 'brand-engagement' },
    ],
  },
  'brand-guardianship': {
    primaryLabel: 'Start a conversation',
    primaryHref:  '/contact',
    links: [{ label: 'Not built yet? Brand Engagement', to: 'brand-engagement' }],
  },
}

const label = (fontSize = 11) => ({
  fontFamily: PP, fontWeight: 800 as const, fontSize, letterSpacing: '0.15em',
  textTransform: 'uppercase' as const, color: '#919191',
})

// ─── Component ─────────────────────────────────────────────────────────────────

export default function ServiceDetail({
  service,
  group,
  onCrossLink,
}: {
  service: Service
  group: 'Program' | 'Diagnostic'
  onCrossLink: (id: string) => void
}) {
  const fomo         = FOMO[service.id] ?? ''
  const deliverables = DELIVERABLES[service.id] ?? []
  const kpis         = KPIS[service.id] ?? []
  const challenges   = CHALLENGES[service.id] ?? []
  const callout      = CALLOUT[service.id]
  const cta          = CTA[service.id]

  return (
    <div>
      {/* 1 — Eyebrow */}
      <p style={{ ...label(11), color: RED, marginBottom: 12 }}>{group}</p>

      {/* 2 — Name + tagline */}
      <h2 style={{
        fontFamily: PP, fontWeight: 900, fontSize: 'clamp(34px, 4vw, 52px)',
        color: '#292929', lineHeight: 1.02, letterSpacing: '-0.02em', margin: 0,
      }}>
        {service.name}
      </h2>
      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(16px, 1.6vw, 20px)', color: '#919191', marginTop: 12 }}>
        {service.tagline}
      </p>

      {/* 3 — The tension (red-left-border voice) */}
      <div style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 20, margin: '36px 0' }}>
        <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(18px, 2vw, 22px)', color: '#292929', lineHeight: 1.55, maxWidth: 760, margin: 0 }}>
          {fomo}
        </p>
      </div>

      {/* 4 — Overview */}
      <p style={{ ...label(), marginBottom: 16 }}>Overview</p>
      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#919191', lineHeight: 1.75, maxWidth: 680, marginBottom: 48 }}>
        {service.description}
      </p>

      {/* 5 — Deliverable callout (diagnostics only) */}
      {callout && (
        <div style={{ background: '#292929', padding: 'clamp(24px, 3vw, 36px)', marginBottom: 48 }}>
          <p style={{ ...label(), color: RED, marginBottom: 14 }}>The deliverable</p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
            <h3 style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#FFFFFF', lineHeight: 1.15, margin: 0, maxWidth: 460 }}>
              {callout.title}
            </h3>
            <span style={{
              fontFamily: PP, fontWeight: 800, fontSize: 13, letterSpacing: '0.05em',
              color: RED, border: `1px solid ${RED}`, padding: '8px 14px', whiteSpace: 'nowrap', flexShrink: 0,
            }}>
              {callout.chip}
            </span>
          </div>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginTop: 16, maxWidth: 560 }}>
            {callout.line}
          </p>
        </div>
      )}

      {/* 6 — What's included */}
      <p style={{ ...label(), marginBottom: 24 }}>What&apos;s Included</p>
      <div className="deliverables-grid" style={{ marginBottom: 48 }}>
        {deliverables.map(d => (
          <div key={d.name} style={{ background: '#F7F7F7', padding: 24 }}>
            <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#292929' }}>
              {d.name}
            </p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191', lineHeight: 1.6, marginTop: 8 }}>
              {d.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 7 — Impact */}
      <p style={{ ...label(), marginBottom: 24 }}>Impact</p>
      <div className="kpi-grid" style={{ marginBottom: 48 }}>
        {kpis.map((kpi, i) => (
          <div key={i} style={{
            borderRight: i < kpis.length - 1 ? '1px solid #E8E8E8' : 'none',
            paddingLeft:  i === 0 ? 0 : 'clamp(16px, 2vw, 32px)',
            paddingRight: i === kpis.length - 1 ? 0 : 'clamp(16px, 2vw, 32px)',
          }}>
            <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 36, color: RED, lineHeight: 1 }}>{kpi.metric}</p>
            <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#292929', marginTop: 8 }}>{kpi.name}</p>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191', lineHeight: 1.5, marginTop: 6 }}>{kpi.desc}</p>
          </div>
        ))}
      </div>

      {/* 8 — Who this is for */}
      <p style={{ ...label(), marginBottom: 24 }}>Who This Is For</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}>
        {challenges.map(c => (
          <span key={c} style={{
            border: '1px solid #E8E8E8', borderRadius: 24, padding: '12px 20px',
            fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#292929',
          }}>
            <span style={{ color: RED, marginRight: 8 }}>–</span>{c}
          </span>
        ))}
      </div>

      {/* 9 — CTA row */}
      {cta && (
        <div style={{ borderTop: '1px solid #E8E8E8', paddingTop: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            <Link
              href={cta.primaryHref}
              style={{
                display: 'inline-block', padding: '16px 36px', background: RED, color: '#FFFFFF',
                fontFamily: PP, fontWeight: 800, fontSize: 14, letterSpacing: '0.05em',
                textTransform: 'uppercase', textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
              onMouseLeave={e => (e.currentTarget.style.background = RED)}
            >
              {cta.primaryLabel} →
            </Link>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {cta.links.map(l => (
                <button
                  key={l.to}
                  onClick={() => onCrossLink(l.to)}
                  style={{
                    fontFamily: PP, fontWeight: 400, fontSize: 14, color: RED,
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    textAlign: 'left', textDecoration: 'underline', textUnderlineOffset: 3,
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  {l.label} →
                </button>
              ))}
            </div>
          </div>
          {cta.note && (
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#919191', marginTop: 20, fontStyle: 'italic' }}>
              {cta.note}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
