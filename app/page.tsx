'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PROJECTS } from '@/lib/projects'
import RedLine from '@/components/home/RedLine'
import ParticleField from '@/components/home/ParticleField'
import LetterSettle from '@/components/home/LetterSettle'
import { registerBump } from '@/components/home/motion'

const PP    = "'PPNeueCorp', system-ui, sans-serif"
const RED   = '#D0274B'
const BG    = '#EFEFED'   // the light page — clean, Apple-calm
const INK   = '#111111'
const MUTED = '#6B6B6B'
const CARD  = '#0B0B0D'   // the dark interactive module

// ─── The Line That Synchronizes · light ───────────────────────────────────────
// Anatomy cloned from the reference homepage (lusion.co): light page, small
// sentence-case hero headline, one dark rounded interactive card as the
// centerpiece, giant sentence-case display sections, "+" registration-mark
// separators, rounded work cards with rolling titles. Their 3D toy is replaced
// by our own argument: a particle field that scatters on touch (change) and
// synchronizes into a red line (design). The red line spine and the
// impulse-spring bumps carry the same physics language down the page.

function ImpulseRow({ children, rotate = 0, className, style }: {
  children: React.ReactNode
  rotate?: number
  className?: string
  style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!ref.current) return
    return registerBump(ref.current, { rotateFactor: rotate })
  }, [rotate])
  return <div ref={ref} className={className} style={style}>{children}</div>
}

// "+ CHANGE + DESIGN + ADAPT + EVOLVE +" — the reference's registration-mark
// separator row, carrying the Cycle.
function CycleMarks() {
  return (
    <ImpulseRow>
      <div className="cycle-marks" aria-label="Change, design, adapt, evolve — the cycle">
        <span>+</span><em>Change</em>
        <span>+</span><em>Design</em>
        <span>+</span><em>Adapt</em>
        <span>+</span><em>Evolve</em>
        <span>+</span>
      </div>
    </ImpulseRow>
  )
}

// Rolling title — the reference repeats each work title as a marquee track that
// slides on hover.
function RollingTitle({ text }: { text: string }) {
  return (
    <div className="roll-title">
      <div className="roll-track">
        <span>{text}&nbsp;·&nbsp;</span><span>{text}&nbsp;·&nbsp;</span>
        <span>{text}&nbsp;·&nbsp;</span><span>{text}&nbsp;·&nbsp;</span>
      </div>
    </div>
  )
}

