import { motion } from 'framer-motion'
import { useEffect } from 'react'

const letters = ['F', 'O', 'R', 'N', 'O']

export default function SplashScreen({ onDone }) {
  useEffect(() => {
    const id = setTimeout(onDone, 3000)
    return () => clearTimeout(id)
  }, [onDone])

  return (
    <motion.div
      className="frame-bar inset-y-0 z-[90] overflow-hidden bg-night text-cream"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -24, scale: 1.04, filter: 'blur(8px)' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-[-20%] top-[8%] h-44 w-44 rounded-full bg-ember/25 blur-3xl"
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[-15%] h-52 w-52 rounded-full bg-gold/20 blur-3xl"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="flex w-full max-w-[280px] flex-col items-center text-center">
          <motion.img
            src="/images/logo-forno.png"
            alt="FORNO"
            className="h-14 w-14 rounded-full object-cover ring-2 ring-gold/80"
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          />

          <div className="relative mt-6 flex h-[168px] w-[168px] items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border-[3px] border-ember/25 border-t-ember border-r-gold"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute inset-[10px] rounded-full border border-dashed border-gold/40"
              animate={{ rotate: -360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.img
              src="/images/pizza-hero.png"
              alt="Pizza loader"
              className="h-[118px] w-[118px] rounded-full object-cover shadow-[0_0_28px_rgba(226,74,26,0.4)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            />
            <motion.span
              className="absolute -bottom-0.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ember"
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>

          <h1
            aria-label="FORNO"
            className="mt-7 flex h-12 w-full items-center justify-center whitespace-nowrap font-display text-[42px] leading-none tracking-[0.08em] text-cream"
          >
            {letters.map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.28 + i * 0.07, type: 'spring', stiffness: 360, damping: 20 }}
                className="inline-flex h-12 w-[0.78em] items-center justify-center"
              >
                {letter}
              </motion.span>
            ))}
          </h1>

          <div className="mt-2 flex w-full flex-col items-center gap-0.5">
            <motion.p
              className="m-0 w-full text-[11px] font-semibold uppercase leading-4 tracking-[0.16em] text-gold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.35 }}
            >
              Wood-fired
            </motion.p>
            <motion.p
              className="m-0 w-full text-[11px] font-semibold uppercase leading-4 tracking-[0.16em] text-gold"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74, duration: 0.35 }}
            >
              Delivered hot
            </motion.p>
          </div>

          <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-ember to-gold"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2.55, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          <motion.p
            className="mt-3 w-full text-center text-[11px] leading-4 tracking-[0.12em] text-cream/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.45, 1, 0.45] }}
            transition={{ delay: 0.85, duration: 1.5, repeat: Infinity }}
          >
            Lighting the oven…
          </motion.p>
        </div>
      </div>
    </motion.div>
  )
}
