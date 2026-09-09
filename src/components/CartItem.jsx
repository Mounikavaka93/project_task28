import { AnimatePresence, motion } from 'framer-motion'
import { HiMinus, HiPlus, HiTrash } from 'react-icons/hi'
import { useCart } from '../context/CartContext'
import { money } from '../utils/format'

export default function CartItem({ item }) {
  const { updateQty, removeItem } = useCart()
  const extras = [
    item.size ? `${item.size.name} ${item.size.inches}"` : null,
    item.crust?.name,
    ...(item.toppings || []).map((t) => t.name),
  ].filter(Boolean)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -28, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
      className="mb-3 flex gap-3 overflow-hidden rounded-2xl bg-white p-3"
    >
      <img src={item.image} alt={item.name} className="h-16 w-16 shrink-0 rounded-2xl object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-2">
          <div className="min-w-0 flex-1">
            <p className="m-0 h-5 truncate text-sm font-semibold leading-5 text-night">{item.name}</p>
            <p className="mt-0.5 mb-0 h-8 overflow-hidden text-[11px] leading-4 text-night/45 line-clamp-2">
              {extras.length > 0 ? extras.join(' · ') : 'Regular portion'}
            </p>
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            aria-label={`Remove ${item.name}`}
            onClick={() => removeItem(item.id)}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cream-2 text-ember"
          >
            <HiTrash />
          </motion.button>
        </div>
        <div className="mt-1.5 flex h-8 items-center justify-between">
          <AnimatePresence mode="wait">
            <motion.p
              key={item.unitPrice * item.qty}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="m-0 text-sm font-bold leading-none text-ember"
            >
              {money(item.unitPrice * item.qty)}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-1.5 rounded-full bg-cream px-1 py-0.5">
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white"
              aria-label="Decrease"
            >
              <HiMinus className="text-xs" />
            </motion.button>
            <span className="flex h-7 w-5 items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={item.qty}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -8, opacity: 0 }}
                  className="text-sm font-semibold leading-none"
                >
                  {item.qty}
                </motion.span>
              </AnimatePresence>
            </span>
            <motion.button
              type="button"
              whileTap={{ scale: 0.88 }}
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-night text-cream"
              aria-label="Increase"
            >
              <HiPlus className="text-xs" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
