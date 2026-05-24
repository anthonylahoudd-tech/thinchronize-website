import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark:       '#292929',
        red:        '#D0274B',
        neutral:    '#919191',
        'off-white':'#F5F0EB',
      },
      fontFamily: {
        // Both resolve to PPNeueCorp — weight controls the variant
        // 900 → ExtendedUltrabold  |  800 → NormalUltrabold  |  400 → NormalMedium
        pp:      ["'PPNeueCorp'", 'system-ui', 'sans-serif'],
        display: ["'PPNeueCorp'", 'system-ui', 'sans-serif'],
        sans:    ["'PPNeueCorp'", 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(80px,15vw,200px)', { lineHeight: '0.90', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(56px,8vw,120px)',  { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(40px,5.5vw,80px)', { lineHeight: '1',    letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(28px,4vw,56px)',   { lineHeight: '1.05', letterSpacing: '-0.01em' }],
      },
      spacing: {
        section: 'clamp(80px,10vw,160px)',
        gutter:  'clamp(20px,5vw,80px)',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
      animation: {
        'cursor-pulse': 'cursor-pulse 2s ease-in-out infinite',
        marquee:        'marquee 28s linear infinite',
        'bounce-slow':  'bounce 2s infinite',
      },
      keyframes: {
        'cursor-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%':       { transform: 'scale(1.5)', opacity: '0.7' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
