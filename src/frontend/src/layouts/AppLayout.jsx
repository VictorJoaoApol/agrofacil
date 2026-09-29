import { Suspense } from 'react'
import { Outlet } from 'react-router'
import { SidebarProvider, useSidebar } from '../components/Sidebar/SidebarContext.jsx'
import Navbar from '../components/Navbar/Navbar.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import BarraNavegacao from '../components/Navegacao/BarraNavegacao.jsx'

function Shell() {
  const { isOpen } = useSidebar()
  return (
    <div className="app-shell">
      <Navbar />
      {/* inert: enquanto a sidebar está aberta, o conteúdo não recebe foco nem clique */}
      <main className="app-main" inert={isOpen}>
        <Suspense fallback={<p className="text-body">Carregando...</p>}>
          <Outlet />
        </Suspense>
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