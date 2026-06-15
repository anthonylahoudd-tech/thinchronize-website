import type { Metadata } from 'next'
import ServicesEditorialClient from './ServicesEditorialClient'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Brand strategy, visual identity, motion design, print, and digital — every service Thinchronize offers to brands in Lebanon and beyond.',
  openGraph: {
    title: 'Services — Thinchronize Brand Strategy Studio, Beirut',
    description: 'Brand strategy, visual identity, motion design, print, and digital — every service Thinchronize offers.',
    url: 'https://thinchronize.com/services',
    images: [{ url: 'https://thinchronize.com/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function ServicesPage() {
  return <ServicesEditorialClient />
}
