import type { Metadata } from 'next'
import ServicesClient from './ServicesClient'

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Brand Engagement, production add-ons, Brand Guardianship retainer, and Alumni pricing — the complete Thinchronize service offering.',
}

export default function ServicesPage() {
  return <ServicesClient />
}
