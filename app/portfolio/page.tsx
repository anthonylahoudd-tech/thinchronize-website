import type { Metadata } from 'next'
import PortfolioPageClient from './PortfolioPageClient'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Brand strategy and identity work by Thinchronize — 150 clients, 10 years, every sector where brand matters in Lebanon.',
  alternates: { canonical: '/portfolio' },
  openGraph: { url: 'https://thinchronize.com/portfolio', title: 'Portfolio — Thinchronize' },
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
