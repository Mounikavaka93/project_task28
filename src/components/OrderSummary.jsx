import { AnimatePresence, motion } from 'framer-motion'
import { money } from '../utils/format'
import { useCart } from '../context/CartContext'

export default function OrderSummary({ compact = false }) {
  const { subtotal, deliveryFee, discount, total, coupon } = useCart()

  const rows = [
    { label: 'Subtotal', value: money(subtotal) },
    { label: 'Delivery fee', value: deliveryFee === 0 ? 'Free' : money(deliveryFee) },
    { label: 'Discount', value: discount ? `−${money(discount)}` : money(0), accent: Boolean(discount) },
  ]

  return (
    <div className={`rounded-2xl bg-white ${compact ? 'p-3' : 'p-4'}`}>
      {!compact && <p className="mb-3 h-5 text-sm font-semibold leading-5 text-night">Order summary</p>}
      <div className="space-y-2">
        {rows.map((row) => (
          <div key={row.label} className="flex h-5 items-center justify-between text-sm leading-5">
            <span className="text-night/55">{row.label}</span>
            <span className={row.accent ? 'font-semibold text-sage' : 'text-night'}>{row.value}</span>
          </div>
        ))}
        {coupon && (
          <p className="m-0 h-4 truncate text-[11px] leading-4 text-night/40">Code {coupon.code}</p>
        )}
        <div className="flex h-8 items-center justify-between border-t border-night/5 pt-2">
          <span className="font-semibold leading-none text-night">Total</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={total}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-display text-xl leading-none text-ember"
            >
              {money(total)}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
