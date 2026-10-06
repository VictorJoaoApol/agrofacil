// components/Sidebar/Sidebar.jsx
import { NavLink } from 'react-router'
import { Fechar, Login } from '../../assets/Icons'
import ThemeSwitch from '../ui/ThemeSwitch.jsx'
import useLogout from '../../hooks/useLogout'
import { appPath, pagesFor } from '../../routes/pages'
import { useSidebar } from './SidebarContext.jsx'

/* Carrega a lista de rotas e seções configuradas para exibição no menu lateral */
const itens = pagesFor('sidebar')

/* Componente de menu lateral gaveta (Drawer/Sidebar) com navegação, tema e acionamento de logout */
export default function Sidebar() {
  /* Resgata o estado de abertura da Sidebar e a ação de fechamento do contexto */
  const { isOpen, close } = useSidebar()

  /* Hook customizado para disparar e gerenciar a ação de encerramento da sessão */
  const { sair, saindo, erro } = useLogout()

  return (
    <>
      {/* Camada de escurecimento de fundo (Backdrop) que fecha o menu ao ser clicada */}
      <div className={`sidebar-backdrop ${isOpen ? 'is-open' : ''}`} onClick={close} aria-hidden="true" />

      {/* Painel lateral desativado para navegação/acessibilidade via atributo 'inert' quando fechado */}
      <aside id="sidebar" className={`sidebar ${isOpen ? 'is-open' : ''}`} inert={!isOpen} aria-label="Menu lateral">
        {/* Botão para fechar o menu lateral */}
        <button type="button" className="sidebar__close" onClick={close} aria-label="Fechar menu">
          <Fechar aria-hidden="true" />
        </button>

        {/* Lista principal de rotas e páginas do aplicativo */}
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

        {/* Rodapé fixo com alternador de tema e botão para encerrar a sessão */}
        <div className="sidebar__footer">
          <ThemeSwitch />
          <button type="button" className="sidebar__link sidebar__link--danger" onClick={sair} disabled={saindo}>
            <Login aria-hidden="true" />
            <span className="text-body">{saindo ? 'Saindo...' : 'Sair'}</span>
          </button>
          {/* Mensagem de erro ao tentar realizar o logout */}
          {erro && <p className="field__error text-caption" role="alert">{erro}</p>}
        </div>
      </aside>
    </>
  )
}