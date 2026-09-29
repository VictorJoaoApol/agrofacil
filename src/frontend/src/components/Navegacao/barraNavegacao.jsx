// components/Navegacao/BarraNavegacao.jsx
import { NavLink } from 'react-router'
import { appPages, appPath } from '../../routes/pages'

export default function BarraNavegacao() {
  const abas = appPages.filter((p) => p.menus?.includes('bottom')).slice(0, 5)

  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {abas.map(({ path, label, icon: Icon }) => (
        <NavLink key={path || 'home'} to={appPath(path)} end={path === ''} className="bottom-nav__item">
          <Icon aria-hidden="true" />
          <span className="text-caption">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}