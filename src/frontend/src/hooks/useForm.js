// hooks/useForm.js
import { useState } from 'react'

// rules: { campo: (valor, todosOsValores) => 'mensagem de erro' | '' }

/* Hook genérico para gerenciamento de estado de formulários, alterações de inputs e validações */
export function useForm(initial, rules) {
  /* Estado que guarda os valores atuais de cada campo do formulário */
  const [values, setValues] = useState(initial)
  
  /* Estado que armazena as mensagens de erro associadas a cada campo */
  const [errors, setErrors] = useState({})

  /* Manipulador genérico de mudança em inputs com limpeza do erro ao digitar */
  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((er) => (er[name] ? { ...er, [name]: '' } : er))
  }

  /* Executa todas as regras de validação cadastradas e atualiza o estado de erros */
  const validate = () => {
    const next = {}
    for (const [name, rule] of Object.entries(rules)) {
      const msg = rule(values[name], values)
      if (msg) next[name] = msg
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  return { values, errors, onChange, validate, setErrors, setValues }
}