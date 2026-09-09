import { motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { easeOut } from '../motion/variants'

export default function HeroBanner() {
  const { setCategory } = useApp()

  const scrollToMenu = () => {
    setCategory('pizzas')
    document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative w-full max-w-full overflow-hidden bg-night">
      <div className="grid min-h-[220px] w-full grid-cols-[minmax(0,1fr)_clamp(108px,34vw,148px)]">
        <div className="relative z-10 flex min-w-0 flex-col justify-center py-5 pl-[var(--page-x)] pr-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="m-0 h-4 overflow-hidden text-[10px] font-semibold uppercase leading-4 tracking-[0.14em] text-gold"
          >
            First fire offer
          </motion.p>

          <h2 className="mt-1.5 m-0">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45, ease: easeOut }}
              className="block overflow-hidden font-display text-[clamp(1.45rem,7.4vw,1.85rem)] leading-8 text-cream"
            >
              40% off
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.45, ease: easeOut }}
              className="block overflow-hidden font-display text-[clamp(1.15rem,5.6vw,1.4rem)] leading-7 text-cream"
            >
              your first pie
            </motion.span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: easeOut }}
            className="mt-2 mb-0 max-w-[13rem] text-[11px] leading-4 text-cream/70"
          >
            Blistered crust. Delivered hot.
          </motion.p>

          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={scrollToMenu}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4, ease: easeOut }}
            className="cta-glow mt-4 inline-flex h-11 min-w-[44px] shrink-0 items-center justify-center rounded-full bg-ember px-5 text-sm font-semibold leading-none text-white"
          >
            Order Now
          </motion.button>
        </div>

        <div className="relative h-full min-h-[220px] overflow-hidden">
          <motion.div
            className="pointer-events-none absolute -right-6 top-2 h-24 w-24 rounded-full bg-ember/35 blur-2xl"
            animate={{ opacity: [0.35, 0.7, 0.35], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.img
            src="/images/pizza-hero.png"
            alt="Wood-fired FORNO pizza"
            className="absolute left-1/2 top-1/2 h-[clamp(112px,34vw,148px)] w-[clamp(112px,34vw,148px)] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full object-cover"
            initial={{ rotate: 16, scale: 0.82, opacity: 0 }}
            animate={{ rotate: [8, 16, 8], scale: 1, opacity: 1 }}
            transition={{
              opacity: { duration: 0.4 },
              scale: { type: 'spring', stiffness: 180, damping: 14 },
              rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
            }}
          />

          <motion.img
            src="/images/ing-basil.png"
            alt=""
            className="absolute left-0.5 top-5 h-7 w-7 object-contain"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: [0, -8, 0], rotate: [0, 12, 0] }}
            transition={{
              opacity: { duration: 0.4, delay: 0.35 },
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
          <motion.img
            src="/images/ing-tomato.png"
            alt=""
            className="absolute right-0.5 top-10 h-6 w-6 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 8, 0], rotate: [0, -14, 0] }}
            transition={{
              opacity: { duration: 0.4, delay: 0.45 },
              y: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4.6, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
          <motion.img
            src="/images/ing-chili.png"
            alt=""
            className="absolute left-1 bottom-8 h-6 w-6 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, -7, 0], rotate: [10, -8, 10] }}
            transition={{
              opacity: { duration: 0.4, delay: 0.5 },
              y: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
          <motion.img
            src="/images/ing-mushroom.png"
            alt=""
            className="absolute right-1 bottom-6 h-7 w-7 object-contain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 7, 0], rotate: [0, 10, 0] }}
            transition={{
              opacity: { duration: 0.4, delay: 0.55 },
              y: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
              rotate: { duration: 4.8, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        </div>
      </div>
    </section>
  )
}
