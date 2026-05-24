'use client'

import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Props {
  children: React.ReactNode
}

export default function SmoothScroll({ children }: Props) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    // Sync Lenis scroll position to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Use GSAP ticker to drive Lenis
    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // Expose lenis on window for external use
    ;(window as typeof window & { lenis: Lenis }).lenis = lenis

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
