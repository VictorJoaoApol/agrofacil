// components/Navbar/Navbar.jsx
import { useLocation, useNavigate } from 'react-router'
import { getPage } from '../../routes/pages'
import { useSidebar } from '../Sidebar/SidebarContext.jsx'
import { Seta } from '../../assets/Icons'
import logo from '../../assets/img/Logo.png'
import Avatar from '../ui/Avatar.jsx'


const Logo = () => <img className="navbar__logo" src={logo} alt="AgroFácil" />

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { open } = useSidebar()
  const { label, variant = 'inner' } = getPage(pathname)

  if (variant === 'home') {
    return (
      <header className="navbar navbar--home">
        <button className="navbar__btn" onClick={open} aria-label="Abrir menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Logo />
        <span className="navbar__btn" aria-hidden="true" />   {/* equilibra o centro */}
      </header>
    )
  }

  return (
    <header className="navbar">
      <button className="navbar__btn" onClick={() => navigate(-1)} aria-label="Voltar">
        <Seta className="navbar__back" aria-hidden="true" />
      </button>
      <h1 className="navbar__title text-title-m">{label}</h1>
      {variant === 'profile'
        ? <Avatar nome={usuario?.nome} size={40} />
        : <Logo />}
    </header>
  )
}