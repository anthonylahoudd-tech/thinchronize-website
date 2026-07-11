'use client'

import { useEffect, useCallback } from 'react'
import Link from 'next/link'
import PageHero, { H } from '@/components/ui/PageHero'

const PP  = "'PPNeueCorp', system-ui, sans-serif"
const RED = '#D0274B'

// ─── Card content (each card = a category; offerings are the spotlight) ───────

interface Offering {
  name: string
  line: string
  tags?: string[]
}

interface Card {
  id: string
  num: string
  title: string
  desc: string
  layout: 'feature' | 'grid'
  offerings: Offering[]
  note?: string
  cta: string
  href: string
}

const CARDS: Card[] = [
  {
    id: 'programs',
    num: '01',
    title: 'Programs',
    desc: 'The build and the stewardship — the two ways we take ownership of a brand.',
    layout: 'feature',
    offerings: [
      {
        name: 'Brand Engagement',
        line: 'Everything, one team. Strategy and identity built together, from diagnosis to launch — no handoffs.',
        tags: ['Launch — new brand', 'Rebuild — existing brand'],
      },
      {
        name: 'Brand Guardianship',
        line: 'The monthly retainer that keeps a built brand sharp as it grows.',
        tags: ['T1 · Brand Control', 'T2 · Marketing Management'],
      },
    ],
    cta: 'Start a conversation',
    href: '/contact',
  },
  {
    id: 'tools',
    num: '02',
    title: 'Tools',
    desc: 'Start here. Find out where the brand actually stands before you spend on a solution.',
    layout: 'feature',
    offerings: [
      {
        name: 'Brand Audit',
        line: 'A scored diagnosis — the Brand Health Report, with findings and where to point them next.',
        tags: ['Brand Health Report', '/100 score'],
      },
      {
        name: 'Research',
        line: 'Evidence before opinion — the current-state read plus the one insight that should drive the work.',
        tags: ['Reality Report', 'Standard · Field · Partner'],
      },
    ],
    note: 'Both credit toward any program you take next.',
    cta: 'Take the diagnostic',
    href: '/diagnostic',
  },
  {
    id: 'production',
    num: '03',
    title: 'Production',
    desc: 'Execution built on the brand — every touchpoint, every format, directed to the same standard.',
    layout: 'grid',
    offerings: [
      { name: 'Social / Digital',   line: 'Feeds, ads, email, decks.' },
      { name: 'Print & Editorial',  line: 'Collateral, brochures, signage.' },
      { name: 'Brand Extension',    line: 'Merch, spaces, toolkits.' },
      { name: 'Packaging',          line: 'Structure, labels, retail-ready.' },
      { name: 'Motion / Animation', line: 'Idents, explainers, social motion.' },
      { name: 'Web / UI',           line: 'Sites, product UI, design systems.' },
    ],
    note: 'Photography, video, brand film, and web development are directed by thinc. and produced by vetted partners.',
    cta: 'Start a conversation',
    href: '/contact',
  },
]

// Hash targets (incl. legacy diagnostic deep-links) → card
const HASH_TO_CARD: Record<string, string> = {
  programs: 'programs', tools: 'tools', diagnostics: 'tools', production: 'production',
  'brand-engagement': 'programs', 'brand-guardianship': 'programs',
  'brand-audit': 'tools', 'research': 'tools',
  'print-editorial': 'production', 'digital-design': 'production',
  'animation-editing': 'production', 'photography-videography': 'production',
  'social-digital': 'production', 'brand-extension': 'production',
  'packaging': 'production', 'motion-animation': 'production', 'web-ui': 'production',
}

// ─── Stacking card ────────────────────────────────────────────────────────────

