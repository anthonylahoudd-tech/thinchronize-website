import type { Metadata } from 'next'
import PortfolioPageClient from './PortfolioPageClient'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: '150 clients. 10 years. Every sector where brand matters in Lebanon.',
}

export default function PortfolioPage() {
  return <PortfolioPageClient />
}
