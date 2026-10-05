// services/http.js  (novo)
import { API_URL } from './config'

const TIMEOUT_MS = 10000

export async function requisitar(caminho, { metodo = 'GET', corpo } = {}) {
  const controle = new AbortController()
  const timer = setTimeout(() => controle.abort(), TIMEOUT_MS)

  try {
    const resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      credentials: 'include',
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
    })

    const json = await resposta.json().catch(() => null)
    if (!json) {
      return { ok: false, status: 'erro_resposta', mensagem: 'Resposta inválida do servidor.' }
    }

    // 401 fora do fluxo de auth = sessão caiu com o app aberto
    if (resposta.status === 401 && !caminho.startsWith('/auth/')) {
      window.dispatchEvent(new Event('auth:expirada'))
    }

    return { ...json, ok: resposta.ok, httpStatus: resposta.status }
  } catch (e) {
    return e.name === 'AbortError'
      ? { ok: false, status: 'erro_timeout', mensagem: 'O servidor demorou para responder.' }
      : { ok: false, status: 'erro_rede', mensagem: 'Sem conexão com o servidor.' }
  } finally {
    clearTimeout(timer)
  }
}