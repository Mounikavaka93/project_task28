import { AnimatePresence, motion } from 'framer-motion'
import { HiSearch, HiX } from 'react-icons/hi'
import { PRODUCTS } from '../data/menu'
import { useApp } from '../context/AppContext'
import { money } from '../utils/format'

export default function SearchSheet() {
  const { searchOpen, setSearchOpen, query, setQuery, openProduct } = useApp()
  const needle = query.trim().toLowerCase()
  const results = needle
    ? PRODUCTS.filter(
        (item) =>
          item.name.toLowerCase().includes(needle) || item.description.toLowerCase().includes(needle),
      )
    : PRODUCTS.slice(0, 6)

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close search"
            className="frame-bar inset-y-0 z-50 bg-night/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSearchOpen(false)}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="frame-bar bottom-0 z-50 max-h-[86%] overflow-hidden rounded-t-[28px] bg-cream"
          >
            <div className="page-x flex items-center gap-2 pb-2 pt-4">
              <div className="flex h-11 flex-1 items-center gap-2 rounded-2xl bg-white px-3">
                <HiSearch className="text-night/40" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search pies, sides, sweets…"
                  className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white"
                aria-label="Close search"
              >
                <HiX />
              </button>
            </div>
            <div className="no-scrollbar max-h-[70vh] overflow-y-auto scroll-smooth px-[var(--page-x)] pb-8">
              {results.length === 0 ? (
                <p className="py-10 text-center text-sm text-night/45">No matches. Try “truffle” or “wings”.</p>
              ) : (
                results.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    onClick={() => {
                      setSearchOpen(false)
                      openProduct(item)
                    }}
                    className="mb-2 flex w-full items-center gap-3 rounded-2xl bg-white p-2 text-left"
                  >
                    <img src={item.image} alt="" className="h-14 w-14 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-night/45">{item.category}</p>
                    </div>
                    <span className="text-sm font-bold text-ember">{money(item.price)}</span>
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
