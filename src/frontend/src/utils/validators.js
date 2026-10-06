// utils/validators.js

/* Valida se o campo foi preenchido ignorando espaços em branco no início/fim */
export const required = (msg = 'Campo obrigatório') => (v) => (v?.trim() ? '' : msg)

/* Valida a estrutura do e-mail por expressão regular */
export const email = () => (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v ?? '') ? '' : 'Digite um e-mail válido'

/* Valida se o valor atinge a quantidade mínima de caracteres definida */
export const minLength = (n) => (v) =>
  (v ?? '').length >= n ? '' : `Use pelo menos ${n} caracteres`

/* Compara o valor do campo atual com outro campo do formulário (ex: confirmação de senha) */
export const matches = (field, msg = 'Os campos não coincidem') => (v, all) =>
  v === all[field] ? '' : msg

// executa várias regras e devolve a primeira mensagem de erro
/* Combinador que executa sequencialmente as regras e retorna a primeira mensagem de erro encontrada */
export const all = (...rules) => (v, values) => {
  for (const rule of rules) {
    const msg = rule(v, values)
    if (msg) return msg
  }
  return ''
}