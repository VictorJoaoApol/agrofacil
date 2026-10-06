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

/* Definição das regras de validação para os campos do formulário de login */
const REGRAS = {
  email: all(required('Informe seu e-mail'), email()),
  senha: required('Informe sua senha'),
}

/* Componente funcional do formulário de autenticação/login de usuários */
function FormLogin() {
  /* Estados locais para controle de mensagem de erro global e indicador de requisição em andamento */
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  /* Hooks para navegação entre rotas e acesso à localização atual (origem do redirecionamento) */
  const navigate = useNavigate()
  const { state } = useLocation()          // ProtectedRoute guarda a rota de origem em state.de

  /* Hook global para checagem e gestão do contexto de autenticação */
  const { checarSessao } = useAuth()       // avisa o AuthContext que agora existe uma sessão

  /* Hook personalizado para controle de formulário, validações e estado dos inputs */
  const { values, errors, onChange, validate, setValues } = useForm({ email: '', senha: '' }, REGRAS)

  /* Manipulador do evento de submissão do formulário e autenticação via API */
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
      /* Reseta a senha no formulário por questões de segurança e finaliza o estado de envio */
      setValues((v) => ({ ...v, senha: '' }))
      setEnviando(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Campo de entrada para o e-mail do usuário */}
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

      {/* Campo de entrada para a senha do usuário */}
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

      {/* Exibição condicional da mensagem de erro de autenticação */}
      {erro && <p className="field__error text-body" role="alert">{erro}</p>}

      {/* Botão de envio do formulário com suporte a carregamento */}
      <Button type="submit" variant="highlight" loading={enviando}>Login</Button>
    </form>
  )
}

export default FormLogin