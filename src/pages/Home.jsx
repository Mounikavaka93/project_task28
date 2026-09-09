import { AnimatePresence, motion } from 'framer-motion'
import Header from '../components/Header'
import HeroBanner from '../components/HeroBanner'
import CategorySlider from '../components/CategorySlider'
import PizzaGrid from '../components/PizzaGrid'
import DealsSection from '../components/DealsSection'
import { useApp } from '../context/AppContext'
import { DEALS } from '../data/menu'
import DealCard from '../components/DealCard'

export default function Home() {
  const { category } = useApp()

  return (
    <div className="safe-b w-full max-w-full overflow-x-hidden">
      <Header />
      <HeroBanner />
      <CategorySlider />
      <AnimatePresence mode="wait">
        {category === 'offers' ? (
          <motion.section
            key="offers"
            id="menu-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="w-full scroll-mt-20 pt-5"
          >
            <h3 className="page-x mb-3 h-6 font-display text-lg leading-6 text-night">All offers</h3>
            <div className="page-x flex flex-col gap-2.5">
              {DEALS.map((deal, index) => (
                <DealCard key={deal.id} deal={deal} index={index} full />
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
          >
            <PizzaGrid />
            <DealsSection compact />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
