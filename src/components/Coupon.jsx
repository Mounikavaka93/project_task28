import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useCart } from '../context/CartContext'

export default function Coupon() {
  const { coupon, couponMessage, applyCoupon, removeCoupon } = useCart()
  const [code, setCode] = useState('')
  const [shake, setShake] = useState(0)

  const submit = (event) => {
    event.preventDefault()
    const ok = applyCoupon(code)
    if (ok) setCode('')
    else setShake((n) => n + 1)
  }

  return (
    <div className="rounded-2xl bg-white p-3">
      <p className="m-0 h-5 text-sm font-semibold leading-5 text-night">Apply coupon</p>
      {coupon ? (
        <div className="mt-2 flex h-12 items-center justify-between gap-2 rounded-xl bg-ember-soft px-3">
          <div className="min-w-0">
            <p className="m-0 truncate text-sm font-bold leading-5 text-ember">{coupon.code}</p>
            <p className="m-0 truncate text-[11px] leading-4 text-night/55">{coupon.label}</p>
          </div>
          <button
            type="button"
            onClick={removeCoupon}
            className="shrink-0 whitespace-nowrap text-xs font-semibold text-night/50"
          >
            Remove
          </button>
        </div>
      ) : (
        <motion.form
          key={shake}
          onSubmit={submit}
          animate={shake ? { x: [0, -8, 8, -6, 6, 0] } : {}}
          className="mt-2 flex h-11 gap-2"
        >
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="FORNO20"
            className="h-11 min-w-0 flex-1 rounded-xl bg-cream px-3 text-sm outline-none ring-ember/30 focus:ring-2"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.96 }}
            className="h-11 w-[72px] shrink-0 rounded-xl bg-night text-sm font-semibold text-cream"
          >
            Apply
          </motion.button>
        </motion.form>
      )}
      <AnimatePresence>
        {couponMessage && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-2 mb-0 h-4 overflow-hidden truncate text-[11px] leading-4 ${
              coupon ? 'text-sage' : 'text-ember'
            }`}
          >
            {couponMessage}
          </motion.p>
        )}
      </AnimatePresence>
      <p className="mt-2 mb-0 overflow-hidden truncate text-[11px] leading-4 text-night/40">
        FORNO20 · EMBER5 · WEEKEND · FAMILY · TWINFIRE
      </p>
    </div>
  )
}
