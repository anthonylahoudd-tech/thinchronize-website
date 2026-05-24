'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

// ─── Design tokens ────────────────────────────────────────────────────────────

const PP      = "'PPNeueCorp', system-ui, sans-serif"
const RED     = '#D0274B'
const DARK    = '#292929'
const NEUTRAL = '#919191'
const CARD_BG = '#1a1a1a'
const BORDER  = 'rgba(255,255,255,0.08)'
const DIVIDER = 'rgba(145,145,145,0.2)'

// ─── Animation factory ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport:    { once: true, margin: '-60px' as const },
  transition:  { duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
})

// ─── Data ─────────────────────────────────────────────────────────────────────

const tracks = [
  {
    name:      'Brand Clarity',
    phases:    'Phases 0–6',
    desc:      'Strategy without visual identity',
    highlight: false,
  },
  {
    name:      'Brand Refresh',
    phases:    'Phases 0, 7–8',
    desc:      'New visual system on existing strategy',
    highlight: false,
  },
  {
    name:      'Full Engagement',
    phases:    'Phases 0–9',
    desc:      'Complete brand build from zero',
    highlight: true,
  },
]

const phaseGroups = [
  {
    direction: 'Brand Direction',
    phases: [
      { num: 0, name: 'Discovery & Insight' },
      { num: 1, name: 'Brand Foundation' },
      { num: 2, name: 'Audience & The Three Problems' },
      { num: 3, name: 'Positioning & Radical Differentiation' },
      { num: 4, name: 'Perception Gap & Bridge' },
      { num: 5, name: 'Brand Identity & Story' },
    ],
  },
  {
    direction: 'Communication Direction',
    phases: [
      { num: 6, name: 'Messaging, Voice & Tone' },
    ],
  },
  {
    direction: 'Art Direction',
    phases: [
      { num: 7, name: 'Visual Identity System' },
      { num: 8, name: 'Brandbook & Brand Standards' },
    ],
  },
  {
    direction: 'Brand Launch',
    phases: [
      { num: 9, name: 'Launch Strategy & Equity Roadmap' },
    ],
  },
]

const addons = [
  {
    num:   '02',
    name:  'Print Design',
    cta:   'Inquire About Print',
    items: ['Business card', 'Brochure', 'Packaging', 'Signage'],
  },
  {
    num:   '03',
    name:  'Digital Design',
    cta:   'Inquire About Digital',
    items: ['Social set (15/month)', 'Pitch deck', 'Ad creative set', 'Website UI per page'],
  },
  {
    num:   '04',
    name:  'Motion',
    cta:   'Inquire About Motion',
    items: ['Logo animation', 'Animated social set', 'Brand ident', 'Explainer video'],
  },
  {
    num:   '05',
    name:  'Photo & Video',
    cta:   'Inquire About Production',
    items: ['Photography half-day', 'Photography full-day', 'Brand video short', 'Brand video full'],
  },
]

const guardianshipItems = [
  'Monthly Direction Note',
  'Monthly 60-min strategy session',
  'Async access via WhatsApp',
  'Brand compliance reviews',
  'Quarterly Brand Pulse (months 3, 6, 9, 12)',
]

// ─── Shared sub-components ────────────────────────────────────────────────────

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily:    PP,
      fontWeight:    800,
      fontSize:      11,
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
      color:         RED,
      marginBottom:  20,
    }}>
      {children}
    </p>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily:    PP,
      fontWeight:    900,
      fontSize:      'clamp(36px, 5vw, 72px)',
      lineHeight:    0.92,
      letterSpacing: '-0.02em',
      textTransform: 'uppercase' as const,
      color:         '#fff',
    }}>
      {children}
    </h2>
  )
}

