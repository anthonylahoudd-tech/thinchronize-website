import type { Metadata } from 'next'
import PortfolioPageClient from './PortfolioPageClient'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Brand strategy and identity work by Thinchronize — 150 clients, 10 years, every sector where brand matters in Lebanon.',
  openGraph: {
    title: 'Portfolio — Thinchronize Brand Strategy Studio, Beirut',
    description: '150 clients. 10 years. Every sector where brand matters in Lebanon.',
    url: 'https://thinchronize.com/portfolio',
    images: [{ url: 'https://thinchronize.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
