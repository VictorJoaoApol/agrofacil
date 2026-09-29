// features/user/userService.js
// Mesmo formato { ok, message, data } da API PHP.
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function obterUsuario() {
  await wait(200)
  return { ok: true, message: '', data: { nome: 'Guilherme' } }
}