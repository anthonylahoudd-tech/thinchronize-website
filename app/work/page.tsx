import type { Metadata } from 'next'
import Link from 'next/link'
import { getCaseStudies } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Brand strategy and visual identity projects by Thinchronize.',
}

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default async function WorkPage() {
  const caseStudies = await getCaseStudies()

  return (
    <div style={{ backgroundColor: '#292929', minHeight: '100vh' }}>
      <div
        className="container mx-auto"
        style={{
          paddingTop:    'clamp(140px, 18vw, 220px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        {/* Header */}
        <p style={{
          fontFamily:    PP,
          fontWeight:    800,
          fontSize:      11,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color:         '#D0274B',
          marginBottom:  20,
        }}>
          Selected Work
        </p>
        <h1 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(48px, 8vw, 110px)',
          lineHeight:    0.92,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
          color:         '#fff',
          marginBottom:  'clamp(56px, 8vw, 100px)',
        }}>
          Brands built to last.
        </h1>

        {/* Grid */}
        {caseStudies.length === 0 ? (
          <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 16, color: '#919191' }}>
            Case studies coming soon.
          </p>
        ) : (
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap:                 2,
          }}>
            {caseStudies.map((cs) => (
              <Link
                key={cs._id}
                href={`/work/${cs.slug.current}`}
                className="block transition-opacity duration-200 hover:opacity-80"
                style={{
                  backgroundColor: '#1a1a1a',
                  padding:         'clamp(28px, 4vw, 48px)',
                  borderBottom:    '1px solid rgba(145,145,145,0.15)',
                  textDecoration:  'none',
                }}
              >
                {cs.category && (
                  <p style={{
                    fontFamily:    PP,
                    fontWeight:    800,
                    fontSize:      10,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color:         '#D0274B',
                    marginBottom:  12,
                  }}>
                    {cs.category}
                  </p>
                )}
                <h2 style={{
                  fontFamily:    PP,
                  fontWeight:    800,
                  fontSize:      'clamp(22px, 3vw, 36px)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  color:         '#fff',
                  marginBottom:  8,
                  lineHeight:    1.05,
                }}>
                  {cs.title}
                </h2>
                {cs.client && (
                  <p style={{
                    fontFamily: PP,
                    fontWeight: 400,
                    fontSize:   13,
                    color:      '#919191',
                  }}>
                    {cs.client}{cs.year ? ` · ${cs.year}` : ''}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
