'use client'

import { useEffect, useState, ReactNode } from 'react'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'

// Curtain hold ends at SLIDE_MS(750) + HOLD_MS(400) = 1150ms from click.
// New page mounts ~at 750ms (when router.push fires).
// So curtain starts sliding out ~400ms after mount.
// We stagger text lines starting at 420ms so they reveal as curtain lifts.
const BASE_DELAY = 420

interface PageHeroProps {
  title:        string
  lines:        ReactNode[]       // subtitle split into individual lines (supports JSX for highlights)
  bottomLabel?: string            // e.g. "Learn more about us"
  bottomHref?:  string            // href or "#" to scroll past hero
}

// Red box highlight helper — use inside lines[]
export function H({ children }: { children: ReactNode }) {
  return (
    <span style={{
      background:   '#D0274B',
      color:        '#fff',
      padding:      '0 8px 2px',
      display:      'inline',
    }}>
      {children}
    </span>
  )
}

export default function PageHero({ title, lines, bottomLabel, bottomHref }: PageHeroProps) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), BASE_DELAY)
    return () => clearTimeout(t)
  }, [])

  const repeated = `${title} * ${title} * ${title} * ${title} * ${title} * `

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!bottomHref || bottomHref === '#') {
      e.preventDefault()
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
    }
  }

  return (
    <div style={{
      height:        '100vh',
      background:    '#000',
      display:       'flex',
      flexDirection: 'column',
      paddingTop:    'calc(96px + 3vh)',
      overflow:      'hidden',
    }}>

      {/* ── Scrolling marquee ─────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', flexShrink: 0 }}>
        <div className="page-marquee-track">
          <span style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(88px, 13vw, 185px)',
            color:         'white',
            textTransform: 'uppercase',
            letterSpacing: '-4px',
            lineHeight:    0.9,
            whiteSpace:    'nowrap',
          }}>
            {repeated}{repeated}
          </span>
        </div>
      </div>

      {/* ── Staggered subtitle lines ───────────────────────────────── */}
      <div style={{ padding: '44px 5vw 0', flexShrink: 0 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <p style={{
              fontFamily:    PP,
              fontWeight:    400,
              fontSize:      'clamp(22px, 3vw, 42px)',
              color:         'white',
              lineHeight:    1.25,
              letterSpacing: '-0.5px',
              margin:        0,
              opacity:       ready ? 1 : 0,
              transform:     ready ? 'translateY(0)' : 'translateY(32px)',
              transition:    `opacity 750ms ${EASE}, transform 750ms ${EASE}`,
              transitionDelay: `${i * 110}ms`,
            }}>
              {line}
            </p>
          </div>
        ))}
      </div>

      {/* ── Spacer ────────────────────────────────────────────────── */}
      <div style={{ flex: 1 }} />

      {/* ── Bottom bar: "Learn more ↓"  ·  (SCROLL) ──────────────── */}
      <div style={{
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        padding:        '0 5vw 48px',
        flexShrink:     0,
      }}>
        {/* Left */}
        <a
          href={bottomHref ?? '#'}
          onClick={handleScrollClick}
          style={{
            fontFamily:          PP,
            fontWeight:          400,
            fontSize:            13,
            letterSpacing:       '2px',
            textTransform:       'uppercase',
            color:               'rgba(255,255,255,0.5)',
            textDecoration:      'underline',
            textUnderlineOffset: '5px',
            opacity:             ready ? 1 : 0,
            transform:           ready ? 'translateY(0)' : 'translateY(16px)',
            transition:          `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
            transitionDelay:     `${lines.length * 110 + 80}ms`,
          }}
        >
          {bottomLabel ?? 'Scroll to explore'} ↓
        </a>

        {/* Right */}
        <span style={{
          fontFamily:      PP,
          fontWeight:      400,
          fontSize:        11,
          letterSpacing:   '4px',
          textTransform:   'uppercase',
          color:           'rgba(255,255,255,0.35)',
          opacity:         ready ? 1 : 0,
          transform:       ready ? 'translateY(0)' : 'translateY(16px)',
          transition:      `opacity 700ms ${EASE}, transform 700ms ${EASE}`,
          transitionDelay: `${lines.length * 110 + 160}ms`,
        }}>
          (SCROLL)
        </span>
      </div>

    </div>
  )
}
