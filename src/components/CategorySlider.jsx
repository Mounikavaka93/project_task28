import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { GiChocolateBar, GiPizzaSlice } from 'react-icons/gi'
import { IoFastFoodOutline } from 'react-icons/io5'
import { MdLocalDrink, MdLocalOffer, MdOutlineBakeryDining } from 'react-icons/md'
import { CATEGORIES } from '../data/menu'
import { useApp } from '../context/AppContext'
import { tapPress } from '../motion/variants'

const icons = {
  pizzas: GiPizzaSlice,
  sides: MdOutlineBakeryDining,
  drinks: MdLocalDrink,
  desserts: GiChocolateBar,
  combos: IoFastFoodOutline,
  offers: MdLocalOffer,
}

export default function CategorySlider() {
  const { category, setCategory } = useApp()
  const scrollerRef = useRef(null)

  useEffect(() => {
    const node = scrollerRef.current?.querySelector(`[data-cat="${category}"]`)
    node?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [category])

  return (
    <section className="mt-5 w-full">
      <div className="page-x flex h-6 items-center justify-between">
        <h3 className="m-0 whitespace-nowrap font-display text-lg leading-6 text-night">Craving?</h3>
        <span className="whitespace-nowrap text-[11px] leading-4 text-night/40">Swipe</span>
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-3 flex max-w-full snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain scroll-smooth px-[var(--page-x)]"
      >
        {CATEGORIES.map((cat, index) => {
          const active = category === cat.id
          const Icon = icons[cat.id]
          return (
            <motion.button
              key={cat.id}
              type="button"
              data-cat={cat.id}
              whileTap={tapPress}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              onClick={() => {
                setCategory(cat.id)
                requestAnimationFrame(() => {
                  document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                })
              }}
              className="snap-start shrink-0"
            >
              <div
                className={`flex h-[88px] w-[72px] flex-col items-center rounded-2xl pt-2.5 ${
                  active ? 'bg-night text-cream' : 'bg-white text-night shadow-sm'
                }`}
              >
                <motion.span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    active ? 'bg-ember text-white' : 'bg-cream-2 text-ember'
                  }`}
                  animate={active ? { scale: [1, 1.12, 1], rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Icon className="text-lg" />
                </motion.span>
                <span className="mt-1.5 h-4 w-full overflow-hidden px-1 text-center text-[10px] font-semibold leading-4 whitespace-nowrap">
                  {cat.label}
                </span>
                <span className="mt-1.5 flex h-1 w-full items-center justify-center">
                  {active && (
                    <motion.span
                      layoutId="cat-underline"
                      className="h-1 w-5 rounded-full bg-ember"
                      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                    />
                  )}
                </span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </section>
  )
}
