import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getBestsellers, isShopifyConfigured } from '../lib/shopify'

const BLUE = '#05182F'
const GOLD = '#FFD746'

function ProductCard({ item, onView }) {
  const placeholder = (
    <div className="relative h-64 w-full overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/40 to-blue-800/20 flex items-center justify-center">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 30%, rgba(255,215,70,0.25), transparent 60%)'
      }} />
      <div className="relative text-center">
        <div className="mx-auto w-12 h-1.5 rounded-full" style={{ background: GOLD }} />
        <div className="mx-auto mt-2 w-1.5 h-14 rounded-full" style={{ background: GOLD }} />
      </div>
    </div>
  )

  const imageUrl = item.images?.[0]?.url

  return (
    <div className="group rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm p-3 transition hover:translate-y-[-2px] hover:shadow-[0_0_40px_rgba(255,215,70,0.12)]">
      <div className="overflow-hidden rounded-xl">
        {imageUrl ? (
          <img src={imageUrl} alt={item.title} className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.03]" />
        ) : placeholder}
      </div>
      <div className="px-1 pt-4 pb-3">
        <h3 className="text-white text-lg font-medium" style={{ fontFamily: 'Raleway, system-ui' }}>{item.title}</h3>
        <p className="text-yellow-300/90 mt-1" style={{ fontFamily: 'Raleway, system-ui', fontWeight: 300 }}>
          ${item.price}
        </p>
        <button onClick={() => onView(item)}
          className="mt-4 w-full rounded-full py-2.5 text-blue-950 font-medium" style={{ background: GOLD }}>
          View Artwork
        </button>
      </div>
    </div>
  )
}

export default function Products({ onView }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    getBestsellers(6).then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <section className="relative" style={{ background: BLUE }}>
      <div className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <div className="flex items-end justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl text-white font-medium" style={{ fontFamily: 'Raleway, system-ui' }}>
              Bestsellers
            </h3>
            <p className="text-blue-100/80 mt-2" style={{ fontFamily: 'Raleway, system-ui', fontWeight: 300 }}>
              {isShopifyConfigured() ? 'Discover beloved pieces from our community.' : 'Demo products shown • Connect Shopify to show live items.'}
            </p>
          </div>
        </div>

        <motion.div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {items.map((p) => (
            <ProductCard key={p.id} item={p} onView={onView} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
