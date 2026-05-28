'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const COLORS = ['#D0274B', '#000000', '#1A1A1A']

// Timings
const SLIDE_MS = 560   // slide-in / slide-out duration
const HOLD_MS  = 700   // how long the panel stays fully covering the screen

export default function PageTransition() {
  const pathname       = usePathname()
  const [visible, setVisible] = useState(false)
  const [phase,   setPhase]   = useState<'in' | 'out'>('in')
  const [color,   setColor]   = useState(COLORS[0])
  const colorIndexRef         = useRef(0)
  const isFirst               = useRef(true)

  useEffect(() => {
    if (isFirst.current) { isFirst.current = false; return }

    colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length
    setColor(COLORS[colorIndexRef.current])
    setPhase('in')
    setVisible(true)

    // After slide-in + hold, kick off the exit
    const tOut  = setTimeout(() => setPhase('out'),  SLIDE_MS + HOLD_MS)
    // After exit slide finishes, remove from DOM
    const tDone = setTimeout(() => setVisible(false), SLIDE_MS + HOLD_MS + SLIDE_MS)

    return () => { clearTimeout(tOut); clearTimeout(tDone) }
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
        // Logo lives INSIDE the panel — it rides up and out with it naturally,
        // no separate fade needed.
        animation:
          phase === 'in'
            ? `pageSlideUp  ${SLIDE_MS}ms cubic-bezier(0.76, 0, 0.24, 1) forwards`
            : `pageSlideOut ${SLIDE_MS}ms cubic-bezier(0.76, 0, 0.24, 1) forwards`,
        pointerEvents: 'all',
      }}
    >
      <Image
        src="/images/logo-stacked.png"
        alt="Thinchronize"
        width={120}
        height={120}
        style={{
          height:    90,
          width:     'auto',
          objectFit: 'contain',
          filter:    'brightness(0) invert(1)',
        }}
        priority
      />
    </div>
  )
}
