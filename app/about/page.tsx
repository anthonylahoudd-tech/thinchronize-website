import type { Metadata } from 'next'
import AboutClient from './AboutClient'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Thinchronize is a brand strategy and visual identity studio based in Beirut, Lebanon. 10+ years, 150+ clients, every sector where brand matters.',
  openGraph: {
    title: 'About — Thinchronize Brand Strategy Studio, Beirut',
    description: 'A brand strategy and visual identity studio based in Beirut, Lebanon. 10+ years, 150+ clients.',
    url: 'https://thinchronize.com/about',
    images: [{ url: 'https://thinchronize.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function AboutPage() {
  return <AboutClient />
}
