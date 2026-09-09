import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { HiMinus, HiPlus, HiStar, HiX } from 'react-icons/hi'
import { CRUSTS, SIZES, TOPPINGS } from '../data/menu'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { computeUnitPrice, money } from '../utils/format'

export default function ProductDetails() {
  const { selectedProduct, closeProduct } = useApp()
  const { addItem } = useCart()
  const product = selectedProduct?.product
  const preset = selectedProduct?.preset || {}

  const [size, setSize] = useState(preset.size || SIZES[1])
  const [crust, setCrust] = useState(CRUSTS[0])
  const [toppings, setToppings] = useState([])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!product) return
    setSize(preset.size || SIZES[1])
    setCrust(CRUSTS[0])
    setToppings([])
    setQty(1)
    setAdded(false)
  }, [selectedProduct, product, preset.size])

  const unitPrice = useMemo(
    () => (product ? computeUnitPrice(product, size, crust, toppings) : 0),
    [product, size, crust, toppings],
  )
  const lineTotal = Math.round(unitPrice * qty * 100) / 100
  const pizzaScale = size.id === 'l' ? 1.08 : size.id === 's' ? 0.86 : 1

  const toggleTopping = (topping) => {
    setToppings((prev) =>
      prev.some((item) => item.id === topping.id)
        ? prev.filter((item) => item.id !== topping.id)
        : [...prev, topping],
    )
  }

  const addToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.image,
      veg: product.veg,
      qty,
      unitPrice,
      size: product.customizable ? size : null,
      crust: product.customizable ? crust : null,
      toppings: product.customizable ? toppings : [],
    })
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      closeProduct()
    }, 700)
  }

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.button
            type="button"
            aria-label="Close details"
            className="frame-bar inset-y-0 z-50 bg-night/50 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProduct}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="frame-bar bottom-0 z-50 flex max-h-[92%] flex-col overflow-hidden rounded-t-[28px] bg-cream"
          >
            <div className="mx-auto mt-2 h-1.5 w-12 shrink-0 rounded-full bg-night/15" />

            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto scroll-smooth px-[var(--page-x)] pb-4 pt-2">
              <div className="relative mx-auto flex h-[200px] w-full items-center justify-center overflow-hidden">
                <button
                  type="button"
                  onClick={closeProduct}
                  className="absolute right-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-night shadow-sm"
                  aria-label="Close"
                >
                  <HiX />
                </button>
                <motion.img
                  key={product.id}
                  src={product.image}
                  alt={product.name}
                  className="h-[min(168px,48vw)] w-[min(168px,48vw)] rounded-full object-cover shadow-[0_16px_32px_rgba(226,74,26,0.28)]"
                  initial={{ scale: 0.8, rotate: -12, opacity: 0 }}
                  animate={{ scale: pizzaScale, rotate: 0, opacity: 1 }}
                  whileTap={{ rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 240, damping: 16 }}
                />
              </div>

              <div className="mt-3 flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex h-7 items-center gap-2">
                    <h2 className="m-0 min-w-0 truncate font-display text-[22px] leading-7 text-night">
                      {product.name}
                    </h2>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border ${
                        product.veg ? 'border-sage' : 'border-ember'
                      }`}
                      aria-label={product.veg ? 'Vegetarian' : 'Non-vegetarian'}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${product.veg ? 'bg-sage' : 'bg-ember'}`} />
                    </span>
                  </div>
                  <p className="mt-1 mb-0 h-10 overflow-hidden text-[13px] leading-5 text-night/60 line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex h-7 shrink-0 items-center gap-1 rounded-full bg-white px-2 text-xs font-semibold leading-none">
                  <HiStar className="text-gold" />
                  {product.rating.toFixed(1)}
                </div>
              </div>

              {product.customizable && (
                <>
                  <h3 className="mt-5 mb-2 h-5 text-sm font-semibold leading-5 text-night">Size</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {SIZES.map((option) => {
                      const on = size.id === option.id
                      return (
                        <motion.button
                          key={option.id}
                          type="button"
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSize(option)}
                          className={`relative h-[58px] rounded-2xl px-1 text-center ${
                            on ? 'bg-night text-cream' : 'bg-white text-night'
                          }`}
                        >
                          <span className="block h-5 overflow-hidden px-0.5 text-[12px] font-semibold leading-5">
                            {option.name}
                          </span>
                          <span className={`block h-4 text-[11px] leading-4 ${on ? 'text-cream/55' : 'text-night/40'}`}>
                            {option.inches}"
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>

                  <h3 className="mt-5 mb-2 h-5 text-sm font-semibold leading-5 text-night">Crust</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {CRUSTS.map((option) => {
                      const on = crust.id === option.id
                      return (
                        <motion.button
                          key={option.id}
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setCrust(option)}
                          className={`flex h-12 flex-col items-center justify-center rounded-2xl px-2 ${
                            on ? 'bg-ember text-white' : 'bg-white text-night'
                          }`}
                        >
                          <span className="w-full truncate text-center text-[12px] font-semibold leading-4">
                            {option.name}
                          </span>
                          <span className={`text-[10px] leading-4 ${on ? 'text-white/75' : 'text-night/40'}`}>
                            {option.extra > 0 ? `+${money(option.extra)}` : 'Included'}
                          </span>
                        </motion.button>
                      )
                    })}
                  </div>

                  <h3 className="mt-5 mb-2 h-5 text-sm font-semibold leading-5 text-night">Extra toppings</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {TOPPINGS.map((topping) => {
                      const on = toppings.some((item) => item.id === topping.id)
                      return (
                        <motion.button
                          key={topping.id}
                          type="button"
                          whileTap={{ scale: 0.97 }}
                          onClick={() => toggleTopping(topping)}
                          className={`flex h-[58px] flex-col justify-center rounded-2xl px-3 text-left ${
                            on ? 'bg-ember-soft ring-1 ring-ember' : 'bg-white'
                          }`}
                        >
                          <span className="truncate text-[12px] font-semibold leading-4 text-night">{topping.name}</span>
                          <span className="text-[11px] leading-4 text-night/45">+{money(topping.price)}</span>
                        </motion.button>
                      )
                    })}
                  </div>
                </>
              )}

              <div className="mt-5 flex h-12 items-center justify-between">
                <p className="m-0 text-sm leading-5 text-night/50">Quantity</p>
                <div className="flex items-center gap-2 rounded-full bg-white px-1.5 py-1">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setQty((n) => Math.max(1, n - 1))}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-cream-2"
                    aria-label="Decrease quantity"
                  >
                    <HiMinus />
                  </motion.button>
                  <span className="flex h-9 w-7 items-center justify-center overflow-hidden">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={qty}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        className="text-base font-bold leading-none"
                      >
                        {qty}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.88 }}
                    onClick={() => setQty((n) => n + 1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-night text-cream"
                    aria-label="Increase quantity"
                  >
                    <HiPlus />
                  </motion.button>
                </div>
              </div>

              <div className="mt-3 rounded-2xl bg-white px-3 py-2">
                <p className="m-0 truncate text-[11px] leading-4 text-night/45">
                  {product.customizable
                    ? `${size.name} ${size.inches}" · ${crust.name}${toppings.length ? ` · +${toppings.length} topping${toppings.length > 1 ? 's' : ''}` : ''}`
                    : 'Regular portion'}
                </p>
                <p className="mt-0.5 mb-0 flex items-center justify-between text-sm">
                  <span className="text-night/50">{qty} × {money(unitPrice)}</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={lineTotal}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      className="font-bold text-ember"
                    >
                      {money(lineTotal)}
                    </motion.span>
                  </AnimatePresence>
                </p>
              </div>
            </div>

            <div className="shrink-0 border-t border-night/5 bg-white px-[var(--page-x)] py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <motion.button
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={addToCart}
                className="flex h-12 w-full items-center justify-between rounded-2xl bg-ember px-4 text-white"
              >
                <span className="whitespace-nowrap text-sm font-semibold">
                  {added ? 'Added to bag' : 'Add to Cart'}
                </span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={lineTotal}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="whitespace-nowrap text-sm font-bold"
                  >
                    {money(lineTotal)}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
