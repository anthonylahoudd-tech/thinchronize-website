'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { BRANDING_SERVICES, PRODUCTION_FAMILIES, PRODUCTION_PARTNER_NOTE, type Service } from '@/lib/services-data'
import PageHero, { H } from '@/components/ui/PageHero'
import ServiceDetail from './ServiceDetail'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Index groups (Programs / Diagnostics) ────────────────────────────────────

const serviceById: Record<string, Service> = Object.fromEntries(BRANDING_SERVICES.map(s => [s.id, s]))

const GROUPS: { key: string; label: string; eyebrow: 'Program' | 'Diagnostic'; blurb: string; ids: string[] }[] = [
  { key: 'programs',    label: 'Programs',    eyebrow: 'Program',    blurb: 'The build and the stewardship. Strategy and identity, one team.', ids: ['brand-engagement', 'brand-guardianship'] },
  { key: 'diagnostics', label: 'Diagnostics', eyebrow: 'Diagnostic', blurb: 'Start here. Find out where the brand actually stands.',            ids: ['brand-audit', 'research'] },
]

// Flat, numbered order for the index (01..04).
const INDEX_ORDER = GROUPS.flatMap(g => g.ids.map(id => ({ id, group: g })))
const groupOf = (id: string) => GROUPS.find(g => g.ids.includes(id))!

// ─── Scroll-reveal wrapper (once, reduced-motion aware via CSS) ────────────────