/** Red-outlined inquiry button */
function InquiryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display:       'inline-flex',
        alignItems:    'center',
        gap:           10,
        padding:       '13px 32px',
        border:        `1px solid ${RED}`,
        color:         RED,
        fontFamily:    PP,
        fontWeight:    800,
        fontSize:      11,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        borderRadius:  40,
        transition:    'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.backgroundColor = RED
        el.style.color = '#fff'
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.backgroundColor = 'transparent'
        el.style.color = RED
      }}
    >
      {children} <span aria-hidden>→</span>
    </Link>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServicesClient() {
  return (
    <div style={{ backgroundColor: DARK, minHeight: '100vh' }}>

      {/* ════════════════════════════════════════════════════════════════
          1. HERO
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop:    'clamp(140px, 18vw, 220px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        borderBottom:  `1px solid ${DIVIDER}`,
      }}>
        <div className="container mx-auto">

          <motion.div {...fadeUp(0)}>
            <Eyebrow>What We Do</Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.1)}
            style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(52px, 8vw, 120px)',
              lineHeight:    0.92,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color:         '#fff',
              maxWidth:      '14ch',
              marginBottom:  'clamp(20px, 3vw, 32px)',
            }}
          >
            Brand built from the inside out.
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   'clamp(16px, 2vw, 22px)',
              color:      NEUTRAL,
              maxWidth:   '40ch',
              lineHeight: 1.5,
            }}
          >
            We never design before we understand.
          </motion.p>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. BRAND ENGAGEMENT
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop:    'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        borderBottom:  `1px solid ${DIVIDER}`,
      }}>
        <div className="container mx-auto">

          <motion.div {...fadeUp(0)}>
            <Eyebrow>01 — Flagship</Eyebrow>
          </motion.div>
          <motion.div {...fadeUp(0.08)} style={{ marginBottom: 16 }}>
            <SectionTitle>Brand Engagement</SectionTitle>
          </motion.div>
          <motion.p
            {...fadeUp(0.14)}
            style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      16,
              color:         NEUTRAL,
              maxWidth:      '60ch',
              lineHeight:    1.65,
              marginBottom:  'clamp(48px, 6vw, 80px)',
            }}
          >
            The complete brand build — strategy and identity, built by the same minds, toward the same answer.
          </motion.p>

          {/* ── Track cards ── */}
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap:                 16,
            marginBottom:        'clamp(56px, 7vw, 96px)',
          }}>
            {tracks.map((track, i) => (
              <motion.div
                key={track.name}
                {...fadeUp(i * 0.1)}
                style={{
                  position:        'relative',
                  backgroundColor: CARD_BG,
                  border:          track.highlight ? `1px solid ${RED}` : `1px solid ${BORDER}`,
                  borderRadius:    4,
                  padding:         'clamp(24px, 3vw, 36px)',
                }}
              >
                {track.highlight && (
                  <span style={{
                    position:        'absolute',
                    top:             16,
                    right:           16,
                    fontFamily:      PP,
                    fontWeight:      800,
                    fontSize:        9,
                    letterSpacing:   '0.2em',
                    textTransform:   'uppercase',
                    color:           RED,
                    backgroundColor: 'rgba(208,39,75,0.12)',
                    padding:         '4px 10px',
                    borderRadius:    2,
                  }}>
                    Recommended
                  </span>
                )}
                <p style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         NEUTRAL,
                  marginBottom:  14,
                }}>
                  {track.phases}
                </p>
                <h3 style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      22,
                  letterSpacing: '-0.01em',
                  textTransform: 'uppercase',
                  color:         '#fff',
                  marginBottom:  10,
                }}>
                  {track.name}
                </h3>
                <p style={{
                  fontFamily: PP,
                  fontWeight: 400,
                  fontSize:   13,
                  color:      NEUTRAL,
                  lineHeight: 1.65,
                }}>
                  {track.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* ── 10 Phases ── */}
          <motion.div {...fadeUp(0.2)}>
            <div style={{ borderTop: `1px solid ${DIVIDER}`, paddingTop: 40, marginBottom: 36 }}>
              <p style={{
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color:         NEUTRAL,
              }}>
                The 10 Phases
              </p>
            </div>
            <div style={{
              display:             'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap:                 'clamp(32px, 4vw, 56px)',
              marginBottom:        'clamp(48px, 6vw, 72px)',
            }}>
              {phaseGroups.map((group) => (
                <div key={group.direction}>
                  <p style={{
                    fontFamily:    PP,
                    fontWeight:    800,
                    fontSize:      9,
                    letterSpacing: '0.24em',
                    textTransform: 'uppercase',
                    color:         RED,
                    marginBottom:  18,
                  }}>
                    {group.direction}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {group.phases.map((phase) => (
                      <div key={phase.num} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                        <span style={{
                          fontFamily: PP, fontWeight: 800, fontSize: 10,
                          color: NEUTRAL, minWidth: 22, flexShrink: 0,
                        }}>
                          {String(phase.num).padStart(2, '0')}
                        </span>
                        <span style={{
                          fontFamily: PP, fontWeight: 400, fontSize: 13,
                          color: 'rgba(255,255,255,0.7)', lineHeight: 1.55,
                        }}>
                          {phase.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Inquiry CTA ── */}
          <motion.div {...fadeUp(0.25)}>
            <InquiryButton href="/contact">Start a Brand Engagement</InquiryButton>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. ADD-ON SERVICES
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop:    'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        borderBottom:  `1px solid ${DIVIDER}`,
      }}>
        <div className="container mx-auto">

          <motion.div {...fadeUp(0)}>
            <Eyebrow>Add-On Services</Eyebrow>
          </motion.div>
          <motion.div {...fadeUp(0.08)} style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}>
            <SectionTitle>Production Work</SectionTitle>
          </motion.div>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap:                 16,
          }}>
            {addons.map((addon, i) => (
              <motion.div
                key={addon.name}
                className="addon-card"
                {...fadeUp(i * 0.08)}
                style={{
                  backgroundColor: CARD_BG,
                  border:          `1px solid ${BORDER}`,
                  borderRadius:    4,
                  padding:         'clamp(24px, 3vw, 32px)',
                  display:         'flex',
                  flexDirection:   'column',
                }}
              >
                {/* Card eyebrow */}
                <p style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      10,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         RED,
                  marginBottom:  20,
                }}>
                  {addon.num} — {addon.name}
                </p>

                {/* Line items */}
                <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {addon.items.map((item, idx) => (
                    <div
                      key={item}
                      style={{
                        padding:      '12px 0',
                        borderBottom: idx < addon.items.length - 1 ? `1px solid ${DIVIDER}` : 'none',
                      }}
                    >
                      <span style={{
                        fontFamily: PP,
                        fontWeight: 400,
                        fontSize:   13,
                        color:      'rgba(255,255,255,0.65)',
                        lineHeight: 1.4,
                      }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Per-card CTA */}
                <div style={{ marginTop: 24 }}>
                  <InquiryButton href="/contact">{addon.cta}</InquiryButton>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. BRAND GUARDIANSHIP
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop:    'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        borderBottom:  `1px solid ${DIVIDER}`,
      }}>
        <div className="container mx-auto">

          <motion.div {...fadeUp(0)}>
            <Eyebrow>06 — Monthly Retainer</Eyebrow>
          </motion.div>
          <motion.div {...fadeUp(0.08)} style={{ marginBottom: 16 }}>
            <SectionTitle>Brand Guardianship</SectionTitle>
          </motion.div>
          <motion.p
            {...fadeUp(0.14)}
            style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      16,
              color:         NEUTRAL,
              maxWidth:      '55ch',
              lineHeight:    1.65,
              marginBottom:  'clamp(48px, 6vw, 72px)',
            }}
          >
            Ongoing strategic access after the brand is built. Advisory only — not a production subscription.
          </motion.p>

          <motion.div {...fadeUp(0.2)} style={{ maxWidth: 520, marginBottom: 'clamp(32px, 4vw, 48px)' }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    800,
              fontSize:      10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color:         NEUTRAL,
              marginBottom:  24,
            }}>
              What&apos;s Included
            </p>
            {guardianshipItems.map((item) => (
              <div
                key={item}
                style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          14,
                  padding:      '16px 0',
                  borderBottom: `1px solid ${DIVIDER}`,
                }}
              >
                <span style={{
                  width: 5, height: 5, borderRadius: '50%',
                  backgroundColor: RED, flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: PP, fontWeight: 400, fontSize: 14,
                  color: 'rgba(255,255,255,0.8)', lineHeight: 1.5,
                }}>
                  {item}
                </span>
              </div>
            ))}
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      11,
              color:         NEUTRAL,
              marginTop:     20,
              letterSpacing: '0.04em',
              lineHeight:    1.7,
            }}>
              Minimum 3-month commitment · 30 days notice to cancel
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.25)}>
            <div
              style={{
                marginBottom:    24,
                backgroundColor: 'rgba(208,39,75,0.06)',
                border:          '1px solid rgba(208,39,75,0.15)',
                borderRadius:    4,
                padding:         '16px 20px',
                maxWidth:        520,
              }}
            >
              <p style={{
                fontFamily: PP, fontWeight: 400, fontSize: 12,
                color: 'rgba(255,255,255,0.5)', lineHeight: 1.75,
              }}>
                Available immediately to Brand Engagement alumni. Brands built elsewhere require a Brand Audit first.
              </p>
            </div>
            <InquiryButton href="/contact">Apply for Guardianship</InquiryButton>
          </motion.div>

        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. ALUMNI PROGRAM
      ════════════════════════════════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          backgroundColor: RED,
          paddingTop:      'clamp(80px, 10vw, 120px)',
          paddingBottom:   'clamp(80px, 10vw, 120px)',
        }}
      >
        <div className="container mx-auto">
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap:                 'clamp(48px, 6vw, 96px)',
            alignItems:          'center',
          }}>
            <div>
              <p style={{
                fontFamily:    PP, fontWeight: 800, fontSize: 10,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', marginBottom: 16,
              }}>
                Alumni Benefit
              </p>
              <h2 style={{
                fontFamily:    PP, fontWeight: 900,
                fontSize:      'clamp(40px, 6vw, 88px)',
                lineHeight:    0.92, letterSpacing: '-0.02em',
                textTransform: 'uppercase', color: '#fff', marginBottom: 24,
              }}>
                Brand Alumni Pricing
              </h2>
              <p style={{
                fontFamily:   PP, fontWeight: 400,
                fontSize:     'clamp(15px, 1.8vw, 18px)',
                color:        'rgba(255,255,255,0.85)',
                maxWidth:     '50ch', lineHeight: 1.65, marginBottom: 20,
              }}>
                Complete a Brand Engagement — or reach $3,000 in cumulative production spend — and earn permanent 25–30% off all future production work.
              </p>
              <p style={{
                fontFamily:    PP, fontWeight: 800, fontSize: 13,
                color: '#fff', letterSpacing: '0.04em', textTransform: 'uppercase',
              }}>
                Never expires. Not a promotion.
              </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {[
                { label: 'Applies To', items: ['Print', 'Digital', 'Motion', 'Photography & Video'], positive: true },
                { label: 'Does Not Apply To', items: ['Brand Strategy', 'Visual Identity', 'Brand Guardianship'], positive: false },
              ].map((col) => (
                <div key={col.label}>
                  <p style={{
                    fontFamily:    PP, fontWeight: 800, fontSize: 10,
                    letterSpacing: '0.22em', textTransform: 'uppercase',
                    color: col.positive ? '#fff' : 'rgba(255,255,255,0.45)',
                    marginBottom:  14,
                  }}>
                    {col.label}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {col.items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontFamily:      PP, fontWeight: 400, fontSize: 13,
                          color:           col.positive ? '#fff' : 'rgba(255,255,255,0.5)',
                          backgroundColor: col.positive ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)',
                          border:          `1px solid ${col.positive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'}`,
                          padding:         '6px 14px', borderRadius: 2,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ════════════════════════════════════════════════════════════════
          6. CTA BAND
      ════════════════════════════════════════════════════════════════ */}
      <section style={{
        paddingTop:    'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        textAlign:     'center',
      }}>
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp(0)}
            style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(36px, 5vw, 72px)',
              lineHeight:    0.95,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              color:         '#fff',
              maxWidth:      '20ch',
              margin:        '0 auto clamp(36px, 4vw, 56px)',
            }}
          >
            Ready to build something that lasts?
          </motion.h2>
          <motion.div {...fadeUp(0.14)}>
            <Link
              href="/contact"
              style={{
                display:         'inline-flex',
                alignItems:      'center',
                gap:             12,
                padding:         '16px 44px',
                backgroundColor: RED,
                color:           '#fff',
                fontFamily:      PP,
                fontWeight:      800,
                fontSize:        12,
                letterSpacing:   '0.14em',
                textTransform:   'uppercase',
                borderRadius:    40,
                border:          `1px solid ${RED}`,
                transition:      'all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = 'transparent'
                el.style.color = '#fff'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.backgroundColor = RED
                el.style.color = '#fff'
              }}
            >
              Start a Conversation <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
