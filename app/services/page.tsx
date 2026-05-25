import type { Metadata } from 'next'
import ServicesEditorialClient from './ServicesEditorialClient'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand strategy, identity, motion, print, and more: every service Thinchronize offers.',
}

export default function ServicesPage() {
  return <ServicesEditorialClient />
}
