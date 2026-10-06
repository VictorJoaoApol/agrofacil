// layouts/AppLayout.jsx
import { Suspense, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { SidebarProvider, useSidebar } from '../components/Sidebar/SidebarContext.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import BarraNavegacao from '../components/Navegacao/BarraNavegacao.jsx'
import ErrorBoundary from '../components/ErrorBoundary.jsx'

function Shell() {
  const { isOpen } = useSidebar()
  const { pathname } = useLocation()
  const mainRef = useRef(null)

  // só o <main> rola: volta ao topo ao trocar de página
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="app-shell">
      <Navbar />

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

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Shell />
    </SidebarProvider>
  )
}
