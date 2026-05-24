'use client'

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [isHover, setIsHover] = useState(false)
  const [isClick, setIsClick] = useState(false)

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)

    const handleMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e
      // Dot follows instantly — no transition on transform
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) translateZ(0)`
      }
      // Ring follows with CSS transition lag
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) translateZ(0)`
      }
    }

    const handleDown = () => setIsClick(true)
    const handleUp = () => setIsClick(false)

    const handleOver = (e: MouseEvent) => {
      const t = e.target as Element
      if (
        t.closest('a') ||
        t.closest('button') ||
        t.closest('[data-cursor="hover"]')
      ) {
        setIsHover(true)
      }
    }

    const handleOut = (e: MouseEvent) => {
      const t = e.target as Element
      if (!t.closest('a') && !t.closest('button') && !t.closest('[data-cursor="hover"]')) {
        setIsHover(false)
      }
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.addEventListener('mouseover', handleOver, { passive: true })
    document.addEventListener('mouseout', handleOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.removeEventListener('mouseover', handleOver)
      document.removeEventListener('mouseout', handleOut)
    }
  }, [])

  if (!mounted) return null

  const ringSize = isHover ? 56 : isClick ? 16 : 40

  return (
    <>
      {/* Inner dot — instant follow, no transform transition */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference rounded-full bg-white"
        style={{
          width: isHover ? 0 : 10,
          height: isHover ? 0 : 10,
          willChange: 'transform',
          transition: 'width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
      />

      {/* Outer ring — slightly lagged via CSS transition on transform */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference rounded-full"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid ${isHover ? '#D0274B' : 'white'}`,
          backgroundColor: isHover ? 'rgba(208,39,75,0.15)' : 'transparent',
          opacity: isHover ? 0.8 : isClick ? 0.5 : 0.4,
          willChange: 'transform',
          // Transform transition creates the natural lag/follower feel
          transition: `
            transform 0.12s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            width 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            height 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            background-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            border-color 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)
          `,
        }}
      />
    </>
  )
}
