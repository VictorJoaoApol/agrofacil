// components/Sidebar/SidebarContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

const SidebarContext = createContext(null)

export function SidebarProvider({ children }) {
  const { pathname } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [pathAnterior, setPathAnterior] = useState(pathname)

  // Fecha ao trocar de rota. Ajustar o estado durante a renderização (padrão da
  // documentação do React) evita um useEffect só para isso e não reabre o menu
  // quando o usuário volta para a rota anterior.
  if (pathname !== pathAnterior) {
    setPathAnterior(pathname)
    setIsOpen(false)
  }

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Esc fecha o menu enquanto ele estiver aberto
  useEffect(() => {
    if (!isOpen) return
    const aoPressionar = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', aoPressionar)
    return () => window.removeEventListener('keydown', aoPressionar)
  }, [isOpen])

  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSidebar = () => useContext(SidebarContext)
