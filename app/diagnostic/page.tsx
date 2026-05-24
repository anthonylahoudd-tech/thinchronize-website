import type { Metadata } from 'next'
import DiagnosticClient from './DiagnosticClient'

export const metadata: Metadata = {
  title: 'Diagnose Your Brand',
  description: 'Answer a few questions and find the right Thinchronize service for your brand.',
}

export default function DiagnosticPage() {
  return <DiagnosticClient />
}
