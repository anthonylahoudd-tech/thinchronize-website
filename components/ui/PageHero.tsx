'use client'

const PP = "'PPNeueCorp', system-ui, sans-serif"

interface PageHeroProps {
  title:    string
  subtitle: string
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  const repeated = `${title} * ${title} * ${title} * ${title} * ${title} * `

  return (
    <div style={{
      height:        '100vh',
      background:    '#000',
      display:       'flex',
      flexDirection: 'column',
      paddingTop:    '96px',
      overflow:      'hidden',
    }}>

      {/* Scrolling marquee */}
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

      {/* Subtitle */}
      <div style={{ padding: '44px 56px 0', flexShrink: 0 }}>
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      'clamp(22px, 3vw, 42px)',
          color:         'white',
          lineHeight:    1.2,
          letterSpacing: '-0.5px',
          margin:        0,
          maxWidth:      '780px',
        }}>
          {subtitle}
        </p>
      </div>

      {/* Spacer pushes subtitle to upper-left */}
      <div style={{ flex: 1 }} />

    </div>
  )
}
