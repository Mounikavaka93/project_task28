import { AnimatePresence, motion } from 'framer-motion'
import { HiArrowLeft, HiOutlineShoppingBag } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { money } from '../utils/format'
import CartItem from './CartItem'
import Coupon from './Coupon'
import OrderSummary from './OrderSummary'

export default function Cart() {
  const navigate = useNavigate()
  const { items, count, total } = useCart()

  return (
    <div className="flex min-h-dvh w-full flex-col bg-cream">
      <div className="page-x sticky top-0 z-20 flex h-[60px] items-center gap-3 bg-cream/95 backdrop-blur">
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white"
          aria-label="Back"
        >
          <HiArrowLeft />
        </motion.button>
        <div className="min-w-0">
          <h1 className="m-0 truncate font-display text-xl leading-6">Your bag</h1>
          <p className="m-0 h-4 truncate text-[11px] leading-4 text-night/45">
            {count} item{count === 1 ? '' : 's'}
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center px-6 pb-28 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-3xl text-ember"
          >
            <HiOutlineShoppingBag />
          </motion.div>
          <p className="mt-4 mb-0 font-display text-2xl leading-8">The oven is empty</p>
          <p className="mt-1 mb-0 max-w-[16rem] text-sm leading-5 text-night/50">
            Add a pie and we’ll walk it to your door still singing.
          </p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/')}
            className="mt-6 h-11 whitespace-nowrap rounded-full bg-ember px-6 text-sm font-semibold text-white"
          >
            Browse the menu
          </motion.button>
        </div>
      ) : (
        <div className="page-x flex-1 pb-36">
          <AnimatePresence initial={false} mode="popLayout">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </AnimatePresence>
          <div className="mt-1 space-y-3">
            <Coupon />
            <OrderSummary />
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="frame-bar bottom-[4.35rem] z-30 bg-gradient-to-t from-cream via-cream to-transparent pb-2 pt-3">
          <div className="page-x">
            <motion.button
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/checkout')}
              className="flex h-12 w-full items-center justify-between gap-3 rounded-2xl bg-ember px-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(226,74,26,0.3)]"
            >
              <span className="truncate">Checkout</span>
              <span className="whitespace-nowrap">{money(total)}</span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  )
}
