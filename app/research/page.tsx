import type { Metadata } from 'next'
import ResearchClient from './ResearchClient'

export const metadata: Metadata = {
  title: 'Research',
  description: 'Know where your brand stands before you spend on a solution. Brand Audit — your Brand Health Score /100, $1,500. Research — the Brand Reality Report, from $2,200. Both credit toward any program.',
  alternates: { canonical: '/research' },
  openGraph: { url: 'https://thinchronize.com/research', title: 'Research — Thinchronize' },
}

export default function ResearchPage() {
  return <ResearchClient />
}
