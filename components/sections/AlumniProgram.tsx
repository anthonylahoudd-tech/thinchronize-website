'use client'

import Link from 'next/link'

export default function AlumniProgram() {
  return (
    <section
      style={{
        backgroundColor: '#D0274B',
        padding:         'clamp(36px, 4vw, 56px) clamp(20px, 5vw, 80px)',
      }}
    >
      <div
        style={{
          maxWidth:       1440,
          margin:         '0 auto',
          display:        'flex',
          flexWrap:       'wrap',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '2rem',
        }}
      >
        {/* Left label */}
        <p
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    900,
            fontSize:      'clamp(20px, 2.5vw, 32px)',
            textTransform: 'uppercase',
            letterSpacing: '0.02em',
            color:         '#FFFFFF',
            lineHeight:    1,
            flexShrink:    0,
          }}
        >
          Brand Alumni
          <br />
          Program
        </p>

        {/* Centre description */}
        <p
          style={{
            fontFamily: "'PPNeueCorp', system-ui, sans-serif",
            fontWeight: 400,
            fontSize:   'clamp(13px, 1.2vw, 16px)',
            lineHeight: 1.65,
            color:      'rgba(255,255,255,0.82)',
            maxWidth:   540,
            flex:       '1 1 260px',
          }}
        >
          Complete a brand engagement or reach $3,000 in production work to earn a permanent
          25–30% discount on all future production. For clients who build with us.
        </p>

        {/* CTA */}
        <Link
          href="/services"
          style={{
            fontFamily:    "'PPNeueCorp', system-ui, sans-serif",
            fontWeight:    800,
            fontSize:      12,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color:         '#FFFFFF',
            borderBottom:  '1px solid rgba(255,255,255,0.5)',
            paddingBottom: 3,
            whiteSpace:    'nowrap',
            transition:    'border-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = '#fff')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.5)')}
        >
          Learn more →
        </Link>
      </div>
    </section>
  )
}
