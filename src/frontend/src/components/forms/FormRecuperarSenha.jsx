// components/forms/FormRecuperarSenha.jsx
// Só o campo e o botão: título e link "Voltar" ficam em pages/RegistrosUsuarios/RecuperarSenha.jsx.
import { useState } from 'react'
import TextField from '../ui/TextField.jsx'
import Button from '../ui/Button.jsx'
import { useForm } from '../../hooks/useForm'
import { all, email, required } from '../../utils/validators'
import { recuperarSenha } from '../../features/auth/authService'

const REGRAS = { email: all(required('Informe seu e-mail'), email()) }

function FormRecuperarSenha() {
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [enviando, setEnviando] = useState(false)
  const { values, errors, onChange, validate } = useForm({ email: '' }, REGRAS)

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

      {erro && <p className="field__error text-body" role="alert">{erro}</p>}
      {sucesso && <p className="auth-feedback text-body" role="status">{sucesso}</p>}

      <Button type="submit" variant="highlight" loading={enviando}>Recuperar</Button>
    </form>
  )
}

export default FormRecuperarSenha
