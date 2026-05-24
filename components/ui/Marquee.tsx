export default function Marquee({ dark = true }: { dark?: boolean }) {
  const text = 'BRAND STRATEGY · VISUAL IDENTITY · MINDFUL DESIGN · BEIRUT, LEBANON · EST. 2020 · '
  // Repeat enough times to fill double width for seamless loop
  const repeated = Array(8).fill(text).join('')

  return (
    <div
      className={`overflow-hidden py-5 border-y ${
        dark ? 'bg-dark border-white/10' : 'bg-off-white border-dark/10'
      }`}
    >
      <div className="marquee-track">
        <span
          className={`font-display font-bold text-sm tracking-[0.15em] uppercase select-none ${
            dark ? 'text-white/40' : 'text-dark/40'
          }`}
        >
          {repeated}
        </span>
        {/* Duplicate for seamless loop */}
        <span
          className={`font-display font-bold text-sm tracking-[0.15em] uppercase select-none ${
            dark ? 'text-white/40' : 'text-dark/40'
          }`}
          aria-hidden
        >
          {repeated}
        </span>
      </div>
    </div>
  )
}
