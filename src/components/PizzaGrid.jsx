import { AnimatePresence, motion } from 'framer-motion'
import { PRODUCTS } from '../data/menu'
import { useApp } from '../context/AppContext'
import { staggerGrid } from '../motion/variants'
import PizzaCard from './PizzaCard'

const titles = {
  pizzas: 'From the oven',
  sides: 'On the side',
  drinks: 'Pour something cold',
  desserts: 'Sweet finish',
  combos: 'Hearth boxes',
  offers: 'Featured pies',
}

export default function PizzaGrid({ query = '' }) {
  const { category } = useApp()
  const needle = query.trim().toLowerCase()

  const items = PRODUCTS.filter((product) => {
    const matchesCategory = product.category === category
    const matchesQuery =
      !needle ||
      product.name.toLowerCase().includes(needle) ||
      product.description.toLowerCase().includes(needle)
    return matchesCategory && matchesQuery
  })

  return (
    <section id="menu-section" className="w-full max-w-full scroll-mt-20 pt-5">
      <div className="page-x mb-3 flex h-6 items-center justify-between">
        <h3 className="m-0 overflow-hidden truncate whitespace-nowrap font-display text-lg leading-6 text-night">
          {titles[category] || 'From the oven'}
        </h3>
        <span className="shrink-0 whitespace-nowrap text-[11px] leading-4 text-night/40">
          {items.length} items
        </span>
      </div>
      <div className="page-x">
        <AnimatePresence mode="wait">
          {items.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl bg-white px-4 py-10 text-center text-sm text-night/50"
            >
              Nothing in this aisle yet. Try another craving.
            </motion.p>
          ) : (
            <motion.div
              key={category + needle}
              initial="hidden"
              animate="show"
              variants={staggerGrid}
              className="grid grid-cols-2 items-stretch gap-2.5"
            >
              {items.map((product) => (
                <PizzaCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
