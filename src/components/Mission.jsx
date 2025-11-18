const BLUE = '#05182F'
const GOLD = '#FFD746'

export default function Mission() {
  return (
    <section className="relative" style={{ background: BLUE }}>
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[90%] h-px bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent" />
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl text-white font-medium tracking-tight text-center"
            style={{ fontFamily: 'Raleway, system-ui' }}>
          Faith Made Visible.
        </h2>
        <p className="mt-6 text-blue-100/85 text-lg leading-8 text-center"
           style={{ fontFamily: 'Raleway, system-ui', fontWeight: 300 }}>
          VERAMIA was created to bring the presence of Christ into modern homes through powerful, minimalistic art.
          Every piece is designed to reflect light, peace, and spiritual strength — created for believers who want their walls to speak faith.
          We blend sacred symbolism with modern aesthetics so young Christians can express their devotion with style, depth, and beauty.
        </p>
      </div>
    </section>
  )
}