function DeckCard({ card, index }: { card: Card; index: number }) {
  return (
    <article
      id={card.id}
      className="deck-card"
      style={{ top: `calc(var(--deck-top) + ${index} * var(--deck-stagger))`, zIndex: index + 1 }}
    >
      {/* Header (stays visible when the next card stacks over) */}
      <div className="deck-head">
        <span style={{ fontFamily: PP, fontWeight: 400, fontSize: 15, color: RED, letterSpacing: '0.08em' }}>{card.num}</span>
        <h2 style={{
          fontFamily: PP, fontWeight: 400, fontSize: 'clamp(28px, 3.4vw, 46px)',
          textTransform: 'uppercase', color: '#FFFFFF', letterSpacing: '-0.01em', lineHeight: 1, margin: 0,
        }}>
          {card.title}
        </h2>
      </div>

      {/* Body */}
      <div className="deck-body">
        <p className="deck-desc" style={{
          fontFamily: PP, fontWeight: 400, fontSize: 'clamp(16px, 1.6vw, 19px)',
          color: 'rgba(255,255,255,0.6)', lineHeight: 1.55, maxWidth: 560, margin: 0,
        }}>
          {card.desc}
        </p>

        <div className={card.layout === 'grid' ? 'deck-offerings deck-offerings--grid' : 'deck-offerings'}>
          {card.offerings.map(o => (
            <div key={o.name} className="offering">
              <p className="offering-name" style={{ fontFamily: PP, fontWeight: 400, color: '#FFFFFF', margin: 0, lineHeight: 1.1 }}>
                {o.name}
              </p>
              <p className="offering-line" style={{ fontFamily: PP, fontWeight: 400, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: '8px 0 0', maxWidth: 520 }}>
                {o.line}
              </p>
              {o.tags && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
                  {o.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: PP, fontWeight: 400, fontSize: 12, color: 'rgba(255,255,255,0.85)',
                      border: '1px solid rgba(255,255,255,0.22)', padding: '5px 11px', whiteSpace: 'nowrap',
                    }}>
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="deck-foot">
          <Link
            href={card.href}
            style={{
              fontFamily: PP, fontWeight: 400, fontSize: 15, color: RED, textDecoration: 'none',
              borderBottom: `1px solid ${RED}`, paddingBottom: 4, transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.65')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            {card.cta} →
          </Link>
          {card.note && (
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6, margin: 0, maxWidth: 520 }}>
              {card.note}
            </p>
          )}
        </div>
      </div>
    </article>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ServicesEditorialClient() {
  // Deep-link: #<card|service> scrolls to the matching card (load + hashchange)
  const applyHash = useCallback(() => {
    const slug = window.location.hash.replace('#', '')
    const cardId = HASH_TO_CARD[slug]
    if (cardId) {
      requestAnimationFrame(() => {
        document.getElementById(cardId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    }
  }, [])

  useEffect(() => {
    applyHash()
    window.addEventListener('hashchange', applyHash)
    return () => window.removeEventListener('hashchange', applyHash)
  }, [applyHash])

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
          SECTION 2 — SERVICES (stacking deck)
      ════════════════════════════════════════════════════════════ */}
      <section id="services-accordion" style={{ backgroundColor: '#FFFFFF', padding: '0 clamp(24px, 6vw, 80px)' }}>

        {/* Header */}
        <div style={{ paddingTop: 'clamp(72px, 10vw, 120px)', paddingBottom: 'clamp(32px, 5vw, 56px)' }}>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#919191' }}>
            What We Do
          </p>
          <h1 style={{
            fontFamily: PP, fontWeight: 400, fontSize: 'clamp(40px, 6vw, 68px)',
            textTransform: 'uppercase', color: '#292929', lineHeight: 1.02, letterSpacing: '-0.01em', margin: '14px 0 0',
          }}>
            Three ways in
          </h1>
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(16px, 1.7vw, 20px)', color: '#919191', margin: '16px 0 0', maxWidth: 560, lineHeight: 1.55 }}>
            Programs to build and steward the brand, diagnostics to know where it stands, and production to bring it to life.
          </p>
        </div>

        {/* Stacking deck */}
        <div className="deck">
          {CARDS.map((card, i) => (
            <DeckCard key={card.id} card={card} index={i} />
          ))}
        </div>

      </section>

      {/* ════════════════════════════════════════════════════════════
          SECTION 3 — ALUMNI PRICING
      ════════════════════════════════════════════════════════════ */}
      <section id="alumni-section" style={{ backgroundColor: '#292929', padding: 'clamp(60px, 8vw, 120px) clamp(24px, 6vw, 80px)' }}>
        <div className="alumni-grid">

          {/* Left */}
          <div>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: RED }}>
              Brand Alumni
            </p>
            <h2 style={{
              fontFamily: PP, fontWeight: 400, fontSize: 'clamp(28px, 3.5vw, 40px)',
              textTransform: 'uppercase', color: '#FFFFFF', lineHeight: 1.3, marginTop: 16, maxWidth: 480, letterSpacing: '-0.01em',
            }}>
              The longer we work together, the less you pay for production.
            </h2>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, marginTop: 24 }}>
              Brand Alumni is a permanent 25–30% discount on all production — earned once, then it never expires. Not a promotion. Not a limited offer. A permanent rate that applies for as long as we work together.
            </p>
          </div>

          {/* Right — How you qualify */}
          <div>
            <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: RED, marginBottom: 24 }}>
              How you qualify
            </p>

            <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: 32 }}>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: RED }}>
                One threshold
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 20, textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8, letterSpacing: '-0.01em' }}>
                $10,000 cumulative spend — any mix
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Reach $10,000 in cumulative spend with thinc. across any combination — branding, Guardianship, or production. A full Brand Engagement clears it on its own.
              </p>
            </div>

            <div style={{ border: '1px solid rgba(255,255,255,0.15)', padding: 32, marginTop: 16 }}>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: RED }}>
                Member perk
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 20, textTransform: 'uppercase', color: '#FFFFFF', marginTop: 8, letterSpacing: '-0.01em' }}>
                Guardianship members, from day one
              </p>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.6)', marginTop: 12, lineHeight: 1.6 }}>
                Any active Brand Guardianship member gets the Alumni production rate immediately — and converts to permanent once they cross the threshold.
              </p>
            </div>

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
          fontFamily: PP, fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)',
          textTransform: 'uppercase', color: '#292929', lineHeight: 1.1, letterSpacing: '-0.01em',
        }}>
          Still not sure where to start?
        </h2>
        <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 18, color: '#919191', marginTop: 16, lineHeight: 1.5 }}>
          Try the diagnostic. Three answers. One clear direction.
        </p>
        <div style={{ marginTop: 40 }}>
          <Link href="/diagnostic" style={{
            display: 'inline-block', padding: '18px 48px', background: RED, color: '#FFFFFF',
            fontFamily: PP, fontWeight: 400, fontSize: 14, letterSpacing: '0.08em',
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

      {/* ── Styles ────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        .alumni-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }

        /* Stacking deck */
        .deck { --deck-top: 88px; --deck-stagger: 70px; padding-bottom: clamp(60px, 9vw, 120px); }
        .deck-card {
          position: sticky;
          background: #292929;
          border-top: 2px solid ${RED};
          padding: clamp(28px, 3.4vw, 48px) clamp(28px, 3.4vw, 56px) clamp(36px, 4vw, 60px);
          min-height: 72vh;
          box-shadow: 0 -18px 50px rgba(0,0,0,0.18);
        }
        .deck-head {
          display: flex; align-items: baseline; gap: 16px;
          height: 46px; margin-bottom: clamp(24px, 3vw, 44px);
        }
        .deck-body { display: flex; flex-direction: column; gap: clamp(26px, 3.4vw, 46px); }

        /* Feature offerings — the spotlight services */
        .deck-offerings { display: flex; flex-direction: column; }
        .offering { padding: clamp(20px, 2.4vw, 30px) 0; border-top: 1px solid rgba(255,255,255,0.12); }
        .offering:first-child { border-top: none; padding-top: 0; }
        .offering-name { font-size: clamp(22px, 2.6vw, 32px); letter-spacing: -0.01em; }
        .offering-line { font-size: clamp(14px, 1.4vw, 16px); }

        /* Grid offerings — production families */
        .deck-offerings--grid {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.12);
        }
        .deck-offerings--grid .offering { background: #292929; border-top: none; padding: clamp(18px, 2vw, 24px); }
        .deck-offerings--grid .offering-name { font-size: 17px; }
        .deck-offerings--grid .offering-line { font-size: 13px; }

        .deck-foot { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }

        @media (max-width: 1023px) {
          .deck { --deck-stagger: 62px; }
          .deck-offerings--grid { grid-template-columns: repeat(2, 1fr); }
          .alumni-grid { grid-template-columns: 1fr; gap: 48px; }
        }
        @media (max-width: 767px) {
          .deck-card { position: static; min-height: 0; box-shadow: none; margin-bottom: 16px; }
          .deck-offerings--grid { grid-template-columns: 1fr; }
          .deck-head { height: auto; }
        }

        @media (prefers-reduced-motion: reduce) {
          .deck-card { position: static; box-shadow: none; margin-bottom: 12px; }
        }
      ` }} />

    </div>
  )
}
