import { useState } from 'react'
import Hero from './components/Hero'
import Mission from './components/Mission'
import Products from './components/Products'
import ProductModal from './components/ProductModal'

const BLUE = '#05182F'

export default function App() {
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  const handleView = (p) => { setSelected(p); setOpen(true) }

  return (
    <div className="min-h-screen" style={{ background: BLUE }}>
      <Hero onPrimary={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            onSecondary={() => window.scrollTo({ top: window.innerHeight * 1.6, behavior: 'smooth' })} />
      <Mission />
      <Products onView={handleView} />
      <ProductModal open={open} product={selected} onClose={() => setOpen(false)} />

      <footer className="border-t border-white/10 text-center py-10 text-blue-200/70" style={{ background: BLUE }}>
        © {new Date().getFullYear()} VERAMIA • Light to your home
      </footer>
    </div>
  )
}
