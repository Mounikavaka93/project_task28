export const money = (value) => `$${Number(value).toFixed(2)}`

export function computeUnitPrice(product, size, crust, toppings = []) {
  if (!product) return 0
  const multiplier = product.customizable ? (size?.multiplier ?? 1) : 1
  const crustExtra = product.customizable ? (crust?.extra ?? 0) : 0
  const toppingSum = product.customizable
    ? toppings.reduce((sum, topping) => sum + topping.price, 0)
    : 0
  return Math.round((product.price * multiplier + crustExtra + toppingSum) * 100) / 100
}

export function formatCountdown(ms) {
  const clamped = Math.max(0, ms)
  const total = Math.floor(clamped / 1000)
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n) => String(n).padStart(2, '0')
  return { h: pad(h), m: pad(m), s: pad(s), expired: clamped <= 0 }
}

export function makeOrderId() {
  const n = Math.floor(10000 + Math.random() * 90000)
  return `FOR-${n}`
}
