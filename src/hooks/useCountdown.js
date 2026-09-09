import { useEffect, useState } from 'react'
import { formatCountdown } from '../utils/format'

export default function useCountdown(target) {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  return formatCountdown(target - now)
}
