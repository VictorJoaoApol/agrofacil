// components/Navbar/Navbar.jsx
import { useLocation, useNavigate } from 'react-router'
import { Menu, Seta } from '../../assets/Icons'
import Avatar from '../ui/Avatar.jsx'
import useAuth from '../../hooks/useAuth'
import { getPage } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'
import logo from '../../assets/img/Logo.png'

const Logo = () => <img className="navbar__logo" src={logo} alt="AgroFácil" />

export default function Navbar() {
  const { pathname, key } = useLocation()
  const navigate = useNavigate()
  const { isOpen, open } = useSidebar()
  const { usuario } = useAuth()
  const { label, variant = 'inner' } = getPage(pathname)

  // key === 'default' = primeira entrada do histórico (abriu a URL direto):
  // navigate(-1) sairia do app, então volta para o início.
  const voltar = () => (key === 'default' ? navigate('/app') : navigate(-1))

  if (variant === 'home') {
    return (
      <header className="navbar navbar--home" inert={isOpen}>
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

  return (
    <header className="navbar" inert={isOpen}>
      <button type="button" className="navbar__btn" onClick={voltar} aria-label="Voltar">
        <Seta className="navbar__back" aria-hidden="true" />
      </button>
      {/* <p> e não <h1>: cada página já tem o seu próprio h1 */}
      <p className="navbar__title text-body">{label}</p>
      {variant === 'profile' ? <Avatar nome={usuario?.nome} size={40} /> : <Logo />}
    </header>
  )
}
