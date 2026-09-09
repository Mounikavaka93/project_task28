import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { HiStar } from 'react-icons/hi'
import { SIZES } from '../data/menu'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { cardReveal } from '../motion/variants'
import { computeUnitPrice, money } from '../utils/format'

const SIZE_SHORT = { s: 'S', m: 'M', l: 'L' }

export default function PizzaCard({ product }) {
  const { openProduct } = useApp()
  const { addItem } = useCart()
  const [size, setSize] = useState(SIZES[1])
  const [added, setAdded] = useState(false)

  const price = computeUnitPrice(product, product.customizable ? size : null, null, [])

  const quickAdd = (event) => {
    event.stopPropagation()
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      veg: product.veg,
      qty: 1,
      unitPrice: price,
      size: product.customizable ? size : null,
      crust: null,
      toppings: [],
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 900)
  }

  return (
    <motion.article
      variants={cardReveal}
      onClick={() => openProduct(product, { size })}
      className="flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_8px_24px_rgba(22,17,14,0.06)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-2">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 1.08, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 240, damping: 16 }}
        />
        {product.badge && (
          <span className="absolute left-2 top-2 max-w-[70%] truncate rounded-full bg-night/85 px-2 py-0.5 text-[10px] font-semibold leading-4 text-gold">
            {product.badge}
          </span>
        )}
        <span
          className={`absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-[3px] border bg-white ${
            product.veg ? 'border-sage' : 'border-ember'
          }`}
          aria-label={product.veg ? 'Vegetarian' : 'Non-vegetarian'}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${product.veg ? 'bg-sage' : 'bg-ember'}`} />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-2.5">
        <h3 className="m-0 h-5 overflow-hidden truncate text-[13px] font-semibold leading-5 text-night">
          {product.name}
        </h3>
        <p className="mt-0.5 mb-0 h-8 overflow-hidden text-[11px] leading-4 text-night/50 line-clamp-2">
          {product.description}
        </p>

        <div className="mt-2 flex h-5 items-center justify-between">
          <span className="inline-flex items-center gap-0.5 text-xs font-semibold leading-none text-night">
            <HiStar className="text-gold" />
            {product.rating.toFixed(1)}
          </span>
          <AnimatePresence mode="wait">
            <motion.span
              key={price}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0 }}
              className="text-sm font-bold leading-none text-ember"
            >
              {money(price)}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="mt-2 flex h-8 items-center gap-1">
          {product.customizable ? (
            SIZES.map((option) => (
              <motion.button
                key={option.id}
                type="button"
                whileTap={{ scale: 0.9 }}
                aria-label={option.name}
                onClick={(event) => {
                  event.stopPropagation()
                  setSize(option)
                }}
                className={`h-8 min-w-0 flex-1 rounded-full text-[10px] font-semibold leading-none ${
                  size.id === option.id ? 'bg-night text-cream' : 'bg-cream-2 text-night/60'
                }`}
              >
                {SIZE_SHORT[option.id]}
              </motion.button>
            ))
          ) : (
            <span className="h-8 w-full rounded-full bg-cream-2 text-center text-[10px] font-semibold leading-8 text-night/45">
              Regular
            </span>
          )}
        </div>

        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={quickAdd}
          animate={added ? { scale: [1, 1.05, 1] } : { scale: 1 }}
          className={`mt-2 h-11 w-full rounded-full text-xs font-semibold leading-none ${
            added ? 'bg-sage text-white' : 'bg-ember text-white'
          }`}
        >
          {added ? 'Added' : 'Add'}
        </motion.button>
      </div>
    </motion.article>
  )
}
