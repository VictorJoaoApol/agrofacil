// components/Navegacao/BarraNavegacao.jsx
import { NavLink } from 'react-router'
import { appPath, pagesFor } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'

/* Carrega as páginas configuradas para a navegação inferior e limita a exibição a no máximo 5 abas */
const abas = pagesFor('bottom').slice(0, 5)

/* Componente de barra de navegação inferior (Bottom Navigation) para dispositivos móveis */
export default function BarraNavegacao() {
  /* Resgata o estado de abertura do menu lateral para desativar a barra de navegação via acessibilidade */
  const { isOpen } = useSidebar()

  return (
    <nav className="bottom-nav" aria-label="Navegação principal" inert={isOpen ? '' : undefined}>
      {/* Mapeamento dinâmico dos itens da barra de navegação com base na lista de páginas */}
      {abas.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path || 'home'}
          to={appPath(path)}
          end={path === ''}
          className="bottom-nav__item"
        >
          <Icon aria-hidden="true" />
          <span className="text-caption">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}