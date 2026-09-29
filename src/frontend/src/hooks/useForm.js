// hooks/useForm.js
import { useState } from 'react'

export function useForm(initial, rules) {
  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})

  const onChange = (e) => {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((er) => (er[name] ? { ...er, [name]: '' } : er))
  }

  const validate = () => {
    const next = {}
    for (const [name, rule] of Object.entries(rules)) {
      const msg = rule(values[name], values)
      if (msg) next[name] = msg
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  return { values, errors, onChange, validate, setErrors }
}