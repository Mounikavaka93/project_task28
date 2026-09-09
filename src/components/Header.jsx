import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiOutlineMenuAlt2, HiOutlineSearch, HiOutlineShoppingBag } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { tapPress } from '../motion/variants'

export default function Header() {
  const navigate = useNavigate()
  const { location, setMenuOpen, setSearchOpen } = useApp()
  const { count, flyTick } = useCart()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-night/5 bg-cream/95 backdrop-blur-md">
      <div className="page-x flex h-[68px] items-center gap-2 pt-[max(0.35rem,env(safe-area-inset-top))]">
        <motion.button
          type="button"
          aria-label="Open menu"
          whileTap={tapPress}
          onClick={() => setMenuOpen(true)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-night shadow-sm"
        >
          <HiOutlineMenuAlt2 className="text-xl" />
        </motion.button>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="flex min-w-0 flex-1 flex-col justify-center text-left"
        >
          <span className="flex h-6 items-center gap-1.5">
            <img
              src="/images/logo-forno.png"
              alt="FORNO"
              className="h-6 w-6 shrink-0 rounded-full object-cover"
            />
            <span className="whitespace-nowrap font-display text-[18px] leading-none text-night">FORNO</span>
          </span>
          <span className="mt-0.5 flex h-4 items-center gap-1 text-[11px] leading-none text-night/55">
            <HiOutlineLocationMarker className="h-3 w-3 shrink-0 text-ember" />
            <span className="min-w-0 truncate">{location.label}</span>
            <span className="shrink-0 text-night/25">·</span>
            <span className="shrink-0 whitespace-nowrap">{location.eta}</span>
          </span>
        </button>

        <motion.button
          type="button"
          aria-label="Search menu"
          whileTap={tapPress}
          onClick={() => setSearchOpen(true)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-night shadow-sm"
        >
          <HiOutlineSearch className="text-xl" />
        </motion.button>

        <motion.button
          type="button"
          aria-label="Open cart"
          whileTap={tapPress}
          onClick={() => navigate('/cart')}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-visible rounded-2xl bg-night text-cream shadow-sm"
        >
          <HiOutlineShoppingBag className="text-xl" />
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={`${count}-${flyTick}`}
                initial={{ scale: 0.35, y: 6 }}
                animate={{ scale: [0.35, 1.2, 1], y: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 520, damping: 16 }}
                className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ember px-1 text-[10px] font-bold leading-none text-white"
              >
                {count > 99 ? '99+' : count}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  )
}
