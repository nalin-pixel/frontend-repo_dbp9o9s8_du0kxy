import { motion } from 'framer-motion'

const BLUE = '#05182F'
const GOLD = '#FFD746'

function GlowingCross() {
  return (
    <div className="relative w-full flex items-center justify-center py-10">
      <motion.div
        aria-hidden
        className="relative"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      >
        {/* Outer glow */}
        <div className="absolute -inset-16 rounded-full blur-3xl opacity-30"
             style={{ background: `radial-gradient(circle, ${GOLD}55, transparent 60%)` }} />

        {/* Rays */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[...Array(12)].map((_, i) => (
            <span key={i} className="absolute w-px h-56 md:h-72"
                  style={{
                    transform: `rotate(${i * 30}deg)`,
                    background: `linear-gradient(to bottom, transparent, ${GOLD}80 40%, transparent)`
                  }} />
          ))}
        </div>

        {/* Cross */}
        <div className="relative flex items-center justify-center">
          <div className="w-24 md:w-28 h-2 md:h-2.5 rounded-full"
               style={{ background: GOLD, boxShadow: `0 0 30px ${GOLD}AA, 0 0 80px ${GOLD}55` }} />
          <div className="absolute w-2 md:w-2.5 h-32 md:h-40 rounded-full"
               style={{ background: GOLD, boxShadow: `0 0 30px ${GOLD}AA, 0 0 80px ${GOLD}55` }} />
        </div>
      </motion.div>
    </div>
  )
}

export default function Hero({ onPrimary, onSecondary }) {
  return (
    <section className="relative overflow-hidden" style={{ background: BLUE }}>
      {/* background gradients */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full blur-3xl opacity-30"
             style={{ background: 'radial-gradient(circle, #1E3A8A55, transparent 60%)' }} />
        <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] rounded-full blur-3xl opacity-40"
             style={{ background: `radial-gradient(circle, ${GOLD}22, transparent 60%)` }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-16 md:pt-28 md:pb-24">
        <div className="text-center">
          <p className="uppercase tracking-[0.25em] text-[13px] text-blue-200/70">VERAMIA</p>
          <h1 className="mt-4 text-4xl md:text-6xl font-medium text-white tracking-tight"
              style={{ fontFamily: 'Raleway, system-ui' }}>
            Light To Your Home
          </h1>
          <p className="mt-5 text-blue-100/80 text-lg md:text-xl"
             style={{ fontFamily: 'Raleway, system-ui', fontWeight: 300 }}>
            Modern Christian wall art that brings faith, hope, and beauty into your space.
          </p>

          <GlowingCross />

          <div className="mt-4 md:mt-8 flex items-center justify-center gap-3 md:gap-4">
            <button onClick={onPrimary}
              className="px-5 md:px-6 py-3 rounded-full text-blue-950 font-medium shadow-lg shadow-yellow-400/20"
              style={{ background: GOLD }}>
              Bring Faith to Your Walls
            </button>
            <button onClick={onSecondary}
              className="px-5 md:px-6 py-3 rounded-full border border-yellow-300/30 text-yellow-200 hover:bg-yellow-50/5 transition">
              Explore Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
