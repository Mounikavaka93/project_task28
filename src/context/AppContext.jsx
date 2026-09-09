import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { LOCATIONS } from '../data/menu'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [location, setLocation] = useState(LOCATIONS[0])
  const [category, setCategory] = useState('pizzas')
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [query, setQuery] = useState('')

  const openProduct = useCallback((product, preset = {}) => {
    setSelectedProduct({ product, preset })
  }, [])

  const closeProduct = useCallback(() => setSelectedProduct(null), [])

  const value = useMemo(
    () => ({
      location,
      setLocation,
      category,
      setCategory,
      menuOpen,
      setMenuOpen,
      searchOpen,
      setSearchOpen,
      selectedProduct,
      openProduct,
      closeProduct,
      query,
      setQuery,
    }),
    [location, category, menuOpen, searchOpen, selectedProduct, openProduct, closeProduct, query],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
