// components/forms/FormCadastro.jsx
// Só os campos e o botão: título e links ficam em pages/RegistrosUsuarios/Cadastro.jsx.
import { useState } from 'react'
import { useNavigate } from 'react-router'
import TextField from '../ui/TextField.jsx'
import Button from '../ui/Button.jsx'
import { useForm } from '../../hooks/useForm'
import { all, email, minLength, required } from '../../utils/validators'
import { cadastro } from '../../services/auth'

const REGRAS = {
  nome: required('Informe seu nome'),
  email: all(required('Informe seu e-mail'), email()),
  senha: all(required('Crie uma senha'), minLength(8)),   // ajuste ao que o PHP exige
}

function FormCadastro() {
  const [erro, setErro] = useState('')
  const [enviando, setEnviando] = useState(false)

  const navigate = useNavigate()
  const { values, errors, onChange, validate, setValues } = useForm(
    { nome: '', email: '', senha: '' },
    REGRAS,
  )

  async function handleSubmit(event) {
    event.preventDefault()
    setErro('')
    if (!validate()) return

    setEnviando(true)
    try {
      const resultado = await cadastro(values.nome, values.email, values.senha)
      if (!resultado.ok) {
        throw new Error(resultado.message || 'Erro desconhecido ao cadastrar')
      }
      navigate('/login')
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
        label="Nome"
        name="nome"
        autoComplete="name"
        placeholder="Insira seu nome"
        value={values.nome}
        onChange={onChange}
        error={errors.nome}
      />
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
        autoComplete="new-password"
        placeholder="Insira sua senha"
        value={values.senha}
        onChange={onChange}
        error={errors.senha}
      />

      {erro && <p className="field__error text-body" role="alert">{erro}</p>}

      <Button type="submit" variant="highlight" loading={enviando}>Cadastrar</Button>
    </form>
  )
}

export default FormCadastro
