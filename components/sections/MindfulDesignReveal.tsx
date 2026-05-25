'use client'

import { motion } from 'framer-motion'

const PP = "'PPNeueCorp', system-ui, sans-serif"

export default function MindfulDesignReveal() {
  return (
    <section style={{
      minHeight:       '100vh',
      backgroundColor: '#000000',
      display:         'flex',
      flexDirection:   'column',
      alignItems:      'center',
      justifyContent:  'center',
      textAlign:       'center',
      padding:         '0 clamp(20px, 5vw, 80px)',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1.0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] as const }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}
      >
        <h2 style={{
          fontFamily:    PP,
          fontWeight:    900,
          fontSize:      'clamp(60px, 10vw, 130px)',
          lineHeight:    0.9,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color:         '#FFFFFF',
        }}>
          Mindful Design
        </h2>
        <p style={{
          fontFamily:    PP,
          fontWeight:    400,
          fontSize:      16,
          color:         '#919191',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          Strategy-Led Creative Studio · Beirut
        </p>
      </motion.div>
    </section>
  )
}
