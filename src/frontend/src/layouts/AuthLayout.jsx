// layouts/AuthLayout.jsx
import { Outlet } from 'react-router'
import logo from '../assets/img/Logo.png'
import fundo from '../assets/img/Campos.png'

/* Layout base para as telas de autenticação (login, cadastro, recuperação de senha) */
export default function AuthLayout() {
  return (
    <div className="auth-shell">
      {/* Tela de autenticação com imagem de fundo estilizada */}
      <div className="auth-screen" style={{ backgroundImage: `url(${fundo})` }}>
        <img className="auth-screen__logo" src={logo} alt="AgroFácil" />
        
        {/* Card centralizado que renderiza as sub-rotas de autenticação */}
        <main className="auth-card">
          <Outlet />
        </main>
      </div>
    </div>
  )
}