'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
    const move = (e: MouseEvent) => {
      if (!dotRef.current) return
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={dotRef}
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         8,
        height:        8,
        borderRadius:  '50%',
        background:    'white',
        mixBlendMode:  'difference',
        pointerEvents: 'none',
        zIndex:        9999,
        willChange:    'transform',
      }}
    />
  )
}
