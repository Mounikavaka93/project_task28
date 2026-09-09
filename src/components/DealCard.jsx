import { AnimatePresence, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import useCountdown from '../hooks/useCountdown'
import { tapSoft } from '../motion/variants'

export default function DealCard({ deal, index = 0, full = false }) {
  const { applyCoupon } = useCart()
  const { setCategory } = useApp()
  const navigate = useNavigate()
  const time = useCountdown(deal.endsAt)

  const claim = (event) => {
    event.stopPropagation()
    applyCoupon(deal.coupon)
    setCategory('pizzas')
    navigate('/')
    requestAnimationFrame(() => {
      document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-16px' }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 260, damping: 22 }}
      whileTap={tapSoft}
      className={`shimmer relative grid h-[168px] overflow-hidden rounded-[22px] bg-night text-cream ${
        full ? 'w-full max-w-full grid-cols-[minmax(0,1fr)_84px]' : 'w-[min(18.5rem,calc(100vw-2.5rem))] shrink-0 snap-start grid-cols-[minmax(0,1fr)_84px]'
      }`}
    >
      <div className="flex min-w-0 flex-col p-3 pr-2">
        <span className="inline-flex h-5 w-fit max-w-full items-center overflow-hidden truncate rounded-full bg-ember px-2 text-[10px] font-bold leading-5 tracking-wide">
          {deal.badge}
        </span>
        <h3 className="mt-1.5 mb-0 h-6 overflow-hidden truncate font-display text-[18px] leading-6">{deal.title}</h3>
        <p className="m-0 h-4 overflow-hidden truncate text-[11px] leading-4 text-gold">{deal.subtitle}</p>
        <p className="mt-1 mb-0 h-8 overflow-hidden text-[11px] leading-4 text-cream/65 line-clamp-2">{deal.description}</p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="flex gap-1">
            {[
              { unit: time.h, label: 'hrs' },
              { unit: time.m, label: 'min' },
              { unit: time.s, label: 'sec' },
            ].map((slot) => (
              <div key={slot.label} className="flex h-[34px] w-9 flex-col items-center justify-center rounded-md bg-white/10">
                <span className="flex h-4 w-full items-center justify-center overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={slot.unit}
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -8, opacity: 0 }}
                      className="font-mono text-[12px] font-bold leading-none"
                    >
                      {slot.unit}
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="text-[8px] uppercase leading-3 text-cream/50">{slot.label}</span>
              </div>
            ))}
          </div>
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={claim}
            className="h-9 min-w-[44px] shrink-0 rounded-full bg-cream px-3 text-[11px] font-semibold leading-9 text-night"
          >
            Claim
          </motion.button>
        </div>
      </div>
      <img src={deal.image} alt="" className="h-full w-full object-cover" />
    </motion.article>
  )
}
