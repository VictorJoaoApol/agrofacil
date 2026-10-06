// components/forms/FormRecuperarSenha.jsx
// Só o campo e o botão: título e link "Voltar" ficam em pages/RegistrosUsuarios/RecuperarSenha.jsx.
import { useState } from 'react'
import TextField from '../ui/TextField.jsx'
import Button from '../ui/Button.jsx'
import { useForm } from '../../hooks/useForm'
import { all, email, required } from '../../utils/validators'
import { recuperarSenha } from '../../features/auth/authService'

/* Definição das regras de validação para o campo de recuperação de e-mail */
const REGRAS = { email: all(required('Informe seu e-mail'), email()) }

/* Componente funcional do formulário de solicitação de recuperação de senha */
function FormRecuperarSenha() {
  /* Estados locais para feedback de erro, mensagem de sucesso e indicador de envio */
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [enviando, setEnviando] = useState(false)

  /* Hook personalizado para controle e validação do campo de formulário */
  const { values, errors, onChange, validate } = useForm({ email: '' }, REGRAS)

  /* Manipulador de envio do formulário que dispara a solicitação de recuperação de senha */
  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')
    setSucesso('')
    if (!validate()) return

    setEnviando(true)
    try {
      const res = await recuperarSenha({ email: values.email })
      if (!res.ok) throw new Error(res.message)
      setSucesso(res.message)
    } catch (err) {
      setErro(err.message || 'Não foi possível enviar. Tente novamente.')
    } finally {
      /* Encerra o estado de carregamento da requisição */
      setEnviando(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      {/* Campo de entrada para o e-mail cadastrado */}
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

      {/* Exibição condicional da mensagem de erro da solicitação */}
      {erro && <p className="field__error text-body" role="alert">{erro}</p>}

      {/* Exibição condicional da mensagem de confirmação de envio do e-mail */}
      {sucesso && <p className="auth-feedback text-body" role="status">{sucesso}</p>}

      {/* Botão para submissão da solicitação com indicador visual de carregamento */}
      <Button type="submit" variant="highlight" loading={enviando}>Recuperar</Button>
    </form>
  )
}

export default FormRecuperarSenha