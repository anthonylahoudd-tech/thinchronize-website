import type { Metadata } from 'next'
import ServicesEditorialClient from './ServicesEditorialClient'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand strategy, visual identity, motion design, print, and digital — every service Thinchronize offers to brands in Lebanon and beyond.',
  alternates: { canonical: '/services' },
  openGraph: { url: 'https://thinchronize.com/services', title: 'Services — Thinchronize' },
}

export default function ServicesPage() {
  return <ServicesEditorialClient />
}
