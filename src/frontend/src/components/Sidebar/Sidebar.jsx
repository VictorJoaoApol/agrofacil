// components/Sidebar/Sidebar.jsx
import { NavLink } from 'react-router'
import { Fechar, Login } from '../../assets/Icons'
import ThemeSwitch from '../ui/ThemeSwitch.jsx'
import useLogout from '../../hooks/useLogout'
import { appPath, pagesFor } from '../../routes/pages'
import { useSidebar } from './SidebarContext.jsx'

const itens = pagesFor('sidebar')

export default function Sidebar() {
  const { isOpen, close } = useSidebar()
  const { sair, saindo, erro } = useLogout()

  return (
    <>
      <div className={`sidebar-backdrop ${isOpen ? 'is-open' : ''}`} onClick={close} aria-hidden="true" />

      <aside id="sidebar" className={`sidebar ${isOpen ? 'is-open' : ''}`} inert={!isOpen} aria-label="Menu lateral">
        <button type="button" className="sidebar__close" onClick={close} aria-label="Fechar menu">
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
          <ThemeSwitch />
          <button type="button" className="sidebar__link sidebar__link--danger" onClick={sair} disabled={saindo}>
            <Login aria-hidden="true" />
            <span className="text-body">{saindo ? 'Saindo...' : 'Sair'}</span>
          </button>
          {erro && <p className="field__error text-caption" role="alert">{erro}</p>}
        </div>
      </aside>
    </>
  )
}
