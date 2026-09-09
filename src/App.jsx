import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import { CartProvider } from './context/CartContext'
import SplashScreen from './components/SplashScreen'
import BottomNavigation from './components/BottomNavigation'
import ProductDetails from './components/ProductDetails'
import MobileMenu from './components/MobileMenu'
import SearchSheet from './components/SearchSheet'
import FlyToCart from './components/FlyToCart'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import OrderSuccess from './components/OrderSuccess'
import Home from './pages/Home'
import Account from './pages/Account'
import { pageTransition } from './motion/variants'

function Shell() {
  const location = useLocation()
  const hideNav = location.pathname === '/checkout' || location.pathname === '/success'

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={pageTransition.initial}
          animate={pageTransition.animate}
          exit={pageTransition.exit}
          className="min-h-dvh w-full max-w-full overflow-x-hidden"
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/success" element={<OrderSuccess />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
      {!hideNav && <BottomNavigation />}
      <ProductDetails />
      <MobileMenu />
      <SearchSheet />
      <FlyToCart />
    </>
  )
}

export default function App() {
  const [booting, setBooting] = useState(true)

  return (
    <CartProvider>
      <AppProvider>
        <div className="min-h-dvh w-full bg-[#16110e]">
          <div className="relative mx-auto min-h-dvh w-full max-w-[430px] overflow-x-hidden bg-cream shadow-[0_0_80px_rgba(0,0,0,0.4)]">
            <BrowserRouter>
              <Shell />
            </BrowserRouter>
            <AnimatePresence>{booting && <SplashScreen onDone={() => setBooting(false)} />}</AnimatePresence>
          </div>
        </div>
      </AppProvider>
    </CartProvider>
  )
}
