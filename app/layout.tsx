import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'Thinchronize — Mindful Design',
    template: '%s — Thinchronize',
  },
  description:
    'Thinchronize is a strategic creative studio based in Lebanon. We build brands that speak through precise, intentional design.',
  keywords: ['brand strategy', 'visual identity', 'creative studio', 'Lebanon', 'brand design'],
  openGraph: {
    title: 'Thinchronize — Mindful Design',
    description: 'A strategic creative studio based in Lebanon.',
    url: 'https://thinchronize.com',
    siteName: 'Thinchronize',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thinchronize — Mindful Design',
    description: 'A strategic creative studio based in Lebanon.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-dark text-white">
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  )
}