export default function HomePage() {
  const cardRef = useRef<HTMLElement>(null)

  return (
    <div style={{ background: BG, position: 'relative' }}>

      {/* The red line spine — born in the hero card, ends at LET'S SYNC. */}
      <RedLine />

      {/* ══════════════════════════════════════════════════════════════════
          S1 — HERO · small statement + the interactive card
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100svh',
        display: 'flex', flexDirection: 'column',
        padding: 'calc(88px + 2vh) 0 0',
      }}>
        {/* Small sentence-case headline, reference position */}
        <div style={{ padding: '0 5vw', display: 'flex', justifyContent: 'center' }}>
          <LetterSettle
            as="h1"
            parts={[{ t: 'Change is inevitable. Evolution is ' }, { t: 'designed', red: true }, { t: '. Strategy, identity, and design moving as one system.' }]}
            settleOn="mount"
            style={{
              fontFamily: PP, fontWeight: 400,
              fontSize: 'clamp(17px, 1.9vw, 26px)',
              color: INK, lineHeight: 1.3, letterSpacing: '-0.01em',
              textTransform: 'none',
              margin: 0, maxWidth: '44ch', textAlign: 'left',
            }}
          />
        </div>

        {/* The dark interactive card — our toy: chaos you can touch,
            synchronization you can watch */}
        <section
          ref={cardRef}
          className="hero-card"
          style={{
            position: 'relative',
            margin: 'clamp(20px, 3vh, 40px) 5vw 0',
            flex: 1,
            minHeight: '58svh',
            background: CARD,
            borderRadius: 24,
            overflow: 'hidden',
            touchAction: 'pan-y',
          }}
        >
          <ParticleField heroRef={cardRef} />
          {/* Static synchronized line for reduced-motion readers */}
          <div className="hero-static-line" aria-hidden="true" style={{
            position: 'absolute', left: '8%', right: '8%', top: '66%',
            height: 2, background: RED, opacity: 0, pointerEvents: 'none',
          }} />
          {/* The spine starts exactly where the particles synchronize */}
          <div data-line-waypoint style={{ position: 'absolute', left: '50%', top: '66%', width: 1, height: 1 }} />
          <span style={{
            position: 'absolute', left: 24, bottom: 20,
            fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none',
          }}>
            ( drag the chaos, watch it sync )
          </span>
          <span className="hero-card-meta" style={{
            position: 'absolute', right: 24, bottom: 20,
            fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.22em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', pointerEvents: 'none',
          }}>
            Beirut, Lebanon · est. 2016
          </span>
        </section>

        {/* Bottom bar: registration marks + scroll cue */}
        <div className="hero-foot">
          <span>+</span><span>+</span>
          <em>scroll to synchronize</em>
          <span>+</span><span>+</span>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          S2 — STATEMENT · giant display + paragraph + pills + ghost line
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(90px, 11vw, 160px) 5vw clamp(40px, 5vw, 80px)' }}>
        <LetterSettle
          as="h2"
          parts={[{ t: "We don't chase change." }]}
          style={{
            fontFamily: PP, fontWeight: 400,
            fontSize: 'clamp(40px, 7vw, 104px)',
            textTransform: 'none',
            color: INK, lineHeight: 1.02, letterSpacing: '-0.03em', margin: 0,
          }}
        />
        <LetterSettle
          as="h2"
          parts={[{ t: 'We design it.' }]}
          style={{
            fontFamily: PP, fontWeight: 400,
            fontSize: 'clamp(40px, 7vw, 104px)',
            textTransform: 'none',
            color: INK, lineHeight: 1.02, letterSpacing: '-0.03em', margin: 0,
          }}
        />

        <div className="statement-grid">
          {/* Work collage the line sweeps through */}
          <div className="collage">
            <div data-line-waypoint style={{ position: 'absolute', left: '20%', top: '10%', width: 1, height: 1 }} />
            <ImpulseRow rotate={0.04} className="collage-a">
              <Image src={PROJECTS[0]?.coverImage ?? '/images/work/don-bosco.jpg'} alt="" width={520} height={340} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImpulseRow>
            <ImpulseRow rotate={0.05} className="collage-b">
              <Image src={PROJECTS[1]?.coverImage ?? '/images/work/latelier.jpg'} alt="" width={420} height={300} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </ImpulseRow>
            <div data-line-waypoint style={{ position: 'absolute', left: '75%', bottom: '6%', width: 1, height: 1 }} />
          </div>

          <div className="statement-copy">
            <ImpulseRow>
              <p style={{
                fontFamily: PP, fontWeight: 400, fontSize: 'clamp(14px, 1.15vw, 17px)',
                color: MUTED, lineHeight: 1.75, margin: 0, maxWidth: 480,
              }}>
                Most brands react to change and drift. We synchronize strategy, identity,
                experience, and communication so every move is intentional, and the brand
                becomes a clearer, stronger, more capable version of itself. Understanding
                comes first: an honest look at where the brand stands and what it actually
                needs to say. Then, and only then, design.
              </p>
              <div style={{ display: 'flex', gap: 14, marginTop: 32, flexWrap: 'wrap' }}>
                <Link href="/method" className="pill pill--light"><i />Our method</Link>
                <Link href="/diagnostic" className="pill pill--dark">Book the diagnostic</Link>
              </div>
            </ImpulseRow>
          </div>
        </div>

        {/* Ghost display line — outline at rest, red on hover, flips like the reference */}
        <Link href="/about" className="ghost-line" aria-label="Mindful Design — about Thinchronize">
          <span className="ghost-word">Mindful</span>
          <span className="ghost-word">Design</span>
        </Link>
      </section>

      <CycleMarks />

      {/* ══════════════════════════════════════════════════════════════════
          S3 — FEATURED WORK · rounded cards, rolling titles
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 150px) 5vw 0' }}>
        <div className="work-head">
          <LetterSettle
            as="h2"
            parts={[{ t: 'Featured work' }]}
            style={{
              fontFamily: PP, fontWeight: 400,
              fontSize: 'clamp(40px, 7vw, 104px)',
              textTransform: 'none',
              color: INK, lineHeight: 1, letterSpacing: '-0.03em', margin: 0,
            }}
          />
          <p style={{
            fontFamily: PP, fontWeight: 400, fontSize: 11, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: MUTED, lineHeight: 1.8,
            margin: 0, maxWidth: 300, textAlign: 'left',
          }}>
            A selection of brands built to evolve. Strategy, identity, and craft for ambitious teams.
          </p>
        </div>

        <div className="work-grid">
          {PROJECTS.slice(0, 6).map((project, i) => (
            <ImpulseRow key={project.id} rotate={0.03}>
              <Link href={`/portfolio/${project.id}`} className="work-card">
                <span className="work-media">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 90vw, 44vw"
                    style={{ objectFit: 'cover' }}
                    loading={i < 2 ? 'eager' : 'lazy'}
                  />
                </span>
                <span className="work-tags">{project.category}</span>
                <RollingTitle text={project.title} />
              </Link>
            </ImpulseRow>
          ))}
        </div>

        <div style={{ textAlign: 'center', padding: 'clamp(40px, 5vw, 72px) 0 0' }}>
          <Link href="/portfolio" className="pill pill--dark">See all projects</Link>
        </div>
      </section>

      <div style={{ marginTop: 'clamp(80px, 10vw, 150px)' }}><CycleMarks /></div>

      {/* ══════════════════════════════════════════════════════════════════
          S4 — THE GATE
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '80svh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: 'clamp(80px, 10vw, 140px) 5vw',
      }}>
        <div data-line-waypoint style={{ width: 1, height: 1, margin: '0 auto' }} />
        <GateLine />
        <ImpulseRow style={{ marginTop: 'clamp(32px, 4vw, 56px)', display: 'flex', justifyContent: 'flex-end' }}>
          <p style={{
            fontFamily: PP, fontWeight: 400, fontSize: 'clamp(14px, 1.2vw, 18px)',
            color: MUTED, lineHeight: 1.8, margin: 0, maxWidth: 560,
          }}>
            We don&apos;t decorate, and we don&apos;t chase trends. We build brands where every
            decision, strategic, verbal, or visual, pulls in the same direction. Deeply
            Lebanese, globally competitive: context is a credential, not an apology.
          </p>
        </ImpulseRow>
      </section>

      <CycleMarks />

      {/* ══════════════════════════════════════════════════════════════════
          S5 — WHAT WE DO · the line ends at LET'S SYNC.
      ══════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: 'clamp(80px, 10vw, 130px) 5vw clamp(80px, 10vw, 140px)' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          marginBottom: 'clamp(40px, 5vw, 64px)', gap: 24, flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: MUTED, margin: 0,
          }}>
            What we do
          </p>
          <span style={{ display: 'flex', gap: 28 }}>
            <Link href="/programs" className="home-smalllink">All programs →</Link>
            <Link href="/production" className="home-smalllink">Production →</Link>
          </span>
        </div>

        {[
          { name: 'Full Brand Engagement',     tagline: 'Strategy and identity from the same brain.', href: '/programs/brand-engagement' },
          { name: 'Print & Editorial',         tagline: 'Every physical touchpoint is a brand moment.', href: '/production/print-editorial' },
          { name: 'Digital Design',            tagline: 'Built for screens. Built for the brand.', href: '/production/social-digital' },
          { name: 'Animation & Editing',       tagline: 'The brand, in motion.', href: '/production/motion' },
          { name: 'Photography & Videography', tagline: 'Your brand, made real.', href: '/production/photo-video' },
          { name: 'Brand Guardianship',        tagline: 'After the brand is built.', href: '/programs/brand-guardianship' },
        ].map((svc, i) => (
          <ImpulseRow key={svc.name}>
            <Link
              href={svc.href}
              className="svc-row"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderTop: '1px solid rgba(0,0,0,0.1)',
                padding: 'clamp(20px, 2.5vw, 32px) 0',
                borderBottom: i === 5 ? '1px solid rgba(0,0,0,0.1)' : 'none',
                textDecoration: 'none', gap: 24,
              }}
            >
              <span className="svc-title" style={{
                fontFamily: PP, fontWeight: 400, fontSize: 'clamp(22px, 3vw, 40px)',
                color: INK, transition: 'color 0.3s', lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}>
                {svc.name}
              </span>
              <span style={{
                fontFamily: PP, fontWeight: 400, fontSize: 14,
                color: MUTED, textAlign: 'right', flex: 1,
              }}>
                {svc.tagline}
              </span>
            </Link>
          </ImpulseRow>
        ))}

        {/* The line literally leads the visitor to the sync. */}
        <div style={{ textAlign: 'center', paddingTop: 'clamp(72px, 9vw, 130px)' }}>
          <div data-line-waypoint style={{ width: 1, height: 1, margin: '0 auto' }} />
          <ImpulseRow rotate={0.04}>
            <Link href="/contact" className="lets-sync" style={{
              fontFamily: PP, fontWeight: 900,
              fontSize: 'clamp(44px, 9vw, 140px)',
              textTransform: 'uppercase', letterSpacing: '-2px', lineHeight: 1,
              color: INK, textDecoration: 'none', display: 'inline-block',
              transition: 'color 300ms ease',
            }}>
              Let&apos;s sync.
            </Link>
          </ImpulseRow>
          <p style={{
            fontFamily: PP, fontWeight: 400, fontSize: 12, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: MUTED, marginTop: 20,
          }}>
            The diagnostic call is free · 10 questions · 30 minutes
          </p>
        </div>
      </section>

      {/* ── Styles ────────────────────────────────────────────────────── */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* Registration-mark rows — the reference's section separators, carrying the Cycle */
        .cycle-marks {
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(14px, 1.6vw, 22px) 5vw;
        }
        .cycle-marks span { font-family: ${PP}; font-weight: 400; font-size: 14px; color: rgba(0,0,0,0.3); }
        .cycle-marks em {
          font-style: normal; font-family: ${PP}; font-weight: 400; font-size: 11px;
          letter-spacing: 0.22em; text-transform: uppercase; color: rgba(0,0,0,0.35);
        }

        .hero-foot {
          display: flex; justify-content: space-between; align-items: center;
          padding: clamp(16px, 2.2vh, 26px) 5vw;
        }
        .hero-foot span { font-family: ${PP}; font-weight: 400; font-size: 14px; color: rgba(0,0,0,0.3); }
        .hero-foot em {
          font-style: normal; font-family: ${PP}; font-weight: 400; font-size: 11px;
          letter-spacing: 0.24em; text-transform: uppercase; color: rgba(0,0,0,0.45);
        }

        /* Pills — the reference's CTA language */
        .pill {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: ${PP}; font-weight: 400; font-size: 12px;
          letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none;
          padding: 13px 22px; border-radius: 999px;
          transition: transform 200ms ease, background 250ms ease, color 250ms ease;
        }
        .pill:hover { transform: translateY(-1px); }
        .pill:active { transform: translateY(1px); }
        .pill:focus-visible { outline: 2px solid ${RED}; outline-offset: 3px; }
        .pill--light { background: #fff; color: ${INK}; border: 1px solid rgba(0,0,0,0.08); }
        .pill--light:hover { color: ${RED}; }
        .pill--light i { width: 6px; height: 6px; border-radius: 50%; background: ${RED}; display: inline-block; }
        .pill--dark { background: ${INK}; color: #fff; }
        .pill--dark:hover { background: ${RED}; }

        /* Statement section */
        .statement-grid {
          display: grid; grid-template-columns: 1.1fr 1fr;
          gap: clamp(32px, 5vw, 80px); align-items: start;
          margin-top: clamp(40px, 5vw, 72px);
        }
        .collage { position: relative; min-height: clamp(260px, 30vw, 430px); }
        .collage-a {
          position: absolute; left: 0; top: 0; width: 62%; aspect-ratio: 3 / 2;
          border-radius: 16px; overflow: hidden; transform: rotate(-2deg); z-index: 31;
        }
        .collage-b {
          position: absolute; right: 4%; bottom: 0; width: 46%; aspect-ratio: 4 / 3;
          border-radius: 16px; overflow: hidden; transform: rotate(1.5deg); z-index: 31;
        }
        .statement-copy { padding-top: 8px; }

        /* Ghost display line — outline letters, red flip on hover */
        .ghost-line {
          display: flex; justify-content: space-between; gap: 4vw;
          margin-top: clamp(64px, 9vw, 140px); text-decoration: none;
        }
        .ghost-word {
          font-family: ${PP}; font-weight: 900;
          font-size: clamp(40px, 8.6vw, 140px);
          line-height: 0.95; text-transform: uppercase; letter-spacing: -3px;
          color: transparent; -webkit-text-stroke: 1.5px rgba(0,0,0,0.35);
          transition: color 350ms ease, -webkit-text-stroke-color 350ms ease, transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .ghost-line:hover .ghost-word {
          color: ${RED}; -webkit-text-stroke-color: ${RED}; transform: translateY(-6px);
        }
        .ghost-line:hover .ghost-word:last-child { transition-delay: 60ms; }
        .ghost-line:focus-visible { outline: 2px solid ${RED}; outline-offset: 6px; }

        /* Featured work */
        .work-head {
          display: flex; justify-content: space-between; align-items: flex-end;
          gap: 32px; flex-wrap: wrap; margin-bottom: clamp(40px, 5vw, 72px);
        }
        .work-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: clamp(20px, 2.4vw, 40px) clamp(16px, 2vw, 32px);
        }
        .work-card { display: block; text-decoration: none; }
        .work-media {
          position: relative; display: block; aspect-ratio: 4 / 3;
          border-radius: 20px; overflow: hidden;
          transform: translateZ(0);
        }
        .work-media img { transition: transform 700ms cubic-bezier(0.19, 1, 0.22, 1); }
        .work-card:hover .work-media img { transform: scale(1.04); }
        .work-tags {
          display: block; font-family: ${PP}; font-weight: 400; font-size: 10px;
          letter-spacing: 0.2em; text-transform: uppercase; color: ${MUTED};
          margin: 16px 0 4px;
        }
        .roll-title { overflow: hidden; white-space: nowrap; }
        .roll-track {
          display: inline-flex; width: max-content;
          font-family: ${PP}; font-weight: 400;
          font-size: clamp(22px, 2.6vw, 38px); letter-spacing: -0.02em; color: ${INK};
        }
        .work-card:hover .roll-track { animation: roll 6s linear infinite; }
        @keyframes roll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .roll-track span { padding-right: 0; }

        .svc-row:hover .svc-title { color: ${RED} !important; }
        .lets-sync:hover { color: ${RED} !important; }
        .home-smalllink {
          font-family: ${PP}; font-weight: 400; font-size: 12px; letter-spacing: 2px;
          text-transform: uppercase; color: ${MUTED};
          text-decoration: underline; text-underline-offset: 4px;
          transition: color 220ms ease;
        }
        .home-smalllink:hover { color: ${RED}; }

        @media (max-width: 1023px) {
          .statement-grid { grid-template-columns: 1fr; }
          .work-grid { grid-template-columns: 1fr; }
          .work-head p { max-width: none; }
        }
        @media (max-width: 767px) {
          .hero-card { margin-left: 4vw; margin-right: 4vw; border-radius: 18px; }
          .hero-card-meta { display: none; }
          .collage { min-height: 240px; }
          .cycle-marks em { font-size: 9px; letter-spacing: 0.14em; }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-static-line { opacity: 1 !important; }
          .pill, .ghost-word, .work-media img, .roll-track { transition: none !important; animation: none !important; }
        }
      ` }} />

    </div>
  )
}

// The gate's oversized display line: letter-settle + velocity skew.
function GateLine() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    let cleanup: (() => void) | undefined
    import('@/components/home/motion').then(m => {
      if (el.isConnected) cleanup = m.addSkewTarget({ el })
    })
    return () => cleanup?.()
  }, [])
  return (
    <div ref={ref} style={{ willChange: 'transform' }}>
      <LetterSettle
        as="h2"
        parts={[{ t: 'Where random change becomes ' }, { t: 'designed evolution.', red: true }]}
        style={{
          fontFamily: PP, fontWeight: 400,
          fontSize: 'clamp(34px, 6.4vw, 100px)',
          textTransform: 'none',
          color: '#111', lineHeight: 1.05, letterSpacing: '-0.03em',
          margin: 0, maxWidth: '92vw',
        }}
      />
    </div>
  )
}
