// components/Sidebar/Sidebar.jsx
import { NavLink } from 'react-router'
import { appPages, appPath } from '../../routes/pages'
import { useSidebar } from './SidebarContext.jsx'
import { useTheme } from '../../hooks/useTheme'
import { Fechar } from '../../assets/Icons'

export default function Sidebar() {
  const { isOpen, close } = useSidebar()
  const { theme, toggleTheme } = useTheme()
  const itens = appPages.filter((p) => p.menus?.includes('sidebar'))

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'is-open' : ''}`} onClick={close} aria-hidden="true" />

      <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} inert={!isOpen} aria-label="Menu lateral">
        <button className="sidebar__close" onClick={close} aria-label="Fechar menu">
          <Fechar aria-hidden="true" />
        </button>

        <ul className="sidebar__menu">
          {itens.map(({ path, label, icon: Icon }) => (
            <li key={path || 'home'}>
              <NavLink to={appPath(path)} end={path === ''} className="sidebar__link">
                <Icon aria-hidden="true" />
                <span className="text-body">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar__footer">
          <label className="sidebar__toggle text-body">
            Modo escuro
            <input type="checkbox" role="switch" checked={theme === 'dark'} onChange={toggleTheme} />
          </label>
          <NavLink to="/login" className="sidebar__link">
            <span className="text-body">Sair</span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}