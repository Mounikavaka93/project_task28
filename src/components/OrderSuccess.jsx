import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { HiCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { money } from '../utils/format'

const sparks = [
  { x: -64, y: -36, delay: 0.08, color: '#e24a1a' },
  { x: 72, y: -28, delay: 0.16, color: '#c9a24a' },
  { x: -36, y: 48, delay: 0.22, color: '#e24a1a' },
  { x: 52, y: 42, delay: 0.28, color: '#fff6ee' },
  { x: 0, y: -62, delay: 0.12, color: '#c9a24a' },
]

export default function OrderSuccess() {
  const navigate = useNavigate()
  const { order } = useCart()

  useEffect(() => {
    if (!order) navigate('/', { replace: true })
  }, [order, navigate])

  if (!order) return null

  return (
    <div className="page-x flex min-h-dvh w-full flex-col bg-cream pb-8 pt-8">
      <div className="flex flex-1 flex-col items-center text-center">
        <div className="relative flex h-24 w-24 items-center justify-center">
          {sparks.map((spark, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
              style={{ background: spark.color }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
              animate={{ x: spark.x, y: spark.y, opacity: 0, scale: 1.35 }}
              transition={{ delay: spark.delay, duration: 0.7, ease: 'easeOut' }}
            />
          ))}
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-sage/30"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <motion.div
            initial={{ scale: 0.2, opacity: 0, rotate: -24 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 12 }}
            className="flex h-20 w-20 items-center justify-center rounded-full bg-sage text-3xl text-white"
          >
            <motion.span initial={{ scale: 0 }} animate={{ scale: [0, 1.25, 1] }} transition={{ delay: 0.16, duration: 0.4 }}>
              <HiCheck />
            </motion.span>
          </motion.div>
        </div>

        <motion.h1
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.18 }}
          className="mt-5 mb-0 font-display text-[clamp(1.5rem,7vw,1.75rem)] leading-8 text-night"
        >
          Order confirmed
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          className="mt-2 mb-0 h-5 whitespace-nowrap text-sm leading-5 text-night/55"
        >
          Order <span className="font-semibold text-night">{order.id}</span>
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.34 }}
          className="mt-0.5 mb-0 h-5 whitespace-nowrap text-sm leading-5 text-night/55"
        >
          ETA {order.eta}
        </motion.p>

        <motion.img
          src="/images/success-delivery.png"
          alt="Delivery on the way"
          className="mt-5 h-36 w-56 rounded-[24px] object-cover shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: [0, -8, 0], opacity: 1 }}
          transition={{
            opacity: { duration: 0.4, delay: 0.25 },
            y: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 w-full rounded-2xl bg-white p-4 text-left"
        >
          <p className="m-0 h-4 text-[11px] uppercase leading-4 tracking-wider text-night/40">Delivering to</p>
          <p className="mt-1 mb-0 h-5 truncate text-sm font-semibold leading-5">{order.details.name}</p>
          <p className="mt-0.5 mb-0 h-5 truncate text-sm leading-5 text-night/55">
            {order.details.address}
            {order.details.apt ? `, ${order.details.apt}` : ''}
          </p>
          <div className="mt-3 flex h-8 items-center justify-between border-t border-night/5 pt-3 text-sm">
            <span className="whitespace-nowrap text-night/50">{order.items.length} item(s)</span>
            <span className="whitespace-nowrap font-display text-lg leading-none text-ember">{money(order.total)}</span>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 space-y-2">
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/account')}
          className="h-12 w-full rounded-2xl bg-ember text-sm font-semibold leading-none text-white"
        >
          Track Order
        </motion.button>
        <motion.button
          type="button"
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/')}
          className="h-12 w-full rounded-2xl bg-white text-sm font-semibold leading-none text-night"
        >
          Back to menu
        </motion.button>
      </div>
    </div>
  )
}
