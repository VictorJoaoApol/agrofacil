// services/http.js
import { API_URL } from './config'

/* Tempo limite padrão de 10 segundos para interrupção de requisições pendentes */
const TIMEOUT_MS = 10000

/* Cliente HTTP genérico com controle de timeout, credenciais e tratamento centralizado de erros */
export async function requisitar(caminho, { metodo = 'GET', corpo } = {}) {
  /* Sinalizador para abortar a requisição por tempo limite */
  const controle = new AbortController()
  const timer = setTimeout(() => controle.abort(), TIMEOUT_MS)

  try {
    /* Executa a requisição HTTP com envio automático de cookies/sessão */
    const resposta = await fetch(`${API_URL}${caminho}`, {
      method: metodo,
      credentials: 'include',
      headers: corpo ? { 'Content-Type': 'application/json' } : undefined,
      body: corpo ? JSON.stringify(corpo) : undefined,
      signal: controle.signal,
    })

    /* Converte a resposta em JSON tratando falhas de parseamento */
    const json = await resposta.json().catch(() => null)
    if (!json) {
      return { ok: false, status: 'erro_resposta', mensagem: 'Resposta inválida do servidor.' }
    }

    // 401 fora do fluxo de auth = sessão caiu com o app aberto
    /* Notifica a aplicação via evento customizado se a sessão expirar durante o uso */
    if (resposta.status === 401 && !caminho.startsWith('/auth/')) {
      window.dispatchEvent(new Event('auth:expirada'))
    }

    return { ...json, ok: resposta.ok, httpStatus: resposta.status }
  } catch (e) {
    /* Trata erros de estouro de tempo (timeout) e problemas de conexão de rede */
    return e.name === 'AbortError'
      ? { ok: false, status: 'erro_timeout', mensagem: 'O servidor demorou para responder.' }
      : { ok: false, status: 'erro_rede', mensagem: 'Sem conexão com o servidor.' }
  } finally {
    /* Limpa o temporizador de timeout ao finalizar a requisição */
    clearTimeout(timer)
  }
}