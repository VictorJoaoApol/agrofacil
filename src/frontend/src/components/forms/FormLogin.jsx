// components/forms/FormLogin.jsx
// Só os campos e o botão: título e links ficam em pages/RegistrosUsuarios/Login.jsx.
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import TextField from '../ui/TextField.jsx'
import Button from '../ui/Button.jsx'
import useAuth from '../../hooks/useAuth'
import { useForm } from '../../hooks/useForm'
import { all, email, required } from '../../utils/validators'
import { login } from '../../services/auth'

const REGRAS = {
  email: all(required('Informe seu e-mail'), email()),
  senha: required('Informe sua senha'),
}

function FormLogin() {
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const navigate = useNavigate()
  const { state } = useLocation()          // ProtectedRoute guarda a rota de origem em state.de
  const { checarSessao } = useAuth()       // avisa o AuthContext que agora existe uma sessão
  const { values, errors, onChange, validate, setValues } = useForm({ email: '', senha: '' }, REGRAS)

  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')
    if (!validate()) return

    setEnviando(true)
    try {
      const resultado = await login(values.email, values.senha)

      // "ja_logado" vem com HTTP 409 (ok = false), mas a sessão existe: segue o fluxo.
      if (!resultado.ok && resultado.status !== 'ja_logado') {
        throw new Error(resultado.message || 'Erro ao fazer login')
      }

      // Atualiza o AuthContext antes de navegar, para as rotas protegidas
      // já reconhecerem o usuário.
      await checarSessao()
      navigate(state?.de?.pathname ?? '/app', { replace: true })
    } catch (err) {
      setErro(err.message)
    } finally {
      setValues((v) => ({ ...v, senha: '' }))
      setEnviando(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <TextField
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        placeholder="Insira seu email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />
      <TextField
        label="Senha"
        name="senha"
        type="password"
        autoComplete="current-password"
        placeholder="Insira sua senha"
        value={values.senha}
        onChange={onChange}
        error={errors.senha}
      />

      {erro && <p className="field__error text-body" role="alert">{erro}</p>}

      <Button type="submit" variant="highlight" loading={enviando}>Login</Button>
    </form>
  )
}

export default FormLogin
