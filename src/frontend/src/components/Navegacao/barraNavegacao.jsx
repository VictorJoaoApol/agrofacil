// components/Navegacao/BarraNavegacao.jsx

import { NavLink } from 'react-router'
import { appPath, pagesFor } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'

/* Carrega as páginas configuradas para a navegação inferior
   e limita a exibição a no máximo 5 abas */
const abas = pagesFor('bottom').slice(0, 5)

/* Componente de barra de navegação inferior (Bottom Navigation)
   para dispositivos móveis */
export default function BarraNavegacao() {

  /* Resgata o estado de abertura do menu lateral para desativar
     a barra de navegação via acessibilidade */
  const { isOpen } = useSidebar()

  return (
    <nav className="bottom-nav" aria-label="Navegação principal" inert={isOpen ? '' : undefined}>
      {abas.map(({ path, label, icon: Icon, iconActive: IconActive }) => (
        <NavLink 
          key={path || 'home'} 
          to={appPath(path)} 
          end={path === ''} 
          className="bottom-nav__item"
        >
          {({ isActive }) => {
            const IconComponent = isActive && IconActive ? IconActive : Icon

            return (
              <>
                <IconComponent
                  className="bottom-nav__icon"
                  aria-hidden="true"
                />
                <span className="sr-only">{label}</span>
              </>
            )
          }}
      </NavLink>
      ))}
    </nav>
  )
}