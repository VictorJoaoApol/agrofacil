// components/Navegacao/BarraNavegacao.jsx
import { NavLink } from 'react-router'
import { appPath, pagesFor } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'

const abas = pagesFor('bottom').slice(0, 5)

export default function BarraNavegacao() {
  const { isOpen } = useSidebar()

  return (
    <nav className="bottom-nav" aria-label="Navegação principal" inert={isOpen}>
      {abas.map(({ path, label, icon: Icon }) => (
        <NavLink key={path || 'home'} to={appPath(path)} end={path === ''} className="bottom-nav__item">
          <Icon aria-hidden="true" />
          <span className="text-caption">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
