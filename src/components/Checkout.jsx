import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiArrowLeft, HiCheck } from 'react-icons/hi'
import { MdOutlinePayments } from 'react-icons/md'
import { TbBike, TbCash, TbCreditCard } from 'react-icons/tb'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { useCart } from '../context/CartContext'
import { fadeUp } from '../motion/variants'
import { money } from '../utils/format'
import Coupon from './Coupon'
import OrderSummary from './OrderSummary'

const PAYMENTS = [
  { id: 'card', label: 'Card', hint: 'Visa, Mastercard', icon: TbCreditCard },
  { id: 'wallet', label: 'Wallet', hint: 'Pay in one tap', icon: MdOutlinePayments },
  { id: 'cod', label: 'Cash', hint: 'Pay on delivery', icon: TbCash },
]

export default function Checkout() {
  const navigate = useNavigate()
  const { location } = useApp()
  const { items, total, placeOrder } = useCart()
  const [payment, setPayment] = useState('card')
  const [placing, setPlacing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: location.label,
    apt: '',
    city: 'Harbor City',
    instructions: '',
  })

  const set = (key) => (event) => setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Name is required'
    if (!form.phone.trim()) nextErrors.phone = 'Phone is required'
    if (!form.address.trim()) nextErrors.address = 'Address is required'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length || items.length === 0) return

    setPlacing(true)
    setProgress(8)
    const tick = setInterval(() => setProgress((p) => Math.min(p + 14, 90)), 160)

    window.setTimeout(() => {
      clearInterval(tick)
      setProgress(100)
      const etaNum = parseInt(location.eta, 10)
      placeOrder({
        ...form,
        payment,
        eta: Number.isFinite(etaNum) ? `${etaNum + 6}–${etaNum + 14} min` : '28–36 min',
      })
      navigate('/success', { replace: true })
    }, 1500)
  }

  useEffect(() => {
    if (items.length === 0 && !placing) navigate('/cart', { replace: true })
  }, [items.length, placing, navigate])

  if (items.length === 0 && !placing) return null

  const fieldClass = (key) =>
    `h-11 w-full min-w-0 rounded-xl bg-cream px-3 text-sm outline-none ${
      errors[key] ? 'ring-2 ring-ember' : 'focus:ring-2 focus:ring-ember/30'
    }`

  return (
    <form onSubmit={submit} className="relative min-h-dvh w-full overflow-x-hidden bg-cream">
      <div className="page-x sticky top-0 z-20 flex h-[60px] items-center gap-3 bg-cream/95 backdrop-blur">
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          onClick={() => navigate('/cart')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white"
          aria-label="Back to cart"
        >
          <HiArrowLeft />
        </motion.button>
        <h1 className="m-0 truncate font-display text-xl leading-6">Checkout</h1>
      </div>

      <div className="page-x space-y-3 pb-28">
        <motion.section variants={fadeUp} initial="hidden" animate="show" className="rounded-2xl bg-white p-4">
          <p className="m-0 h-5 text-sm font-semibold leading-5">Delivery address</p>
          <div className="mt-3 space-y-2">
            <input className={fieldClass('address')} value={form.address} onChange={set('address')} placeholder="Street address" />
            <div className="grid grid-cols-2 gap-2">
              <input className="h-11 min-w-0 rounded-xl bg-cream px-3 text-sm outline-none focus:ring-2 focus:ring-ember/30" value={form.apt} onChange={set('apt')} placeholder="Apt / floor" />
              <input className="h-11 min-w-0 rounded-xl bg-cream px-3 text-sm outline-none focus:ring-2 focus:ring-ember/30" value={form.city} onChange={set('city')} placeholder="City" />
            </div>
            {errors.address && <p className="m-0 h-4 text-xs leading-4 text-ember">{errors.address}</p>}
          </div>
        </motion.section>

        <section className="rounded-2xl bg-white p-4">
          <p className="m-0 h-5 text-sm font-semibold leading-5">Contact information</p>
          <div className="mt-3 space-y-2">
            <input className={fieldClass('name')} value={form.name} onChange={set('name')} placeholder="Full name" />
            <input className={fieldClass('phone')} value={form.phone} onChange={set('phone')} placeholder="Phone number" inputMode="tel" />
            {(errors.name || errors.phone) && (
              <p className="m-0 h-4 truncate text-xs leading-4 text-ember">{errors.name || errors.phone}</p>
            )}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-4">
          <p className="m-0 h-5 text-sm font-semibold leading-5">Delivery instructions</p>
          <textarea
            value={form.instructions}
            onChange={set('instructions')}
            rows={3}
            placeholder="Gate code, leave at door, extra chili…"
            className="mt-3 w-full resize-none rounded-xl bg-cream px-3 py-2 text-sm leading-5 outline-none focus:ring-2 focus:ring-ember/30"
          />
        </section>

        <section className="rounded-2xl bg-white p-4">
          <p className="m-0 h-5 text-sm font-semibold leading-5">Payment method</p>
          <div className="mt-3 space-y-2">
            {PAYMENTS.map((method) => {
              const Icon = method.icon
              const active = payment === method.id
              return (
                <motion.button
                  key={method.id}
                  type="button"
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPayment(method.id)}
                  className={`relative flex h-14 w-full items-center gap-3 rounded-2xl px-3 text-left ${
                    active ? 'bg-ember-soft ring-1 ring-ember' : 'bg-cream'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="pay-glow"
                      className="absolute inset-0 rounded-2xl ring-1 ring-ember"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-lg text-ember">
                    <Icon />
                  </span>
                  <span className="relative z-10 min-w-0 flex-1">
                    <span className="block h-5 truncate text-sm font-semibold leading-5">{method.label}</span>
                    <span className="block h-4 truncate text-[11px] leading-4 text-night/45">{method.hint}</span>
                  </span>
                  {active && (
                    <span className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember text-[10px] text-white">
                      <HiCheck />
                    </span>
                  )}
                </motion.button>
              )
            })}
          </div>
          <p className="mt-2 mb-0 h-4 overflow-hidden truncate text-[11px] leading-4 text-night/40">
            Demo only — no real payment is taken.
          </p>
        </section>

        <section className="rounded-2xl bg-white p-4">
          <p className="m-0 h-5 text-sm font-semibold leading-5">Order items</p>
          <div className="mt-2 space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex h-10 items-center gap-2">
                <img src={item.image} alt="" className="h-10 w-10 shrink-0 rounded-lg object-cover" />
                <p className="m-0 min-w-0 flex-1 truncate text-sm leading-5">{item.name}</p>
                <span className="shrink-0 whitespace-nowrap text-xs text-night/45">×{item.qty}</span>
                <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-ember">
                  {money(item.unitPrice * item.qty)}
                </span>
              </div>
            ))}
          </div>
        </section>

        <Coupon />
        <OrderSummary />
      </div>

      <div className="frame-bar bottom-0 z-30 border-t border-night/5 bg-white/95 pt-2 backdrop-blur pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <div className="page-x">
          <motion.button
            type="submit"
            whileTap={{ scale: 0.98 }}
            className="flex h-12 w-full items-center justify-between rounded-2xl bg-ember px-4 text-sm font-semibold text-white"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <TbBike className="text-lg" />
              Place Order
            </span>
            <span className="whitespace-nowrap">{money(total)}</span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {placing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="frame-bar inset-y-0 z-50 flex flex-col items-center justify-center bg-night/85 px-8 text-center text-cream"
          >
            <div className="relative flex h-28 w-28 items-center justify-center">
              <motion.span
                className="absolute inset-0 rounded-full border-[3px] border-white/10 border-t-ember"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              <motion.img
                src="/images/pizza-hero.png"
                alt=""
                className="h-20 w-20 rounded-full object-cover"
                animate={{ rotate: 360 }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <p className="mt-5 mb-0 font-display text-[22px] leading-8 text-cream">Firing your order</p>
            <p className="mt-1 mb-0 text-sm leading-5 text-cream/60">Writing the oven ticket…</p>
            <div className="mt-6 h-1.5 w-full max-w-[240px] overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-ember to-gold" animate={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 mb-0 h-4 whitespace-nowrap text-[11px] leading-4 text-cream/50">{Math.round(progress)}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
