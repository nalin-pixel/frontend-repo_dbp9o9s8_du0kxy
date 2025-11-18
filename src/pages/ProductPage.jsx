import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getProductByHandle } from '../lib/shopify'

const BLUE = '#05182F'
const GOLD = '#FFD746'

export default function ProductPage(){
  const { handle } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [active, setActive] = useState(0)
  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    getProductByHandle(handle).then(setProduct)
  }, [handle])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: BLUE }}>
        <div className="text-blue-100/80">Loading...</div>
      </div>
    )
  }

  const imgs = product.images?.length ? product.images : [
    { url: '', altText: '' }
  ]

  return (
    <div className="min-h-screen" style={{ background: BLUE }}>
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-blue-100/80 hover:text-white">← Back</button>
        <div className="ml-auto uppercase tracking-[0.25em] text-[12px] text-blue-200/70">VERAMIA</div>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-blue-900/40">
              {imgs[active]?.url ? (
                <img
                  src={imgs[active].url}
                  alt={product.title}
                  className={`w-full h-[440px] object-cover cursor-zoom-in ${zoom ? 'scale-105' : ''}`}
                  onClick={() => setZoom((z) => !z)}
                />
              ) : (
                <div className="h-[440px] flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-blue-800/20">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-2 rounded-full" style={{ background: GOLD }} />
                    <div className="mx-auto mt-2 w-2 h-20 rounded-full" style={{ background: GOLD }} />
                  </div>
                </div>
              )}
              <div className="absolute left-4 top-4 text-[11px] tracking-widest uppercase text-yellow-200/80">Light for your home</div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {imgs.slice(0,4).map((im, i) => (
                <button key={i} className={`h-20 rounded-lg overflow-hidden border ${i===active ? 'border-yellow-300/60' : 'border-white/10'}`} onClick={() => setActive(i)}>
                  {im.url ? <img src={im.url} alt="thumb" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-blue-800/40" />}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-white text-3xl md:text-4xl font-medium" style={{ fontFamily: 'Raleway, system-ui' }}>{product.title}</h1>
            <p className="mt-3 text-blue-100/85" style={{ fontFamily: 'Raleway, system-ui', fontWeight: 300 }}>
              {product.description || 'Crafted to inspire. Light for your home. Faith made visible.'}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <div className="text-yellow-300 text-2xl">${product.price}</div>
              <span className="text-blue-200/70">•</span>
              <span className="text-blue-200/85">High-quality prints: canvas, framed, acrylic</span>
            </div>

            <div className="mt-8 flex gap-3">
              <button className="px-6 py-3 rounded-full text-blue-950 font-medium" style={{ background: GOLD }}>Add to Cart</button>
              <button className="px-6 py-3 rounded-full border border-yellow-300/30 text-yellow-200">Buy Now</button>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-3">
              {["Crafted to inspire.", "Light for your home.", "Faith made visible."].map((t,i) => (
                <div key={i} className="rounded-xl border border-white/10 bg-blue-900/40 p-4 text-blue-100/85">{t}</div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
