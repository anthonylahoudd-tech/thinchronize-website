import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Thinchronize is a brand strategy and visual identity studio based in Beirut, Lebanon. 10+ years, 150+ clients, every sector where brand matters.',
  alternates: { canonical: '/about' },
  openGraph: { url: 'https://thinchronize.com/about', title: 'About — Thinchronize' },
}

export default function AboutPage() {
  return <AboutClient />
}
