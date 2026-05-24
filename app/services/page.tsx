import type { Metadata } from 'next'
import ServicesOrbitalClient from './ServicesOrbitalClient'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Discover Thinchronize services through an interactive brand diagnostic experience.',
}

export default function ServicesPage() {
  return <ServicesOrbitalClient />
}
