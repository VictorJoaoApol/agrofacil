// pages/RegistrosUsuarios/Cadastro.jsx
import FormCadastro from '../../components/forms/FormCadastro.jsx'
import Button from '../../components/ui/Button.jsx'

/* Página pública para cadastro de novos usuários */
export default function Cadastro() {
  return (
    <>
      <h1 className="text-title-m">Cadastre-se</h1>
      <FormCadastro />
      <div className="auth-links">
        <Button variant="link" to="/login">Já tenho conta</Button>
      </div>
    </>
  )
}