import type { Metadata } from 'next'
import ContactClient from './ContactClient'

export const metadata: Metadata = {
  title: 'Message Bin — Thinchronize',
  description: "Tell us about your brand. We'll start with a diagnosis.",
}

export default function ContactPage() {
  return <ContactClient />
}
