export const springSoft = { type: 'spring', stiffness: 280, damping: 24 }
export const springSnappy = { type: 'spring', stiffness: 420, damping: 22 }
export const easeOut = [0.22, 1, 0.36, 1]

export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: easeOut } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: easeOut } },
}

export const staggerGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.04 } },
}

export const cardReveal = {
  hidden: { opacity: 0, y: 28, scale: 0.94, rotate: -1.5 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
}

export const tapPress = { scale: 0.94 }
export const tapSoft = { scale: 0.97 }
