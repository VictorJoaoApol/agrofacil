// features/auth/authService.js
// Login, cadastro e sessão vivem em src/services/auth.js (API PHP).
// Aqui fica só o que ainda não tem endpoint: recuperar senha (mock).
// TODO: trocar o corpo por requisitar('/auth/recuperar_senha.php', ...) quando o backend existir.
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function recuperarSenha({ email }) {
  await wait(500)
  if (!email) return { ok: false, message: 'Informe seu e-mail.', data: null }
  return { ok: true, message: 'Se o e-mail estiver cadastrado, você receberá as instruções.', data: null }
}
