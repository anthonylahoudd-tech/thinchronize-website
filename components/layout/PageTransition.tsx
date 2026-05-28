'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

// Shuffles between red, black, and 90%-black
const COLORS = ['#D0274B', '#000000', '#1A1A1A']

export default function PageTransition() {
  const pathname      = usePathname()
  const [visible,  setVisible] = useState(false)
  const [phase,    setPhase]   = useState<'in' | 'hold' | 'out'>('in')
  const [color,    setColor]   = useState(COLORS[0])
  const colorIndexRef          = useRef(0)
  const isFirst                = useRef(true)

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }

    colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length
    setColor(COLORS[colorIndexRef.current])
    setPhase('in')
    setVisible(true)

    // 380ms  → slide-in done, logo fades in
    // 880ms  → logo fades out, slide-out begins  (500ms hold)
    // 1260ms → slide-out done, overlay removed
    const t1 = setTimeout(() => setPhase('hold'), 380)
    const t2 = setTimeout(() => setPhase('out'),  880)
    const t3 = setTimeout(() => setVisible(false), 1260)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      style={{
        position:        'fixed',
        inset:           0,
        zIndex:          9999,
        backgroundColor: color,
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        animation:
          phase === 'in'  ? 'pageSlideUp  380ms cubic-bezier(0.76, 0, 0.24, 1) forwards' :
          phase === 'out' ? 'pageSlideOut 380ms cubic-bezier(0.76, 0, 0.24, 1) forwards' :
          'none',
        pointerEvents: 'all',
      }}
    >
      {/* Stacked logo — always white on all dark backgrounds */}
      <Image
        src="/images/logo-stacked.png"
        alt="Thinchronize"
        width={120}
        height={120}
        style={{
          height:     90,
          width:      'auto',
          objectFit:  'contain',
          opacity:    phase === 'hold' ? 1 : 0,
          transition: 'opacity 150ms ease',
          filter:     'brightness(0) invert(1)',
        }}
        priority
      />
    </div>
  )
}
