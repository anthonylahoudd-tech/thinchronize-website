import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Header from '@/components/layout/Header'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import CustomCursor from '@/components/ui/CustomCursor'
import PageTransition from '@/components/layout/PageTransition'

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
      <head>
        {/* Preload critical fonts (WOFF2 — ~48% smaller than OTF) */}
        <link rel="preload" href="/fonts/PPNeueCorp-NormalUltrabold.woff2"  as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueCorp-ExtendedUltrabold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueCorp-NormalMedium.woff2"      as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
      </head>
      <body className="bg-dark text-white">
        <PageTransition />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          {/* z-index: 1 keeps page content on top of the sticky footer,
              which sits at bottom: 0 and is revealed as content scrolls away */}
          <main style={{ position: 'relative', zIndex: 1 }}>{children}</main>
          <ConditionalFooter />
        </SmoothScroll>
      </body>
    </html>
  )
}
