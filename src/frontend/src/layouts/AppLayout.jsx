// layouts/AppLayout.jsx
import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { SidebarProvider, useSidebar } from '../components/Sidebar/SidebarContext.jsx'
import Navbar from '../components/navbar/Navbar.jsx'
import Sidebar from '../components/Sidebar/sidebar.jsx'
import BarraNavegacao from '../components/Navegacao/barraNavegacao.jsx'
import ErrorBoundary from '../components/ErrorBoundary.jsx'

/* Componente interno de estrutura da interface que consome o contexto da Sidebar */
function Shell() {
  /* Resgata o estado de abertura da barra lateral */
  const { isOpen } = useSidebar()
  
  /* Obtém o caminho da URL atual para reset de scroll e redefinição do ErrorBoundary */
  const { pathname } = useLocation()
  
  /* Referência direta ao elemento <main> para controle de rolagem */
  const mainRef = useRef(null)

  // só o <main> rola: volta ao topo ao trocar de página
  /* Efeito para resetar a posição do scroll do container principal a cada mudança de rota */
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-shell">
      <Navbar />

      {/* Container de conteúdo principal que fica inerte quando a sidebar lateral está aberta */}
      <main className="app-main" ref={mainRef} inert={isOpen}>
        {/* key: ao navegar, o boundary é recriado e a tela nova não herda o erro da anterior */}
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<p className="text-body" role="status">Carregando...</p>}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>

      <BarraNavegacao />
      <Sidebar />
    </div>
  )
}

/* Layout principal da aplicação privada envelopado com o provedor da barra lateral */
export default function AppLayout() {
  return (
    <SidebarProvider>
      <Shell />
    </SidebarProvider>
  )
}