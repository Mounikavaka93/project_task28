import { motion } from 'framer-motion'
import { HiOutlineHome, HiOutlineShoppingBag, HiOutlineTag, HiOutlineUser } from 'react-icons/hi'
import { useLocation, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { tapPress } from '../motion/variants'

const items = [
  { id: 'home', label: 'Home', icon: HiOutlineHome, path: '/' },
  { id: 'deals', label: 'Deals', icon: HiOutlineTag, path: '/', deals: true },
  { id: 'cart', label: 'Cart', icon: HiOutlineShoppingBag, path: '/cart' },
  { id: 'account', label: 'You', icon: HiOutlineUser, path: '/account' },
]

export default function BottomNavigation() {
  const navigate = useNavigate()
  const loc = useLocation()
  const { setCategory, category } = useApp()
  const { count } = useCart()

  return (
    <nav className="frame-bar bottom-0 z-40 border-t border-night/5 bg-white/96 pt-1 backdrop-blur-md pb-[max(0.45rem,env(safe-area-inset-bottom))]">
      <div className="grid w-full grid-cols-4">
        {items.map((item) => {
          const active =
            item.id === 'deals'
              ? loc.pathname === '/' && category === 'offers'
              : item.id === 'home'
                ? loc.pathname === '/' && category !== 'offers'
                : loc.pathname === item.path
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={tapPress}
              onClick={() => {
                if (item.deals) {
                  setCategory('offers')
                  navigate('/')
                  return
                }
                if (item.id === 'home') setCategory('pizzas')
                navigate(item.path)
              }}
              className={`relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 text-[11px] font-medium ${
                active ? 'text-ember' : 'text-night/40'
              }`}
            >
              <motion.span
                className="relative"
                animate={active ? { y: -1, scale: 1.08 } : { y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
              >
                <Icon className="text-xl" />
                {item.id === 'cart' && count > 0 && (
                  <span className="absolute -right-2 -top-1 h-2 w-2 rounded-full bg-ember" />
                )}
              </motion.span>
              {item.label}
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute top-0 h-0.5 w-6 rounded-full bg-ember"
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </nav>
  )
}
