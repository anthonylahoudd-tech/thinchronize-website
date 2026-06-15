import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Contact',
  description: "Tell us about your brand. We'll start with a diagnosis.",
  alternates: { canonical: '/contact' },
  openGraph: { url: 'https://thinchronize.com/contact', title: 'Contact — Thinchronize' },
}

export default function ContactPage() {
  return <ContactClient />
}
