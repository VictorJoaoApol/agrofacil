// pages/RegistrosUsuarios/Login.jsx
import FormLogin from '../../components/forms/FormLogin.jsx'
import Button from '../../components/ui/Button.jsx'

/* Página pública de autenticação de usuários */
export default function Login() {
  return (
    <>
      <h1 className="text-title-m">Login</h1>
      <FormLogin />
      <div className="auth-links">
        <Button variant="link" to="/login/recuperar-senha">Esqueci a senha</Button>
        <Button variant="link" to="/cadastro">Ainda não tenho conta</Button>
      </div>
    </>
  )
}