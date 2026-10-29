import type { Metadata } from 'next'
import ProductionClient from './ProductionClient'

export const metadata: Metadata = {
  title: 'Production',
  description: 'Design and content production, open to everyone — social systems, print & editorial, brand extension, packaging, motion, photography & video. Fixed prices, two revision rounds, one quality bar.',
  alternates: { canonical: '/production' },
  openGraph: { url: 'https://thinchronize.com/production', title: 'Production — Thinchronize' },
}

export default function ProductionPage() {
  return <ProductionClient />
}
