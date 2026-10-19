// components/Navbar/Navbar.jsx
import { useLocation } from 'react-router'
import { Menu } from '../../assets/Icons'
import Avatar from '../ui/Avatar.jsx'
import useAuth from '../../hooks/useAuth'
import { getPage } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'
import logo from '../../assets/img/Logo.png'

const Logo = () => <img className="navbar__logo" src={logo} alt="AgroFácil" />

export default function Navbar() {
  const { pathname } = useLocation()
  const { isOpen, open } = useSidebar()
  const { usuario } = useAuth()
  const { label, variant = 'inner' } = getPage(pathname)

  // Em todas as páginas o botão da esquerda abre a Sidebar (não há mais "voltar").
  const botaoMenu = (
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
  )

  if (variant === 'home') {
    return (
      <header className="navbar navbar--home" inert={isOpen}>
        {botaoMenu}
        {/* a logo grande fica no corpo da Home */}
      </header>
    )
  }

  return (
    <header className="navbar" inert={isOpen}>
      {botaoMenu}
      {/* <p> e não <h1>: cada página já tem o seu próprio h1 */}
      <p className="navbar__title text-body">{label}</p>
      {variant === 'profile' ? <Avatar nome={usuario?.nome} size={40} /> : <Logo />}
    </header>
  )
}
