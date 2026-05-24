import type { Metadata } from 'next'
import PortfolioGrid from './PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: '150 clients. 10 years. Every sector where brand matters in Lebanon.',
}

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function PortfolioPage() {
  return (
    <div style={{ backgroundColor: '#292929', minHeight: '100vh' }}>

      {/* ── Header section ──────────────────────────────────────────── */}
      <div style={{ padding: '100px 48px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{
            fontFamily:    PP,
            fontWeight:    800,
            fontSize:      11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color:         '#D0274B',
            marginBottom:  12,
          }}>
            Portfolio
          </p>
          <h1 style={{
            fontFamily:    PP,
            fontWeight:    900,
            fontSize:      'clamp(40px, 7vw, 64px)',
            color:         '#fff',
            lineHeight:    1.1,
            marginBottom:  16,
          }}>
            Our Work
          </h1>
          <p style={{
            fontFamily: PP,
            fontWeight: 400,
            fontSize:   18,
            color:      '#919191',
            maxWidth:   560,
            lineHeight: 1.6,
          }}>
            150 clients. 10 years. Every sector where brand matters in Lebanon.
          </p>
        </div>
      </div>

      {/* ── Project grid (client component for hover interactions) ── */}
      <PortfolioGrid />
    </div>
  )
}
