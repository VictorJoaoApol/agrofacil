import { NavLink } from 'react-router'
import { Fechar, Login, Seta } from '../../assets/Icons'
import Avatar from '../ui/Avatar.jsx'
import ThemeSwitch from '../ui/ThemeSwitch.jsx'
import useAuth from '../../hooks/useAuth'
import useLogout from '../../hooks/useLogout'
import { appPath, pagesFor } from '../../routes/pages'
import { useSidebar } from './SidebarContext.jsx'

/* Tamanhos do Figma (px) */
const ICONE = 24        // ícone dos itens
const SETA = 12         // seta à direita do item
const FOTO = 64         // foto do usuário

/* Agrupa as páginas da sidebar pelo campo `grupo` (cada grupo vira uma seção com rótulo) */
const grupos = pagesFor('sidebar').reduce((acc, pagina) => {
  const nome = pagina.grupo ?? 'Geral'
  const grupo = acc.find((g) => g.nome === nome)
  if (grupo) grupo.itens.push(pagina)
  else acc.push({ nome, itens: [pagina] })
  return acc
}, [])

/* Componente de menu lateral gaveta (Drawer/Sidebar) com navegação, tema e acionamento de logout */
function Sidebar() {
  /* Resgata o estado de abertura da Sidebar e a ação de fechamento do contexto */
  const { isOpen, close } = useSidebar()

  /* Usuário logado (foto e nome no topo) */
  const { usuario } = useAuth()

  /* Hook customizado para disparar e gerenciar a ação de encerramento da sessão */
  const { sair, saindo, erro } = useLogout()

  return (
    <>
      {/* Camada de escurecimento de fundo (Backdrop) que fecha o menu ao ser clicada */}
      <div className={`sidebar-backdrop ${isOpen ? 'is-open' : ''}`} onClick={close} aria-hidden="true" />

      {/* Painel lateral desativado para navegação/acessibilidade via atributo 'inert' quando fechado */}
      <aside id="sidebar" className={`sidebar ${isOpen ? 'is-open' : ''}`} inert={!isOpen} aria-label="Menu lateral">
        {/* Topo: foto 64x64 + nome (16px) + botão de fechar */}
        <div className="sidebar__header">
          <Avatar nome={usuario?.nome} src={usuario?.foto} size={FOTO} />
          <p className="sidebar__user text-body">{usuario?.nome || 'Nome do Usuário'}</p>
          <button type="button" className="sidebar__close" onClick={close} aria-label="Fechar menu">
            <Fechar size={ICONE} aria-hidden="true" />
          </button>
        </div>

        <h2 className="sidebar__title">Opções</h2>

        {/* Seções: rótulo + linha + itens de 32px */}
        <div className="sidebar__groups">
          {grupos.map(({ nome, itens }) => (
            <section key={nome} className="sidebar__group" aria-label={nome}>
              <p className="sidebar__label text-caption" aria-hidden="true">{nome}</p>

              <ul className="sidebar__menu">
                {itens.map(({ path, label, icon: Icon, iconActive: IconActive }) => (
                  <li key={path || 'home'}>
                    <NavLink to={appPath(path)} end={path === ''} className="sidebar__link">
                      {({ isActive }) => {
                        /* Alterna entre o ícone normal e a versão 'Ativado' preenchida */
                        const IconComponent = isActive && IconActive ? IconActive : Icon

                        return (
                          <>
                            <IconComponent size={ICONE} className="sidebar__icon" aria-hidden="true" />
                            <span className="sidebar__text text-caption">{label}</span>
                            <Seta size={SETA} className="sidebar__arrow" aria-hidden="true" />
                          </>
                        )
                      }}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Rodapé: alternador de tema, linha e botão para encerrar a sessão */}
        <div className="sidebar__footer">
          <ThemeSwitch />
          <button type="button" className="sidebar__link sidebar__link--danger" onClick={sair} disabled={saindo}>
            <Login size={ICONE} className="sidebar__icon" aria-hidden="true" />
            <span className="sidebar__text text-caption">{saindo ? 'Saindo...' : 'Sair'}</span>
            <Seta size={SETA} className="sidebar__arrow" aria-hidden="true" />
          </button>
          {/* Mensagem de erro ao tentar realizar o logout */}
          {erro && <p className="field__error text-caption" role="alert">{erro}</p>}
        </div>
      </aside>
    </>
  )
}

export default Sidebar;