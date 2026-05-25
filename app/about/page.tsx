import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About — Thinchronize',
  description:
    'Thinchronize is a strategy-led creative studio based in Lebanon. Meet our founders, our values, and the process behind 10+ years of brand work across 150+ clients.',
}

export default function AboutPage() {
  return <AboutClient />
}
