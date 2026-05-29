'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

// ─── Tokens ───────────────────────────────────────────────────────────────────

const PP   = "'PPNeueCorp', system-ui, sans-serif"
const RED  = '#D0274B'
const DARK = '#292929'

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 24 },
  animate:     { opacity: 1, y: 0 },
  transition:  { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const, delay },
})

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  name:    string
  company: string
  email:   string
  intent:  string
  message: string
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    await new Promise((res) => setTimeout(res, 1000))
    console.log('Contact form:', data)
    setLoading(false)
    setSubmitted(true)
    reset()
  }

  return (
    <div style={{ backgroundColor: DARK, minHeight: '100vh' }}>
      <div
        className="container mx-auto"
        style={{
          paddingTop:    'clamp(96px, 12vh, 130px)',
          paddingBottom: 'clamp(80px, 10vw, 140px)',
        }}
      >
        {/* ── Heading ── */}
        <div style={{ maxWidth: 900, marginBottom: 'clamp(56px, 7vw, 96px)' }}>
          <motion.h1
            {...fadeUp(0)}
            style={{
              fontFamily:    PP,
              fontWeight:    900,
              fontSize:      'clamp(48px, 8vw, 120px)',
              textTransform: 'uppercase',
              lineHeight:    0.92,
              letterSpacing: '-0.02em',
              color:         '#fff',
              marginBottom:  24,
            }}
          >
            Message Bin
          </motion.h1>
          <motion.p
            {...fadeUp(0.1)}
            style={{
              fontFamily: PP,
              fontWeight: 400,
              fontSize:   'clamp(16px, 2vw, 20px)',
              color:      '#919191',
              maxWidth:   '50ch',
              lineHeight: 1.6,
            }}
          >
            Tell us about your brand. We&apos;ll start with a diagnosis.
          </motion.p>
        </div>

        {/* ── Form / Success ── */}
        <motion.div
          {...fadeUp(0.15)}
          style={{ maxWidth: 680 }}
        >
          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingTop: 16 }}>
              <CheckCircle style={{ width: 44, height: 44, color: RED }} />
              <h2 style={{
                fontFamily:    PP,
                fontWeight:    800,
                fontSize:      28,
                textTransform: 'uppercase',
                color:         '#fff',
                letterSpacing: '-0.01em',
              }}>
                Message received.
              </h2>
              <p style={{
                fontFamily: PP,
                fontWeight: 400,
                fontSize:   15,
                color:      '#919191',
                lineHeight: 1.7,
                maxWidth:   '44ch',
              }}>
                We review every inquiry personally and will respond within 48 hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  fontFamily:    PP,
                  fontWeight:    400,
                  fontSize:      13,
                  color:         '#919191',
                  background:    'none',
                  border:        'none',
                  padding:       0,
                  cursor:        'pointer',
                  textDecoration:'underline',
                  alignSelf:     'flex-start',
                  transition:    'color 0.2s',
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#fff')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#919191')}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

              {/* Row 1: Name + Company */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="grid-cols-1 sm:grid-cols-2">
                <Field label="Name *" error={errors.name?.message}>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Your name"
                    className="form-input"
                  />
                </Field>
                <Field label="Company / Brand">
                  <input
                    {...register('company')}
                    placeholder="Your company"
                    className="form-input"
                  />
                </Field>
              </div>

              {/* Row 2: Email + Intent */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="grid-cols-1 sm:grid-cols-2">
                <Field label="Email *" error={errors.email?.message}>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                    })}
                    type="email"
                    placeholder="your@email.com"
                    className="form-input"
                  />
                </Field>
                <Field label="What are you looking for? *" error={errors.intent?.message}>
                  <select
                    {...register('intent', { required: 'Please select an option' })}
                    defaultValue=""
                    className="form-input appearance-none bg-transparent"
                  >
                    <option value="" disabled className="bg-dark">Select one</option>
                    <option value="brand-engagement"    className="bg-dark">Brand Engagement</option>
                    <option value="brand-guardianship"  className="bg-dark">Brand Guardianship</option>
                    <option value="production-work"     className="bg-dark">Production Work</option>
                    <option value="just-exploring"      className="bg-dark">Just exploring</option>
                  </select>
                </Field>
              </div>

              {/* Message */}
              <Field label="Tell us about your brand *" error={errors.message?.message}>
                <textarea
                  {...register('message', { required: 'Please tell us about your brand' })}
                  placeholder="What are you building? What's the challenge? What have you tried?"
                  rows={5}
                  className="form-input resize-none"
                />
              </Field>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    display:         'inline-flex',
                    alignItems:      'center',
                    gap:             10,
                    padding:         '15px 40px',
                    backgroundColor: loading ? 'rgba(208,39,75,0.6)' : RED,
                    color:           '#fff',
                    fontFamily:      PP,
                    fontWeight:      800,
                    fontSize:        12,
                    letterSpacing:   '0.14em',
                    textTransform:   'uppercase',
                    borderRadius:    40,
                    border:          'none',
                    cursor:          loading ? 'not-allowed' : 'pointer',
                    transition:      'background-color 0.25s',
                  }}
                  onMouseEnter={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#b8223f' }}
                  onMouseLeave={(e) => { if (!loading) (e.currentTarget as HTMLButtonElement).style.backgroundColor = RED }}
                >
                  {loading ? (
                    <>
                      <span style={{
                        width: 14, height: 14, borderRadius: '50%',
                        border: '2px solid rgba(255,255,255,0.3)',
                        borderTopColor: '#fff',
                        display: 'inline-block',
                        animation: 'spin 0.7s linear infinite',
                      }} />
                      Sending…
                    </>
                  ) : (
                    <>Send Message <span aria-hidden>→</span></>
                  )}
                </button>
                <p style={{
                  fontFamily:  PP,
                  fontWeight:  400,
                  fontSize:    12,
                  color:       '#919191',
                  marginTop:   14,
                  letterSpacing: '0.02em',
                }}>
                  We respond to every message within 48 hours.
                </p>
              </div>

            </form>
          )}
        </motion.div>

        {/* ── Direct contact ── */}
        <motion.p
          {...fadeUp(0.25)}
          style={{
            fontFamily:  PP,
            fontWeight:  400,
            fontSize:    13,
            color:       '#919191',
            marginTop:   'clamp(48px, 6vw, 80px)',
            letterSpacing: '0.02em',
          }}
        >
          Or reach us directly at{' '}
          <a
            href="mailto:hello@thinchronize.com"
            style={{
              color:      '#fff',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = RED)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
          >
            hello@thinchronize.com
          </a>
        </motion.p>

      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── Field wrapper ────────────────────────────────────────────────────────────

function Field({
  label, error, children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  const PP = "'PPNeueCorp', system-ui, sans-serif"
  return (
    <div>
      <label style={{
        display:       'block',
        fontFamily:    PP,
        fontWeight:    800,
        fontSize:      10,
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        color:         '#919191',
        marginBottom:  12,
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ fontFamily: PP, fontWeight: 400, fontSize: 11, color: '#D0274B', marginTop: 6 }}>
          {error}
        </p>
      )}
    </div>
  )
}
