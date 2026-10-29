import type { Metadata } from 'next'
import ProgramsClient from './ProgramsClient'

export const metadata: Metadata = {
  title: 'Programs',
  description: 'Four purpose-built brand programs — Brand Clarity from $6,150, the Brand Identity Program from $5,650, the full Brand Engagement from $11,200, and Brand Guardianship from $1,200/month.',
  alternates: { canonical: '/programs' },
  openGraph: { url: 'https://thinchronize.com/programs', title: 'Programs — Thinchronize' },
}

export default function ProgramsPage() {
  return <ProgramsClient />
}
