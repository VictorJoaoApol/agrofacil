export const required = (msg = 'Campo obrigatório') => (v) => (v?.trim() ? '' : msg)

export const email = () => (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v ?? '') ? '' : 'Digite um e-mail válido'

export const minLength = (n) => (v) =>
  (v ?? '').length >= n ? '' : `Use pelo menos ${n} caracteres`

export const matches = (field, msg = 'Os campos não coincidem') => (v, all) =>
  v === all[field] ? '' : msg

// executa várias regras e devolve a primeira mensagem de erro
export const all = (...rules) => (v, values) => {
  for (const rule of rules) {
    const msg = rule(v, values)
    if (msg) return msg
  }
  return ''
}