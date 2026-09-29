import { Outlet } from 'react-router'
import logo from '../assets/img/Logo.png'

export default function AuthLayout() {
  return (
    <div className="tela-fundo">
      <header className="cabecalho-logo">
        <img className="icon-logo" src={logo} alt="Logo" />
      </header>
      <Outlet />
    </div>
  )
}