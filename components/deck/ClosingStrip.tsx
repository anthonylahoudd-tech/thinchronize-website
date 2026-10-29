'use client'

import Link from 'next/link'

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const EASE = 'cubic-bezier(0.19, 1, 0.22, 1)'

// Closing strip under a deck: 1–2 routed next steps, plus an optional statement line.
// Also serves as the "cover" element that dims/receded the deck's last card.

export interface StripLink {
  lead: string
  label: string
  href: string
  primary?: boolean
}

export default function ClosingStrip({ statement, links }: { statement?: string; links: StripLink[] }) {
  return (
    <section style={{
      backgroundColor: '#FFFFFF',
      borderTop: '1px solid #E8E8E8',
      padding: 'clamp(60px, 8vw, 120px) 5vw clamp(72px, 9vw, 140px)',
      position: 'relative',
      textAlign: 'center',
    }}>
      {statement && (
        <h2 style={{
          fontFamily: PP, fontWeight: 400, fontSize: 'clamp(24px, 3vw, 44px)',
          textTransform: 'uppercase', color: '#292929', lineHeight: 1.15,
          letterSpacing: '-0.01em', margin: '0 auto clamp(40px, 5vw, 72px)',
          maxWidth: 900, textWrap: 'balance',
        }}>
          {statement}
        </h2>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 6vw, 96px)', flexWrap: 'wrap' }}>
        {links.map(l => (
          <div key={l.href} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
            <p style={{
              fontFamily: PP, fontWeight: 400, fontSize: 'clamp(11px, 0.9vw, 14px)',
              letterSpacing: '0.18em', textTransform: 'uppercase', color: '#919191', margin: 0,
            }}>
              {l.lead}
            </p>
            <Link href={l.href} className={l.primary ? 'strip-btn' : 'strip-link'}>
              {l.label} →
            </Link>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .strip-btn {
          display: inline-block; padding: 16px 40px; background: ${RED}; color: #FFFFFF;
          font-family: ${PP}; font-weight: 400; font-size: 14px; letter-spacing: 0.08em;
          text-transform: uppercase; text-decoration: none;
          transition: background 220ms ${EASE}, transform 160ms ${EASE};
        }
        .strip-btn:hover { background: #b8223f; }
        .strip-btn:active { transform: translateY(1px); }
        .strip-btn:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }
        .strip-link {
          font-family: ${PP}; font-weight: 400; font-size: max(14px, 1.1vw); color: #292929;
          text-decoration: none; border-bottom: 3px double #292929; padding-bottom: 2px;
          transition: color 220ms ${EASE}, border-color 220ms ${EASE};
        }
        .strip-link:hover { color: ${RED}; border-color: ${RED}; }
        .strip-link:focus-visible { outline: 2px solid ${RED}; outline-offset: 4px; }
        @media (prefers-reduced-motion: reduce) {
          .strip-btn, .strip-link { transition: none; }
        }
      ` }} />
    </section>
  )
}
