import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BLUE = '#05182F'
const GOLD = '#FFD746'

export default function ProductModal({ open, product, onClose }) {
  useEffect(() => {
    function onEsc(e){ if(e.key==='Escape') onClose() }
    if(open) window.addEventListener('keydown', onEsc)
    return () => window.removeEventListener('keydown', onEsc)
  }, [open, onClose])

  if (!open || !product) return null
  const image = product.images?.[0]?.url

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="absolute inset-0 bg-blue-950/80 backdrop-blur-sm" onClick={onClose} />
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div layoutId={`product-${product.id}`} className="w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-blue-900/60 shadow-2xl"
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}>
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative">
                  {image ? (
                    <img src={image} alt={product.title} className="h-80 md:h-full w-full object-cover" />
                  ) : (
                    <div className="h-80 bg-gradient-to-br from-blue-900/40 to-blue-800/20 flex items-center justify-center">
                      <div className="relative text-center">
                        <div className="mx-auto w-16 h-2 rounded-full" style={{ background: GOLD }} />
                        <div className="mx-auto mt-2 w-2 h-20 rounded-full" style={{ background: GOLD }} />
                      </div>
                    </div>
                  )}
                  <div className="absolute left-3 top-3 hidden md:block text-[12px] tracking-widest uppercase text-yellow-200/80">Faith made visible</div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="text-white text-2xl font-medium" style={{ fontFamily: 'Raleway, system-ui' }}>{product.title}</h3>
                  <p className="mt-2 text-blue-100/80" style={{ fontFamily: 'Raleway, system-ui', fontWeight: 300 }}>
                    Crafted to inspire. Light for your home. Faith made visible.
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="text-yellow-300 text-xl">${product.price}</div>
                    <span className="text-blue-200/70">•</span>
                    <span className="text-blue-200/80">High-quality prints: canvas, framed, acrylic</span>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[0,1,2].map(i => (
                      <div key={i} className="h-20 rounded-lg bg-gradient-to-br from-blue-800/40 to-blue-700/30" />
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <button className="px-5 py-3 rounded-full text-blue-950 font-medium" style={{ background: GOLD }}>
                      Add to Cart
                    </button>
                    <button className="px-5 py-3 rounded-full border border-yellow-300/30 text-yellow-200">
                      Buy Now
                    </button>
                    <button className="ml-auto text-blue-200/80 hover:text-white" onClick={onClose}>Close</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
