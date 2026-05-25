'use client'

import Link from 'next/link'

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function AlumniProgram() {
  return (
    <section style={{ backgroundColor: '#000000', padding: 'clamp(80px, 8vw, 120px) clamp(20px, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <span style={{ width: 32, height: 1, background: '#D0274B', flexShrink: 0 }} />
          <span style={{ fontFamily: PP, fontWeight: 800, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.5)' }}>
            Brand Alumni
          </span>
        </div>

        {/* Main content grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(40px, 4vw, 80px)', alignItems: 'start' }}>

          {/* Left — headline */}
          <div style={{ gridColumn: 'span 5' }}>
            <h2 style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(36px, 4.5vw, 64px)',
              lineHeight:    0.95,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase' as const,
              color:         '#FFFFFF',
              marginBottom:  32,
            }}>
              The longer we work together, the less you pay.
            </h2>
            <p style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   'clamp(14px, 1.2vw, 16px)',
              lineHeight: 1.7,
              color:      'rgba(255,255,255,0.55)',
              maxWidth:   420,
              marginBottom: 40,
            }}>
              Brand Alumni is our way of rewarding clients who commit to the craft. Once you qualify,
              every production project you brief us on comes at a permanent rate. Not a promotion. A
              permanent discount that applies for as long as we work together.
            </p>
            <Link
              href="/services"
              style={{
                display:       'inline-flex',
                alignItems:    'center',
                gap:           10,
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      12,
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                color:         '#FFFFFF',
                background:    '#D0274B',
                padding:       '12px 28px',
                transition:    'background 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#b8223f')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = '#D0274B')}
            >
              Learn more →
            </Link>
          </div>

          {/* Right — discount callout + qualifications */}
          <div style={{ gridColumn: 'span 7', display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Big discount number */}
            <div style={{
              background:   'rgba(208,39,75,0.08)',
              border:       '1px solid rgba(208,39,75,0.2)',
              borderRadius: 0,
              padding:      'clamp(32px, 4vw, 56px)',
              display:      'flex',
              alignItems:   'center',
              justifyContent: 'space-between',
              gap:          32,
              flexWrap:     'wrap' as const,
            }}>
              <div>
                <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(72px, 10vw, 120px)', lineHeight: 1, color: '#D0274B', letterSpacing: '-0.02em' }}>
                  25–30%
                </p>
                <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 14, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginTop: 8 }}>
                  Permanent production discount
                </p>
              </div>
              <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 'clamp(13px, 1.1vw, 15px)', color: 'rgba(255,255,255,0.45)', maxWidth: 260, lineHeight: 1.6 }}>
                Applies to print, digital, motion, and photography. Forever.
              </p>
            </div>

            {/* Two qualification paths */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                {
                  label: 'Path A',
                  title: 'Complete any Brand Engagement',
                  desc: 'Commit to our full branding process and Alumni status is yours immediately.',
                },
                {
                  label: 'Path B',
                  title: '$3,000 in production spend',
                  desc: 'Reach $3,000 across any combination of print, digital, motion, or photography work.',
                },
              ].map((path) => (
                <div key={path.label} style={{
                  background:   'rgba(255,255,255,0.03)',
                  border:       '1px solid rgba(255,255,255,0.08)',
                  padding:      'clamp(20px, 2.5vw, 32px)',
                }}>
                  <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' as const, color: '#D0274B', marginBottom: 12 }}>
                    {path.label}
                  </p>
                  <p style={{ fontFamily: PP, fontWeight: 900, fontSize: 'clamp(15px, 1.5vw, 18px)', color: '#FFFFFF', textTransform: 'uppercase' as const, letterSpacing: '0.02em', lineHeight: 1.2, marginBottom: 12 }}>
                    {path.title}
                  </p>
                  <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
                    {path.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