function Reveal({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { setShown(true); io.disconnect() }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal${shown ? ' reveal-in' : ''}`} style={style}>
      {children}
    </div>
  )
}

// ─── Left-column index row ─────────────────────────────────────────────────────

function IndexRow({ num, service, active, onSelect }: { num: string; service: Service; active: boolean; onSelect: () => void }) {
  return (
    <button className="idx-row" onClick={onSelect} style={{
      display: 'flex', alignItems: 'baseline', gap: 14, width: '100%',
      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
      padding: '14px 0',
    }}>
      <span style={{ fontFamily: PP, fontWeight: 800, fontSize: 12, color: active ? RED : '#C4C4C4', flexShrink: 0, letterSpacing: '0.05em' }}>{num}</span>
      <span style={{ display: 'inline-block', position: 'relative' }}>
        <span style={{
          fontFamily: PP, fontWeight: active ? 800 : 400, fontSize: 'clamp(19px, 1.7vw, 24px)',
          color: active ? '#292929' : '#919191', lineHeight: 1.15, transition: 'color 0.25s',
        }}>
          {service.name}
        </span>
        <span className="idx-underline" style={{
          position: 'absolute', left: 0, right: 0, bottom: -3, height: 2, background: RED,
          transform: active ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left',
          transition: 'transform 0.22s cubic-bezier(0.19,1,0.22,1)',
        }} />
      </span>
    </button>
  )
}

// ─── Group label (reused red-left-border treatment) ───────────────────────────

function GroupLabel({ label, blurb, style }: { label: string; blurb: string; style?: React.CSSProperties }) {
  return (
    <div style={{ borderLeft: `3px solid ${RED}`, paddingLeft: 20, ...style }}>
      <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 13, letterSpacing: '0.15em', textTransform: 'uppercase', color: RED, margin: 0 }}>
        {label}
      </p>
      <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', margin: '6px 0 0' }}>
        {blurb}
      </p>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ServicesEditorialClient() {
  const [activeServiceId, setActiveServiceId] = useState<string>('brand-engagement')
  const [mobileOpenId, setMobileOpenId]       = useState<string | null>('brand-engagement')
  const [productionInView, setProductionInView] = useState(false)
  const productionRef = useRef<HTMLDivElement>(null)

  const activeService = serviceById[activeServiceId] ?? BRANDING_SERVICES[0]
  const activeGroup   = productionInView ? 'production' : groupOf(activeServiceId).key

  // ── Select a service (stage + mobile), scroll into view ─────────────────────
  const selectService = useCallback((id: string, scroll = false) => {
    if (!serviceById[id]) return
    setActiveServiceId(id)
    setMobileOpenId(id)
    if (scroll) {
      requestAnimationFrame(() => {
        document.getElementById('services-accordion')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  // ── Deep-link: #<serviceId> selects the service (on load + hash changes) ────
  useEffect(() => {
    const apply = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash && serviceById[hash]) selectService(hash)
    }
    apply()
    window.addEventListener('hashchange', apply)
    return () => window.removeEventListener('hashchange', apply)
  }, [selectService])

  // ── Production in-view (wayfinding highlight) ───────────────────────────────
  useEffect(() => {
    const el = productionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => setProductionInView(e.isIntersecting)),
      { rootMargin: '-40% 0px -40% 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // Wayfinding jump
  const jumpTo = (key: string) => {
    if (key === 'production') {
      productionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      const first = GROUPS.find(g => g.key === key)!.ids[0]
      selectService(first, true)
    }
  }

  return (
    <div style={{ backgroundColor: '#FFFFFF' }}>

      {/* ════════════════════════════════════════════════════════════
          HERO — do not modify
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
          SECTION 2 — SERVICES (index / stage)
      ════════════════════════════════════════════════════════════ */}
      <section id="services-accordion" style={{ backgroundColor: '#FFFFFF', padding: '0 clamp(24px, 6vw, 80px) 40px' }}>

        {/* Sticky mini category wayfinding */}
        <div className="wayfinder">
          <div className="wayfinder-inner">
            {[{ key: 'programs', label: 'Programs' }, { key: 'diagnostics', label: 'Diagnostics' }, { key: 'production', label: 'Production' }].map((w, i) => (
              <span key={w.key} style={{ display: 'inline-flex', alignItems: 'center' }}>
                {i > 0 && <span style={{ color: '#D4D4D4', margin: '0 14px' }}>·</span>}
                <button
                  onClick={() => jumpTo(w.key)}
                  style={{
                    fontFamily: PP, fontWeight: activeGroup === w.key ? 800 : 400, fontSize: 12,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: activeGroup === w.key ? RED : '#919191',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0',
                    transition: 'color 0.25s',
                  }}
                >
                  {w.label}
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Section header */}
        <div style={{ paddingTop: 40, paddingBottom: 56 }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#919191' }}>
            What We Do
          </p>
          <h2 style={{
            fontFamily: PP, fontWeight: 900, fontSize: 'clamp(48px, 8vw, 72px)',
            textTransform: 'uppercase', color: '#292929', lineHeight: 1.0, letterSpacing: '-0.02em', marginTop: 16,
          }}>
            Services
          </h2>
        </div>

        {/* ── DESKTOP: index + stage ── */}
        <div className="svc-desktop">
          <div className="index-stage">
            {/* Left — sticky index */}
            <div className="svc-index">
              {GROUPS.map((g, gi) => (
                <div key={g.key} style={{ marginTop: gi === 0 ? 0 : 44 }}>
                  <GroupLabel label={g.label} blurb={g.blurb} style={{ marginBottom: 12 }} />
                  {g.ids.map(id => {
                    const num = String(INDEX_ORDER.findIndex(e => e.id === id) + 1).padStart(2, '0')
                    return (
                      <IndexRow
                        key={id}
                        num={num}
                        service={serviceById[id]}
                        active={activeServiceId === id}
                        onSelect={() => setActiveServiceId(id)}
                      />
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Right — stage */}
            <div className="svc-stage">
              <div key={activeServiceId} className="stage-anim">
                <ServiceDetail
                  service={activeService}
                  group={groupOf(activeServiceId).eyebrow}
                  onCrossLink={id => selectService(id)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── MOBILE: single-open list ── */}
        <div className="svc-mobile">
          {GROUPS.map((g, gi) => (
            <div key={g.key} style={{ marginTop: gi === 0 ? 0 : 48 }}>
              <div className="mobile-group-header">
                <GroupLabel label={g.label} blurb={g.blurb} />
              </div>
              {g.ids.map(id => {
                const svc = serviceById[id]
                const open = mobileOpenId === id
                const num = String(INDEX_ORDER.findIndex(e => e.id === id) + 1).padStart(2, '0')
                return (
                  <div key={id} style={{ borderTop: '1px solid #E8E8E8' }}>
                    <button
                      onClick={() => setMobileOpenId(open ? null : id)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                        width: '100%', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                        padding: '28px 0',
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                        <span style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, color: open ? RED : '#C4C4C4' }}>{num}</span>
                        <span style={{ fontFamily: PP, fontWeight: open ? 800 : 400, fontSize: 22, color: open ? RED : '#292929', lineHeight: 1.1, transition: 'color 0.25s' }}>
                          {svc.name}
                        </span>
                      </span>
                      <span style={{ fontFamily: PP, fontSize: 26, fontWeight: 900, color: open ? RED : '#292929', flexShrink: 0, lineHeight: 1, userSelect: 'none' }}>
                        {open ? '×' : '+'}
                      </span>
                    </button>
                    <div style={{ maxHeight: open ? 6000 : 0, overflow: 'hidden', transition: 'max-height 0.5s ease' }}>
                      <div style={{ paddingBottom: 56 }}>
                        <ServiceDetail service={svc} group={g.eyebrow} onCrossLink={sid => selectService(sid, true)} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* ── PRODUCTION — compact six-family grid ── */}
        <div ref={productionRef} style={{ marginTop: 100 }}>
          <GroupLabel
            label="Production"
            blurb="Execution built on the brand. Every touchpoint, every format."
            style={{ marginBottom: 12 }}
          />
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 12, color: 'rgba(0,0,0,0.35)', margin: '0 0 32px', fontStyle: 'italic' }}>
            Brand Alumni pricing applies to all production services.
          </p>

          <Reveal>
            <div className="prod-grid">
              {PRODUCTION_FAMILIES.map(fam => (
                <div key={fam.id} className="prod-tile">
                  <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 20, textTransform: 'uppercase', letterSpacing: '-0.01em', color: '#292929', margin: 0, lineHeight: 1.1 }}>
                    {fam.name}
                  </p>
                  <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', margin: '10px 0 0', lineHeight: 1.5 }}>
                    {fam.intent}
                  </p>
                  <div className="prod-items">
                    <div style={{ borderTop: '1px solid #E8E8E8', margin: '16px 0 0', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {fam.items.map(it => (
                        <span key={it} style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: '#292929' }}>
                          <span style={{ color: RED, marginRight: 8 }}>–</span>{it}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: '#919191', margin: '24px 0 0', lineHeight: 1.6, maxWidth: 640 }}>
            {PRODUCTION_PARTNER_NOTE}
          </p>
        </div>

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
              fontFamily: PP, fontWeight: 900, fontSize: 'clamp(28px, 3.5vw, 40px)',
              textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1.3, marginTop: 16, maxWidth: 480,
            }}>
              The longer we work together, the less you pay for production.
            </h2>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginTop: 24 }}>
              Brand Alumni is a permanent 25–30% discount on all production — earned once, then it never expires. Not a promotion. Not a limited offer. A permanent rate that applies for as long as we work together.
            </p>
          </div>

          {/* Right — How you qualify */}
          <div>
            <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.15em', color: RED, marginBottom: 24 }}>
              How you qualify
            </p>

            {/* One threshold */}
            <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: 32 }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: RED }}>
                One threshold
              </p>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8 }}>
                $10,000 cumulative spend — any mix
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Reach $10,000 in cumulative spend with thinc. across any combination — branding, Guardianship, or production. A full Brand Engagement clears it on its own.
              </p>
            </div>

            {/* Member perk */}
            <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: 32, marginTop: 16 }}>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.12em', color: RED }}>
                Member perk
              </p>
              <p style={{ fontFamily: PP, fontWeight: 800, fontSize: 18, textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8 }}>
                Guardianship members, from day one
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Any active Brand Guardianship member gets the Alumni production rate immediately — and converts to permanent once they cross the threshold.
              </p>
            </div>

            {/* Clarification */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, marginTop: 32 }}>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                Applies to production — Social/Digital · Print & Editorial · Brand Extension · Packaging · Motion · Web/UI
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 8 }}>
                Not applicable to Brand Engagement, Guardianship, or advisory.
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
          fontFamily: PP, fontWeight: 900, fontSize: 'clamp(32px, 5vw, 48px)',
          textTransform: 'uppercase', color: '#292929', lineHeight: 1.1, letterSpacing: '-0.02em',
        }}>
          Still not sure where to start?
        </h2>
        <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#919191', marginTop: 16, lineHeight: 1.5 }}>
          Try the diagnostic. Three answers. One clear direction.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link href="/diagnostic" style={{
            display: 'inline-block', padding: '18px 48px', background: RED, color: '#FFFFFF',
            fontFamily: PP, fontWeight: 800, fontSize: 14, letterSpacing: '0.05em',
            textTransform: 'uppercase', textDecoration: 'none', borderRadius: 0, transition: 'background 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = '#b8223f')}
            onMouseLeave={e => (e.currentTarget.style.background = RED)}
          >
            Try the Diagnostic →
          </Link>
        </div>
        <div style={{ marginTop: 24 }}>
          <Link href="/contact" style={{
            fontFamily: PP, fontWeight: 400, fontSize: 14, color: RED, textDecoration: 'none', transition: 'opacity 0.2s',
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
        .deliverables-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
        /* KPI: 4-col desktop */
        .kpi-grid { display: flex; border-top: 1px solid #E8E8E8; padding-top: 32px; }
        /* Alumni: 2-col desktop */
        .alumni-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }

        /* Sticky wayfinding strip */
        .wayfinder {
          position: sticky; top: 0; z-index: 30;
          background: rgba(255,255,255,0.92); backdrop-filter: blur(8px);
          border-bottom: 1px solid #EFEFEF;
          margin: 0 calc(-1 * clamp(24px, 6vw, 80px));
          padding: 0 clamp(24px, 6vw, 80px);
        }
        .wayfinder-inner { display: flex; align-items: center; height: 46px; }

        /* Desktop index / stage */
        .index-stage { display: grid; grid-template-columns: 34% 1fr; gap: clamp(32px, 4vw, 72px); align-items: start; }
        .svc-index { position: sticky; top: 70px; align-self: start; }
        .idx-row:hover .idx-underline { transform: scaleX(1) !important; }
        .idx-row:hover span > span:first-child { color: #292929; }

        /* Show desktop, hide mobile by default */
        .svc-desktop { display: block; }
        .svc-mobile { display: none; }

        /* Production grid */
        .prod-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: #E8E8E8; border: 1px solid #E8E8E8; }
        .prod-tile { background: #FFFFFF; padding: 28px; transition: background 0.25s; }
        .prod-tile:hover { background: #FAFAFA; }
        .prod-items { max-height: 0; opacity: 0; overflow: hidden; transition: max-height 0.35s ease, opacity 0.35s ease; }
        .prod-tile:hover .prod-items { max-height: 300px; opacity: 1; }

        /* Stage swap crossfade */
        .stage-anim { animation: stageIn 0.26s cubic-bezier(0.19,1,0.22,1); }
        @keyframes stageIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

        /* Scroll-reveal */
        .reveal { opacity: 0; transform: translateY(12px); transition: opacity 0.6s cubic-bezier(0.19,1,0.22,1), transform 0.6s cubic-bezier(0.19,1,0.22,1); }
        .reveal.reveal-in { opacity: 1; transform: none; }

        @media (max-width: 1023px) {
          .svc-desktop { display: none; }
          .svc-mobile { display: block; }
          .prod-grid { grid-template-columns: repeat(2, 1fr); }
          .prod-items { max-height: none; opacity: 1; overflow: visible; }
          .mobile-group-header { position: sticky; top: 46px; z-index: 20; background: #FFFFFF; padding: 16px 0; }
        }
        @media (max-width: 767px) {
          .deliverables-grid { grid-template-columns: 1fr; }
          .kpi-grid { flex-wrap: wrap; gap: 32px 0; }
          .kpi-grid > * {
            flex: 0 0 50% !important; border-right: none !important;
            padding-left: 0 !important; padding-right: 0 !important;
            padding-bottom: 24px; border-bottom: 1px solid #E8E8E8;
          }
          .alumni-grid { grid-template-columns: 1fr; gap: 48px; }
          .prod-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .kpi-grid { flex-wrap: wrap; gap: 32px 0; }
          .kpi-grid > * {
            flex: 0 0 50% !important; border-right: none !important;
            padding-left: 0 !important; padding-right: clamp(16px, 2vw, 32px) !important;
            padding-bottom: 24px; border-bottom: 1px solid #E8E8E8;
          }
          .alumni-grid { grid-template-columns: 1fr; gap: 48px; }
        }

        /* Respect reduced motion on every new animation */
        @media (prefers-reduced-motion: reduce) {
          .stage-anim { animation: none; }
          .reveal { opacity: 1; transform: none; transition: none; }
          .idx-underline { transition: none; }
          .prod-items { transition: none; }
        }
      ` }} />

    </div>
  )
}
