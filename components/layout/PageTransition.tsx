'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

// Cycles through these on every navigation
const COLORS = ['#D0274B', '#292929', '#000000', '#919191', '#FFFFFF']

export default function PageTransition() {
  const pathname                        = usePathname()
  const [visible,  setVisible]          = useState(false)
  const [phase,    setPhase]            = useState<'in' | 'hold' | 'out'>('in')
  const [color,    setColor]            = useState(COLORS[0])
  const colorIndexRef                   = useRef(0)
  const isFirst                         = useRef(true)

  useEffect(() => {
    // Skip the very first render (page load — no transition needed)
    if (isFirst.current) { isFirst.current = false; return }

    colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length
    setColor(COLORS[colorIndexRef.current])
    setPhase('in')
    setVisible(true)

    // 350ms  → slide-in complete, show logo
    // 550ms  → hide logo, start slide-out
    // 900ms  → slide-out complete, remove overlay
    const t1 = setTimeout(() => setPhase('hold'), 350)
    const t2 = setTimeout(() => setPhase('out'),  550)
    const t3 = setTimeout(() => setVisible(false), 900)

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [pathname])

  if (!visible) return null

  const isLight = color === '#FFFFFF' || color === '#919191'

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
        // 'in'  → panel slides up from bottom
        // 'hold'→ panel sits at translateY(0), no animation (forwards fill holds it)
        // 'out' → panel slides up off the top
        animation:
          phase === 'in'  ? 'pageSlideUp 350ms ease-in-out forwards' :
          phase === 'out' ? 'pageSlideOut 350ms ease-in-out forwards' :
          'none',
        pointerEvents: 'all',
      }}
    >
      <Image
        src={isLight ? '/logo-wordmark-red.png' : '/logo-wordmark-white.png'}
        alt="Thinchronize"
        width={180}
        height={28}
        style={{
          height:     26,
          width:      'auto',
          objectFit:  'contain',
          opacity:    phase === 'hold' ? 1 : 0,
          transition: 'opacity 120ms ease',
        }}
        priority
      />
    </div>
  )
}
