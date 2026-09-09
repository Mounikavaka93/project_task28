import { AnimatePresence, motion } from 'framer-motion'
import { HiOutlineLocationMarker, HiX } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { LOCATIONS } from '../data/menu'
import { useApp } from '../context/AppContext'

export default function MobileMenu() {
  const navigate = useNavigate()
  const { menuOpen, setMenuOpen, location, setLocation, setCategory, setSearchOpen } = useApp()

  const go = (fn) => {
    fn?.()
    setMenuOpen(false)
  }

  return (
    <AnimatePresence>
      {menuOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="frame-bar inset-y-0 z-50 bg-night/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 24, stiffness: 280 }}
            className="frame-drawer z-50 flex flex-col bg-cream shadow-2xl"
          >
            <div className="bg-night px-5 pb-6 pt-8 text-cream">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <img src="/images/logo-forno.png" alt="FORNO" className="h-12 w-12 shrink-0 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="m-0 whitespace-nowrap font-display text-2xl leading-none">FORNO</p>
                    <p className="mt-1 m-0 whitespace-nowrap text-[11px] leading-4 tracking-[0.12em] text-gold">
                      Wood-fired · Hot
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
                  aria-label="Close"
                >
                  <HiX />
                </button>
              </div>
            </div>

            <div className="no-scrollbar flex-1 space-y-5 overflow-y-auto scroll-smooth px-5 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-night/40">Deliver to</p>
                <div className="mt-2 space-y-2">
                  {LOCATIONS.map((spot) => (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => go(() => setLocation(spot))}
                      className={`flex w-full items-center gap-2 rounded-2xl px-3 py-3 text-left text-sm ${
                        location.id === spot.id ? 'bg-ember-soft' : 'bg-white'
                      }`}
                    >
                      <HiOutlineLocationMarker className="text-ember" />
                      <span className="flex-1 font-medium">{spot.label}</span>
                      <span className="text-xs text-night/40">{spot.eta}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                {[
                  { label: 'Search the oven', fn: () => setSearchOpen(true) },
                  { label: 'Tonight’s deals', fn: () => setCategory('offers') },
                  { label: 'Pizzas', fn: () => setCategory('pizzas') },
                  { label: 'Track & hours', fn: () => navigate('/account') },
                ].map((row) => (
                  <button
                    key={row.label}
                    type="button"
                    onClick={() => go(row.fn)}
                    className="w-full rounded-2xl bg-white px-4 py-3 text-left text-sm font-medium"
                  >
                    {row.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
