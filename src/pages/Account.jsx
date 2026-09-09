import { motion } from 'framer-motion'
import { HiArrowLeft } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { money } from '../utils/format'

const STEPS = ['Confirmed', 'Firing', 'On way', 'Delivered']

export default function Account() {
  const navigate = useNavigate()
  const { order } = useCart()
  const elapsed = order ? Date.now() - order.placedAt : 0
  const step = order ? Math.min(2, Math.floor(elapsed / 40000) + 1) : 0

  return (
    <div className="page-x safe-b min-h-dvh w-full bg-cream pb-8">
      <div className="flex h-[60px] items-center gap-3">
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate('/')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white"
          aria-label="Back"
        >
          <HiArrowLeft />
        </motion.button>
        <h1 className="m-0 truncate font-display text-xl leading-6">Your FORNO</h1>
      </div>

      {order ? (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-4"
        >
          <p className="m-0 h-4 text-[11px] uppercase leading-4 tracking-wider text-night/40">Live order</p>
          <p className="mt-1 mb-0 h-8 truncate font-display text-2xl leading-8">{order.id}</p>
          <p className="mt-0.5 mb-0 h-5 whitespace-nowrap text-sm leading-5 text-night/55">Arriving in {order.eta}</p>

          <div className="mt-5">
            <div className="relative mb-2 h-1.5 overflow-hidden rounded-full bg-cream-2">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full bg-ember"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <div className="grid grid-cols-4 gap-1 text-center">
              {STEPS.map((label, index) => (
                <span
                  key={label}
                  className={`h-4 overflow-hidden whitespace-nowrap text-[10px] leading-4 ${
                    index <= step ? 'font-semibold text-ember' : 'text-night/35'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>

          <motion.img
            src="/images/success-delivery.png"
            alt=""
            className="mt-4 h-36 w-full rounded-2xl object-cover"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="mt-3 flex h-5 items-center justify-between text-sm leading-5">
            <span className="whitespace-nowrap text-night/50">{order.items.length} items</span>
            <span className="whitespace-nowrap font-semibold text-ember">{money(order.total)}</span>
          </div>
        </motion.section>
      ) : (
        <div className="rounded-3xl bg-white px-5 py-10 text-center">
          <p className="m-0 font-display text-2xl leading-8">No live ticket</p>
          <p className="mt-1 mb-0 text-sm leading-5 text-night/50">Place an order and watch it leave the oven.</p>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/')}
            className="mt-5 h-11 whitespace-nowrap rounded-full bg-ember px-5 text-sm font-semibold text-white"
          >
            Start an order
          </motion.button>
        </div>
      )}

      <section className="mt-4 rounded-3xl bg-night p-5 text-cream">
        <p className="m-0 whitespace-nowrap font-display text-xl leading-7">FORNO hours</p>
        <p className="mt-1 mb-0 h-5 whitespace-nowrap text-sm leading-5 text-cream/65">Daily 11:00 – 23:30</p>
        <p className="mt-3 mb-0 h-4 whitespace-nowrap text-[11px] leading-4 text-gold">Wood-fired. Delivered hot.</p>
      </section>
    </div>
  )
}
