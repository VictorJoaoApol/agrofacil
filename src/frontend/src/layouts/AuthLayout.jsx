// layouts/AuthLayout.jsx
import { Outlet } from 'react-router'
import logo from '../assets/img/Logo.png'
import fundo from '../assets/img/Campos.png'
import '../styles/auth.css'

export default function AuthLayout() {
  return (
    <div className="auth-shell">
      <div className="auth-screen" style={{ backgroundImage: `url(${fundo})` }}>
        <img className="auth-screen__logo" src={logo} alt="AgroFácil" />
        <main className="auth-card">
          <Outlet />
        </main>
      </div>
    </div>
  )
}