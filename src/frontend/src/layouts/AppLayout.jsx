import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar/Navbar'
import Sidebar, { SidebarProvider } from '../components/Sidebar/Sidebar'
import BarraNavegacao from '../components/Navegacao/barraNavegacao.jsx'

export default function AppLayout() {
  return (
    <SidebarProvider>
      <Navbar />
      <Sidebar />
      <main className="conteudo">
        <Suspense fallback={<p>Carregando...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <BarraNavegacao />
    </SidebarProvider>
  )
}