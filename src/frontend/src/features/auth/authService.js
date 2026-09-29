// features/auth/authService.js
// Mock com o mesmo formato que a API PHP deve devolver: { ok, message, data }.
// Para trocar pela API real, substitua só o corpo destas funções por fetch.
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function login({ email, senha }) {
  await wait(500)
  return { ok: true, message: '', data: { nome: 'Guilherme', email } }
}

export async function cadastrar({ nome, email, senha }) {
  await wait(500)
  return { ok: true, message: '', data: { nome, email } }
}

export async function recuperarSenha({ email }) {
  await wait(500)
  return { ok: true, message: 'E-mail enviado', data: null }
}