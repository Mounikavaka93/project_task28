import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext'

export default function FlyToCart() {
  const { flyTick } = useCart()

  return (
    <AnimatePresence>
      {flyTick > 0 && (
        <motion.img
          key={flyTick}
          src="/images/pizza-hero.png"
          alt=""
          className="pointer-events-none absolute z-[70] h-12 w-12 rounded-full object-cover shadow-lg"
          initial={{ left: '46%', top: '58%', scale: 1, opacity: 1, rotate: 0 }}
          animate={{
            left: '82%',
            top: '2.6%',
            scale: 0.22,
            opacity: 0,
            rotate: 200,
          }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
