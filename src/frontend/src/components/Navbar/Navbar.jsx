// components/Navbar/Navbar.jsx
import { useLocation, useNavigate } from 'react-router'
import { Menu, Seta } from '../../assets/Icons'
import Avatar from '../ui/Avatar.jsx'
import useAuth from '../../hooks/useAuth'
import { getPage } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'
import logo from '../../assets/img/Logo.png'

/* Componente funcional interno para exibição da logotipo da aplicação */
const Logo = () => <img className="navbar__logo" src={logo} alt="AgroFácil" />

/* Componente de navegação superior (cabeçalho) que adapta suas ações e título conforme a rota atual */
export default function Navbar() {
  /* Resgata informações de localização, contexto de navegação, estado do sidebar e dados do usuário logado */
  const { pathname, key } = useLocation()
  const navigate = useNavigate()
  const { isOpen, open } = useSidebar()
  const { usuario } = useAuth()
  const { label, variant = 'inner' } = getPage(pathname)

  // key === 'default' = primeira entrada do histórico (abriu a URL direto):
  // navigate(-1) sairia do app, então volta para o início.

  /* Função utilitária para gerenciar a ação do botão de retorno no histórico do navegador */
  const voltar = () => (key === 'default' ? navigate('/app') : navigate(-1))

  /* Variância do cabeçalho simplificado para a tela inicial/home com botão de menu hamburguer */
  if (variant === 'home') {
    return (
      <header className="navbar navbar--home" inert={isOpen}>
        {/* Botão de acionamento para abertura do menu lateral (Sidebar) */}
        <button
          type="button"
          className="navbar__btn"
          onClick={open}
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          aria-controls="sidebar"
        >
          <Menu aria-hidden="true" />
        </button>
        <Logo />
        <span className="navbar__btn" aria-hidden="true" /> {/* equilibra o centro */}
      </header>
    )
  }

  /* Variância padrão para páginas internas com botão de voltar e avatar ou logotipo */
  return (
    <header className="navbar" inert={isOpen}>
      {/* Botão de navegação para retornar à tela anterior */}
      <button type="button" className="navbar__btn" onClick={voltar} aria-label="Voltar">
        <Seta className="navbar__back" aria-hidden="true" />
      </button>
      {/* <p> e não <h1>: cada página já tem o seu próprio h1 */}
      <p className="navbar__title text-body">{label}</p>
      {/* Exibe o avatar do usuário nas telas de perfil ou a logo nas demais telas internas */}
      {variant === 'profile' ? <Avatar nome={usuario?.nome} size={40} /> : <Logo />}
    </header>
  )
}