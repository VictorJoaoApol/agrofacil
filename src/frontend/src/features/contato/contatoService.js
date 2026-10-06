// features/contato/contatoService.js
// Mesmo formato { ok, message, data } da API PHP. Para trocar, mude só o corpo.
const wait = (ms) => new Promise((r) => setTimeout(r, ms))

export async function enviarMensagem({ assunto, mensagem }) {
  await wait(600)
  if (!mensagem?.trim()) return { ok: false, message: 'Escreva sua mensagem.', data: null }
  if (mensagem.trim().length < 10) return { ok: false, message: 'A mensagem está muito curta.', data: null }
  return { ok: true, message: '', data: { protocolo: `AF-${Date.now().toString().slice(-6)}`, assunto } }
}
