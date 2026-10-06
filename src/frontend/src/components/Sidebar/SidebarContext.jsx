// components/Sidebar/SidebarContext.jsx
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

/* Contexto para compartilhamento global do estado de abertura do menu lateral */
const SidebarContext = createContext(null)

/* Provedor responsável pelo gerenciamento de estado e atalhos de controle da Sidebar */
export function SidebarProvider({ children }) {
  /* Resgata a rota atual para monitorar a navegação do usuário */
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

  /* Funções memorizadas para alterar o estado de visibilidade da Sidebar */
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])

  // Esc fecha o menu enquanto ele estiver aberto
  /* Adiciona o ouvinte de evento para a tecla 'Escape' apenas enquanto a Sidebar está aberta */
  useEffect(() => {
    if (!isOpen) return
    const aoPressionar = (e) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', aoPressionar)
    return () => window.removeEventListener('keydown', aoPressionar)
  }, [isOpen])

  /* Memoriza o objeto de valor do contexto para prevenir re-renderizações desnecessárias */
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
/* Hook customizado para consumir os estados e métodos da Sidebar facilmente */
export const useSidebar = () => useContext(SidebarContext)