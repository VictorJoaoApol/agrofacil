// pages/RegistrosUsuarios/RecuperarSenha.jsx
import FormRecuperarSenha from '../../components/forms/FormRecuperarSenha.jsx'
import Button from '../../components/ui/Button.jsx'

export default function RecuperarSenha() {
  return (
    <>
      <h1 className="text-title-m">Esqueci a senha</h1>
      <p className="text-body auth-lead">Informe seu e-mail para receber as instruções.</p>
      <FormRecuperarSenha />
      <div className="auth-links">
        <Button variant="link" to="/login">Voltar</Button>
      </div>
    </>
  )
}