// components/Sidebar/SidebarContext.jsx
import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const { pathname } = useLocation()

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => { close() }, [pathname, close])          // fecha ao trocar de rota

  useEffect(() => {                                        // fecha com Esc
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  return (
    <SidebarContext.Provider value={{ isOpen, open, close }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => useContext(SidebarContext)