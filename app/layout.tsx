import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'
import Header from '@/components/layout/Header'
import ConditionalFooter from '@/components/layout/ConditionalFooter'
import CustomCursor from '@/components/ui/CustomCursor'
import PageTransition from '@/components/layout/PageTransition'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  metadataBase: new URL('https://thinchronize.com'),
  title: {
    default: 'Thinchronize — Brand Strategy Studio, Beirut',
    template: '%s — Thinchronize',
  },
  description:
    'Thinchronize is a strategy-led brand studio in Beirut, Lebanon. We build brands through diagnosis, positioning, and intentional design.',
  keywords: [
    'branding agency Lebanon', 'branding agency Beirut', 'brand strategy studio Beirut',
    'brand identity Lebanon', 'visual identity Lebanon', 'rebranding Lebanon',
    'creative studio Beirut', 'brand design Lebanon',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: 'Thinchronize',
    locale: 'en_US',
    url: 'https://thinchronize.com',
    title: 'Thinchronize — Brand Strategy Studio, Beirut',
    description: 'A strategy-led brand studio in Beirut, Lebanon. We build brands through diagnosis, positioning, and intentional design.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Thinchronize — Brand Strategy Studio, Beirut' }],
  },
  twitter: {
    card: 'summary_large_image',
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
        <JsonLd data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Thinchronize',
          url: 'https://thinchronize.com',
          logo: 'https://thinchronize.com/images/logo-stacked.png',
          description: 'Strategy-led brand studio based in Beirut, Lebanon.',
          address: { '@type': 'PostalAddress', addressLocality: 'Beirut', addressCountry: 'LB' },
          sameAs: [
            'https://www.instagram.com/thinchronize/',
            'https://www.facebook.com/thinchronize/',
            'https://www.youtube.com/@thinchronize',
            'https://lb.linkedin.com/company/thinchronize',
            'https://www.behance.net/thinchronize',
          ],
        }} />
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
