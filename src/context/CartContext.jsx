import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { COUPONS } from '../data/menu'
import { makeOrderId } from '../utils/format'

const CartContext = createContext(null)
const STORAGE_KEY = 'forno-cart-v1'
const ORDER_KEY = 'forno-order-v1'

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function loadOrder() {
  try {
    const raw = localStorage.getItem(ORDER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [coupon, setCoupon] = useState(null)
  const [couponMessage, setCouponMessage] = useState('')
  const [flyTick, setFlyTick] = useState(0)
  const [order, setOrder] = useState(loadOrder)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  useEffect(() => {
    if (order) localStorage.setItem(ORDER_KEY, JSON.stringify(order))
  }, [order])

  const addItem = useCallback((payload) => {
    const matchKey = JSON.stringify({
      productId: payload.productId,
      size: payload.size?.id ?? null,
      crust: payload.crust?.id ?? null,
      toppings: (payload.toppings || []).map((t) => t.id).sort(),
    })

    setItems((prev) => {
      const existing = prev.find((item) => item.matchKey === matchKey)
      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, qty: item.qty + payload.qty } : item,
        )
      }
      return [
        ...prev,
        {
          ...payload,
          id: crypto.randomUUID(),
          matchKey,
        },
      ]
    })
    setFlyTick((n) => n + 1)
  }, [])

  const updateQty = useCallback((id, qty) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty } : item))
        .filter((item) => item.qty > 0),
    )
  }, [])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
    setCoupon(null)
    setCouponMessage('')
  }, [])

  const applyCoupon = useCallback(
    (code) => {
      const key = String(code || '')
        .trim()
        .toUpperCase()
      const found = COUPONS[key]
      if (!found) {
        setCoupon(null)
        setCouponMessage('That code did not light the oven.')
        return false
      }
      const subtotalNow = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
      setCoupon(found)
      if (subtotalNow < found.min) {
        setCouponMessage(`Saved. Add $${(found.min - subtotalNow).toFixed(2)} more to unlock.`)
        return true
      }
      setCouponMessage(`${found.label} applied`)
      return true
    },
    [items],
  )

  const removeCoupon = useCallback(() => {
    setCoupon(null)
    setCouponMessage('')
  }, [])

  const count = useMemo(() => items.reduce((sum, item) => sum + item.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0),
    [items],
  )
  const deliveryFee = subtotal === 0 ? 0 : subtotal >= 25 ? 0 : 2.99
  const discount = useMemo(() => {
    if (!coupon || subtotal < coupon.min) return 0
    if (coupon.type === 'percent') return Math.round(subtotal * coupon.value) / 100
    return Math.min(coupon.value, subtotal)
  }, [coupon, subtotal])
  const total = Math.max(0, Math.round((subtotal + deliveryFee - discount) * 100) / 100)

  const placeOrder = useCallback(
    (details) => {
      const next = {
        id: makeOrderId(),
        items,
        subtotal,
        deliveryFee,
        discount,
        total,
        coupon,
        details,
        eta: details.eta || '28–36 min',
        placedAt: Date.now(),
      }
      setOrder(next)
      clearCart()
      return next
    },
    [items, subtotal, deliveryFee, discount, total, coupon, clearCart],
  )

  const value = useMemo(
    () => ({
      items,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      coupon,
      couponMessage,
      applyCoupon,
      removeCoupon,
      count,
      subtotal,
      deliveryFee,
      discount,
      total,
      flyTick,
      order,
      setOrder,
      placeOrder,
    }),
    [
      items,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      coupon,
      couponMessage,
      applyCoupon,
      removeCoupon,
      count,
      subtotal,
      deliveryFee,
      discount,
      total,
      flyTick,
      order,
      placeOrder,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
